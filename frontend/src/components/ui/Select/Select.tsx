import React, { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

function Select({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export { Select };
