from sqlalchemy.orm import Session
from typing import Optional
from app.src.schemas.schemas import TaskResponse
from app.src.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session) -> None:
        self.task_repository = TaskRepository(db)

    def get_task(self, task_id: int) -> Optional[TaskResponse]:
        task = self.task_repository.get_task(task_id)
        if not task:
            return None
        return task
