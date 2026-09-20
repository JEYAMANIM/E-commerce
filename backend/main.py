import re
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List, Optional

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ────────────────────────────────────────────────
# Paths
# ────────────────────────────────────────────────
BACKEND_DIR = Path(__file__).resolve().parent

# Global data store
data = {}


# ────────────────────────────────────────────────
# Lifespan – load pkl files on startup
# ────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the three pkl files into memory at startup."""
    required = {
        "products":    BACKEND_DIR / "products_df.pkl",
        "content_sim": BACKEND_DIR / "content_sim_df.pkl",
        "collab_sim":  BACKEND_DIR / "collab_sim_df.pkl",
    }

    try:
        for key, path in required.items():
            if not path.exists():
                raise FileNotFoundError(f"Required file not found: {path}")
            print(f"  Loading {path.name} ...", end=" ", flush=True)
            t0 = time.perf_counter()
            data[key] = joblib.load(path)
            print(f"done ({time.perf_counter() - t0:.1f}s)")

        # Pre-compute clean lookups (strip trailing punctuation)
        products_df: pd.DataFrame = data["products"]
        data["desc_lookup"] = {
            code: re.sub(r'[,.;\-_]+\s*$', '', str(desc)).strip()
            for code, desc in products_df["Clean_Description"].items()
        }
        data["all_stock_codes"] = list(products_df.index)

        print(f"\n[OK] All pkl files loaded successfully.")
        print(f"     Products     : {len(data['all_stock_codes'])} items")
        print(f"     Content-sim  : {data['content_sim'].shape}")
        print(f"     Collab-sim   : {data['collab_sim'].shape}")

    except Exception as exc:
        print(f"\n[ERROR] Failed to load pkl files: {exc}")
        data["load_error"] = str(exc)

    yield

    data.clear()


# ────────────────────────────────────────────────
# FastAPI app
# ────────────────────────────────────────────────
app = FastAPI(
    title="E-Commerce Product Recommendation API",
    description=(
        "Serves product recommendations using content-based and "
        "collaborative-filtering similarity matrices loaded from pkl files."
    ),
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ────────────────────────────────────────────────
# Pydantic Schemas
# ────────────────────────────────────────────────
class ProductOut(BaseModel):
    stock_code: str
    description: str
    similarity_score: float = Field(..., ge=0.0, le=1.0)


class RecommendResponse(BaseModel):
    query_stock_code: str
    query_description: str
    method: str
    recommendations: List[ProductOut]
    processing_time_ms: float


class HybridRecommendResponse(BaseModel):
    query_stock_code: str
    query_description: str
    content_recommendations: List[ProductOut]
    collab_recommendations: List[ProductOut]
    hybrid_recommendations: List[ProductOut]
    processing_time_ms: float


class ProductSearchResult(BaseModel):
    stock_code: str
    description: str


class HealthResponse(BaseModel):
    status: str
    data_loaded: bool
    total_products: int
    error: Optional[str] = None


# ────────────────────────────────────────────────
# Helpers
# ────────────────────────────────────────────────
def _ensure_loaded():
    if "products" not in data:
        err = data.get("load_error", "Data not initialised.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Recommendation data unavailable: {err}",
        )


def _validate_stock_code(stock_code: str) -> str:
    """Normalise and validate a stock code, supporting case-insensitive lookup."""
    raw = stock_code.strip()
    desc_lookup = data.get("desc_lookup", {})
    if raw in desc_lookup:
        return raw
    for code in desc_lookup:
        if str(code).upper() == raw.upper():
            return code
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Stock code '{raw}' not found in the product catalogue.",
    )


def _get_duplicate_codes(query_code: str) -> List[str]:
    """Find query code (case-insensitive) and any items with the exact same description."""
    sc_upper = query_code.strip().upper()
    desc_lookup = data.get("desc_lookup", {})
    query_desc = desc_lookup.get(query_code, "").strip().upper()
    return [
        code for code, desc in desc_lookup.items()
        if str(code).strip().upper() == sc_upper or (query_desc and desc.strip().upper() == query_desc)
    ]


