from fastapi import APIRouter

router = APIRouter()


@router.get("/notes")
async def get_notes():
    return {"notes": [{"id": 1, "title": "Note 1", "content": "Content 1"}, {"id": 2, "title": "Note 2", "content": "Content 2"}]}
