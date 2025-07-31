from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from app.src.services.task_service import TaskService
from task_manager.app.src.schemas.schemas import TaskResponse


router = APIRouter()


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
