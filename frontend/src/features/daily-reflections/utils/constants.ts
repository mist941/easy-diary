import { Mood } from '../types';

const MOOD_COLORS = {
  [Mood.TERRIBLE]: 'red-500',
  [Mood.VERY_BAD]: 'red-400',
  [Mood.BAD]: 'red-300',
  [Mood.NEUTRAL]: 'gray-400',
  [Mood.GOOD]: 'green-500',
  [Mood.VERY_GOOD]: 'green-400',
  [Mood.EXCELLENT]: 'green-300',
};

export { MOOD_COLORS };
