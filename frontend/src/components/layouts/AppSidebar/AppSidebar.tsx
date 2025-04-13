import * as React from 'react';
import { DatePicker } from '@/components/layouts/DatePicker';
import { Sidebar } from '@/components/layouts/Sidebar';
import { SidebarHeader } from '@/components/layouts/Sidebar';
import { SidebarContent } from '@/components/layouts/Sidebar';
import { SidebarFooter } from '@/components/layouts/Sidebar';
import { SidebarSeparator } from '@/components/layouts/Sidebar';

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export { AppSidebar };
