from sqlalchemy.orm import Session
from typing import Optional
from pydantic import UUID4
from app.src.models.user.user import User


class UserRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_user_by_email(self, email: str) -> Optional[User]:
        user = self.db.query(User).filter(User.email == email).first()
        if user:
            return user
        return None

    def get_user_by_id(self, user_id: UUID4) -> Optional[User]:
        user = self.db.query(User).filter(User.id == user_id).first()
        if user:
            return user
        return None

    def create_user(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user(self, user: User) -> User:
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_user(self, user: User) -> None:
        self.db.delete(user)
        self.db.commit()
