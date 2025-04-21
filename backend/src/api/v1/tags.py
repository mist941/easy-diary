from backend.src.features.tags.dto import TagCreate, TagUpdate
from backend.src.features.tags.services import TagService, get_tag_service
from fastapi import APIRouter, Depends

router = APIRouter()


@router.post("/tags")
async def create_tag(
    tag_data: TagCreate, tag_service: TagService = Depends(get_tag_service)
):
    return await tag_service.create_tag(tag_data)


@router.put("/tags/{tag_id}")
async def update_tag(
    tag_id: int, tag_data: TagUpdate, tag_service: TagService = Depends(get_tag_service)
):
    return await tag_service.update_tag(tag_id, tag_data)


@router.delete("/tags/{tag_id}")
async def delete_tag(tag_id: int, tag_service: TagService = Depends(get_tag_service)):
    return await tag_service.delete_tag(tag_id)
