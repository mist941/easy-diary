from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    content: str
    started_at: datetime | None = None
    finished_at: datetime | None = None