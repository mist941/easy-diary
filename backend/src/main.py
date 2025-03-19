from fastapi import FastAPI
from src.api.v1 import notes

app = FastAPI()

prefix = "/api/v1"

app.include_router(notes.router, prefix=prefix)