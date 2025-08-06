import sys
import os

# Ensure the parent directory is in the system path for module imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.task_schemas import TaskResponse
from app.src.schemas.user_schemas import UserResponse

# initialize the test client
client = TestClient(app)


def create_user():
    user_data = {
        "first_name": "Test",
        "last_name": "User",
        "email": "test.user@example.com",
        "password": "testpassword",
    }
    response = client.post("/register", json=user_data)  # type: ignore
    assert response.status_code == 201
    data = response.json()  # type: ignore
    UserResponse.model_validate(data)
    return data["id"]  # Return the created user ID to be used in required tests


def create_test_task():
    test_task = {  # type: ignore
        "user_id": create_user(),  # get the user ID from the helper function to ensure the user exists
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
    user_id = create_user()  # Ensure a user exists to fetch tasks
    response = client.get(f"/tasks?user_id={user_id}")  # type: ignore
    assert response.status_code == 200  # type: ignore
    data = response.json()
    assert isinstance(data, list)  # Ensure the response is a list
    for item in data:  # type: ignore
        TaskResponse.model_validate(
            item
        )  # Validate each item against the TaskResponse schema, we are checking for a list of tasks


def test_create_task():
    task_data = {
        "title": "Test Create Task",
        "description": "This is a test task for creation",
        "status": "pending",
    }
    response = client.post("/tasks", json=task_data)  # type: ignore
    assert response.status_code in (200, 201)  # Accept either 200 or 201
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)


def test_get_task_by_id():
    task_id = create_test_task()  # get the id from the helper function to ensure the task exists
    response = client.get(f"/tasks/{task_id}")  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(
        data
    )  # Validate the response against the TaskResponse schema, we checking for a specific task


def test_update_task():
    task_id = create_test_task()
    updated_data = {
        "title": "Updated Task",
        "description": "This is an updated test task",
        "status": "completed",
    }
    response = client.put(f"/tasks/{task_id}", json=updated_data)  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)  # Validating a single object against the TaskResponse schema


def test_delete_task():
    task_id = create_test_task()
    response = client.delete(f"/tasks/{task_id}")  # type: ignore
    assert response.status_code == 200
    data = response.json()  # type: ignore
    TaskResponse.model_validate(data)  # Validating a single object against the TaskResponse schema
