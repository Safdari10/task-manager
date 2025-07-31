from sqlalchemy.orm import Session
from app.src.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session) -> None:
        self.task_respository = TaskRepository(db)
