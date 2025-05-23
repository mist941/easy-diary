import { INote } from '@/features/notes/types';
import { INoteRequest } from '@/features/notes/types';
import axios from '@/api/axios';

const notesServices = {
  async getNotes(day: string): Promise<INote[]> {
    try {
      const response = await axios.get(`/notes?day=${day}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createNote(note: INoteRequest): Promise<INote> {
    try {
      const response = await axios.post('/notes', note);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteNote(id: number): Promise<void> {
    try {
      await axios.delete(`/notes/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async updateNote(id: number, note: INoteRequest): Promise<INote> {
    try {
      const response = await axios.put(`/notes/${id}`, note);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { notesServices };
