from datetime import datetime

from fastapi import Depends

from src.core.database import AsyncSession, get_db
from src.features.notes.repository import NoteRepository

from .dto import NoteCreate, NoteUpdate
from .interfaces import INoteRepository


class NoteService:
    def __init__(self, repo: INoteRepository):
        self.repo = repo

    async def create_note(self, note_data: NoteCreate):
        note = await self.repo.create(note_data)
        return note

    async def get_notes(self, day: datetime = None):
        return await self.repo.list_all(day)

    async def update_note(self, note_id: int, note_data: NoteUpdate):
        return await self.repo.update(note_id, note_data)

    async def delete_note(self, note_id: int):
        return await self.repo.delete(note_id)


def get_note_service(db: AsyncSession = Depends(get_db)):
    note_repository = NoteRepository(db)
    return NoteService(note_repository)
