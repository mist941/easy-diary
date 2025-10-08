from sqlalchemy import Column, DateTime, Integer, String, IdentifierList
from src.core.database import Base
from .interfaces import IDailyReflectionRepository
from .dto import DailyReflectionCreate
from .entities import DailyReflection
from src.core.database import AsyncSession

class DailyReflectionModel(Base):
    __tablename__ = "daily_reflections"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    mood = Column(String, nullable=False)
    content = Column(String, nullable=False)
    tags = Column(IdentifierList, nullable=True)

class DailyReflectionRepository(IDailyReflectionRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, daily_reflection_data: DailyReflectionCreate) -> DailyReflection:
        daily_reflection = DailyReflectionModel(
            date=daily_reflection_data.date,
            mood=daily_reflection_data.mood,
            content=daily_reflection_data.content,
            tags=daily_reflection_data.tags)
        try:
            self.db.add(daily_reflection)
            await self.db.commit()
            await self.db.refresh(daily_reflection)
            return DailyReflection(
                id=daily_reflection.id,
                date=daily_reflection.date,
                mood=daily_reflection.mood,
                content=daily_reflection.content,
                tags=daily_reflection.tags)
        except Exception as e:
            await self.db.rollback()
            raise e