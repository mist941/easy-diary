'use client';

import { getCurrentTimeInMinutes } from '@/utils/time';
import { ScrollArea } from '@/components/scroll-area';
import { ChevronUp } from 'lucide-react';
import { useCallback, useState } from 'react';

interface DiaryHourProps {
  index: number;
  timeString: string;
  isExpanded: boolean;
  onToggle: () => void;
}

function DiaryHour({
  index,
  timeString,
  isExpanded,
  onToggle,
}: DiaryHourProps) {
  return (
    <div
      className={`dotted-pattern w-full p-1.5 hover:bg-muted group flex items-start gap-1.5 transition-all duration-300 ease-in-out
        ${index !== 23 ? 'border-b-1' : ''} 
        ${isExpanded ? 'min-h-50' : 'min-h-15'}`}
    >
      <div className="flex justify-between">
        <p
          className="text-xs text-muted-foreground flex gap-1 items-center cursor-pointer"
          onClick={onToggle}
        >
          {timeString}
          <ChevronUp
            color="gray"
            size={12}
            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </p>
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
}

function Diary() {
  const [expandedHours, setExpandedHours] = useState<number[]>([]);
  const currentTime = getCurrentTimeInMinutes();

  const toggleHour = (index: number) => {
    setExpandedHours((prev) =>
      prev.includes(index)
        ? prev.filter((hour) => hour !== index)
        : [...prev, index],
    );
  };

  const calculateOffset = useCallback(() => {
    const baseHeightInPx = 60;
    const expandedHeightInPx = 200;
    const additionalHeight = expandedHeightInPx - baseHeightInPx;

    const currentHour = Math.floor(currentTime / 60);

    let offset = currentTime;

    expandedHours.forEach((expandedHourIndex) => {
      const hour = (expandedHourIndex + 5) % 24;
      if (hour < currentHour || (hour === 23 && currentHour === 0)) {
        offset += additionalHeight;
      }
      if (hour === currentHour) {
        const minutes = currentTime % 60;
        offset += -minutes + minutes * (expandedHeightInPx / baseHeightInPx);
      }
    });
    return offset - 5 * 60;
  }, [currentTime, expandedHours]);

  return (
    <ScrollArea className="w-full h-[calc(100vh-6rem)] bg-muted/50 rounded-lg overflow-auto flex flex-col justify-between relative cursor-text">
      <div
        className="relative w-full h-0.5 bg-sidebar-primary/50 z-10 transition-[top] duration-300 ease-in-out"
        style={{ top: `${calculateOffset()}px` }}
      />

      {Array.from({ length: 24 }).map((_, index) => {
        const hour = (index + 5) % 24;
        const timeString = hour.toString().padStart(2, '0') + ':00';

        return (
          <DiaryHour
            key={index}
            index={index}
            timeString={timeString}
            isExpanded={expandedHours.includes(index)}
            onToggle={() => toggleHour(index)}
          />
        );
      })}
    </ScrollArea>
  );
}

export { Diary };
