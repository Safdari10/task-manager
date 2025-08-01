from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
from app.src.db.db import Base, utcnow


# Define the Task model
# This model represents a task in the task management system
class Task(Base):
    __tablename__ = "tasks"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id"), index=True, nullable=False
    )
    title = Column(String(length=255), index=True)
    description = Column(
        String(length=1000), nullable=True
    )  # Description is optional so can be null
    status = Column(String(length=50), index=True)
    created_at = Column(DateTime, nullable=False, default=utcnow)
    updated_at = Column(
        DateTime,
        nullable=False,
        default=utcnow,
        onupdate=utcnow,
    )
    user = relationship("User", back_populates="tasks")


# index = true means that the column will be indexed for faster search
# nullable = false means that the column cannot be null, it must have a value
