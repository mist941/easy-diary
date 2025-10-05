import React, { useState, useMemo, useCallback, MouseEvent } from 'react';
import { INote, INoteRequest } from '@/features/notes/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { NoteForm } from '@/features/notes/components/NoteForm';
import { SingleNote } from '@/features/notes/components';

interface DiaryHourProps {
  index: number;
  timeString: string;
  notes: INote[];
  createNote: (values: INoteRequest) => void;
  updateNote: (id: number, values: INoteRequest) => void;
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
  const [openNoteEditor, setOpenNoteEditor] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const lastNote = useMemo(() => {
    return notes
      .sort(
        (a, b) =>
          new Date(a.started_at).getTime() - new Date(b.started_at).getTime(),
      )
      .at(-1);
  }, [notes]);

  const lastNoteMinutes = useMemo(() => {
    return lastNote?.started_at
      ? String(new Date(lastNote.started_at).getMinutes() + 1).padStart(2, '0')
      : '00';
  }, [lastNote?.started_at]);

  const handleChangeNote = (values: INoteRequest) => {
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

  const handleOpenEditor = useCallback(
    (e: MouseEvent<SVGSVGElement>, note: INote) => {
      e.stopPropagation();
      setSelectedNote(note);
      setOpenNoteEditor(true);
    },
    [],
  );

  const handleDeleteNote = useCallback(
    (e: MouseEvent<SVGSVGElement>, note: INote) => {
      e.stopPropagation();
      deleteNote(note.id);
    },
    [deleteNote],
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
              <SingleNote
                key={note.id}
                note={note}
                handleOpenEditor={handleOpenEditor}
                handleDeleteNote={handleDeleteNote}
              />
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

export { DiaryHour };
