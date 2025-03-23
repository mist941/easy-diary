from pathlib import Path
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    postgres_user: str
    postgres_password: str
    postgres_db: str

    class Config:
        env_file = str(Path(__file__).parent.parent.parent.parent / ".env")
        env_file_encoding = "utf-8"
        fields = {
            "postgres_user": {"env": "POSTGRES_USER"},
            "postgres_password": {"env": "POSTGRES_PASSWORD"},
            "postgres_db": {"env": "POSTGRES_DB"},
        }


settings = Settings()
