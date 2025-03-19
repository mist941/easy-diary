from src.core.database import Base, AsyncSession
from sqlalchemy import Column, Integer, String, DateTime, select
from datetime import UTC, datetime, timezone
from .entities import Note
from .interfaces import INoteRepository

class NoteModel(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc).replace(tzinfo=None))

class NoteRepository(INoteRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, content: str) -> Note:
        note = NoteModel(content=content)
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