def _top_n_from_series(
    sim_series: pd.Series,
    query_code: str,
    n: int,
) -> List[ProductOut]:
    """Return top-n similar products (excluding self and duplicates), calibrated to high-confidence scale."""
    dups = _get_duplicate_codes(query_code)
    filtered = sim_series.drop(index=dups, errors="ignore")
    pos = filtered[filtered > 0.0]
    if pos.empty:
        return []

    max_score = pos.max()
    norm_series = (pos / max_score) * 0.98 if max_score > 0 else pos
    top = norm_series.nlargest(n)
    desc_lookup = data["desc_lookup"]

    return [
        ProductOut(
            stock_code=code,
            description=desc_lookup.get(code, ""),
            similarity_score=round(float(score), 4),
        )
        for code, score in top.items()
    ]


# ────────────────────────────────────────────────
# Endpoints
# ────────────────────────────────────────────────

@app.get("/", summary="Root – Service Info")
async def root():
    return {
        "service": "E-Commerce Product Recommendation API",
        "version": "2.0.0",
        "status": "online",
        "docs": "/docs",
        "endpoints": {
            "health":            "GET  /health",
            "products":          "GET  /products",
            "search":            "GET  /products/search?q=...",
            "content_recommend": "GET  /recommend/content/{stock_code}",
            "collab_recommend":  "GET  /recommend/collab/{stock_code}",
            "hybrid_recommend":  "GET  /recommend/hybrid/{stock_code}",
        },
    }


@app.get("/health", response_model=HealthResponse, summary="Health Check")
async def health():
    loaded = "products" in data
    return HealthResponse(
        status="healthy" if loaded else "degraded",
        data_loaded=loaded,
        total_products=len(data.get("all_stock_codes", [])),
        error=data.get("load_error"),
    )


@app.get("/products", summary="List All Products (paginated)")
async def list_products(
    page: int = Query(default=1, ge=1, description="Page number"),
    page_size: int = Query(default=50, ge=1, le=500, description="Items per page"),
):
    """Return a paginated list of all products in the catalogue."""
    _ensure_loaded()
    all_codes = data["all_stock_codes"]
    desc_lookup = data["desc_lookup"]

    total = len(all_codes)
    start = (page - 1) * page_size
    end = start + page_size
    page_codes = all_codes[start:end]

    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
        "products": [
            {"stock_code": code, "description": desc_lookup.get(code, "")}
            for code in page_codes
        ],
    }


@app.get("/products/all", summary="Get All Products (no pagination)")
async def get_all_products():
    """Return all products in a single response — used for frontend bulk-load."""
    _ensure_loaded()
    desc_lookup = data["desc_lookup"]
    return {
        "total": len(desc_lookup),
        "products": [
            {"stock_code": code, "description": desc}
            for code, desc in desc_lookup.items()
        ],
    }


@app.get("/products/search", response_model=List[ProductSearchResult], summary="Search Products")
async def search_products(
    q: str = Query(..., min_length=1, description="Search term (case-insensitive)"),
    limit: int = Query(default=20, ge=1, le=100),
):
    """Full-text search across product descriptions."""
    _ensure_loaded()
    q_lower = q.strip().lower()
    desc_lookup = data["desc_lookup"]

    results = [
        ProductSearchResult(stock_code=code, description=desc)
        for code, desc in desc_lookup.items()
        if q_lower in desc.lower()
    ][:limit]

    return results


@app.get(
    "/recommend/content/{stock_code}",
    response_model=RecommendResponse,
    summary="Content-Based Recommendations",
)
async def recommend_content(
    stock_code: str,
    top_n: int = Query(default=10, ge=1, le=50, description="Number of recommendations"),
):
    """
    Recommend products using **content-based similarity**
    (cosine similarity on product descriptions).
    """
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)

    t0 = time.perf_counter()
    sim_series: pd.Series = data["content_sim"].loc[sc]
    recommendations = _top_n_from_series(sim_series, sc, top_n)
    elapsed_ms = (time.perf_counter() - t0) * 1000.0

    return RecommendResponse(
        query_stock_code=sc,
        query_description=data["desc_lookup"][sc],
        method="content-based",
        recommendations=recommendations,
        processing_time_ms=round(elapsed_ms, 2),
    )


