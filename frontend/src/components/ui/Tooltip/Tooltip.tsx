import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipProvider } from './TooltipProvider';

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

export { Tooltip };
