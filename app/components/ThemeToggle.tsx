'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="transition-colors hover:text-ink"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
}
