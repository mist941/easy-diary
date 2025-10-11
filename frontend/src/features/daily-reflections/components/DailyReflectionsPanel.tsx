'use client';

import { ReflectionsList } from './ReflectionsList';
import { DailyReflectionsFilter } from './DailyReflectionsFilter';
import { useManageReflections } from '../hooks/useManageReflections';

function DailyReflectionsPanel() {
  const {
    reflections,
    filterDate,
    dates,
    setFilterDate,
    updateReflection,
    createReflection,
  } = useManageReflections();

  return (
    <div className="w-full xl:w-1/2 xl:mx-auto h-full">
      <DailyReflectionsFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      <ReflectionsList
        dates={dates}
        reflections={reflections}
        onCreate={createReflection}
        onUpdate={updateReflection}
      />
    </div>
  );
}

export { DailyReflectionsPanel };
