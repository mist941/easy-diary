import { INote } from '@/features/notes/types';

/**
 * Filters notes for a specific hour of the day
 * @param notes - Array of notes to filter
 * @param hour - Hour of the day (0-23) to filter by
 * @returns Filtered array of notes that were created during the specified hour
 */
function filterNotesForHour(notes: INote[], hour: number) {
  return notes.filter((note) => {
    if (note.finished_at) return false;
    return new Date(note.started_at).getHours() === hour;
  });
}

export { filterNotesForHour };
