import React, { ComponentProps, memo } from 'react';
import { cn } from '@/lib/utils';

const SidebarGroupContent = memo(
  ({ className, ...props }: ComponentProps<'div'>) => {
    return (
      <div
        data-slot="sidebar-group-content"
        data-sidebar="group-content"
        className={cn('w-full text-sm', className)}
        {...props}
      />
    );
  },
);

SidebarGroupContent.displayName = 'SidebarGroupContent';

export { SidebarGroupContent };
