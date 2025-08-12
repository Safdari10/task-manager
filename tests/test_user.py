import os
import sys
from fastapi.testclient import TestClient
from app.src.schemas.user_schemas import UserResponse

# add the parent directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


def test_update_user(client: TestClient, create_user: dict[str, str]):
    updated_data: dict[str, str] = {
        "first_name": "Updated",
        "last_name": "User",
        "email": create_user["email"],
        "password": "Updated@123",
    }
    response = client.put(f"/users/{create_user["id"]}", json=updated_data)  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    UserResponse.model_validate(data)
    assert data["first_name"] == "Updated"
    assert data["last_name"] == "User"
    assert data["email"] == create_user["email"]


def test_delete_user(client: TestClient, create_user: dict[str, str]):
    response = client.delete(f"/users/{create_user["id"]}")  # type: ignore
    assert response.status_code == 204
