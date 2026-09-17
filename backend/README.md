# Backend - E-Commerce Tag Predictor Service

FastAPI service integrating machine learning models to automatically predict product tags and categories from text.

## ML Models Connected
- `tfidf_vectorizer.pkl`: `TfidfVectorizer` (vocabulary size: 1,500)
- `tag_predictor_model.pkl`: `KNeighborsClassifier` multi-label classifier
- `label_binarizer.pkl`: `MultiLabelBinarizer` (439 distinct e-commerce tag classes)

## Environment Setup & Activation

A dedicated virtual environment has been created in `backend/.venv`.

### Activate on Windows (PowerShell):
```powershell
.\backend\.venv\Scripts\Activate.ps1
```

### Activate on Windows (cmd):
```cmd
backend\.venv\Scripts\activate.bat
```

## Running the API Server

From the `backend` directory:
```powershell
.\.venv\Scripts\uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Interactive API documentation will be available at:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## API Endpoints

### 1. `GET /health`
Returns server and model loading status.

### 2. `GET /tags`
Returns all 439 tags recognized by the model.

### 3. `POST /predict`
Predict tags for a single product description or title.
```json
{
  "text": "Men Casual Slim Fit Cotton T-Shirt"
}
```

### 4. `POST /predict/batch`
Predict tags for multiple products in a single call.
```json
{
  "items": [
    "Men Casual Round Neck T-Shirt",
    "Acne facial cleanser for sensitive skin",
    "Sony 4K OLED HDR Smart TV"
  ]
}
```
