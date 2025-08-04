from pydantic import BaseModel, EmailStr, Field, UUID4, ConfigDict
from app.src.models.user.role import UserRole
from app.src.models.user.status import UserStatus
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)


class UserUpdate(BaseModel):
    first_name: Optional[str] = Field(None, min_length=2, max_length=50)
    last_name: Optional[str] = Field(None, min_length=2, max_length=50)
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8, max_length=128)


class UserResponse(UserBase):
    id: UUID4
    role: UserRole
    status: UserStatus
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(
        from_attributes=True,
    )


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=128)


class UserLoginResponse(BaseModel):
    token: str = Field(..., description="JWT token for user authentication")
    token_type: str = Field("Bearer", description="Type of the token")
    id: UUID4 = Field(..., description="User's unique identifier")
    first_name: str = Field(..., description="User's first name")
    last_name: str = Field(..., description="User's last name")
    role: UserRole = Field(..., description="User's role in the system")
    status: UserStatus = Field(..., description="User's current status")
    model_config = ConfigDict(
        from_attributes=True,
    )
