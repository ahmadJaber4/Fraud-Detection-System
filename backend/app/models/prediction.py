# import libraries
from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func
from app.database.database import Base

class Prediction(Base):
    __tablename__ = 'predictions'

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # input features
    amount = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    device_type = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    income = Column(Float, nullable=False)
    debt = Column(Float, nullable=False)
    credit_score = Column(Integer, nullable=False)

    # model output
    predicted_label = Column(Integer, nullable=False) # 0 or 1
    predicted_probability = Column(Float, nullable=False)