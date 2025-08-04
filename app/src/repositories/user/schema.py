from sqlalchemy.orm import Session
from typing import Optional
from app.src.models.user.user import User


class UserRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def login_user(self, email: str) -> Optional[User]:
        user = self.db.query(User).filter(User.email == email).first()
        if user:
            return user
        return None
