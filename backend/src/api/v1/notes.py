from fastapi import APIRouter, Depends
from src.domains.notes.services import NoteService
from src.domains.notes.repository import NoteRepository
from src.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

router = APIRouter()

class NoteCreate(BaseModel):
    content: str

def get_note_service(db: AsyncSession = Depends(get_db)):
    note_repository = NoteRepository(db)
    return NoteService(note_repository)


@router.get("/notes")
async def get_notes(note_service: NoteService = Depends(get_note_service)):
    notes = await note_service.get_notes()
    return notes

@router.post("/notes")
async def create_note(note_data: NoteCreate, note_service: NoteService = Depends(get_note_service)):
    note = await note_service.create_note(note_data.content)
    return note

