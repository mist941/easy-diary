import { IDailyReflection } from '../types/entities';
import { ReflectionItem } from './ReflectionItem';

interface ReflectionsListProps {
  reflections: IDailyReflection[];
}

function ReflectionsList({ reflections }: ReflectionsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {reflections.map((reflection) => (
        <ReflectionItem key={reflection.id} reflection={reflection} />
      ))}
    </div>
  );
}

export { ReflectionsList };
