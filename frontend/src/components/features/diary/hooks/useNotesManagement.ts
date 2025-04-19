import React from 'react';
import { NoteRequest } from '@/components/features/notes/api/types';
import notesApi from '@/components/features/notes/api';
import { getDateForRequest } from '@/utils/time';
import { NoteI } from '@/components/features/notes/types';
import { handleError } from '@/utils/errors';

export function useNotesManagement(date: Date) {
  const [notes, setNotes] = React.useState<NoteI[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchNotes = React.useCallback(async () => {
    const fetchedNotes = await notesApi.getNotes(getDateForRequest(date));
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
      await notesApi.createNote(values);
      await fetchNotes();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateNote = React.useCallback(
    async (id: number, values: NoteRequest) => {
      try {
        await notesApi.updateNote(id, values);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );

  const deleteNote = React.useCallback(async (id: number) => {
    try {
      await notesApi.deleteNote(id);
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
