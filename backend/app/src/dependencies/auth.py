import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.src.utils.security import decode_jwt_token
from sqlalchemy.orm import Session
from app.src.db.db import get_db_session
from app.src.models.user import User


load_dotenv()

security = HTTPBearer()
SECRET_KEY: str = os.getenv("SECRET_KEY")  # type: ignore
if not SECRET_KEY:
    raise ValueError("Failed to load SECRET KEY")


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db_session),
):
    """
    FastAPI dependency to get the current user ID from a JWT token.
    Raises 401 if the token is invalid or missing.
    """
    token = credentials.credentials
    payload = decode_jwt_token(token, SECRET_KEY)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials"
        )
    user_id = payload["sub"]
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
