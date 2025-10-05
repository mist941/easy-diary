import React, { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

function SelectGroup({
  ...props
}: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export { SelectGroup };
