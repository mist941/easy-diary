import { HTMLAttributes } from 'react';
import { useColorPicker } from './useColorPicker';
import Color from 'color';
import { cn } from '@/lib/utils';
import { Input } from '../Input';

type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

const ColorPickerFormat = ({ className, ...props }: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, mode } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, 1);

  if (mode === 'hex') {
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
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={hex}
        />
      </div>
    );
  }

  if (mode === 'rgb') {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn(
          '-space-x-px flex items-center rounded-md shadow-sm',
          className,
        )}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className,
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
      </div>
    );
  }

  if (mode === 'css') {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div className={cn('w-full rounded-md shadow-sm', className)} {...props}>
        <Input
          className="h-8 w-full bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={`rgba(${rgb.join(', ')}, 1)`}
          {...props}
        />
      </div>
    );
  }

  if (mode === 'hsl') {
    const hsl = color
      .hsl()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn(
          '-space-x-px flex items-center rounded-md shadow-sm',
          className,
        )}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className,
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
      </div>
    );
  }

  return null;
};

export { ColorPickerFormat };
