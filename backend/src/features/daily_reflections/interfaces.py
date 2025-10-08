from datetime import datetime
from typing import List
from .entities import DailyReflection
from .dto import DailyReflectionCreate, DailyReflectionUpdate

class IDailyReflectionRepository:
    def get_all(self, from_date: datetime, to_date: datetime) -> List[DailyReflection]:
        raise NotImplementedError

    def create(self, daily_reflection_data: DailyReflectionCreate) -> DailyReflection:
        raise NotImplementedError

    def update(self, daily_reflection_id: int, daily_reflection_data: DailyReflectionUpdate) -> DailyReflection:
        raise NotImplementedError

    def delete(self, daily_reflection_id: int) -> None:
        raise NotImplementedError   