import os
import sys
import uuid
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from fastapi.testclient import TestClient
from dotenv import load_dotenv
from app.main import app
from app.src.db.db import Base, get_db_session
from app.src.schemas.user_schemas import UserResponse, UserLoginResponse

# Ensure the parent directory is in the system path for module imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))


load_dotenv()

Test_URL = os.getenv("TEST_DATABASE_URL")

if not Test_URL:
    raise ValueError("TEST_DATABASE_URL environment variable is not set")

engine = create_engine(Test_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base.metadata.create_all(bind=engine)


@pytest.fixture
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def client(db_session: Session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db_session] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def generate_unique_email():
    """Generate a unique email for testing purposes."""
    return f"test.user.{uuid.uuid4()}@example.com"


@pytest.fixture()
def create_user(client: TestClient) -> dict[str, str]:
    email = generate_unique_email()
    user = {
        "first_name": "Test",
        "last_name": "User",
        "email": email,
        "password": "Test@123",
    }
    response = client.post("/users/register", json=user)  # type: ignore
    assert response.status_code == 201
    data = response.json()  # type: ignore
    UserResponse.model_validate(data)
    return {"email": user["email"], "password": user["password"], "id": data["id"]}


@pytest.fixture()
def login_user(client: TestClient, create_user: dict[str, str]):
    login_data = {
        "email": create_user["email"],
        "password": create_user["password"],
    }
    response = client.post("/users/login", json=login_data)  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    UserLoginResponse.model_validate(data)
    assert "token" in data
    assert data["token_type"] == "Bearer"
    # Return the token for further use in tests
    return data["token"]
