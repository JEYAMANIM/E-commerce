import re
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List, Optional, Tuple

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
# Category keyword extraction for smart boosting
# ────────────────────────────────────────────────
CATEGORY_RULES: List[Tuple[re.Pattern, str]] = [
    (re.compile(r'\bcandle|lantern|tealight|t-light|candlestick\b', re.I), 'candles'),
    (re.compile(r'\bheart|valentine|cupid\b', re.I), 'heart'),
    (re.compile(r'\bmug|cup|coffee|teapot|saucer\b', re.I), 'mug'),
    (re.compile(r'\bcake|baking|tin|kitchen|spoon|fork|plate|bowl|cutlery\b', re.I), 'kitchen'),
    (re.compile(r'\bbag|shopper|tote|purse|pouch|wallet\b', re.I), 'bag'),
    (re.compile(r'\bbox|basket|crate|chest|trunk|nesting\b', re.I), 'box'),
    (re.compile(r'\bchristmas|xmas|santa|noel|advent|reindeer|snow\b', re.I), 'christmas'),
    (re.compile(r'\bframe|photo|picture|mirror|plaque|sign|chalkboard\b', re.I), 'frame'),
    (re.compile(r'\bclock|alarm|timer\b', re.I), 'clock'),
    (re.compile(r'\bknitted|wool|hottie|cushion|pillow|blanket|throw\b', re.I), 'textile'),
    (re.compile(r'\bflower|floral|rose|lavender|garden|plant|pot|vase\b', re.I), 'flower'),
    (re.compile(r'\bbunting|garland|banner|flag|party|celebration\b', re.I), 'party'),
    (re.compile(r'\bnotebook|journal|pencil|pen|sticker|label|stationery|card\b', re.I), 'stationery'),
    (re.compile(r'\bbird|owl|cat|dog|rabbit|duck|figurine|babushka\b', re.I), 'figurine'),
    (re.compile(r'\bglass|jar|bottle|decanter\b', re.I), 'glass'),
    (re.compile(r'\bwall|hanging|sign|plaque\b', re.I), 'wall_decor'),
    (re.compile(r'\blight|lamp|lantern|fairy\b', re.I), 'lighting'),
]


def _get_category(description: str) -> Optional[str]:
    for pattern, cat in CATEGORY_RULES:
        if pattern.search(description):
            return cat
    return None


@asynccontextmanager
async def lifespan(app: FastAPI):
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

        products_df: pd.DataFrame = data["products"]
        data["desc_lookup"] = {
            code: re.sub(r'[,.;\-_]+\s*$', '', str(desc)).strip()
            for code, desc in products_df["Clean_Description"].items()
        }
        data["all_stock_codes"] = list(products_df.index)
        data["cat_lookup"] = {
            code: _get_category(desc)
            for code, desc in data["desc_lookup"].items()
        }
        cat_index: dict = {}
        for code, cat in data["cat_lookup"].items():
            if cat:
                cat_index.setdefault(cat, set()).add(code)
        data["cat_index"] = cat_index

        print(f"\n[OK] Loaded {len(data['all_stock_codes'])} products, {len(cat_index)} categories")
    except Exception as exc:
        print(f"\n[ERROR] {exc}")
        data["load_error"] = str(exc)
    yield
    data.clear()


app = FastAPI(title="E-Commerce Recommendation API", version="3.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


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


def _ensure_loaded():
    if "products" not in data:
        err = data.get("load_error", "Data not initialised.")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=f"Unavailable: {err}")

def _validate_stock_code(stock_code: str) -> str:
    raw = stock_code.strip()
    desc_lookup = data.get("desc_lookup", {})
    if raw in desc_lookup:
        return raw
    for code in desc_lookup:
        if str(code).upper() == raw.upper():
            return code
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Stock code '{raw}' not found.")

def _get_duplicate_codes(query_code: str) -> List[str]:
    sc_upper = query_code.strip().upper()
    desc_lookup = data.get("desc_lookup", {})
    query_desc = desc_lookup.get(query_code, "").strip().upper()
    return [
        code for code, desc in desc_lookup.items()
        if str(code).strip().upper() == sc_upper or (query_desc and desc.strip().upper() == query_desc)
    ]

def _top_n_from_series(sim_series: pd.Series, query_code: str, n: int) -> List[ProductOut]:
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
        ProductOut(stock_code=code, description=desc_lookup.get(code, ""), similarity_score=round(float(score), 4))
        for code, score in top.items()
    ]


@app.get("/")
async def root():
    return {"service": "E-Commerce Recommendation API", "version": "3.0.0", "status": "online", "docs": "/docs"}

@app.get("/health", response_model=HealthResponse)
async def health():
    loaded = "products" in data
    return HealthResponse(status="healthy" if loaded else "degraded", data_loaded=loaded, total_products=len(data.get("all_stock_codes", [])), error=data.get("load_error"))

