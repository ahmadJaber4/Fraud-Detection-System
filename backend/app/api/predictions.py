# import libraries
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionResponse
from app.ml.model import predict

# create a router
router = APIRouter(prefix='/predictions', tags=['predictions'])

# predictions POST endpoint
@router.post('/', response_model=PredictionResponse)
def create_prediction(payload: PredictionCreate, db: Session = Depends(get_db)):
    try:
        predicted_label, predicted_probability = predict(payload.model_dump())
    except Exception:
        raise HTTPException(status_code=500, detail='Prediction failed')

    db_prediction = Prediction(
        amount=payload.amount,
        location=payload.location,
        device_type=payload.device_type,
        age=payload.age,
        income=payload.income,
        debt=payload.debt,
        credit_score=payload.credit_score,
        predicted_label=predicted_label,
        predicted_probability=predicted_probability
    )

    try:
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail='Failed to save prediction')

    return db_prediction 

# predictions GET endpoint
@router.get('/', response_model=list[PredictionResponse])
def list_predictions(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Prediction).order_by(Prediction.created_at.desc()).offset(skip).limit(limit).all()