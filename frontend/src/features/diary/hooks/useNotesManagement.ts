import React from 'react';
import { INoteRequest, INote } from '@/features/notes/types';
import { notesServices } from '@/api';
import { getDateForRequest } from '@/utils/time';
import { handleError } from '@/utils/errors';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';

export function useNotesManagement() {
  const { date } = useCurrentSelectedDateStore();
  const [notes, setNotes] = React.useState<INote[]>([]);
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

  const createNote = React.useCallback(
    async (values: INoteRequest) => {
      try {
        await notesServices.createNote(values);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      }
    },
    [date],
  );

  const updateNote = React.useCallback(
    async (id: number, values: INoteRequest) => {
      try {
        await notesServices.updateNote(id, values);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      }
    },
    [date],
  );

  const deleteNote = React.useCallback(
    async (id: number) => {
      try {
        await notesServices.deleteNote(id);
        await fetchNotes();
      } catch (error) {
        handleError(error);
      }
    },
    [date],
  );

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    fetchNotes,
  };
}
