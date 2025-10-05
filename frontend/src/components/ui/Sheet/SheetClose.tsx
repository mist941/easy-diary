import React, { ComponentProps } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function SheetClose({ ...props }: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

export { SheetClose };
