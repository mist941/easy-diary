import { handleError } from '@/utils/errors';
import { NoteI } from '../types';
import { NoteRequest } from './types';
import axios from '@/api/axios';

const notesService = {
  async getNotes(day: string): Promise<NoteI[]> {
    try {
      const response = await axios.get(`/notes?day=${day}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async createNote(note: NoteRequest): Promise<NoteI> {
    try {
      const response = await axios.post('/notes', note);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteNote(id: number): Promise<void> {
    try {
      await axios.delete(`/notes/${id}`);
    } catch (error) {
      return handleError(error);
    }
  },

  async updateNote(id: number, note: NoteRequest): Promise<NoteI> {
    try {
      const response = await axios.put(`/notes/${id}`, note);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export default notesService;
