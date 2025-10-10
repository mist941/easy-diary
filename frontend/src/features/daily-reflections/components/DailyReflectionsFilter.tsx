import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';
import { DateRangeFilter } from '../types';

interface DailyReflectionsFilterProps {
  filterDate: DateRangeFilter;
  setFilterDate: (date: DateRangeFilter) => void;
}

const getPeriodByPredefinedPeriod = (period: string): DateRangeFilter => {
  const now = new Date();

  switch (period) {
    case 'last_7_days':
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7,
        ),
        endDate: new Date(),
      };
    case 'this_month':
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate: new Date(),
      };
    case 'last_month':
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: lastMonth,
        endDate: lastDayOfLastMonth,
      };
    case 'this_year':
      return {
        startDate: new Date(now.getFullYear(), 0, 1),
        endDate: new Date(),
      };
    case 'all_time':
      return {};
  }
  return { startDate: new Date(), endDate: new Date() };
};

function DailyReflectionsFilter({
  filterDate,
  setFilterDate,
}: DailyReflectionsFilterProps) {
  const onSelectPeriod = (period: string) => {
    const periodFilter = getPeriodByPredefinedPeriod(period);
    setFilterDate(periodFilter);
  };

  return (
    <div className="flex gap-2 justify-between mb-4">
      <Select onValueChange={onSelectPeriod}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a period" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Period</SelectLabel>
            <SelectItem value="last_7_days">Last 7 days</SelectItem>
            <SelectItem value="this_month">This month</SelectItem>
            <SelectItem value="last_month">Last month</SelectItem>
            <SelectItem value="this_year">This year</SelectItem>
            <SelectItem value="all_time">All time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!filterDate.startDate}
              className="data-[empty=true]:text-muted-foreground w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon />
              {filterDate.startDate ? (
                format(filterDate.startDate, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterDate.startDate}
              onSelect={(date) =>
                setFilterDate({ ...filterDate, startDate: date as Date })
              }
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!filterDate.endDate}
              className="data-[empty=true]:text-muted-foreground w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon />
              {filterDate.endDate ? (
                format(filterDate.endDate, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filterDate.endDate}
              onSelect={(date) =>
                setFilterDate({ ...filterDate, endDate: date as Date })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export { DailyReflectionsFilter };
