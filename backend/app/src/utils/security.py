from bcrypt import hashpw, gensalt, checkpw
from jose import jwt
from jose.exceptions import JWTError
from pydantic import UUID4
from app.src.db.db import utcnow
from datetime import timedelta


def hash_password(plain_password: str) -> str:
    """Hash a plain password using bcrypt."""
    return hashpw(plain_password.encode(), gensalt()).decode()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return checkpw(plain_password.encode(), hashed_password.encode())


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


def decode_jwt_token(
    token: str, secret_key: str, algorithm: str = "HS256"
) -> dict[str, object] | None:
    """Decode a JWT token."""
    try:
        return jwt.decode(token=token, key=secret_key, algorithms=[algorithm])
    except JWTError:
        return None


def verify_jwt_token(token: str, secret_key: str, algorithm: str = "HS256") -> bool:
    """Verify a JWT token."""

    return decode_jwt_token(token, secret_key, algorithm) is not None
