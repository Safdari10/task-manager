from pydantic import BaseModel, ConfigDict, Field, UUID4
from typing import Optional
from app.src.models.task_status import TaskStatus
from datetime import datetime


#  Base model for Task
class Task(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = Field(None, max_length=1000)


# Schema for creating
class TaskCreate(BaseModel):
    pass


# Schema for updating
class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)


# schema for response
class TaskResponse(BaseModel):
    id: UUID4
    user_id: UUID4
    title: str
    description: Optional[str]
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
    # Enables creation of TaskResponse from SQLAlchemy models using from_attributes=True.
    # In Pydantic v2, model_config replaces the Config class for model configuration.
