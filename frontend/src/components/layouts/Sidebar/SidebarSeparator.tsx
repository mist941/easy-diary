import React, { ComponentProps, memo } from 'react';
import { Separator } from '@/components/ui/Separator/Separator';
import { cn } from '@/lib/utils';

const SidebarSeparator = memo(function SidebarSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
});

export { SidebarSeparator };
