import React, { ComponentProps, memo, MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PanelLeftIcon } from 'lucide-react';
import { useSidebar } from './useSidebar';

const SidebarTrigger = memo(
  ({ className, onClick, ...props }: ComponentProps<typeof Button>) => {
    const { toggleSidebar } = useSidebar();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      toggleSidebar();
    };

    return (
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        className={cn('size-7', className)}
        onClick={handleClick}
        {...props}
      >
        <PanelLeftIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);

SidebarTrigger.displayName = 'SidebarTrigger';

export { SidebarTrigger };
