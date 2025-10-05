import React, { ComponentProps } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

function PopoverAnchor({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { PopoverAnchor };
