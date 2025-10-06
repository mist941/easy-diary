import { createContext, useContext } from 'react';

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  onChange?: (value: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined,
);

const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }

  return context;
};

export { useColorPicker, ColorPickerContext };
