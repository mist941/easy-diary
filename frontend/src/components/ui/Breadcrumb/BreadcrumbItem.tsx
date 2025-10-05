import React, { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

export { BreadcrumbItem };