@app.get(
    "/recommend/collab/{stock_code}",
    response_model=RecommendResponse,
    summary="Collaborative Filtering Recommendations",
)
async def recommend_collab(
    stock_code: str,
    top_n: int = Query(default=10, ge=1, le=50, description="Number of recommendations"),
):
    """
    Recommend products using **collaborative filtering**
    (users who bought X also bought Y).
    """
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)

    collab_df: pd.DataFrame = data["collab_sim"]
    if sc not in collab_df.index:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Stock code '{sc}' has no collaborative filtering data.",
        )

    t0 = time.perf_counter()
    sim_series: pd.Series = collab_df.loc[sc]
    recommendations = _top_n_from_series(sim_series, sc, top_n)
    elapsed_ms = (time.perf_counter() - t0) * 1000.0

    return RecommendResponse(
        query_stock_code=sc,
        query_description=data["desc_lookup"][sc],
        method="collaborative-filtering",
        recommendations=recommendations,
        processing_time_ms=round(elapsed_ms, 2),
    )


@app.get(
    "/recommend/hybrid/{stock_code}",
    response_model=HybridRecommendResponse,
    summary="Hybrid Recommendations (Content + Collab)",
)
async def recommend_hybrid(
    stock_code: str,
    top_n: int = Query(default=10, ge=1, le=50),
    content_weight: float = Query(
        default=0.5, ge=0.0, le=1.0,
        description="Weight for content score (0–1). Collab weight = 1 - content_weight.",
    ),
):
    """
    Blend content-based and collaborative-filtering scores into one ranked list.

    - `content_weight=1.0` → pure content-based
    - `content_weight=0.0` → pure collaborative
    - `content_weight=0.5` → equal blend (default)
    """
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)

    t0 = time.perf_counter()
    content_sim: pd.DataFrame = data["content_sim"]
    collab_sim: pd.DataFrame = data["collab_sim"]
    desc_lookup = data["desc_lookup"]
    dups = _get_duplicate_codes(sc)

    content_scores = content_sim.loc[sc].drop(index=dups, errors="ignore")
    c_pos = content_scores[content_scores > 0.0]

    collab_recs = []
    if sc in collab_sim.index:
        collab_scores = collab_sim.loc[sc].drop(index=dups, errors="ignore")
        k_pos = collab_scores[collab_scores > 0.0]
        collab_recs = _top_n_from_series(collab_scores, sc, top_n)
    else:
        k_pos = pd.Series(dtype=float)

    c_max = c_pos.max() if not c_pos.empty and c_pos.max() > 0 else 1.0
    k_max = k_pos.max() if not k_pos.empty and k_pos.max() > 0 else 1.0

    c_norm = c_pos / c_max if not c_pos.empty else pd.Series(dtype=float)
    k_norm = k_pos / k_max if not k_pos.empty else pd.Series(dtype=float)

    if not k_norm.empty:
        combined_idx = c_norm.index.union(k_norm.index)
        c_aligned = c_norm.reindex(combined_idx, fill_value=0.0)
        k_aligned = k_norm.reindex(combined_idx, fill_value=0.0)
        hybrid_raw = content_weight * c_aligned + (1.0 - content_weight) * k_aligned
        # Boost items verified by both content similarity AND collaborative co-purchasing
        both_mask = (c_aligned > 0.0) & (k_aligned > 0.0)
        hybrid_raw[both_mask] *= 1.15
    else:
        hybrid_raw = c_norm.copy()

    hybrid_raw.drop(index=dups, errors="ignore", inplace=True)
    hybrid_positive = hybrid_raw[hybrid_raw > 0.0]

    if not hybrid_positive.empty:
        h_max = hybrid_positive.max()
        hybrid_scaled = (hybrid_positive / h_max) * 0.99
        top_hybrid = hybrid_scaled.nlargest(top_n)
        hybrid_recs = [
            ProductOut(
                stock_code=code,
                description=desc_lookup.get(code, ""),
                similarity_score=round(float(score), 4),
            )
            for code, score in top_hybrid.items()
        ]
    else:
        hybrid_recs = []

    elapsed_ms = (time.perf_counter() - t0) * 1000.0

    return HybridRecommendResponse(
        query_stock_code=sc,
        query_description=desc_lookup[sc],
        content_recommendations=_top_n_from_series(content_scores, sc, top_n),
        collab_recommendations=collab_recs,
        hybrid_recommendations=hybrid_recs,
        processing_time_ms=round(elapsed_ms, 2),
    )


# ────────────────────────────────────────────────
# Dev runner
# ────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
