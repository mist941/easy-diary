import * as React from 'react';
import { Pencil, X } from 'lucide-react';
import { NoteI } from '@/features/notes/types';
import { formatDateForNotePreview } from '../utils';

interface SingleNoteProps {
  note: NoteI;
  handleOpenEditor: (e: React.MouseEvent<SVGSVGElement>, note: NoteI) => void;
  handleDeleteNote: (e: React.MouseEvent<SVGSVGElement>, note: NoteI) => void;
}

function SingleNote({
  note,
  handleOpenEditor,
  handleDeleteNote,
}: SingleNoteProps) {
  return (
    <div className="flex items-center gap-2 group/note">
      <p className="text-xs text-foreground italic">
        {formatDateForNotePreview(note.started_at)}
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
  );
}

export { SingleNote };
