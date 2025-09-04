// Theme system

import { colorPalette, themeColors } from './colors';
import { spacing, padding, margin, borderWidths, borderRadius, shadows, zIndex, layout } from './spacing';
import { typography, textStyles, typographyScale } from './typography';

// Theme interface
export interface Theme {
  colors: typeof colorPalette;
  spacing: typeof spacing;
  padding: typeof padding;
  margin: typeof margin;
  borderWidths: typeof borderWidths;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  zIndex: typeof zIndex;
  layout: typeof layout;
  typography: typeof typography;
  textStyles: typeof textStyles;
  typographyScale: typeof typographyScale;
}

// Light theme
export const lightTheme: Theme = {
  colors: themeColors.light,
  spacing,
  padding,
  margin,
  borderWidths,
  borderRadius,
  shadows,
  zIndex,
  layout,
  typography,
  textStyles,
  typographyScale,
};

// Dark theme
export const darkTheme: Theme = {
  colors: themeColors.dark,
  spacing,
  padding,
  margin,
  borderWidths,
  borderRadius,
  shadows,
  zIndex,
  layout,
  typography,
  textStyles,
  typographyScale,
};

// Default theme
export const defaultTheme = lightTheme;

// Theme context
export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Theme provider props
export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

// Get theme value by path
export const getThemeValue = (theme: Theme, path: string): any => {
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

// Create theme with overrides
export const createTheme = (overrides: Partial<Theme> = {}): Theme => {
  return {
    ...defaultTheme,
    ...overrides,
    colors: {
      ...defaultTheme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...defaultTheme.spacing,
      ...overrides.spacing,
    },
    // Add other overrides as needed
  };
};

// Theme utility functions
export const themeUtils = {
  // Get color with fallback
  getColor: (theme: Theme, colorPath: string, fallback: string = '#000000'): string => {
    return getThemeValue(theme, `colors.${colorPath}`) || fallback;
  },
  
  // Get spacing with fallback
  getSpacing: (theme: Theme, spacingPath: string, fallback: number = 0): number => {
    return getThemeValue(theme, `spacing.${spacingPath}`) || fallback;
  },
  
  // Get typography with fallback
  getTypography: (theme: Theme, typographyPath: string, fallback: any = {}): any => {
    return getThemeValue(theme, `textStyles.${typographyPath}`) || fallback;
  },
  
  // Merge themes
  mergeThemes: (baseTheme: Theme, ...themes: Partial<Theme>[]): Theme => {
    return themes.reduce((acc, theme) => {
      return { ...acc, ...theme };
    }, baseTheme) as Theme;
  },
};

// Responsive theme helpers
export const responsiveHelpers = {
  // Get responsive spacing
  getResponsiveSpacing: (theme: Theme, size: keyof typeof spacing, screenType: 'mobile' | 'tablet' | 'desktop' = 'mobile'): number => {
    const baseSpacing = theme.spacing[size];
    // In a real implementation, you would use actual screen dimensions
    // For now, we'll use a simple multiplier
    const multiplier = screenType === 'mobile' ? 1 : screenType === 'tablet' ? 1.25 : 1.5;
    return baseSpacing * multiplier;
  },
  
  // Get responsive typography
  getResponsiveTypography: (theme: Theme, style: keyof typeof textStyles, screenType: 'mobile' | 'tablet' | 'desktop' = 'mobile'): any => {
    const baseStyle = theme.textStyles[style];
    // In a real implementation, you might adjust font sizes for different screens
    return baseStyle;
  },
};

// Theme validation
export const validateTheme = (theme: any): theme is Theme => {
  // Basic validation to ensure theme has required properties
  return (
    theme &&
    typeof theme === 'object' &&
    theme.colors &&
    theme.spacing &&
    theme.typography &&
    theme.textStyles
  );
};

// Theme constants
export const THEME_CONSTANTS = {
  // Transition durations
  transition: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Animation curves
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
    linear: 'linear',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
};