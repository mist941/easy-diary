import { ReflectionsList } from './ReflectionsList';
import { Mood } from '../types/enums';

function DailyReflectionsPanel() {
  return (
    <div className="w-full xl:w-1/2 xl:mx-auto h-full">
      <ReflectionsList
        reflections={[
          {
            id: 1,
            date: '2025-01-01',
            mood: Mood.GOOD,
            content: 'I had a great day!',
            tags: [{ id: 1, name: 'happy', color: 'red' }],
          },
          {
            id: 2,
            date: '2025-01-02',
            mood: Mood.BAD,
            content: 'I had a bad day!',
            tags: [{ id: 2, name: 'sad', color: 'blue' }],
          },
          {
            id: 3,
            date: '2025-01-03',
            mood: Mood.NEUTRAL,
            content: 'I had a neutral day!',
            tags: [{ id: 3, name: 'neutral', color: 'gray' }],
          },
          {
            id: 4,
            date: '2025-01-04',
            mood: Mood.TERRIBLE,
            content: 'I had a terrible day!',
            tags: [{ id: 4, name: 'terrible', color: 'black' }],
          },
          {
            id: 5,
            date: '2025-01-05',
            mood: Mood.VERY_BAD,
            content: 'I had a very bad day!',
            tags: [{ id: 5, name: 'very_bad', color: 'red' }],
          },
        ]}
      />
    </div>
  );
}

export { DailyReflectionsPanel };
