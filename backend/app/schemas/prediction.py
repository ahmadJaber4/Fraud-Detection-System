# import libraries
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

# request body schema for POST /predict
class PredictionCreate(BaseModel):
    amount: float = Field(gt=0)
    location: str
    device_type: str
    age: int = Field(ge=18)
    income: float = Field(ge=0)
    debt: float = Field(ge=0)
    credit_score: int = Field(ge=0, le=850)

# response schema
class PredictionResponse(BaseModel):
    id: int
    created_at: datetime
    predicted_label: int
    predicted_probability: float

    model_config = ConfigDict(from_attributes=True)