import { IDailyReflection } from '../types/entities';

interface ReflectionItemProps {
  reflection: IDailyReflection;
}

function ReflectionItem({ reflection }: ReflectionItemProps) {
  return (
    <div>
      <h1>{reflection.date}</h1>
      <p>{reflection.content}</p>
      <p>{reflection.mood}</p>
      <p>{reflection.tags.map((tag) => tag.name).join(', ')}</p>
    </div>
  );
}

export { ReflectionItem };
