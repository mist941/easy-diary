import * as React from 'react';
import { NoteI } from '@/components/features/notes/types';
import { NoteRequest } from '@/components/features/notes/api/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { getDateForPreview } from '@/components/features/diary/utils';
import { Pencil, X } from 'lucide-react';
import { NoteForm } from '@/components/features/notes/components/NoteForm';

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
    return notes
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

export { DiaryHour };
