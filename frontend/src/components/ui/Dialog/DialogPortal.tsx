import React, { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

function DialogPortal({
  ...props
}: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export { DialogPortal };
