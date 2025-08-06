import os
import sys
from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.user_schemas import UserResponse, UserLoginResponse
from tests.conftest import generate_unique_email

# add the parent directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


client = TestClient(app)


def test_user_login(create_user: dict[str, str]):
    login_data: dict[str, str] = {
        "email": create_user["email"],
        "password": create_user["password"],
    }
    response = client.post("/login", json=login_data)  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    UserLoginResponse.model_validate(data)


def test_register_user():
    email = generate_unique_email()
    user_data: dict[str, str] = {
        "first_name": "Test",
        "last_name": "User",
        "email": email,
        "password": "Test@123",
    }
    response = client.post("/register", json=user_data)  # type: ignore
    assert response.status_code == 201
    data = response.json()  # type: ignore
    UserResponse.model_validate(data)
    assert data["email"] == email
    assert "id" in data
