import { generateDatesRange, getDateForRequest } from '@/utils/time';
import { useEffect, useState } from 'react';
import { DateRangeFilter, IDailyReflection } from '../types';
import { dailyReflectionServices } from '@/api';
import moment from 'moment';

function useManageReflections() {
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
    (async () => {
      try {
        const fetchedReflections =
          await dailyReflectionServices.getDailyReflections(
            getDateForRequest(filterDate.startDate),
            getDateForRequest(filterDate.endDate),
          );
        setReflections(fetchedReflections);
      } catch (error) {
        console.error('Failed to fetch reflections:', error);
      }
    })();
  }, [filterDate]);

  const handleReflectionUpdate = (updatedReflection: IDailyReflection) => {
    try {
      setReflections((prev) => {
        const existingIndex = prev.findIndex((r) =>
          moment(r.date).isSame(moment(updatedReflection.date), 'day'),
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = updatedReflection;
          return updated;
        } else {
          return [...prev, updatedReflection];
        }
      });
    } catch (error) {
      console.error('Failed to update reflection:', error);
    }
  };

  return {
    reflections,
    filterDate,
    setFilterDate,
    dates,
    handleReflectionUpdate,
  };
}

export { useManageReflections };
