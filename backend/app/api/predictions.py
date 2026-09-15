# import libraries
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionResponse
from app.ml.model import predict

# create a router
router = APIRouter(prefix='/predictions', tags=['predictions'])

# predictions endpoint
@router.post('/', response_model=PredictionResponse)
def create_prediction(payload: PredictionCreate, db: Session = Depends(get_db)):
    predicted_label, predicted_probability = predict(payload.model_dump())

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

    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return db_prediction 