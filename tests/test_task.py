import sys
import os
import pytest
from fastapi.testclient import TestClient
from app.src.schemas.task_schemas import TaskResponse


# Ensure the parent directory is in the system path for module imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


@pytest.fixture()
def create_test_task(client: TestClient, login_user: dict[str, str]) -> str:
    test_task: dict[str, str] = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "pending",
    }
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.post(f"/tasks", headers=headers, json=test_task)
    assert response.status_code in (200, 201)
    data = response.json()
    TaskResponse.model_validate(data)
    return data["id"]  #  Return the created task ID to be used in required tests


def test_get_all_tasks(client: TestClient, login_user: dict[str, str]):
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.get(f"/tasks", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)  # Ensure the response is a list
    for item in data:  # type: ignore
        TaskResponse.model_validate(item)  # Validate against the TaskResponse schema, list of tasks


def test_create_task(client: TestClient, login_user: dict[str, str]):
    task_data: dict[str, str] = {
        "title": "Test Create Task",
        "description": "This is a test task for creation",
        "status": "pending",
    }
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.post(f"/tasks", headers=headers, json=task_data)
    assert response.status_code in (200, 201)
    data = response.json()
    TaskResponse.model_validate(data)


def test_get_task_by_id(client: TestClient, login_user: dict[str, str], create_test_task: str):
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.get(f"/tasks/{create_test_task}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    TaskResponse.model_validate(data)


def test_update_task(client: TestClient, login_user: dict[str, str], create_test_task: str):
    updated_data: dict[str, str] = {
        "title": "Updated Task",
        "description": "This is an updated test task",
        "status": "completed",
    }
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.put(f"/tasks/{create_test_task}", headers=headers, json=updated_data)
    assert response.status_code == 200
    data = response.json()
    TaskResponse.model_validate(data)  # Validating a single object against the TaskResponse schema


def test_delete_task(client: TestClient, login_user: dict[str, str], create_test_task: str):
    headers = {"Authorization": f"Bearer {login_user}"}
    response = client.delete(f"/tasks/{create_test_task}", headers=headers)
    assert response.status_code == 200
    data = response.json()
    TaskResponse.model_validate(data)
