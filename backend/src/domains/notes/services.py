from .interfaces import INoteRepository

class NoteService:
    def __init__(self, repo: INoteRepository):
        self.repo = repo

    async def create_note(self, content: str):
        note = await self.repo.create(content)
        return note

    async def get_notes(self):
        return await self.repo.list_all()