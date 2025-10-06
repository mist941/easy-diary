import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Color from 'color';
import { ColorPickerContext } from './useColorPicker';

type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0];
  defaultValue?: Parameters<typeof Color>[0];
  onChange?: (value: string) => void;
};

const ColorPicker = ({
  value,
  defaultValue = '#000000',
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  const selectedColor = Color(value);
  const defaultColor = Color(defaultValue);

  const hue = selectedColor.hue() || defaultColor.hue() || 0;
  const saturation =
    selectedColor.saturationl() || defaultColor.saturationl() || 100;
  const lightness = selectedColor.lightness() || defaultColor.lightness() || 50;

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        onChange,
      }}
    >
      <div
        className={cn('flex size-full flex-col gap-4', className)}
        {...props}
      />
    </ColorPickerContext.Provider>
  );
};

export { ColorPicker };
