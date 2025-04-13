import * as React from 'react';
import { cn } from '@/lib/utils';

const SidebarGroupContent = React.memo(function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
});

export { SidebarGroupContent };
