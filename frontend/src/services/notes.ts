import { NoteRequest } from '@/types/notes';
import { API_URL } from '@/utils/constants';

const notesService = {
  async getNotes() {
    const response = await fetch(`${API_URL}/notes`);
    return response.json();
  },
  async createNote(note: NoteRequest) {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
    });
    return response.json();
  },
};

export default notesService;
