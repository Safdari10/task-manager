from sqlalchemy.orm import Session
from app.src.repositories.user.user_repository import UserRepository


class UserService:
    def __init__(self, db: Session) -> None:
        self.user_repository = UserRepository(db)
