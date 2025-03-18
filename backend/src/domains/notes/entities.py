from datetime import datetime

class Note:
    def __init__(self, id: int, content: str, created_at: datetime):
        self.id = id
        self.content = content
        self.created_at = created_at