from typing import List
from .entities import Note

class INoteRepository:
    def create(self, content: str) -> Note:
        raise NotImplementedError

    def list_all(self) -> List[Note]:
        raise NotImplementedError