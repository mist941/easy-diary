export interface NoteRequest {
  content: string;
  started_at: string;
  finished_at: string | null;
}
