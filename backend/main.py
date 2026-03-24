"""
Diabetes Prediction API
FastAPI backend for serving the diabetes prediction ML model
"""
import pickle
from datetime import datetime
from pathlib import Path
from typing import List, Optional

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Initialize FastAPI app
app = FastAPI(
    title="Diabetes Prediction API",
    description="A machine learning API for predicting diabetes risk based on health metrics",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
MODEL_PATH = Path(__file__).parent / "models" / "diabetes_model.sav"
SCALER_PATH = Path(__file__).parent / "models" / "scaler.sav"

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    model_loaded = True
except Exception as e:
    print(f"Error loading model: {e}")
    model_loaded = False
    model = None
    scaler = None


# Feature information for the frontend
FEATURE_INFO = {
    "pregnancies": {
        "name": "Pregnancies",
        "description": "Number of times pregnant",
        "min": 0,
        "max": 17,
        "unit": "count",
        "healthy_range": [0, 5],
    },
    "glucose": {
        "name": "Glucose",
        "description": "Plasma glucose concentration (2 hours in an oral glucose tolerance test)",
        "min": 0,
        "max": 200,
        "unit": "mg/dL",
        "healthy_range": [70, 140],
    },
    "blood_pressure": {
        "name": "Blood Pressure",
        "description": "Diastolic blood pressure",
        "min": 0,
        "max": 122,
        "unit": "mm Hg",
        "healthy_range": [60, 80],
    },
    "skin_thickness": {
        "name": "Skin Thickness",
        "description": "Triceps skin fold thickness",
        "min": 0,
        "max": 99,
        "unit": "mm",
        "healthy_range": [10, 30],
    },
    "insulin": {
        "name": "Insulin",
        "description": "2-Hour serum insulin",
        "min": 0,
        "max": 846,
        "unit": "μU/ml",
        "healthy_range": [16, 166],
    },
    "bmi": {
        "name": "BMI",
        "description": "Body mass index (weight in kg / height in m²)",
        "min": 0,
        "max": 67.1,
        "unit": "kg/m²",
        "healthy_range": [18.5, 24.9],
    },
    "diabetes_pedigree": {
        "name": "Diabetes Pedigree Function",
        "description": "Genetic risk score based on family history",
        "min": 0.08,
        "max": 2.42,
        "unit": "",
        "healthy_range": [0.08, 0.5],
    },
    "age": {
        "name": "Age",
        "description": "Age in years",
        "min": 21,
        "max": 81,
        "unit": "years",
        "healthy_range": [21, 81],
    },
}

# Health recommendations based on risk level
RECOMMENDATIONS = {
    "low": [
        "Maintain your healthy lifestyle with regular exercise",
        "Continue eating a balanced diet rich in vegetables and whole grains",
        "Schedule regular health check-ups annually",
        "Stay hydrated and get adequate sleep",
    ],
    "moderate": [
        "Consider consulting with a healthcare provider for a comprehensive evaluation",
        "Increase physical activity to at least 150 minutes per week",
        "Monitor your blood sugar levels periodically",
        "Reduce intake of processed foods and sugary beverages",
        "Maintain a healthy weight through diet and exercise",
    ],
    "high": [
        "Schedule an appointment with a healthcare provider as soon as possible",
        "Get a comprehensive diabetes screening test (HbA1c)",
        "Work with a nutritionist to develop a diabetes prevention meal plan",
        "Engage in regular physical activity with medical guidance",
        "Monitor blood glucose levels regularly",
        "Consider joining a diabetes prevention program",
    ],
}


class PredictionInput(BaseModel):
    """Input schema for diabetes prediction"""
    pregnancies: int = Field(..., ge=0, le=17, description="Number of pregnancies")
    glucose: float = Field(..., ge=0, le=300, description="Plasma glucose concentration (mg/dL)")
    blood_pressure: float = Field(..., ge=0, le=150, description="Diastolic blood pressure (mm Hg)")
    skin_thickness: float = Field(..., ge=0, le=100, description="Triceps skin fold thickness (mm)")
    insulin: float = Field(..., ge=0, le=900, description="2-Hour serum insulin (μU/ml)")
    bmi: float = Field(..., ge=0, le=70, description="Body mass index (kg/m²)")
    diabetes_pedigree: float = Field(..., ge=0, le=3, description="Diabetes pedigree function")
    age: int = Field(..., ge=1, le=120, description="Age in years")

    @field_validator("glucose", "blood_pressure", "skin_thickness", "insulin", "bmi")
    @classmethod
    def check_not_zero_for_critical(cls, v, info):
        # Allow zero but warn in response if critical values are zero
        return v


class PredictionResponse(BaseModel):
    """Response schema for diabetes prediction"""
    prediction: int
    probability: float
    risk_level: str
    timestamp: str
    recommendations: List[str]
    input_values: dict
    feature_analysis: dict


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    model_loaded: bool
    timestamp: str
    version: str


@app.get("/", tags=["General"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to the Diabetes Prediction API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "predict": "/predict",
    }


@app.get("/health", response_model=HealthResponse, tags=["General"])
async def health_check():
    """Detailed health status of the API"""
    return HealthResponse(
        status="healthy" if model_loaded else "degraded",
        model_loaded=model_loaded,
        timestamp=datetime.utcnow().isoformat() + "Z",
        version="1.0.0",
    )


@app.get("/feature-info", tags=["Information"])
async def get_feature_info():
    """Get information about all input features"""
    return {
        "features": FEATURE_INFO,
        "total_features": len(FEATURE_INFO),
    }


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict(input_data: PredictionInput):
    """
    Make a diabetes prediction based on health metrics.

    Returns prediction (0 or 1), probability, risk level, and recommendations.
    """
    if not model_loaded:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please try again later.",
        )

    # Prepare input array in the correct order
    features = np.array([[
        input_data.pregnancies,
        input_data.glucose,
        input_data.blood_pressure,
        input_data.skin_thickness,
        input_data.insulin,
        input_data.bmi,
        input_data.diabetes_pedigree,
        input_data.age,
    ]])

    # Scale the features
    try:
        scaled_features = scaler.transform(features)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error scaling features: {str(e)}",
        )

    # Make prediction
    try:
        prediction = int(model.predict(scaled_features)[0])

        # Handle models that don't have predict_proba (like SVC without probability=True)
        if hasattr(model, 'predict_proba'):
            probability = float(model.predict_proba(scaled_features)[0][1])
        elif hasattr(model, 'decision_function'):
            # Convert decision function to probability using sigmoid
            decision = model.decision_function(scaled_features)[0]
            probability = float(1 / (1 + np.exp(-decision)))
        else:
            # Fallback: use prediction as probability (0 or 1)
            probability = float(prediction)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error making prediction: {str(e)}",
        )

    # Determine risk level
    if probability < 0.3:
        risk_level = "low"
    elif probability < 0.6:
        risk_level = "moderate"
    else:
        risk_level = "high"

    # Analyze each feature against healthy ranges
    feature_analysis = {}
    input_dict = input_data.model_dump()

    for key, info in FEATURE_INFO.items():
        value = input_dict.get(key, 0)
        healthy_min, healthy_max = info["healthy_range"]

        if value < healthy_min:
            status = "low"
        elif value > healthy_max:
            status = "high"
        else:
            status = "normal"

        feature_analysis[key] = {
            "value": value,
            "status": status,
            "healthy_range": info["healthy_range"],
            "unit": info["unit"],
        }

    return PredictionResponse(
        prediction=prediction,
        probability=round(probability, 4),
        risk_level=risk_level,
        timestamp=datetime.utcnow().isoformat() + "Z",
        recommendations=RECOMMENDATIONS[risk_level],
        input_values=input_dict,
        feature_analysis=feature_analysis,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
