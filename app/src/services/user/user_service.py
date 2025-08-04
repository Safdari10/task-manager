from sqlalchemy.orm import Session
from app.src.repositories.user.user_repository import UserRepository
from app.src.schemas.user.schemas import UserLogin, UserLoginResponse
from app.src.utils.security import verify_password, generate_jwt_token


class UserService:
    def __init__(self, db: Session) -> None:
        self.user_repository = UserRepository(db)

    def login(self, user_login: UserLogin) -> UserLoginResponse:
        user = self.user_repository.get_user_by_email(user_login.email)
        if user and verify_password(user_login.password, user.password):
            # Generate JWT token
            token = generate_jwt_token(
                user_id=user.id,
                first_name=user.first_name,
                last_name=user.last_name,
                user_role=user.role,
                user_status=user.status,
                secret_key="your_secret_key",  # Replace with your actual secret key
            )
            return UserLoginResponse(token=token, token_type="Bearer")
        else:
            raise ValueError("Invalid email or password")
