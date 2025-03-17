'use client';

import { getCurrentTimeInMinutes } from '@/utils/time';
import { ScrollArea } from '@/components/scroll-area';

interface DiaryHourProps {
  index: number;
  timeString: string;
}

function DiaryHour({ index, timeString }: DiaryHourProps) {
  return (
    <div
      className={`dotted-pattern min-h-15 w-full p-1.5 hover:bg-muted group flex gap-1.5 ${
        index !== 23 ? 'border-b-1' : ''
      }`}
    >
      <div className="flex flex-col justify-between">
        <p className="text-xs text-muted-foreground">{timeString}</p>
      </div>
      <div className="w-full"></div>
    </div>
  );
}

function Diary() {
  const currentTime = getCurrentTimeInMinutes();

  return (
    <ScrollArea className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between relative cursor-text">
      <div
        className="relative w-full h-0.5 bg-sidebar-primary/50 z-10"
        style={{ top: `${currentTime}px` }}
      />

      {Array.from({ length: 24 }).map((_, index) => {
        const hour = (index + 5) % 24;
        const timeString = hour.toString().padStart(2, '0') + ':00';

        return <DiaryHour key={index} index={index} timeString={timeString} />;
      })}
    </ScrollArea>
  );
}

export { Diary };
