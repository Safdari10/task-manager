from sqlalchemy.orm import Session
from app.src.repositories.user.user_repository import UserRepository
from app.src.schemas.user.schemas import UserLogin, UserLoginResponse, UserCreate, UserResponse
from app.src.utils.security import verify_password, generate_jwt_token, hash_password
from app.src.models.user.user import User


class UserService:
    def __init__(self, db: Session) -> None:
        self.user_repository = UserRepository(db)

    def login(self, user_login: UserLogin) -> UserLoginResponse:
        user = self.user_repository.get_user_by_email(user_login.email)
        if user and verify_password(user_login.password, user.hashed_password):  # type: ignore
            # Generate JWT token
            token = generate_jwt_token(
                user_id=user.id,  # type: ignore
                first_name=user.first_name,  # type: ignore
                last_name=user.last_name,  # type: ignore
                user_role=user.role,  # type: ignore
                user_status=user.status,  # type: ignore
                secret_key="your_secret_key",  # Replace with your actual secret key
            )
            return UserLoginResponse(token=token, token_type="Bearer")
        else:
            raise ValueError("Invalid email or password")

    def register(self, user_create: UserCreate) -> UserResponse:
        hashed_password = hash_password(user_create.password)
        user = User(
            first_name=user_create.first_name,
            last_name=user_create.last_name,
            email=user_create.email,
            hashed_password=hashed_password,
        )
        user = self.user_repository.create_user(user)
        return UserResponse.model_validate(user)
