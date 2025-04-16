import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { useFormField } from './useFormField';
import * as LabelPrimitive from '@radix-ui/react-label';

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

export { FormLabel };
