// Theme provider component

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Theme, lightTheme, darkTheme, ThemeContextProps } from './index';

// Create context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = lightTheme 
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    initialTheme === darkTheme
  );

  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      setTheme(lightTheme);
      setIsDarkMode(false);
    } else {
      setTheme(darkTheme);
      setIsDarkMode(true);
    }
  };

  // Context value
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isDarkMode,
  }), [theme, isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Hook to get theme values
export const useThemeValues = () => {
  const { theme } = useTheme();
  return theme;
};

// Hook to toggle theme
export const useToggleTheme = () => {
  const { toggleTheme } = useTheme();
  return toggleTheme;
};

// Hook to check if dark mode
export const useIsDarkMode = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode;
};

// Theme consumer component (for class components)
export const ThemeConsumer = ThemeContext.Consumer;

// Default export
export default ThemeProvider;