import { Note } from '@/types/notes';

export function getNotesForHour(notes: Note[], hour: number) {
  return notes.filter((note) => {
    if (note.finished_at) return false;
    return new Date(note.started_at).getHours() === hour;
  });
}
