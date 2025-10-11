from datetime import datetime
from typing import List

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from src.core.database import AsyncSession
from src.core.models import DailyReflectionModel, TagModel
from src.features.tags.entities import Tag

from .dto import DailyReflectionCreate, DailyReflectionUpdate
from .entities import DailyReflection
from .enums import Mood
from .interfaces import IDailyReflectionRepository


class DailyReflectionRepository(IDailyReflectionRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(
        self, from_date: datetime, to_date: datetime
    ) -> List[DailyReflection]:
        daily_reflections = await self.db.execute(
            select(DailyReflectionModel)
            .options(selectinload(DailyReflectionModel.tags))
            .where(
                DailyReflectionModel.date >= from_date,
                DailyReflectionModel.date <= to_date,
            )
        )
        
        result = []
        for dr in daily_reflections.scalars().all():
            tag_entities = [
                Tag(id=tag.id, name=tag.name, color=tag.color)
                for tag in dr.tags
            ]
            result.append(
                DailyReflection(
                    id=dr.id, 
                    date=dr.date, 
                    mood=Mood(dr.mood), 
                    content=dr.content, 
                    tags=tag_entities
                )
            )
        return result

    async def create(
        self, daily_reflection_data: DailyReflectionCreate
    ) -> DailyReflection:
        daily_reflection = DailyReflectionModel(
            date=daily_reflection_data.date,
            mood=daily_reflection_data.mood.value,
            content=daily_reflection_data.content,
        )

        try:
            tag_entities = []
            if daily_reflection_data.tag_ids:
                tags_result = await self.db.execute(
                    select(TagModel).where(
                        TagModel.id.in_(daily_reflection_data.tag_ids)
                    )
                )
                tags = tags_result.scalars().all()
                daily_reflection.tags = list(tags)
                
                tag_entities = [
                    Tag(id=tag.id, name=tag.name, color=tag.color)
                    for tag in tags
                ]

            self.db.add(daily_reflection)
            await self.db.commit()
            await self.db.refresh(daily_reflection)

            return DailyReflection(
                id=daily_reflection.id,
                date=daily_reflection.date,
                mood=Mood(daily_reflection.mood),
                content=daily_reflection.content,
                tags=tag_entities,
            )
        except Exception as e:
            await self.db.rollback()
            raise e

    async def update(
        self, daily_reflection_id: int, daily_reflection_data: DailyReflectionUpdate
    ) -> DailyReflection:
        result = await self.db.execute(
            select(DailyReflectionModel)
            .options(selectinload(DailyReflectionModel.tags))
            .where(DailyReflectionModel.id == daily_reflection_id)
        )
        daily_reflection = result.scalar_one_or_none()
        
        if not daily_reflection:
            raise HTTPException(status_code=404, detail="Daily reflection not found")

        try:
            daily_reflection.date = daily_reflection_data.date
            daily_reflection.mood = daily_reflection_data.mood.value
            daily_reflection.content = daily_reflection_data.content

            tag_entities = []
            if daily_reflection_data.tag_ids:
                tags_result = await self.db.execute(
                    select(TagModel).where(
                        TagModel.id.in_(daily_reflection_data.tag_ids)
                    )
                )
                tags = tags_result.scalars().all()
                daily_reflection.tags = list(tags)
                
                tag_entities = [
                    Tag(id=tag.id, name=tag.name, color=tag.color)
                    for tag in tags
                ]
            else:
                daily_reflection.tags = []

            await self.db.commit()
            await self.db.refresh(daily_reflection)

            return DailyReflection(
                id=daily_reflection.id,
                date=daily_reflection.date,
                mood=Mood(daily_reflection.mood),
                content=daily_reflection.content,
                tags=tag_entities,
            )
        except Exception as e:
            await self.db.rollback()
            raise e
