from typing import List
from src.domains.notes.dto import NoteCreate
from .entities import Note

class INoteRepository:
    def create(self, note_data: NoteCreate) -> Note:
        raise NotImplementedError

    def list_all(self) -> List[Note]:
        raise NotImplementedError