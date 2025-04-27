import * as DialogPrimitive from '@radix-ui/react-dialog';

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export { DialogClose };
