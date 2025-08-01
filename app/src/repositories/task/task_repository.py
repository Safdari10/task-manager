from sqlalchemy.orm import Session
from typing import Optional
from pydantic import UUID4
from app.src.models.task.task import Task
from app.src.schemas.task.schemas import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)


class TaskRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_all_tasks(self, user_id: UUID4) -> list[TaskResponse]:
        tasks = self.db.query(Task).filter(Task.user_id == user_id).all()
        return [TaskResponse.model_validate(task) for task in tasks]

    def get_task(self, task_id: UUID4, user_id: UUID4) -> Optional[TaskResponse]:
        task = self.db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
        if not task:
            return None
        # validate the task against the TaskResponse schema
        return TaskResponse.model_validate(task)

    def create_task(self, user_id: UUID4, task_create: TaskCreate) -> TaskResponse:
        # model_dump converts TaskCreate to Task model
        task = Task(**task_create.model_dump(), user_id=user_id)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return TaskResponse.model_validate(task)

    def update_task(
        self, task_id: UUID4, user_id: UUID4, task_update: TaskUpdate
    ) -> Optional[TaskResponse]:
        task = self.db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
        if not task:
            return None
        # Only update fields that are not None (exclude_unset=True for partial updates)
        update_data = task_update.model_dump(exclude_unset=True)
        # Iterate over the fields to update
        for key, value in update_data.items():
            setattr(task, key, value)
        self.db.commit()
        self.db.refresh(task)
        return TaskResponse.model_validate(task)

    def delete_task(self, task_id: UUID4, user_id: UUID4) -> Optional[TaskResponse]:
        task = self.db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
        if not task:
            return None
        response = TaskResponse.model_validate(task)  # validate before deletion
        self.db.delete(task)
        self.db.commit()
        return response
