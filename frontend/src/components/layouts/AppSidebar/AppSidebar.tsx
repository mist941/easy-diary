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
import { Tags, BarChart, Settings, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <Home className="size-4" /> Home
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
