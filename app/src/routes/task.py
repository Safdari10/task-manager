from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import UUID4
from app.src.db.db import get_db_session
from app.src.dependencies.auth import get_current_user
from app.src.models.user import User
from app.src.services.task_service import TaskService
from app.src.schemas.task_schemas import (
    TaskResponse,
    TaskUpdate,
    TaskCreate,
)


router = APIRouter(prefix="/tasks")


@router.get("/", response_model=list[TaskResponse], tags=["Tasks"])
def get_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    tasks = service.get_all_tasks(current_user.id)  # type: ignore
    return tasks


@router.get("/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def get_task(
    task_id: UUID4,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.get_task(task_id, current_user.id)  # type: ignore
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/", response_model=TaskResponse, status_code=201, tags=["Tasks"])
def create_task(
    task_create: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.create_task(current_user.id, task_create)  # type: ignore
    return task


@router.put("/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def update_task(
    task_id: UUID4,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.update_task(task_id, current_user.id, task_update)  # type:ignore
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", response_model=TaskResponse, tags=["Delete a task"])
def delete_task(
    task_id: UUID4,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.delete_task(task_id, current_user.id)  # type: ignore
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
