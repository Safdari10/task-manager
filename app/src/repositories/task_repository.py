from sqlalchemy.orm import Session
from app.src.models.task import Task
from app.src.schemas.schemas import TaskCreate, TaskResponse


class TaskRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_task(self, task_create: TaskCreate) -> TaskResponse:
        task = Task(**task_create.model_dump())  # Convert TaskCreate to Task model
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return TaskResponse.model_validate(task)
