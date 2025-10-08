from .interfaces import IDailyReflectionRepository
from .dto import DailyReflectionCreate
from .entities import DailyReflection
from src.core.database import AsyncSession
from src.core.models import DailyReflectionModel, TagModel
from src.features.tags.entities import Tag
from sqlalchemy import select

class DailyReflectionRepository(IDailyReflectionRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, daily_reflection_data: DailyReflectionCreate) -> DailyReflection:
        daily_reflection = DailyReflectionModel(
            date=daily_reflection_data.date,
            mood=daily_reflection_data.mood,
            content=daily_reflection_data.content)
        
        try:
            if daily_reflection_data.tag_ids:
                tags_result = await self.db.execute(
                    select(TagModel).where(TagModel.id.in_(daily_reflection_data.tag_ids))
                )
                tags = tags_result.scalars().all()
                daily_reflection.tags = list(tags)
            
            self.db.add(daily_reflection)
            await self.db.commit()
            await self.db.refresh(daily_reflection)
            

            tag_entities = [
                Tag(id=tag.id, name=tag.name, color=tag.color) 
                for tag in daily_reflection.tags
            ]
            
            return DailyReflection(
                id=daily_reflection.id,
                date=daily_reflection.date,
                mood=daily_reflection.mood,
                content=daily_reflection.content,
                tags=tag_entities)
        except Exception as e:
            await self.db.rollback()
            raise e