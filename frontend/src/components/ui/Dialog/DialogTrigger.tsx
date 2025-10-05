import React, { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

function DialogTrigger({
  ...props
}: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export { DialogTrigger };
