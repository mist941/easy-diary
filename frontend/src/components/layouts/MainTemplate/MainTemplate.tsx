'use client';

import React, { ReactNode } from 'react';
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
import { Separator } from '@/components/ui/Separator/Separator';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import useCurrentSelectedDateStore from '@/store/currentSelectedDateStore';
import { getHumanReadableDate } from '@/utils/time';
import { usePathname } from 'next/navigation';

interface MainTemplateProps {
  children: ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  const { date } = useCurrentSelectedDateStore();
  const formattedDate = getHumanReadableDate(date);
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    if (pathname === '/') {
      return <BreadcrumbPage>{formattedDate}</BreadcrumbPage>;
    }

    return pathname.replace('/', '');
  };

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
                  <BreadcrumbPage className="first-letter:uppercase">
                    {getBreadcrumbs()}
                  </BreadcrumbPage>
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
