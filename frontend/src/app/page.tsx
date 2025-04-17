import { Diary } from '@/components/features/diary/components';
import notesService from '@/components/features/notes/api';

export default async function Home() {
  const notes = await notesService.getNotes('2025-04-17');
  console.log(notes);
  return <Diary />;
}
