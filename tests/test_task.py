import sys
import os
import pytest


# Ensure the parent directory is in the system path for module imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.task_schemas import TaskResponse

# initialize the test client
client = TestClient(app)


@pytest.fixture(scope="module")
def create_test_task(create_user: dict[str, str]) -> str:
    test_task: dict[str, str] = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "pending",
    }
    response = client.post(f"/tasks?user_id={create_user['id']}", json=test_task)  # type: ignore
    assert response.status_code in (200, 201)
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)
    return data["id"]  #  Return the created task ID to be used in required tests


def test_get_all_tasks(create_user: dict[str, str]):
    response = client.get(f"/tasks?user_id={create_user['id']}")  # type: ignore
    assert response.status_code == 200  # type: ignore
    data = response.json()
    assert isinstance(data, list)  # Ensure the response is a list
    for item in data:  # type: ignore
        TaskResponse.model_validate(item)  # Validate against the TaskResponse schema, list of tasks


def test_create_task(create_user: dict[str, str]):
    task_data: dict[str, str] = {
        "title": "Test Create Task",
        "description": "This is a test task for creation",
        "status": "pending",
    }
    response = client.post(f"/tasks?user_id={create_user['id']}", json=task_data)  # type: ignore
    assert response.status_code in (200, 201)
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)


def test_get_task_by_id(create_user: dict[str, str], create_test_task: str):
    response = client.get(f"/tasks/{create_test_task}?user_id={create_user['id']}")  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)


def test_update_task(create_user: dict[str, str], create_test_task: str):
    updated_data: dict[str, str] = {
        "title": "Updated Task",
        "description": "This is an updated test task",
        "status": "completed",
    }
    response = client.put(f"/tasks/{create_test_task}?user_id={create_user['id']}", json=updated_data)  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)  # Validating a single object against the TaskResponse schema


def test_delete_task(create_user: dict[str, str], create_test_task: str):
    response = client.delete(f"/tasks/{create_test_task}?user_id={create_user['id']}")  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)
