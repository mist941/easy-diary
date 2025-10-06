import React, { ComponentProps, memo } from 'react';
import { cn } from '@/lib/utils';

const SidebarGroup = memo(({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
});

SidebarGroup.displayName = 'SidebarGroup';

export { SidebarGroup };
