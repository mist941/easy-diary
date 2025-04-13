import { NoteI } from '@/components/features/notes/types';

export function getNotesForHour(notes: NoteI[], hour: number) {
  return notes.filter((note) => {
    if (note.finished_at) return false;
    return new Date(note.started_at).getHours() === hour;
  });
}
