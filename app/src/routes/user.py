from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from pydantic import UUID4
from app.src.services.user_service import UserService
from app.src.schemas.user.schemas import (
    UserLoginResponse,
    UserLogin,
    UserCreate,
    UserResponse,
    UserUpdate,
)

router = APIRouter()


@router.post("/login", response_model=UserLoginResponse, tags=["User Login"])
def login(
    user_login: UserLogin,
    db: Session = Depends(get_db_session),
):
    service = UserService(db)
    user = service.login(user_login)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user


@router.post("/register", response_model=UserResponse, tags=["User Registration"])
def register(
    user_create: UserCreate,
    db: Session = Depends(get_db_session),
):
    service = UserService(db)
    try:
        user = service.register(user_create)
        return user
    except IndentationError:
        raise HTTPException(status_code=409, detail="Email already registered")


@router.put("/users/{user_id}", response_model=UserResponse, tags=["Update User"])
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
