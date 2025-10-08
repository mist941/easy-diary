from datetime import datetime
from typing import List
from .enums import Mood

from pydantic import BaseModel

class DailyReflectionCreate(BaseModel):
    date: datetime
    mood: Mood
    content: str
    tag_ids: List[int]

class DailyReflectionUpdate(BaseModel):
    date: datetime
    mood: Mood
    content: str
    tag_ids: List[int]