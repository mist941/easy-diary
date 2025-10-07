import {
  DisappointedFace,
  WearyFace,
  UnhappyFace,
  NeutralFace,
  SlightlyFace,
  SmilingFace,
  SquintingFace,
  EmptyFace,
} from '@/components/ui/SVG';
import { Mood } from '../types';
import { memo } from 'react';

interface MoodIconProps {
  mood?: Mood;
}

const MoodIcon = memo(({ mood }: MoodIconProps) => {
  const props = {
    width: 28,
    height: 28,
  };
  switch (mood) {
    case Mood.TERRIBLE:
      return <DisappointedFace {...props} />;
    case Mood.VERY_BAD:
      return <WearyFace {...props} />;
    case Mood.BAD:
      return <UnhappyFace {...props} />;
    case Mood.NEUTRAL:
      return <NeutralFace {...props} />;
    case Mood.GOOD:
      return <SlightlyFace {...props} />;
    case Mood.VERY_GOOD:
      return <SmilingFace {...props} />;
    case Mood.EXCELLENT:
      return <SquintingFace {...props} />;
    default:
      return <EmptyFace {...props} />;
  }
});

MoodIcon.displayName = 'MoodIcon';

export { MoodIcon };
