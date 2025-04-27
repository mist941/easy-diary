import * as DialogPrimitive from '@radix-ui/react-dialog';

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export { DialogPortal };
