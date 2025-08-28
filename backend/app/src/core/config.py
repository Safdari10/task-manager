from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    # JWT
    JWT_SECRET_KEY: str = Field("change-me-for-prod", env="JWT_SECRET_KEY")
    JWT_ALGORITHM: str = Field("HS256", env="JWT_ALGORITHM")
    JWT_EXPIRE_HOURS: int = Field(1, env="JWT_EXPIRE_HOURS")

    # Bcrypt
    SALT_ROUNDS: int = Field(12, env="SALT_ROUNDS")

    # Pydantic v2 settings config — load .env and ignore unrelated env vars
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
