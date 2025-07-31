from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

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
