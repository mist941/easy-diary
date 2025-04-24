from .repository import TagRepository
from fastapi import Depends
from src.core.database import AsyncSession, get_db
from .entities import Tag
from .dto import TagCreate, TagUpdate
from .interfaces import ITagRepository


class TagService:
    def __init__(self, repo: ITagRepository):
        self.repo = repo

    async def get_all_tags(self, query: str) -> list[Tag]:
        return await self.repo.get_all(query)

    async def create_tag(self, tag_data: TagCreate) -> Tag:
        return await self.repo.create(tag_data)

    async def update_tag(self, tag_id: int, tag_data: TagUpdate) -> Tag:
        return await self.repo.update(tag_id, tag_data)

    async def delete_tag(self, tag_id: int) -> None:
        return await self.repo.delete(tag_id)


def get_tag_service(db: AsyncSession = Depends(get_db)):
    tag_repository = TagRepository(db)
    return TagService(tag_repository)
