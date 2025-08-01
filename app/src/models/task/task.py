from sqlalchemy import Column, Integer, String, DateTime
from app.src.db.db import Base, utcnow


# Define the Task model
# This model represents a task in the task management system
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(
        String, nullable=True
    )  # Description is optional so can be null
    status = Column(String, index=True)
    created_at = Column(DateTime, nullable=False, default=utcnow)
    updated_at = Column(
        DateTime,
        nullable=False,
        default=utcnow,
        onupdate=utcnow,
    )


# index = true means that the column will be indexed for faster search
# nullable = false means that the column cannot be null, it must have a value
