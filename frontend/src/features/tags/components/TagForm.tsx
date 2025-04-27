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
} from '@/components/ui/Dialog';
import { DialogContent } from '@/components/ui/Dialog';
import { FormMessage } from '@/components/ui/Form';
import { FormControl } from '@/components/ui/Form';
import { FormField } from '@/components/ui/Form';
import { FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

function TagForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
                      className="resize-none w-full h-full"
                      placeholder="Tag name"
                      {...form.register('name')}
                    />
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
