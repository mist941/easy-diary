from datetime import datetime

from pydantic import BaseModel


class NoteCreate(BaseModel):
    content: str
    started_at: datetime | None = None
    finished_at: datetime | None = None


class NoteUpdate(BaseModel):
    content: str
    started_at: datetime | None = None
    finished_at: datetime | None = None
