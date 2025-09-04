// Theme hooks

import { useTheme } from './ThemeProvider';
import { Theme } from './index';
import { createGlobalStyles } from './styles';

// Hook to use theme colors
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

// Hook to use theme spacing
export const useThemeSpacing = () => {
  const { theme } = useTheme();
  return theme.spacing;
};

// Hook to use theme typography
export const useThemeTypography = () => {
  const { theme } = useTheme();
  return theme.typography;
};

// Hook to use theme text styles
export const useThemeTextStyles = () => {
  const { theme } = useTheme();
  return theme.textStyles;
};

// Hook to use theme layout
export const useThemeLayout = () => {
  const { theme } = useTheme();
  return theme.layout;
};

// Hook to use theme borders
export const useThemeBorders = () => {
  const { theme } = useTheme();
  return {
    borderWidths: theme.borderWidths,
    borderRadius: theme.borderRadius,
  };
};

// Hook to use theme shadows
export const useThemeShadows = () => {
  const { theme } = useTheme();
  return theme.shadows;
};

// Hook to use theme z-index
export const useThemeZIndex = () => {
  const { theme } = useTheme();
  return theme.zIndex;
};

// Hook to use global styles
export const useGlobalStylesHook = () => {
  const { theme } = useTheme();
  return createGlobalStyles(theme);
};

// Hook to get specific theme value
export const useThemeValue = (path: string) => {
  const { theme } = useTheme();
  
  const keys = path.split('.');
  let current: any = theme;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
};

// Hook to check if current theme is dark
export const useIsDarkTheme = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode;
};

// Hook to get responsive spacing
export const useResponsiveSpacing = (size: keyof Theme['spacing']) => {
  const { theme } = useTheme();
  return theme.spacing[size];
};

// Hook to get color with opacity
export const useColorWithOpacity = (colorPath: string, opacity: number) => {
  const color = useThemeValue(`colors.${colorPath}`) as string;
  
  if (!color) return undefined;
  
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Hook to get contrasting text color
export const useContrastTextColor = (backgroundColorPath: string) => {
  const backgroundColor = useThemeValue(`colors.${backgroundColorPath}`) as string;
  
  if (!backgroundColor) return undefined;
  
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Hook to get theme-aware elevation (Android)
export const useThemeElevation = (level: number) => {
  const { theme, isDarkMode } = useTheme();
  
  // In dark mode, we might want to adjust elevation differently
  const elevation = isDarkMode ? level * 0.8 : level;
  
  return {
    elevation,
    // iOS shadow properties
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: level * 0.5,
    },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: level * 0.5,
  };
};

// Hook to get theme-aware border color
export const useThemeBorderColor = (isDarkMode: boolean) => {
  const { theme } = useTheme();
  
  return isDarkMode ? theme.colors.borderDark : theme.colors.border;
};

// Hook to get theme-aware background color
export const useThemeBackgroundColor = (isDarkMode: boolean) => {
  const { theme } = useTheme();
  
  return isDarkMode ? theme.colors.background : theme.colors.background;
};

// Hook to get theme-aware text color
export const useThemeTextColor = (isDarkMode: boolean) => {
  const { theme } = useTheme();
  
  return isDarkMode ? theme.colors.text : theme.colors.text;
};