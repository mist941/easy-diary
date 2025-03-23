from datetime import datetime

from fastapi import APIRouter, Depends, Query

from src.features.notes.dto import NoteCreate, NoteUpdate
from src.features.notes.services import NoteService, get_note_service

router = APIRouter()


@router.get("/notes")
async def get_notes(
    day: datetime = Query(None), note_service: NoteService = Depends(get_note_service)
):
    notes = await note_service.get_notes(day)
    return notes


@router.post("/notes")
async def create_note(
    note_data: NoteCreate, note_service: NoteService = Depends(get_note_service)
):
    note = await note_service.create_note(note_data)
    return note


@router.delete("/notes/{note_id}")
async def delete_note(
    note_id: int, note_service: NoteService = Depends(get_note_service)
):
    await note_service.delete_note(note_id)


@router.put("/notes/{note_id}")
async def update_note(
    note_id: int,
    note_data: NoteUpdate,
    note_service: NoteService = Depends(get_note_service),
):
    print(note_data)
    await note_service.update_note(note_id, note_data)
