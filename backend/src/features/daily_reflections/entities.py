from datetime import datetime
from typing import List

from .entities import Tag
from .enums import Mood


class DailyReflection:
    def __init__(
        self, id: int, date: datetime, mood: Mood, content: str, tags: List[Tag]
    ):
        self.id = id
        self.date = date
        self.mood = mood
        self.content = content
        self.tags = tags
