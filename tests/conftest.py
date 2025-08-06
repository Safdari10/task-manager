import os
import sys
import uuid
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.user_schemas import UserResponse

# Ensure the parent directory is in the system path for module imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

client = TestClient(app)


def generate_unique_email():
    """Generate a unique email for testing purposes."""
    return f"test.user.{uuid.uuid4()}@example.com"


@pytest.fixture(scope="module")
def create_user() -> dict[str, str]:
    email = generate_unique_email()
    user = {
        "first_name": "Test",
        "last_name": "User",
        "email": email,
        "password": "Test@123",
    }
    response = client.post("/register", json=user)  # type: ignore
    assert response.status_code == 201
    data = response.json()  # type: ignore
    UserResponse.model_validate(data)
    return {"email": user["email"], "password": user["password"], "id": data["id"]}
