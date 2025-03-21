'use client';

import { Calendar } from '@/components/calendar';
import { SidebarGroup, SidebarGroupContent } from '@/components/sidebar';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';

export function DatePicker() {
  const { setDate } = useCurrentSelectedDateStore();

  const changeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          onDayClick={changeDate}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
