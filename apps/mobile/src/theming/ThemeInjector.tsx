// Theme injector component

import React, { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';
import { themeManager } from './ThemeManager';
import { ThemeProviderProps } from './types';
import { lightTheme } from './index';

// Theme injector component
export const ThemeInjector: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = lightTheme 
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === lightTheme ? false : true);

  // Initialize theme manager
  useEffect(() => {
    const initTheme = async () => {
      await themeManager.initialize();
      
      // Set initial theme state
      setTheme(themeManager.getCurrentTheme());
      setIsDarkMode(themeManager.getIsDarkMode());
    };
    
    initTheme();
  }, []);

  // Subscribe to theme changes
  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newTheme, newIsDarkMode) => {
      setTheme(newTheme);
      setIsDarkMode(newIsDarkMode);
    });
    
    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    themeManager.toggleTheme();
  };

  // Set theme function
  const setThemeMode = (isDark: boolean) => {
    themeManager.setTheme(isDark);
  };

  // Context value
  const contextValue = {
    theme,
    toggleTheme,
    isDarkMode,
    setTheme: setThemeMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export default
export default ThemeInjector;