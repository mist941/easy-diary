import {
  IDailyReflection,
  IDailyReflectionRequest,
} from '@/features/daily-reflections/types';
import axios from '@/api/axios';

const dailyReflectionServices = {
  async getDailyReflections(
    startDate: string,
    endDate: string,
  ): Promise<IDailyReflection[]> {
    try {
      const response = await axios.get(
        `/daily-reflections?from_date=${startDate}&to_date=${endDate}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createDailyReflection(
    dailyReflection: IDailyReflectionRequest,
  ): Promise<IDailyReflection> {
    try {
      const response = await axios.post('/daily-reflections', dailyReflection);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { dailyReflectionServices };
