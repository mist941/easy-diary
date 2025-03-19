from src.domains.notes.dto import NoteCreate
from src.core.database import Base, AsyncSession
from sqlalchemy import Column, Integer, String, DateTime, select
from datetime import UTC, datetime, timezone
from .entities import Note
from .interfaces import INoteRepository

class NoteModel(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    started_at = Column(DateTime, default=datetime.now(timezone.utc).replace(tzinfo=None))
    finished_at = Column(DateTime)

class NoteRepository(INoteRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, note_data: NoteCreate) -> Note:
        note = NoteModel(content=note_data.content, started_at=note_data.started_at, finished_at=note_data.finished_at)
        try:
            self.db.add(note)
            await self.db.commit()
            await self.db.refresh(note)
            return Note(id=note.id, content=note.content, created_at=note.created_at)
        except Exception as e:
            await self.db.rollback()
            raise e

    async def list_all(self):
        try:
            result = await self.db.execute(select(NoteModel))
            notes = result.scalars().all()
            return [Note(id=n.id, content=n.content, created_at=n.created_at) for n in notes]
        except Exception as e:
            await self.db.rollback()
            raise e