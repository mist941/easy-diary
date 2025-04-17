'use client';

import { getCurrentTimeInMinutes, getDateForRequest } from '@/utils/time';
import { ScrollArea } from '@/components/ui/ScrollArea';
import React from 'react';
import { NoteRequest } from '@/components/features/notes/api/types';
import { NoteI } from '@/components/features/notes/types';
import notesApi from '@/components/features/notes/api';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';
import { getNotesForHour } from '@/components/features/notes/utils';
import { DiaryHour } from './DiaryHour';
function Diary() {
  const { date } = useCurrentSelectedDateStore();
  const [notes, setNotes] = React.useState<NoteI[]>([]);
  const [loading, setLoading] = React.useState(false);
  const hoursRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef<HTMLDivElement>(null);
  const currentTime = getCurrentTimeInMinutes();

  React.useEffect(() => {
    (async () => {
      try {
        const notes = await notesApi.getNotes(getDateForRequest(date));
        setNotes(notes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [date]);

  React.useEffect(() => {
    if (hoursRef.current) {
      const hourItems = hoursRef.current.querySelectorAll('.hour-item');
      const currentHourIndex = Math.floor((currentTime - 5 * 60) / 60);
      if (currentHourIndex < 0 || currentHourIndex >= hourItems.length) return;
      const currentHourItem = hourItems[currentHourIndex];
      if (!currentHourItem) return;
      const currentHourItemHeight =
        currentHourItem.getBoundingClientRect().height;
      let height = 0;
      height = Array.from(hourItems)
        .slice(0, currentHourIndex)
        .reduce((acc, item) => acc + item.getBoundingClientRect().height, 0);
      height += (currentHourItemHeight / 60) * (currentTime % 60);
      if (offsetRef.current) {
        offsetRef.current.style.top = `${height}px`;
      }
    }
  }, [currentTime, notes.length, loading]);

  const handleCreateNote = React.useCallback(
    async (values: NoteRequest) => {
      await notesApi.createNote(values);
      const notes = await notesApi.getNotes(getDateForRequest(date));
      setNotes(notes);
    },
    [date],
  );

  const handleUpdateNote = React.useCallback(
    async (id: number, values: NoteRequest) => {
      await notesApi.updateNote(id, values);
      const notes = await notesApi.getNotes(getDateForRequest(date));
      setNotes(notes);
    },
    [date],
  );

  const handleDeleteNote = React.useCallback(
    async (id: number) => {
      await notesApi.deleteNote(id);
      const notes = await notesApi.getNotes(getDateForRequest(date));
      setNotes(notes);
    },
    [date],
  );

  return (
    <ScrollArea
      ref={hoursRef}
      className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between relative cursor-text"
    >
      <div
        className="relative w-full h-0.5 bg-sidebar-primary/50 z-10 transition-[top] duration-300 ease-in-out"
        ref={offsetRef}
      />

      {Array.from({ length: 24 }).map((_, index) => {
        const hour = (index + 5) % 24;
        const timeString = hour.toString().padStart(2, '0') + ':00';

        return (
          <DiaryHour
            key={index}
            index={index}
            timeString={timeString}
            notes={getNotesForHour(notes, hour)}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            deleteNote={handleDeleteNote}
          />
        );
      })}
    </ScrollArea>
  );
}

export { Diary };
