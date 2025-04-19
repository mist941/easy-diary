import React from 'react';
import { NoteRequest } from '@/api/notes/types';
import { notesServices } from '@/api/notes';
import { getDateForRequest } from '@/utils/time';
import { NoteI } from '@/features/notes/types';
import { handleError } from '@/utils/errors';

export function useNotesManagement(date: Date) {
  const [notes, setNotes] = React.useState<NoteI[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchNotes = React.useCallback(async () => {
    const fetchedNotes = await notesServices.getNotes(getDateForRequest(date));
    setNotes(fetchedNotes);
  }, [date]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [date]);

  const createNote = React.useCallback(async (values: NoteRequest) => {
    try {
      await notesServices.createNote(values);
      await fetchNotes();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateNote = React.useCallback(
    async (id: number, values: NoteRequest) => {
      try {
        await notesServices.updateNote(id, values);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );

  const deleteNote = React.useCallback(async (id: number) => {
    try {
      await notesServices.deleteNote(id);
      await fetchNotes();
    } catch (error) {
      handleError(error);
    }
  }, []);

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    fetchNotes,
  };
}
