from sqlalchemy.orm import Session
from typing import Optional
from pydantic import UUID4
from app.src.schemas.task_schemas import (
    TaskResponse,
    TaskCreate,
    TaskUpdate,
)
from app.src.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session) -> None:
        self.task_repository = TaskRepository(db)

    def get_all_tasks(self, user_id: UUID4) -> list[TaskResponse]:
        return self.task_repository.get_all_tasks(user_id)

    def get_task(self, task_id: UUID4, user_id: UUID4) -> Optional[TaskResponse]:
        return self.task_repository.get_task(task_id, user_id)

    def create_task(self, user_id: UUID4, task_create: TaskCreate) -> TaskResponse:
        return self.task_repository.create_task(user_id, task_create)

    def update_task(
        self, task_id: UUID4, user_id: UUID4, task_update: TaskUpdate
    ) -> Optional[TaskResponse]:
        return self.task_repository.update_task(task_id, user_id, task_update)

    def delete_task(self, task_id: UUID4, user_id: UUID4) -> Optional[TaskResponse]:
        return self.task_repository.delete_task(task_id, user_id)
