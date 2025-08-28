from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    # JWT
    JWT_SECRET_KEY: str = Field("change-me-for-prod")
    JWT_ALGORITHM: str = Field("HS256")
    JWT_EXPIRE_HOURS: int = Field(1)

    # Bcrypt
    SALT_ROUNDS: int = Field(12)

    # Pydantic v2 settings config — load .env and ignore unrelated env vars
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
