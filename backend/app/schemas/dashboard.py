# import libraries
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# dashboard summary schema
class DashboardStats(BaseModel):
    total_predictions: int
    fraud_count: int
    safe_count: int
    fraud_rate: float
    safe_rate: float

# recent predictions table schema
class RecentPrediction(BaseModel):
    created_at: datetime
    amount: float
    location: str
    is_fraud: bool

    model_config = ConfigDict(from_attributes=True)