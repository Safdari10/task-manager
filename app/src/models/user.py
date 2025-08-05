from sqlalchemy import Column, String, DateTime, CheckConstraint, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
from app.src.db.db import Base, utcnow
from app.src.models.user_status import UserStatus
from app.src.models.role import UserRole


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    first_name = Column(String(length=50), index=True, nullable=False)
    last_name = Column(String(length=50), index=True, nullable=False)
    email = Column(String(length=255), index=True, unique=True, nullable=False)
    hashed_password = Column(String(length=255), nullable=False)
    role = Column(Enum(UserRole), index=True, default=UserRole.USER)
    status = Column(Enum(UserStatus), index=True, default=UserStatus.ACTIVE)
    created_at = Column(DateTime, default=utcnow, nullable=False)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow, nullable=False)

    __table_args__ = (
        CheckConstraint(
            "email ~* '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'",
            name="check_email_format",
        ),
    )
    tasks = relationship("Task", back_populates="user")
