import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.schemas import TaskResponse

# initialize the test client
client = TestClient(app)


def create_test_task():
    test_task = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "pending",
    }
    response = client.post("/tasks", json=test_task)  # type: ignore
    assert response.status_code in (200, 201)  # Accept either 200 or 201
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)
    return data["id"]  #  Return the created task ID to be used in required tests


def test_get_all_tasks():

    response = client.get("/tasks")  # type: ignore
    assert response.status_code == 200  # type: ignore
    data = response.json()  # type: ignore
    assert isinstance(data, list)  # Ensure the response is a list
    for item in data:  # type: ignore
        TaskResponse.model_validate(
            item
        )  # Validate each item against the TaskResponse schema
