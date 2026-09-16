# import libraries
from pathlib import Path
import joblib
import pandas as pd

# locate model file
MODEL_PATH = Path(__file__).resolve().parent / "fraud_model.pkl"

# load pipeline (preprocessing + XGBoost)
model = joblib.load(MODEL_PATH)

# predict function
def predict(features: dict) -> tuple[int, float]:
    input_df = pd.DataFrame([features])
    predicted_label = int(model.predict(input_df)[0])
    predicted_probability = round(float(model.predict_proba(input_df)[0][1]), 4)
    
    return predicted_label, predicted_probability