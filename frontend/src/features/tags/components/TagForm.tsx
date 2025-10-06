'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import {
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from '@/components/ui/Dialog';
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  ColorPicker,
  ColorPickerSelection,
  ColorPickerHue,
  ColorPickerFormat,
} from '@/components/ui/ColorPicker';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  color: z.string(),
});

function TagForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: '#000000',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Tag</DialogTitle>
            <DialogDescription>
              Add a new tag. You can use it later in your notes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="resize-none w-full"
                      placeholder="Tag name"
                      {...form.register('name')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={() => (
                <FormItem className="flex-1">
                  <FormControl>
                    <ColorPicker
                      className="max-w-sm rounded-md border bg-background p-4 shadow-sm h-90"
                      value={form.watch('color')}
                      onChange={(value) => {
                        console.log(value);
                      }}
                    >
                      <ColorPickerSelection />
                      <div className="flex items-center gap-4">
                        <div className="grid w-full gap-1">
                          <ColorPickerHue />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ColorPickerFormat />
                      </div>
                    </ColorPicker>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContent>
  );
}

export { TagForm };
