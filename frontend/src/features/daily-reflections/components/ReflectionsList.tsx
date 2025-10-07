import { IDailyReflection } from '../types/entities';
import { Mood } from '../types/enums';
import { ReflectionItem } from './ReflectionItem';
import moment from 'moment';

interface ReflectionsListProps {
  reflections: IDailyReflection[];
  dates: Date[];
}

function ReflectionsList({ reflections, dates }: ReflectionsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {dates.map((date) => {
        const reflection = reflections.find((reflection) =>
          moment(reflection.date).isSame(moment(date), 'day'),
        );

        if (!reflection) {
          return (
            <ReflectionItem
              key={date.toISOString()}
              reflection={{
                id: 0,
                date,
                mood: Mood.NEUTRAL,
                content: '',
                tags: [],
              }}
            />
          );
        }
        return <ReflectionItem key={reflection.id} reflection={reflection} />;
      })}
    </div>
  );
}

export { ReflectionsList };
