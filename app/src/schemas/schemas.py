from pydantic import BaseModel, Field
from typing import Optional
from app.src.models.status import TaskStatus


#  Base model for Task
class Task(BaseModel):
    id: int
    title: str = Field(..., max_length=255)  # Title of the task
    description: Optional[str] = Field(None, max_length=1000)  # Description of the task
    status: TaskStatus = Field(..., max_length=50)  # Status of the task
    created_at: str = Field(..., max_length=50)  # Creation timestamp
    updated_at: str = Field(..., max_length=50)  # Last update timestamp


# Schemas for creating
class TaskCreate(BaseModel):
    title: str = Field(..., max_length=255)  # Title of the task
    description: Optional[str] = Field(None, max_length=1000)  # Description of the task
    status: TaskStatus = Field(
        TaskStatus.PENDING, max_length=50
    )  # Default status is PENDING


# Schemas for updating
class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)  # Title of the task
    description: Optional[str] = Field(None, max_length=1000)  # Description of the task
    status: Optional[TaskStatus] = Field(
        None, max_length=50
    )  # Status of the task, can be updated


# schemas for response
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True  # Allows Pydantic to read attributes from the model
