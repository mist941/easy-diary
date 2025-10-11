import { Mood } from '../types';

const getMoodDisplayName = (mood?: Mood) => {
  switch (mood) {
    case Mood.TERRIBLE:
      return 'Terrible';
    case Mood.VERY_BAD:
      return 'Very Bad';
    case Mood.BAD:
      return 'Bad';
    case Mood.NEUTRAL:
      return 'Neutral';
    case Mood.GOOD:
      return 'Good';
    case Mood.VERY_GOOD:
      return 'Very Good';
    case Mood.EXCELLENT:
      return 'Excellent';
    default:
      return 'Select mood';
  }
};

export { getMoodDisplayName };
