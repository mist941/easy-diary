import React, { ComponentProps, memo } from 'react';
import { cn } from '@/lib/utils';

const SidebarContent = memo(function SidebarContent({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
});

export { SidebarContent };
