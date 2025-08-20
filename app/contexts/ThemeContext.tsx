'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';


/**
 * Theme context type definition
 * Provides theme state and toggle functionality
 */
interface ThemeContextType {
  /** Current theme mode ('light' | 'dark') */
  theme: 'light' | 'dark';
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
}

/**
 * Theme context for managing application theme state
 * Provides theme switching functionality and persistent theme storage
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Theme = 'light' | 'dark';

/**
 * ThemeContext provider component
 * Manages theme state and provides theme switching functionality
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme context provider
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect((): void => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect((): void => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = (): void => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use the theme context
 * @returns {ThemeContextType} Theme context with current theme and toggle function
 * @throws {Error} If used outside of ThemeProvider
 * @example
 * const { theme, toggleTheme } = useTheme();
 * return <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>;
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}