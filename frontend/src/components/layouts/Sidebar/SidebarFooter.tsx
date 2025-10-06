import React, { ComponentProps, memo } from 'react';
import { cn } from '@/lib/utils';

const SidebarFooter = memo(({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
});

SidebarFooter.displayName = 'SidebarFooter';

export { SidebarFooter };
