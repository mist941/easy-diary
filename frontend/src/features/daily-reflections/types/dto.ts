import { Mood } from './enums';

export interface IDailyReflectionRequest {
  date: string;
  mood: Mood;
  content: string;
  tag_ids: number[];
}
