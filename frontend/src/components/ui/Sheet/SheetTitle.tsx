import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

export { SheetTitle };
