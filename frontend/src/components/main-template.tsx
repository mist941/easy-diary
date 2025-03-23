'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';
import { getHumanReadableDate } from '@/utils/time';
interface MainTemplateProps {
  children: React.ReactNode;
}

export default function MainTemplate({ children }: MainTemplateProps) {
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
