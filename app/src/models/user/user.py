from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.src.db.db import Base, utcnow
from app.src.models.user.status import UserStatus
from app.src.models.user.role import UserRole


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    first_name = Column(String(length=50), index=True, nullable=False)
    last_name = Column(String(length=50), index=True, nullable=False)
    email = Column(String(length=255), index=True, unique=True, nullable=False)
    hashed_password = Column(String(length=255), nullable=False)
    role = Column(String(length=50), index=True, default=UserRole.USER.value)
    status = Column(String(length=50), index=True, default=UserStatus.ACTIVE.value)
    created_at = Column(DateTime, default=utcnow, nullable=False)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow, nullable=False)
