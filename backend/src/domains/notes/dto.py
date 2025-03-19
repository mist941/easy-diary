from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    content: str
    started_at: datetime
    finished_at: datetime