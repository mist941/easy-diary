import axios from '@/api/axios';
import { ITag, ITagRequest } from '@/features/tags/types';

const tagsServices = {
  async getTags(): Promise<ITag[]> {
    try {
      const response = await axios.get(`/tags`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createTag(tag: ITagRequest): Promise<ITag> {
    try {
      const response = await axios.post('/tags', tag);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTag(id: number): Promise<void> {
    try {
      await axios.delete(`/tags/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async updateTag(id: number, tag: ITagRequest): Promise<ITag> {
    try {
      const response = await axios.put(`/tags/${id}`, tag);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { tagsServices };
