from pydantic import BaseModel


class TagCreate(BaseModel):
    name: str
    color: str


class TagUpdate(BaseModel):
    name: str
    color: str
