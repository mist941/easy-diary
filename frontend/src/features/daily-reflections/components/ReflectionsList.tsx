import { IDailyReflection, IDailyReflectionRequest } from '../types';
import { ReflectionItem } from './ReflectionItem';
import moment from 'moment';

interface ReflectionsListProps {
  reflections: IDailyReflection[];
  dates: Date[];
  onCreate?: (createdReflection: IDailyReflectionRequest) => void;
  onUpdate?: (id: number, updatedReflection: IDailyReflectionRequest) => void;
}

function ReflectionsList({
  reflections,
  dates,
  onCreate,
  onUpdate,
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
              onUpdate={onUpdate}
              onCreate={onCreate}
            />
          );
        }
        return (
          <ReflectionItem
            key={reflection.id}
            reflection={reflection}
            onUpdate={onUpdate}
            onCreate={onCreate}
          />
        );
      })}
    </div>
  );
}

export { ReflectionsList };
