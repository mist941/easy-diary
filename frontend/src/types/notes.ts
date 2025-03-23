export interface Note {
  id: number;
  content: string;
  started_at: string;
  finished_at: string | null;
}

export interface NoteRequest {
  content: string;
  started_at: string;
  finished_at: string | null;
}
