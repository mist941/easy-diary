import React, { ComponentProps } from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function Sheet({ ...props }: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

export { Sheet };
