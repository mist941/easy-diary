from fastapi import FastAPI
from src.api.v1 import notes

app = FastAPI()

app.include_router(notes.router, prefix="/api/v1/notes")