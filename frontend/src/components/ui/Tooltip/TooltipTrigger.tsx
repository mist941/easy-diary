import React, { ComponentProps } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

function TooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export { TooltipTrigger };
