from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()


# Create the base class
Base = declarative_base()


# This function is used to set default values for datetime fields in the models in UTC (database standard)
def utcnow():
    return datetime.now(timezone.utc)


# Retrieve the database URL from environment variables
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise ValueError("Unable to retrieve DATABASE_URL from environment variables")


# Create the SQLAlchemy engine
engine = create_engine(
    database_url,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# function to get a database session
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
