from .interfaces import INoteRepository

class NoteService:
    def __init__(self, repo: INoteRepository):
        self.repo = repo

    def create_note(self, content: str):
        return self.repo.create(content)

    def get_notes(self):
        return self.repo.list_all()