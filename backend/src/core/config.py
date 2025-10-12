from pathlib import Path
from typing import Optional, List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

def get_possible_env_files() -> List[str]:
    """
    Get list of possible .env file locations in order of priority.
    """
    current_file = Path(__file__).resolve()
    possible_paths = [
        current_file.parent.parent.parent / ".env",
        current_file.parent.parent.parent.parent / ".env",
    ]
    
    # Return only existing files as strings
    return [str(path) for path in possible_paths if path.exists()]

class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    SECRET_KEY: str = Field(alias="SECRET_KEY")
    ALGORITHM: str = "HS256"
    postgres_user: str = Field(alias="POSTGRES_USER")
    postgres_password: str = Field(alias="POSTGRES_PASSWORD")
    postgres_db: str = Field(alias="POSTGRES_DB")
    db_host: str = Field(alias="DB_HOST")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.DATABASE_URL:
            self.DATABASE_URL = f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}@{self.db_host}:5432/{self.postgres_db}"

    model_config = SettingsConfigDict(
        env_file=get_possible_env_files(),
        env_file_encoding="utf-8",
    )


settings = Settings()