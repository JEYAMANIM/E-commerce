import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List, Optional, Union
import warnings

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Suppress sklearn version mismatch warning on unpickle
warnings.filterwarnings("ignore", category=UserWarning)

# Base directory for pickle files
BACKEND_DIR = Path(__file__).resolve().parent

# Global model container
ml_models = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load machine learning models into memory during application startup."""
    try:
        vectorizer_path = BACKEND_DIR / "tfidf_vectorizer.pkl"
        model_path = BACKEND_DIR / "tag_predictor_model.pkl"
        binarizer_path = BACKEND_DIR / "label_binarizer.pkl"

        if not vectorizer_path.exists():
            raise FileNotFoundError(f"Missing {vectorizer_path}")
        if not model_path.exists():
            raise FileNotFoundError(f"Missing {model_path}")
        if not binarizer_path.exists():
            raise FileNotFoundError(f"Missing {binarizer_path}")

        ml_models["vectorizer"] = joblib.load(vectorizer_path)
        ml_models["model"] = joblib.load(model_path)
        ml_models["binarizer"] = joblib.load(binarizer_path)

        # Cache class list
        classes = list(ml_models["binarizer"].classes_)
        ml_models["classes"] = classes

        print(f"[OK] ML models loaded successfully.")
        print(f" - TF-IDF Vocab Size: {len(ml_models['vectorizer'].vocabulary_)}")
        print(f" - Classifier Type: {type(ml_models['model']).__name__}")
        print(f" - Total Tag Classes: {len(classes)}")

    except Exception as e:
        print(f"[ERROR] Error loading ML models: {e}")
        ml_models["load_error"] = str(e)

    yield

    # Clean up on shutdown
    ml_models.clear()


# Initialize FastAPI app
app = FastAPI(
    title="E-Commerce Tag Predictor API",
    description="FastAPI service serving TF-IDF Vectorizer, KNN Tag Predictor, and MultiLabelBinarizer for e-commerce products.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Pydantic Schemas
# ==========================================

class PredictRequest(BaseModel):
    text: Optional[str] = Field(
        default=None,
        description="Full product text, title, or combined description.",
        example="Men Casual Slim Fit Round Neck Cotton T-Shirt",
    )
    title: Optional[str] = Field(
        default=None,
        description="Product title (optional if 'text' is provided).",
        example="Men Casual T-Shirt",
    )
    description: Optional[str] = Field(
        default=None,
        description="Product description (optional).",
        example="100% Cotton, comfortable summer wear, short sleeve.",
    )


class PredictResponse(BaseModel):
    input_text: str
    tags: List[str]
    tag_count: int
    processing_time_ms: float


class BatchPredictRequest(BaseModel):
    items: List[Union[str, PredictRequest]] = Field(
        ...,
        description="List of product texts or product objects to predict tags for.",
        example=[
            "Sony 4K Smart TV with 144Hz HDR",
            "Men Casual Slim Fit Cotton T-Shirt",
            "Acne facial cleanser for sensitive skin",
        ],
    )


class BatchPredictResponse(BaseModel):
    total_items: int
    predictions: List[PredictResponse]
    total_processing_time_ms: float


class HealthResponse(BaseModel):
    status: str
    models_loaded: bool
    total_classes: int
    vocab_size: int
    error: Optional[str] = None


# ==========================================
# Helper Functions
# ==========================================

def get_input_text(req: PredictRequest) -> str:
    """Extract clean unified text from request."""
    if req.text and req.text.strip():
        return req.text.strip()

    parts = []
    if req.title and req.title.strip():
        parts.append(req.title.strip())
    if req.description and req.description.strip():
        parts.append(req.description.strip())

    combined = " ".join(parts).strip()
    if not combined:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Either 'text' or 'title'/'description' must be provided.",
        )
    return combined


def ensure_models_ready():
    """Verify models are loaded in memory."""
    if "vectorizer" not in ml_models or "model" not in ml_models or "binarizer" not in ml_models:
        err = ml_models.get("load_error", "Models not initialized.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Machine Learning models are unavailable: {err}",
        )


# ==========================================
# Endpoints
# ==========================================

@app.get("/", summary="Root Endpoint")
async def root():
    """Root endpoint providing service information and links."""
    return {
        "service": "E-Commerce Tag Predictor API",
        "status": "online",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
        "endpoints": {
            "health": "/health",
            "tags": "/tags",
            "predict": "/predict (POST)",
            "batch_predict": "/predict/batch (POST)",
        },
    }


@app.get("/health", response_model=HealthResponse, summary="Service Health Check")
async def health():
    """Returns the operational status and loaded model details."""
    models_loaded = (
        "vectorizer" in ml_models
        and "model" in ml_models
        and "binarizer" in ml_models
    )

    return HealthResponse(
        status="healthy" if models_loaded else "degraded",
        models_loaded=models_loaded,
        total_classes=len(ml_models.get("classes", [])),
        vocab_size=len(ml_models["vectorizer"].vocabulary_) if "vectorizer" in ml_models else 0,
        error=ml_models.get("load_error"),
    )


@app.get("/tags", summary="List All Supported Tags")
async def get_tags():
    """Retrieve all available tag categories known to the model."""
    ensure_models_ready()
    classes = ml_models["classes"]
    return {
        "total_tags": len(classes),
        "tags": classes,
    }


@app.post("/predict", response_model=PredictResponse, summary="Predict Product Tags")
async def predict(request: PredictRequest):
    """Predict tags for a single product description or title."""
    ensure_models_ready()
    input_text = get_input_text(request)

    start_time = time.perf_counter()
    vectorizer = ml_models["vectorizer"]
    model = ml_models["model"]
    binarizer = ml_models["binarizer"]

    # Transform text to TF-IDF features
    x_features = vectorizer.transform([input_text])

    # Predict tags using classifier
    y_pred = model.predict(x_features)

    # Decode binary matrix back to tag labels
    decoded_tags = binarizer.inverse_transform(y_pred)
    predicted_tags = list(decoded_tags[0]) if decoded_tags else []

    elapsed_ms = (time.perf_counter() - start_time) * 1000.0

    return PredictResponse(
        input_text=input_text,
        tags=predicted_tags,
        tag_count=len(predicted_tags),
        processing_time_ms=round(elapsed_ms, 2),
    )


@app.post("/predict/batch", response_model=BatchPredictResponse, summary="Batch Predict Product Tags")
async def predict_batch(batch_request: BatchPredictRequest):
    """Predict tags for multiple products in a single request."""
    ensure_models_ready()

    if not batch_request.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item list cannot be empty.",
        )

    # Normalize inputs
    texts = []
    for item in batch_request.items:
        if isinstance(item, str):
            texts.append(item.strip())
        elif isinstance(item, PredictRequest):
            texts.append(get_input_text(item))
        else:
            texts.append(str(item))

    start_time = time.perf_counter()
    vectorizer = ml_models["vectorizer"]
    model = ml_models["model"]
    binarizer = ml_models["binarizer"]

    x_features = vectorizer.transform(texts)
    y_pred = model.predict(x_features)
    decoded_tags = binarizer.inverse_transform(y_pred)

    elapsed_total_ms = (time.perf_counter() - start_time) * 1000.0
    avg_time_per_item = elapsed_total_ms / len(texts) if texts else 0.0

    results = []
    for text, tags in zip(texts, decoded_tags):
        tag_list = list(tags)
        results.append(
            PredictResponse(
                input_text=text,
                tags=tag_list,
                tag_count=len(tag_list),
                processing_time_ms=round(avg_time_per_item, 2),
            )
        )

    return BatchPredictResponse(
        total_items=len(results),
        predictions=results,
        total_processing_time_ms=round(elapsed_total_ms, 2),
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
