import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from fastapi.testclient import TestClient
from app.main import app
from app.src.schemas.schemas import TaskResponse

client = TestClient(app)


def test_get_all_tasks():

    response = client.get("/tasks")  # type: ignore
    assert response.status_code == 200  # type: ignore
    data = response.json()  # type: ignore
    assert isinstance(data, list)  # Ensure the response is a list
    for item in data:  # type: ignore
        TaskResponse.model_validate(
            item
        )  # Validate each item against the TaskResponse schema
