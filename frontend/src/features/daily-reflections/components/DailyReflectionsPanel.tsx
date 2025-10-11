'use client';

import { ReflectionsList } from './ReflectionsList';
import { generateDatesRange, getDateForRequest } from '@/utils/time';
import { dailyReflectionServices } from '@/api';
import { useEffect, useState } from 'react';
import { DateRangeFilter } from '../types';
import { DailyReflectionsFilter } from './DailyReflectionsFilter';
import moment from 'moment';
import { IDailyReflection } from '../types';

function DailyReflectionsPanel() {
  const [reflections, setReflections] = useState<IDailyReflection[]>([]);
  const [filterDate, setFilterDate] = useState<DateRangeFilter>({
    startDate: moment().subtract(7, 'days').toDate(),
    endDate: moment().toDate(),
  });

  const dates = generateDatesRange(
    filterDate.startDate,
    filterDate.endDate,
  ).reverse();

  useEffect(() => {
    const loadReflections = () => {
      dailyReflectionServices
        .getDailyReflections(
          getDateForRequest(filterDate.startDate),
          getDateForRequest(filterDate.endDate),
        )
        .then((reflections) => {
          setReflections(reflections);
        });
    };

    loadReflections();
  }, [filterDate]);

  const handleReflectionUpdate = (updatedReflection: IDailyReflection) => {
    setReflections((prev) => {
      const existingIndex = prev.findIndex((r) =>
        moment(r.date).isSame(moment(updatedReflection.date), 'day'),
      );

      if (existingIndex >= 0) {
        // Update existing reflection
        const updated = [...prev];
        updated[existingIndex] = updatedReflection;
        return updated;
      } else {
        // Add new reflection
        return [...prev, updatedReflection];
      }
    });
  };

  return (
    <div className="w-full xl:w-1/2 xl:mx-auto h-full">
      <DailyReflectionsFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      <ReflectionsList
        dates={dates}
        reflections={reflections}
        onReflectionUpdate={handleReflectionUpdate}
      />
    </div>
  );
}

export { DailyReflectionsPanel };
