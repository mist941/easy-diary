import React, { ComponentProps } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

function Popover({ ...props }: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export { Popover };
