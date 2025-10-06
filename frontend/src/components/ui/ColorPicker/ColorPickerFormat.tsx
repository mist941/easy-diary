import { HTMLAttributes } from 'react';
import { useColorPicker } from './useColorPicker';
import Color from 'color';
import { cn } from '@/lib/utils';
import { Input } from '../Input';

type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

const ColorPickerFormat = ({ className, ...props }: ColorPickerFormatProps) => {
  const { hue, saturation, lightness } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, 1);
  const hex = color.hex();

  return (
    <div
      className={cn(
        '-space-x-px relative flex w-full items-center rounded-md shadow-sm',
        className,
      )}
      {...props}
    >
      <Input
        className="h-8 bg-secondary px-2 text-xs shadow-none"
        readOnly
        type="text"
        value={hex}
      />
    </div>
  );
};

export { ColorPickerFormat };
