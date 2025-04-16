'use client';

import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0'),
);

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

function TimePicker({ value = '12:00', onChange }: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const hoursValue = value ? value.split(':')[0] : '--';
  const minutesValue = value ? value.split(':')[1] : '--';

  const handleHourChange = (hour: string) => {
    onChange(`${hour}:${minutesValue === '--' ? '00' : minutesValue}`);
  };

  const handleMinuteChange = (minute: string) => {
    onChange(`${hoursValue === '--' ? '00' : hoursValue}:${minute}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[67px] justify-start">
          {`${hoursValue}:${minutesValue}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 flex gap-4" align="start">
        <ScrollArea className="h-48 w-16 border rounded-md">
          {hours.map((hour) => (
            <div
              key={hour}
              onClick={() => handleHourChange(hour)}
              className={cn(
                'cursor-pointer px-2 py-1 text-center hover:bg-muted rounded-sm',
                hoursValue === hour && 'bg-muted font-semibold',
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
              onClick={() => handleMinuteChange(minute)}
              className={cn(
                'cursor-pointer px-2 py-1 text-center hover:bg-muted rounded-sm',
                minutesValue === minute && 'bg-muted font-semibold',
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

export { TimePicker };
