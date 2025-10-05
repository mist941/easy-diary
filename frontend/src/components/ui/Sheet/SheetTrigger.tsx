import React, { ComponentProps } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function SheetTrigger({
  ...props
}: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

export { SheetTrigger };
