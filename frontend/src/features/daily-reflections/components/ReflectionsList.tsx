import { IDailyReflection } from '../types/entities';
import { ReflectionItem } from './ReflectionItem';
import moment from 'moment';

interface ReflectionsListProps {
  reflections: IDailyReflection[];
  dates: Date[];
  onReflectionUpdate?: (updatedReflection: IDailyReflection) => void;
}

function ReflectionsList({
  reflections,
  dates,
  onReflectionUpdate,
}: ReflectionsListProps) {
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
                mood: undefined,
                content: '',
                tags: [],
              }}
              onUpdate={onReflectionUpdate}
            />
          );
        }
        return (
          <ReflectionItem
            key={reflection.id}
            reflection={reflection}
            onUpdate={onReflectionUpdate}
          />
        );
      })}
    </div>
  );
}

export { ReflectionsList };
