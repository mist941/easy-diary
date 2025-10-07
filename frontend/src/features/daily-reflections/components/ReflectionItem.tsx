import { IDailyReflection } from '../types/entities';
import { getHumanReadableDate } from '@/utils/time';
import { MoodIcon } from './MoodIcon';

interface ReflectionItemProps {
  reflection: IDailyReflection;
}

function ReflectionItem({ reflection }: ReflectionItemProps) {
  return (
    <div
      className={`bg-sidebar p-3 rounded-md hover:bg-sidebar/80 transition-all cursor-pointer flex flex-col gap-2 ${reflection.id === 0 ? 'opacity-50 hover:bg-sidebar hover:opacity-100 hover:border-none' : ''}`}
    >
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-lg font-bold">
          {getHumanReadableDate(reflection.date)}
        </h1>
      </header>
      <main className="flex gap-2">
        <MoodIcon mood={reflection.mood} />
        <p className="text-sm text-gray-500">{reflection.content}</p>
      </main>
      <footer>
        <p className="text-sm text-gray-500">
          Tags: {reflection.tags.map((tag) => tag.name).join(', ')}
        </p>
      </footer>
    </div>
  );
}

export { ReflectionItem };
