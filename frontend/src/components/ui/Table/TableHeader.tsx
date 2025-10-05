import React, { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

export { TableHeader };
