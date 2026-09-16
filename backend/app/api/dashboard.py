# import libraries
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.prediction import Prediction
from app.schemas.dashboard import DashboardStats, RecentPrediction

# create router
router = APIRouter(prefix='/dashboard', tags=['dashboard'])

# stats GET endpoint (total, fraud, safe, rates)
@router.get('/stats', response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_predictions = db.query(func.count(Prediction.id)).scalar()
    fraud_count = (
        db.query(func.count(Prediction.id))
        .filter(Prediction.predicted_label == 1)
        .scalar()
    )
    safe_count = total_predictions - fraud_count

    if total_predictions == 0:
        fraud_rate = 0.0
        safe_rate = 0.0
    else:
        fraud_rate = round(fraud_count / total_predictions * 100, 2)
        safe_rate = round(safe_count / total_predictions * 100, 2)

    return DashboardStats(
        total_predictions=total_predictions,
        fraud_count=fraud_count,
        safe_count=safe_count,
        fraud_rate=fraud_rate,
        safe_rate=safe_rate,
    )