from sqlalchemy.orm import Session
from typing import Optional
from app.src.schemas.task.schemas import (
    TaskResponse,
    TaskCreate,
    TaskUpdate,
)
from app.src.repositories.task.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session) -> None:
        self.task_repository = TaskRepository(db)

    def get_all_tasks(self) -> list[TaskResponse]:
        return self.task_repository.get_all_tasks()

    def get_task(self, task_id: int) -> Optional[TaskResponse]:
        task = self.task_repository.get_task(task_id)
        if not task:
            return None
        return task

    def create_task(self, task_create: TaskCreate) -> TaskResponse:
        return self.task_repository.create_task(task_create)

    def update_task(
        self, task_id: int, task_update: TaskUpdate
    ) -> Optional[TaskResponse]:
        task = self.task_repository.update_task(task_id, task_update)
        if not task:
            return None
        return task

    def delete_task(self, task_id: int) -> Optional[TaskResponse]:
        task = self.task_repository.delete_task(task_id)
        if not task:
            return None
        return task
