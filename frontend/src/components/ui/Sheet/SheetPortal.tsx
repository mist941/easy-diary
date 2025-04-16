import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

export { SheetPortal };
