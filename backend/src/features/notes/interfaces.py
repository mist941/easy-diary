from typing import List
from datetime import datetime
from .dto import NoteCreate
from .entities import Note


class INoteRepository:
    def create(self, note_data: NoteCreate) -> Note:
        raise NotImplementedError

    def list_all(self, day: datetime = None) -> List[Note]:
        raise NotImplementedError
