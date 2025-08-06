from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import UUID4
from app.src.db.db import get_db_session
from app.src.services.task_service import TaskService
from app.src.schemas.task_schemas import (
    TaskResponse,
    TaskUpdate,
    TaskCreate,
)


router = APIRouter(prefix="/tasks")


@router.get("/", response_model=list[TaskResponse], tags=["Get all tasks"])
def get_tasks(user_id: UUID4, db: Session = Depends(get_db_session)):
    service = TaskService(db)
    tasks = service.get_all_tasks(user_id)
    return tasks


@router.get("/{task_id}", response_model=TaskResponse, tags=["Get a task"])
def get_task(
    task_id: UUID4,
    user_id: UUID4,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.get_task(task_id, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/", response_model=TaskResponse, status_code=201, tags=["Create a task"])
def create_task(
    user_id: UUID4,
    task_create: TaskCreate,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.create_task(user_id, task_create)
    return task


@router.put("/{task_id}", response_model=TaskResponse, tags=["Update a task"])
def update_task(
    task_id: UUID4,
    user_id: UUID4,
    task_update: TaskUpdate,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.update_task(task_id, user_id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/{task_id}", response_model=TaskResponse, tags=["Delete a task"])
def delete_task(
    task_id: UUID4,
    user_id: UUID4,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.delete_task(task_id, user_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
