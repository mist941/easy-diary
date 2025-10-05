import React, { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

export { SheetHeader };
