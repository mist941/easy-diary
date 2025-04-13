'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/Breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/layouts/Sidebar';
import { AppSidebar } from '@/components/layouts/AppSidebar';
import { Separator } from '@/components/ui/Separator';
import { ThemeToggle } from '@/components/features/theme/components/ThemeToggle';
import useCurrentSelectedDateStore from '@/store/current-selected-date-store';
import { getHumanReadableDate } from '@/utils/time';
interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  const { date } = useCurrentSelectedDateStore();
  const formattedDate = getHumanReadableDate(date);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{formattedDate}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </header>
        <div className="w-full h-full p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { MainTemplate };
