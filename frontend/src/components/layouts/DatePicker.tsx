'use client';

import { Calendar } from '@/components/layouts/Calendar';
import {
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/layouts/Sidebar';
import useCurrentSelectedDateStore from '@/store/current-selected-date-store';

export function DatePicker() {
  const { setDate, date } = useCurrentSelectedDateStore();

  const changeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          onDayClick={changeDate}
          selected={date}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
