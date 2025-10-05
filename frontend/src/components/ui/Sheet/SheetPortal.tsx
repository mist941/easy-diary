import React, { ComponentProps } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function SheetPortal({
  ...props
}: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

export { SheetPortal };
