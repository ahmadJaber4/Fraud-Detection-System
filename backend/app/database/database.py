# import libraries
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

load_dotenv() # load environment variables

DATABASE_URL =os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL) # create the SQLAlchemy engine

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # create a session factory

Base = declarative_base() # create the declarative base

# dependancy function for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()