import { getCurrentTimeInMinutes } from '@/utils/time';
import * as React from 'react';

function useTimelinePosition(
  hoursRef: React.RefObject<HTMLDivElement | null>,
  offsetRef: React.RefObject<HTMLDivElement | null>,
  loading: boolean,
  totalNotes: number,
) {
  const currentTime = getCurrentTimeInMinutes();

  React.useEffect(() => {
    if (hoursRef.current) {
      const hourItems = hoursRef.current.querySelectorAll('.hour-item');
      const currentHourIndex = Math.floor((currentTime - 5 * 60) / 60);
      if (currentHourIndex < 0 || currentHourIndex >= hourItems.length) return;
      const currentHourItem = hourItems[currentHourIndex];
      if (!currentHourItem) return;
      const currentHourItemHeight =
        currentHourItem.getBoundingClientRect().height;
      let height = 0;
      height = Array.from(hourItems)
        .slice(0, currentHourIndex)
        .reduce((acc, item) => acc + item.getBoundingClientRect().height, 0);
      height += (currentHourItemHeight / 60) * (currentTime % 60);
      if (offsetRef.current) {
        offsetRef.current.style.top = `${height}px`;
      }
    }
  }, [currentTime, totalNotes, loading]);
}

export { useTimelinePosition };
