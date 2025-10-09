from datetime import datetime
from typing import List

from pydantic import BaseModel

from .enums import Mood


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
