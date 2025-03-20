'use client';

import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/scroll-area';

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0'),
);

export function TimePicker() {
  const [open, setOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState('12');
  const [selectedMinute, setSelectedMinute] = React.useState('00');

  const formattedTime = `${selectedHour}:${selectedMinute}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-start">
          {formattedTime}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 flex gap-4" align="start">
        <ScrollArea className="h-48 w-16 border rounded-md">
          {hours.map((hour) => (
            <div
              key={hour}
              onClick={() => setSelectedHour(hour)}
              className={cn(
                'cursor-pointer px-2 py-1 text-center hover:bg-muted rounded-sm',
                selectedHour === hour && 'bg-muted font-semibold',
              )}
            >
              {hour}
            </div>
          ))}
        </ScrollArea>
        <ScrollArea className="h-48 w-16 border rounded-md">
          {minutes.map((minute) => (
            <div
              key={minute}
              onClick={() => setSelectedMinute(minute)}
              className={cn(
                'cursor-pointer px-2 py-1 text-center hover:bg-muted rounded-sm',
                selectedMinute === minute && 'bg-muted font-semibold',
              )}
            >
              {minute}
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
