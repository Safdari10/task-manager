from sqlalchemy.orm import Session
from typing import Optional
from app.src.models.task import Task
from app.src.schemas.schemas import TaskCreate, TaskUpdate, TaskResponse


class TaskRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_task(self, task_create: TaskCreate) -> TaskResponse:
        task = Task(**task_create.model_dump())  # Convert TaskCreate to Task model
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return TaskResponse.model_validate(
            task
        )  # Convert Task model to TaskResponse schema

    def update_task(
        self, task_id: int, task_update: TaskUpdate
    ) -> Optional[TaskResponse]:
        task = (
            self.db.query(Task).filter(Task.id == task_id).first()
        )  # Find the task by ID
        if not task:
            return None
            # Return None if task not found
        for (
            key,
            value,
        ) in task_update.model_dump().items():  # Iterate over the fields to update
            setattr(task, key, value)
        self.db.commit()
        self.db.refresh(task)
        return TaskResponse.model_validate(
            task
        )  # Convert Task model to TaskResponse schema
