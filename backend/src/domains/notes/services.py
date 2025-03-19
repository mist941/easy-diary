from src.domains.notes.dto import NoteCreate
from .interfaces import INoteRepository

class NoteService:
    def __init__(self, repo: INoteRepository):
        self.repo = repo

    async def create_note(self, note_data: NoteCreate):
        note = await self.repo.create(note_data)
        return note

    async def get_notes(self):
        return await self.repo.list_all()