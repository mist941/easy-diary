'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const ThemeIcon = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      className="rounded-full"
    >
      <ThemeIcon className="h-4 w-4" />
    </Button>
  );
}

export { ThemeToggle };
