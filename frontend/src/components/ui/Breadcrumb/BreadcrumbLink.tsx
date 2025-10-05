import React, { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
}

export { BreadcrumbLink };
