from passlib.context import CryptContext
from jose import jwt
from pydantic import UUID4
from app.src.db.db import utcnow
from datetime import timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain_password: str) -> str:
    """Hash a plain password using bcrypt."""
    return pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)


def generate_jwt_token(
    user_id: UUID4,
    first_name: str,
    last_name: str,
    user_role: str,
    user_status: str,
    secret_key: str,
    expires_delta: timedelta = timedelta(hours=1),
    algorithm: str = "HS256",
) -> str:
    """Generate a JWT token."""
    expire = utcnow() + expires_delta
    payload: dict[str, object] = {
        "sub": str(user_id),
        "first_name": first_name,
        "last_name": last_name,
        "role": user_role,
        "status": user_status,
        "exp": expire,
        "iat": utcnow(),
        "nbf": utcnow(),
    }
    return jwt.encode(payload, secret_key, algorithm=algorithm)
