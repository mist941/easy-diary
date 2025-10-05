import React, { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
