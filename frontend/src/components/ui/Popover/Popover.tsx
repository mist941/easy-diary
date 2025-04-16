import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export { Popover };
