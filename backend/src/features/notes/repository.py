from .dto import NoteCreate, NoteUpdate
from src.core.database import Base, AsyncSession
from sqlalchemy import Column, Integer, String, DateTime, select
from datetime import datetime, timezone, timedelta
from .entities import Note
from .interfaces import INoteRepository
from fastapi import HTTPException


class NoteModel(Base):
    __tablename__ = "notes"
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    started_at = Column(
        DateTime, default=datetime.now(timezone.utc).replace(tzinfo=None)
    )
    finished_at = Column(DateTime, nullable=True, default=None)


class NoteRepository(INoteRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, note_data: NoteCreate) -> Note:
        note = NoteModel(
            content=note_data.content,
            started_at=note_data.started_at,
            finished_at=note_data.finished_at,
        )
        try:
            self.db.add(note)
            await self.db.commit()
            await self.db.refresh(note)
            return Note(
                id=note.id,
                content=note.content,
                started_at=note.started_at,
                finished_at=note.finished_at,
            )
        except Exception as e:
            await self.db.rollback()
            raise e

    async def update(self, note_id: int, note_data: NoteUpdate) -> Note:
        try:
            note = await self.db.execute(
                select(NoteModel).where(NoteModel.id == note_id)
            )
            note = note.scalar_one_or_none()
            if note is None:
                raise HTTPException(status_code=404, detail="Note not found")

            note.content = note_data.content
            note.started_at = note_data.started_at
            note.finished_at = note_data.finished_at

            await self.db.commit()
            await self.db.refresh(note)

            return Note(
                id=note.id,
                content=note.content,
                started_at=note.started_at,
                finished_at=note.finished_at,
            )
        except Exception as e:
            await self.db.rollback()
            raise e

    async def list_all(self, day: datetime = None):
        try:
            query = select(NoteModel).order_by(NoteModel.started_at)

            if day:
                day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
                next_day = day_start + timedelta(days=1)

                query = query.where(
                    (NoteModel.started_at >= day_start)
                    & (NoteModel.started_at < next_day)
                )

            result = await self.db.execute(query)
            notes = result.scalars().all()
            return [
                Note(
                    id=n.id,
                    content=n.content,
                    started_at=n.started_at,
                    finished_at=n.finished_at,
                )
                for n in notes
            ]
        except Exception as e:
            await self.db.rollback()
            raise e
