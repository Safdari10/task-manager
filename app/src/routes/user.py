from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from pydantic import UUID4
from app.src.services.user_service import UserService
from app.src.schemas.user_schemas import (
    UserResponse,
    UserUpdate,
)

router = APIRouter(prefix="/users")


@router.put("/{user_id}", response_model=UserResponse, tags=["Users"])
def update_user(
    user_id: UUID4,
    update_user: UserUpdate,
    db: Session = Depends(get_db_session),
):
    service = UserService(db)
    user = service.update_user(user_id, update_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}", status_code=204, tags=["Users"])
def delete_user(
    user_id: UUID4,
    db: Session = Depends(get_db_session),
):
    service = UserService(db)
    deleted = service.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
