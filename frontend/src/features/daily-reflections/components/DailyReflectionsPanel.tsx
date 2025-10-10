'use client';

import { ReflectionsList } from './ReflectionsList';
import { Mood } from '../types/enums';
import { generateDatesRangeFromToday, getDateForRequest } from '@/utils/time';
import { dailyReflectionServices } from '@/api';
import { useEffect, useState } from 'react';
import { DateRangeFilter } from '../types';
import { DailyReflectionsFilter } from './DailyReflectionsFilter';

function DailyReflectionsPanel() {
  const dates = generateDatesRangeFromToday(7);

  const [filterDate, setFilterDate] = useState<DateRangeFilter>({
    startDate: dates[0],
    endDate: dates[dates.length - 1],
  });

  useEffect(() => {
    dailyReflectionServices
      .getDailyReflections(
        filterDate.startDate
          ? getDateForRequest(filterDate.startDate)
          : undefined,
        filterDate.endDate ? getDateForRequest(filterDate.endDate) : undefined,
      )
      .then((reflections) => {
        console.log(reflections);
      });
  }, []);

  return (
    <div className="w-full xl:w-1/2 xl:mx-auto h-full">
      <DailyReflectionsFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      <ReflectionsList
        dates={dates}
        reflections={[
          {
            id: 1,
            date: new Date('2025-10-07'),
            mood: Mood.GOOD,
            content: 'I had a great day!',
            tags: [{ id: 1, name: 'happy', color: 'red' }],
          },
          {
            id: 2,
            date: new Date('2025-10-06'),
            mood: Mood.BAD,
            content: 'I had a bad day!',
            tags: [{ id: 2, name: 'sad', color: 'blue' }],
          },
          {
            id: 3,
            date: new Date('2025-10-05'),
            mood: Mood.NEUTRAL,
            content: 'I had a neutral day!',
            tags: [{ id: 3, name: 'neutral', color: 'gray' }],
          },
          {
            id: 4,
            date: new Date('2025-10-04'),
            mood: Mood.TERRIBLE,
            content: 'I had a terrible day!',
            tags: [{ id: 4, name: 'terrible', color: 'black' }],
          },
          {
            id: 5,
            date: new Date('2025-10-03'),
            mood: Mood.VERY_BAD,
            content: 'I had a very bad day!',
            tags: [{ id: 5, name: 'very_bad', color: 'red' }],
          },
          {
            id: 6,
            date: new Date('2025-10-02'),
            mood: Mood.VERY_GOOD,
            content: 'I had a very good day!',
            tags: [{ id: 6, name: 'very_good', color: 'green' }],
          },
          {
            id: 7,
            date: new Date('2025-10-01'),
            mood: Mood.EXCELLENT,
            content: 'I had an excellent day!',
            tags: [{ id: 7, name: 'excellent', color: 'purple' }],
          },
        ]}
      />
    </div>
  );
}

export { DailyReflectionsPanel };
