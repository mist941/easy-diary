from .dto import TagCreate, TagUpdate
from .entities import Tag


class ITagRepository:
    def get_all(self, query: str) -> list[Tag]:
        raise NotImplementedError

    def create(self, tag_data: TagCreate) -> Tag:
        raise NotImplementedError

    def update(self, tag_id: int, tag_data: TagUpdate) -> Tag:
        raise NotImplementedError

    def delete(self, tag_id: int) -> None:
        raise NotImplementedError
