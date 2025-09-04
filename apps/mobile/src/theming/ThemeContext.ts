// Theme context

import React from 'react';
import { ThemeContextProps } from './types';
import { lightTheme } from './index';

// Default theme context value
const defaultThemeContext: ThemeContextProps = {
  theme: lightTheme,
  toggleTheme: () => {
    console.warn('Theme context not provided. Using default theme.');
  },
  isDarkMode: false,
};

// Create theme context
const ThemeContext = React.createContext<ThemeContextProps>(defaultThemeContext);

// Export context
export default ThemeContext;

// Export provider and consumer for convenience
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

// Export default context value
export { defaultThemeContext };