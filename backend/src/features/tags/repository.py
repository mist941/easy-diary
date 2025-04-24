from http.client import HTTPException
from src.core.database import AsyncSession, Base
from .dto import TagCreate, TagUpdate
from .interfaces import ITagRepository
from sqlalchemy import Column, Integer, String, select
from fastapi import HTTPException
from .entities import Tag


class TagModel(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class TagRepository(ITagRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self, query: str) -> list[Tag]:
        try:
            tags = await self.db.execute(
                select(TagModel).where(TagModel.name.like(f"%{query}%"))
            )
            return [Tag(id=tag.id, name=tag.name) for tag in tags.scalars().all()]
        except Exception as e:
            await self.db.rollback()
            raise e

    async def create(self, tag_data: TagCreate) -> Tag:
        tag = TagModel(name=tag_data.name)
        try:
            self.db.add(tag)
            await self.db.commit()
            await self.db.refresh(tag)
            return Tag(id=tag.id, name=tag.name)
        except Exception as e:
            await self.db.rollback()
            raise e

    async def update(self, tag_id: int, tag_data: TagUpdate) -> Tag:
        try:
            tag = await self.db.execute(select(TagModel).where(TagModel.id == tag_id))
            tag = tag.scalar_one_or_none()
            if tag is None:
                raise HTTPException(status_code=404, detail="Tag not found")

            tag.name = tag_data.name

            await self.db.commit()
            await self.db.refresh(tag)
            return Tag(id=tag.id, name=tag.name)
        except Exception as e:
            await self.db.rollback()
            raise e

    async def delete(self, tag_id: int) -> None:
        try:
            tag = await self.db.execute(select(TagModel).where(TagModel.id == tag_id))
            tag = tag.scalar_one_or_none()
            if tag is None:
                raise HTTPException(status_code=404, detail="Tag not found")

            await self.db.delete(tag)
            await self.db.commit()
        except Exception as e:
            await self.db.rollback()
            raise e
