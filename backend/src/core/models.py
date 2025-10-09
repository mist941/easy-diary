"""
Database models and association tables.
"""

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .database import Base

daily_reflection_tags = Table(
    "daily_reflection_tags",
    Base.metadata,
    Column(
        "daily_reflection_id",
        Integer,
        ForeignKey("daily_reflections.id"),
        primary_key=True,
    ),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
)


class DailyReflectionModel(Base):
    __tablename__ = "daily_reflections"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    mood = Column(String, nullable=False)
    content = Column(String, nullable=False)

    tags = relationship(
        "TagModel", secondary=daily_reflection_tags, back_populates="daily_reflections"
    )


class TagModel(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)

    daily_reflections = relationship(
        "DailyReflectionModel", secondary=daily_reflection_tags, back_populates="tags"
    )
