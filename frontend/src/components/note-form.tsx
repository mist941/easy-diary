import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { z } from 'zod';
import { Textarea } from './textarea';
import { TimePicker } from './time-picker';
import { Button } from './button';
import { NoteRequest, Note } from '@/types/notes';
import {
  getTimeInISOString,
  convertDateToLocal,
  extractTimeFromDate,
} from '@/utils/time';
import useCurrentSelectedDateStore from '@/store/current-selected-date-store';
const formSchema = z.object({
  note: z.string().min(2, {
    message: 'Note must be at least 2 characters.',
  }),
  started_at: z.string(),
  finished_at: z.string(),
});

interface NoteFormProps {
  onSubmit: (values: NoteRequest) => void;
  defaultValues?: Note | null;
  startMinutes?: string;
  startHours?: string;
}

export function NoteForm({
  onSubmit,
  defaultValues,
  startMinutes = '00',
  startHours = '12',
}: NoteFormProps) {
  const { date } = useCurrentSelectedDateStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: defaultValues?.content || '',
      started_at: defaultValues?.started_at
        ? extractTimeFromDate(defaultValues.started_at)
        : `${startHours}:${startMinutes}`,
      finished_at: defaultValues?.finished_at || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const startedAt = convertDateToLocal(
      getTimeInISOString(values.started_at, date) as string,
    ) as string;

    const finishedAt = convertDateToLocal(
      getTimeInISOString(values.finished_at),
    );

    onSubmit({
      content: values.note,
      started_at: startedAt,
      finished_at: finishedAt,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-100 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="note"
          render={() => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  className="resize-none w-full h-full"
                  placeholder="Write your note here..."
                  {...form.register('note')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="started_at"
            render={() => (
              <FormItem>
                <FormControl>
                  <TimePicker
                    value={form.getValues('started_at')}
                    onChange={(value) => form.setValue('started_at', value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
