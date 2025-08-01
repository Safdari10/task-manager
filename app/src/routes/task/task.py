from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from app.src.services.task.task_service import TaskService
from app.src.schemas.task.schemas import (
    TaskResponse,
    TaskUpdate,
    TaskCreate,
)


router = APIRouter()


@router.get("/tasks", response_model=list[TaskResponse], tags=["Get all tasks"])
def get_tasks(db: Session = Depends(get_db_session)):
    service = TaskService(db)
    tasks = service.get_all_tasks()
    return tasks


@router.get("/tasks/{task_id}", response_model=TaskResponse, tags=["Get a task"])
def get_task(
    task_id: int,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/tasks", response_model=TaskResponse, tags=["Create a task"])
def create_task(
    task_create: TaskCreate,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.create_task(task_create)
    if not task:
        raise HTTPException(status_code=400, detail="Task could not be created")
    return task


@router.put("/tasks/{task_id}", response_model=TaskResponse, tags=["Update a task"])
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.update_task(task_id, task_update)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/tasks/{task_id}", response_model=TaskResponse, tags=["Delete a task"])
def delete_task(
    task_id: int,
    db: Session = Depends(get_db_session),
):
    service = TaskService(db)
    task = service.delete_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
