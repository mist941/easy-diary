'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { filterNotesForHour } from '@/features/notes/utils';
import { DiaryHour } from './DiaryHour';
import { useTimelinePosition } from '../hooks/useTimelinePosition';
import { useNotesManagement } from '../hooks/useNotesManagement';

function Diary() {
  const hoursRef = React.useRef<HTMLDivElement>(null);
  const offsetRef = React.useRef<HTMLDivElement>(null);

  const { notes, loading, createNote, updateNote, deleteNote } =
    useNotesManagement();

  useTimelinePosition(hoursRef, offsetRef, loading, notes.length);

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
            notes={filterNotesForHour(notes, hour)}
            createNote={createNote}
            updateNote={updateNote}
            deleteNote={deleteNote}
          />
        );
      })}
    </ScrollArea>
  );
}

export { Diary };
