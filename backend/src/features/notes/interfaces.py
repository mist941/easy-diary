from typing import List
from datetime import datetime
from .dto import NoteCreate, NoteUpdate
from .entities import Note


class INoteRepository:
    def create(self, note_data: NoteCreate) -> Note:
        raise NotImplementedError

    def list_all(self, day: datetime = None) -> List[Note]:
        raise NotImplementedError

    def update(self, note_id: int, note_data: NoteUpdate) -> Note:
        raise NotImplementedError

    def delete(self, note_id: int) -> None:
        raise NotImplementedError
