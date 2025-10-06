import { HTMLAttributes, memo } from 'react';
import { cn } from '@/lib/utils';

type ColorPeviewProps = HTMLAttributes<HTMLDivElement> & {
  color: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const ColorPeview = memo(
  ({ color, size = 'md', ...props }: ColorPeviewProps) => {
    return (
      <div
        className={cn(
          'w-10 h-10 rounded-full',
          size === 'xs' && 'w-4 h-4',
          size === 'sm' && 'w-6 h-6',
          size === 'md' && 'w-10 h-10',
          size === 'lg' && 'w-14 h-14',
        )}
        style={{ backgroundColor: color }}
        {...props}
      />
    );
  },
);

ColorPeview.displayName = 'ColorPeview';

export { ColorPeview };
