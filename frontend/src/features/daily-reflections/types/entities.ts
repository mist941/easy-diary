import { Mood } from './enums';
import { ITag } from '@/features/tags/types';

export interface IDailyReflection {
  id: number;
  date: string;
  mood: Mood;
  content: string;
  tags: ITag[];
}