@app.get("/products")
async def list_products(page: int = Query(default=1, ge=1), page_size: int = Query(default=50, ge=1, le=500)):
    _ensure_loaded()
    all_codes = data["all_stock_codes"]
    desc_lookup = data["desc_lookup"]
    total = len(all_codes)
    start = (page - 1) * page_size
    page_codes = all_codes[start:start + page_size]
    return {"total": total, "page": page, "page_size": page_size, "total_pages": (total + page_size - 1) // page_size, "products": [{"stock_code": code, "description": desc_lookup.get(code, "")} for code in page_codes]}

@app.get("/products/all")
async def get_all_products():
    _ensure_loaded()
    desc_lookup = data["desc_lookup"]
    return {"total": len(desc_lookup), "products": [{"stock_code": code, "description": desc} for code, desc in desc_lookup.items()]}

@app.get("/products/search", response_model=List[ProductSearchResult])
async def search_products(q: str = Query(..., min_length=1), limit: int = Query(default=20, ge=1, le=100)):
    _ensure_loaded()
    q_lower = q.strip().lower()
    desc_lookup = data["desc_lookup"]
    return [ProductSearchResult(stock_code=code, description=desc) for code, desc in desc_lookup.items() if q_lower in desc.lower()][:limit]

@app.get("/recommend/content/{stock_code}", response_model=RecommendResponse)
async def recommend_content(stock_code: str, top_n: int = Query(default=10, ge=1, le=50)):
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)
    t0 = time.perf_counter()
    sim_series: pd.Series = data["content_sim"].loc[sc]
    recommendations = _top_n_from_series(sim_series, sc, top_n)
    return RecommendResponse(query_stock_code=sc, query_description=data["desc_lookup"][sc], method="content-based", recommendations=recommendations, processing_time_ms=round((time.perf_counter() - t0) * 1000, 2))

@app.get("/recommend/collab/{stock_code}", response_model=RecommendResponse)
async def recommend_collab(stock_code: str, top_n: int = Query(default=10, ge=1, le=50)):
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)
    collab_df: pd.DataFrame = data["collab_sim"]
    if sc not in collab_df.index:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No collab data for '{sc}'.")
    t0 = time.perf_counter()
    sim_series: pd.Series = collab_df.loc[sc]
    recommendations = _top_n_from_series(sim_series, sc, top_n)
    return RecommendResponse(query_stock_code=sc, query_description=data["desc_lookup"][sc], method="collaborative-filtering", recommendations=recommendations, processing_time_ms=round((time.perf_counter() - t0) * 1000, 2))

@app.get("/recommend/hybrid/{stock_code}", response_model=HybridRecommendResponse)
async def recommend_hybrid(
    stock_code: str,
    top_n: int = Query(default=10, ge=1, le=50),
    content_weight: float = Query(default=0.6, ge=0.0, le=1.0),
):
    """
    Hybrid recommendation: content + collab + category-aware boost.
    Same-category products get a 1.6x score multiplier, guaranteeing
    that clicking a mug shows mugs, clicking a bag shows bags, etc.
    """
    _ensure_loaded()
    sc = _validate_stock_code(stock_code)
    t0 = time.perf_counter()

    content_sim: pd.DataFrame = data["content_sim"]
    collab_sim: pd.DataFrame  = data["collab_sim"]
    desc_lookup  = data["desc_lookup"]
    cat_lookup   = data.get("cat_lookup", {})
    cat_index    = data.get("cat_index", {})
    dups         = _get_duplicate_codes(sc)

    content_scores = content_sim.loc[sc].drop(index=dups, errors="ignore")
    c_pos = content_scores[content_scores > 0.0]

    collab_recs: List[ProductOut] = []
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
        both_mask = (c_aligned > 0.0) & (k_aligned > 0.0)
        hybrid_raw[both_mask] *= 1.20
    else:
        hybrid_raw = c_norm.copy()

    hybrid_raw.drop(index=dups, errors="ignore", inplace=True)

    # Category-aware boost: 1.6x for same-category products
    query_category = cat_lookup.get(sc)
    if query_category:
        same_cat_codes = cat_index.get(query_category, set())
        same_cat_in_hybrid = hybrid_raw.index.intersection(list(same_cat_codes))
        if len(same_cat_in_hybrid) > 0:
            hybrid_raw.loc[same_cat_in_hybrid] *= 1.60
        # Inject same-category products with floor score if not already present
        all_desc_codes = set(desc_lookup.keys()) - set(dups)
        cat_extras = same_cat_codes & all_desc_codes - set(hybrid_raw.index)
        if cat_extras:
            hybrid_raw = pd.concat([hybrid_raw, pd.Series(0.05, index=list(cat_extras))])

    hybrid_positive = hybrid_raw[hybrid_raw > 0.0]
    if not hybrid_positive.empty:
        h_max = hybrid_positive.max()
        hybrid_scaled = (hybrid_positive / h_max) * 0.99
        top_hybrid = hybrid_scaled.nlargest(top_n)
        hybrid_recs = [
            ProductOut(stock_code=code, description=desc_lookup.get(code, ""), similarity_score=round(float(score), 4))
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
