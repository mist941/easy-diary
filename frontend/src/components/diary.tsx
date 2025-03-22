'use client';

import {
  getCurrentTimeInMinutes,
  getDateForPreview,
  getDateForRequest,
} from '@/utils/time';
import { ScrollArea } from '@/components/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { ChevronUp } from 'lucide-react';
import React from 'react';
import { NoteForm } from './note-form';
import { Note, NoteRequest } from '@/types/notes';
import notesService from '@/services/notes';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';
import { getNotesForHour } from '@/utils/notes';

interface DiaryHourProps {
  index: number;
  timeString: string;
  isExpanded: boolean;
  notes: Note[];
  onToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  createNote: (values: NoteRequest) => void;
  updateNote: (id: number, values: NoteRequest) => void;
}

function DiaryHour({
  index,
  timeString,
  isExpanded,
  notes = [],
  onToggle,
  createNote,
  updateNote,
}: DiaryHourProps) {
  const [openNoteEditor, setOpenNoteEditor] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

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
  }, [lastNote]);

  const handleChangeNote = (values: NoteRequest) => {
    if (selectedNote) {
      updateNote(selectedNote.id, values);
      setSelectedNote(null);
    } else {
      createNote(values);
    }
    setOpenNoteEditor(false);
  };

  return (
    <Popover open={openNoteEditor} onOpenChange={setOpenNoteEditor}>
      <PopoverTrigger asChild>
        <div
          className={`dotted-pattern w-full p-1.5 hover:bg-muted group flex items-start gap-1.5 transition-all duration-300 ease-in-out
        ${index !== 23 ? 'border-b-1' : ''} 
        ${isExpanded ? 'min-h-50' : 'min-h-15'}`}
        >
          <div className="flex justify-between">
            <p
              className="text-xs text-muted-foreground flex gap-1 items-center cursor-pointer"
              onClick={onToggle}
            >
              {timeString}
              <ChevronUp
                color="gray"
                size={12}
                className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </p>
          </div>
          <div className="w-full h-full pr-5 pl-5">
            {notes.slice(0, 3).map((note) => (
              <p key={note.id} className="text-xs text-foreground italic">
                {getDateForPreview(note.started_at)}
                {': '}
                {note.content}
              </p>
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
        />
      </PopoverContent>
    </Popover>
  );
}

function Diary() {
  const { date } = useCurrentSelectedDateStore();
  const [expandedHours, setExpandedHours] = React.useState<number[]>([]);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const currentTime = getCurrentTimeInMinutes();

  React.useEffect(() => {
    (async () => {
      try {
        const notes = await notesService.getNotes(getDateForRequest(date));
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [date]);

  const toggleHour = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      e.stopPropagation();
      setExpandedHours((prev) =>
        prev.includes(index)
          ? prev.filter((hour) => hour !== index)
          : [...prev, index],
      );
    },
    [],
  );

  const handleCreateNote = React.useCallback(async (values: NoteRequest) => {
    await notesService.createNote(values);
    const notes = await notesService.getNotes(getDateForRequest(date));
    setNotes(notes);
  }, []);

  const handleUpdateNote = React.useCallback(
    (id: number, values: NoteRequest) => {},
    [],
  );

  const calculateCurrentTimeOffset = React.useCallback(() => {
    const baseHeightInPx = 60;
    const expandedHeightInPx = 200;
    const additionalHeight = expandedHeightInPx - baseHeightInPx;

    const currentHour = Math.floor(currentTime / 60);

    let offset = currentTime;

    expandedHours.forEach((expandedHourIndex) => {
      const hour = (expandedHourIndex + 5) % 24;
      if (hour < currentHour || (hour === 23 && currentHour === 0)) {
        offset += additionalHeight;
      }
      if (hour === currentHour) {
        const minutes = currentTime % 60;
        offset += -minutes + minutes * (expandedHeightInPx / baseHeightInPx);
      }
    });
    return offset - 5 * 60;
  }, [currentTime, expandedHours]);

  return (
    <ScrollArea className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between relative cursor-text">
      <div
        className="relative w-full h-0.5 bg-sidebar-primary/50 z-10 transition-[top] duration-300 ease-in-out"
        style={{ top: `${calculateCurrentTimeOffset()}px` }}
      />

      {Array.from({ length: 24 }).map((_, index) => {
        const hour = (index + 5) % 24;
        const timeString = hour.toString().padStart(2, '0') + ':00';

        return (
          <DiaryHour
            key={index}
            index={index}
            timeString={timeString}
            isExpanded={expandedHours.includes(index)}
            notes={getNotesForHour(notes, hour)}
            onToggle={(e: React.MouseEvent<HTMLDivElement>) =>
              toggleHour(e, index)
            }
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
          />
        );
      })}
    </ScrollArea>
  );
}

export { Diary };
