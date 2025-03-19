from datetime import datetime

class Note:
    def __init__(self, id: int, content: str, started_at: datetime, finished_at: datetime):
        self.id = id
        self.content = content
        self.started_at = started_at
        self.finished_at = finished_at