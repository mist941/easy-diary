import React, { ComponentProps } from 'react';
import { DatePicker } from '@/components/layouts/DatePicker';
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from '@/components/layouts/Sidebar';
import { Tags, Bubbles, BarChart, Settings, NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleRedirect('/')}>
                <NotebookPen className="size-4" /> Diary
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleRedirect('/daily-reflections')}
              >
                <Bubbles className="size-4" /> Daily Reflections
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleRedirect('/tags')}>
                <Tags className="size-4" /> Tags
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleRedirect('/statistics')}>
                <BarChart className="size-4" /> Statistics
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleRedirect('/settings')}>
                <Settings className="size-4" /> Settings
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
