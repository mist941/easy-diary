import { NoteRequest } from '@/types/notes';
import { API_URL } from '@/utils/constants';

const notesService = {
  async getNotes(day: string) {
    const response = await fetch(`${API_URL}/notes?day=${day}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  async createNote(note: NoteRequest) {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  async deleteNote(id: number) {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  async updateNote(id: number, note: NoteRequest) {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};

export default notesService;
