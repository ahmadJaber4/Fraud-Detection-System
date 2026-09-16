# import libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.models import prediction
from app.api import predictions, dashboard

# create the FastAPI app
app = FastAPI(title='Fraud Detection API')

# create tables on startup
Base.metadata.create_all(bind=engine)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(predictions.router)
app.include_router(dashboard.router)

# health-check route
@app.get('/')
def root():
    return {'status': 'ok'}