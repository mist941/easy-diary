export interface Note {
  id: number;
  content: string;
  started_at: Date;
  finished_at: Date | null;
}

export interface NoteRequest {
  content: string;
  started_at: Date;
  finished_at: Date | null;
}
