import * as React from 'react';
import { DatePicker } from '@/components/layouts/DatePicker';
import { Sidebar, SidebarGroup } from '@/components/layouts/Sidebar';
import { SidebarHeader } from '@/components/layouts/Sidebar';
import { SidebarContent } from '@/components/layouts/Sidebar';
import { SidebarFooter } from '@/components/layouts/Sidebar';
import { SidebarSeparator } from '@/components/layouts/Sidebar';
import { SidebarMenuButton } from '@/components/layouts/Sidebar';
import { SidebarMenuItem } from '@/components/layouts/Sidebar';
import { SidebarMenu } from '@/components/layouts/Sidebar';
import { Tags } from 'lucide-react';

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Tags className="size-4" /> Tags
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export { AppSidebar };
