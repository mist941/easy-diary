'use client';

import {
  getCurrentTimeInMinutes,
  getDateForPreview,
  getDateForRequest,
} from '@/utils/time';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Pencil, X } from 'lucide-react';
import React from 'react';
import { NoteForm } from '../../notes/components/NoteForm';
import { NoteRequest } from '@/components/features/notes/api/types';
import { NoteI } from '@/components/features/notes/types';
import notesApi from '@/components/features/notes/api';
import useCurrentSelectedDateStore from '@/store/current-selected-date-store';
import { getNotesForHour } from '@/components/features/notes/utils';

interface DiaryHourProps {
  index: number;
  timeString: string;
  notes: NoteI[];
  createNote: (values: NoteRequest) => void;
  updateNote: (id: number, values: NoteRequest) => void;
  deleteNote: (id: number) => void;
}

function DiaryHour({
  index,
  timeString,
  notes = [],
  createNote,
  updateNote,
  deleteNote,
}: DiaryHourProps) {
  const [openNoteEditor, setOpenNoteEditor] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<NoteI | null>(null);

  const lastNote = React.useMemo(() => {
    return [...notes]
      .sort(
        (a, b) =>
          new Date(a.started_at).getTime() - new Date(b.started_at).getTime(),
      )
      .at(-1);
  }, [notes]);

  const lastNoteMinutes = React.useMemo(() => {
    return lastNote?.started_at
      ? String(new Date(lastNote.started_at).getMinutes() + 1).padStart(2, '0')
      : '00';
  }, [lastNote?.started_at]);

  const handleChangeNote = (values: NoteRequest) => {
    if (selectedNote) {
      updateNote(selectedNote.id, values);
      setSelectedNote(null);
    } else {
      createNote(values);
    }
    setOpenNoteEditor(false);
  };

  const toggleNoteEditor = (open: boolean) => {
    setOpenNoteEditor(open);
    setSelectedNote(null);
  };

  const handleOpenEditor = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>, note: NoteI) => {
      e.stopPropagation();
      setSelectedNote(note);
      setOpenNoteEditor(true);
    },
    [],
  );

  const handleDeleteNote = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement>, note: NoteI) => {
      e.stopPropagation();
      deleteNote(note.id);
    },
    [],
  );

  return (
    <Popover open={openNoteEditor} onOpenChange={toggleNoteEditor}>
      <PopoverTrigger asChild>
        <div
          className={`hour-item dotted-pattern w-full p-1.5 hover:bg-muted group flex items-start gap-1.5 transition-all duration-300 ease-in-out min-h-14
          ${index !== 23 ? 'border-b-1' : ''} 
        `}
        >
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground flex gap-1 items-center cursor-pointer">
              {timeString}
            </p>
          </div>
          <div className="w-full h-full pr-5 pl-5">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center gap-2 group/note">
                <p className="text-xs text-foreground italic">
                  {getDateForPreview(note.started_at)}
                  {': '}
                  {note.content}
                </p>
                <Pencil
                  className="w-3 h-3 text-muted-foreground cursor-pointer opacity-0 group-hover/note:opacity-100 transition-opacity"
                  color="gray"
                  onClick={(e) => handleOpenEditor(e, note)}
                />
                <X
                  className="w-3 h-3 text-muted-foreground cursor-pointer opacity-0 group-hover/note:opacity-100 transition-opacity"
                  color="red"
                  onClick={(e) => handleDeleteNote(e, note)}
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-4 flex gap-4 left-100px top-25px"
        align="start"
        side="top"
        sideOffset={-80}
        alignOffset={60}
      >
        <NoteForm
          onSubmit={handleChangeNote}
          startMinutes={lastNoteMinutes}
          startHours={timeString.split(':')[0]}
          defaultValues={selectedNote}
        />
      </PopoverContent>
    </Popover>
  );
}

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
