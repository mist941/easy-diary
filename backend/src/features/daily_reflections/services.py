from datetime import datetime
from typing import List
from .interfaces import IDailyReflectionRepository
from .entities import DailyReflection
from src.core.database import AsyncSession, get_db
from src.features.daily_reflections.repository import DailyReflectionRepository
from fastapi import Depends
from .dto import DailyReflectionCreate


class DailyReflectionService:
    def __init__(self, repository: IDailyReflectionRepository):
        self.repository = repository

    async def get_daily_reflections(self, from_date: datetime, to_date: datetime) -> List[DailyReflection]:
        return await self.repository.get_all(from_date, to_date)
    
    async def create_daily_reflection(self, daily_reflection_data: DailyReflectionCreate) -> DailyReflection:
        return await self.repository.create(daily_reflection_data)

def get_daily_reflection_service(db: AsyncSession = Depends(get_db)):
    return DailyReflectionService(DailyReflectionRepository(db))