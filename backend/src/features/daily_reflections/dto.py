from datetime import datetime
from typing import List
from .enums import Mood
from src.features.tags.entities import Tag

from pydantic import BaseModel

class DailyReflectionCreate(BaseModel):
    date: datetime
    mood: Mood
    content: str
    tags: List[Tag]

class DailyReflectionUpdate(BaseModel):
    date: datetime
    mood: Mood
    content: str
    tags: List[Tag]