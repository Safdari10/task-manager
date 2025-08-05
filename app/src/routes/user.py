from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from app.src.services.user.user_service import UserService
from app.src.schemas.user.schemas import UserLoginResponse, UserLogin

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
