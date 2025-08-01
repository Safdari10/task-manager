from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from app.src.models.task.status import TaskStatus
from datetime import datetime


#  Base model for Task
class Task(BaseModel):
    id: int
    title: str = Field(..., max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: TaskStatus = Field(..., max_length=50)
    created_at: datetime = Field(..., max_length=50)
    updated_at: datetime = Field(..., max_length=50)


# Schema for creating
class TaskCreate(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: TaskStatus = Field(
        TaskStatus.PENDING, max_length=50
    )  # Default status is PENDING


# Schema for updating
class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = Field(None, max_length=50)


# schema for response
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
    # Enables creation of TaskResponse from SQLAlchemy models using from_attributes=True.
    # In Pydantic v2, model_config replaces the Config class for model configuration.
