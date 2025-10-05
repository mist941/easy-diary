import React, { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export { BreadcrumbSeparator };
