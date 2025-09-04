// Theme utilities

import { Theme } from './index';

// Merge themes
export const mergeThemes = (baseTheme: Theme, ...themes: Partial<Theme>[]): Theme => {
  return themes.reduce((acc, theme) => {
    return { ...acc, ...theme };
  }, baseTheme) as Theme;
};

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
export const createTheme = (baseTheme: Theme, overrides: Partial<Theme> = {}): Theme => {
  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...baseTheme.spacing,
      ...overrides.spacing,
    },
    typography: {
      ...baseTheme.typography,
      ...overrides.typography,
    },
    textStyles: {
      ...baseTheme.textStyles,
      ...overrides.textStyles,
    },
  };
};

// Validate theme
export const validateTheme = (theme: any): theme is Theme => {
  return (
    theme &&
    typeof theme === 'object' &&
    theme.colors &&
    theme.spacing &&
    theme.typography &&
    theme.textStyles
  );
};

// Get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Lighten or darken a color
export const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const newR = Math.min(255, Math.max(0, r + amount));
  const newG = Math.min(255, Math.max(0, g + amount));
  const newB = Math.min(255, Math.max(0, b + amount));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// Get contrasting text color
export const getContrastTextColor = (backgroundColor: string): string => {
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Generate a gradient
export const generateGradient = (startColor: string, endColor: string, steps: number): string[] => {
  const startHex = startColor.replace('#', '');
  const endHex = endColor.replace('#', '');
  
  const startR = parseInt(startHex.substring(0, 2), 16);
  const startG = parseInt(startHex.substring(2, 4), 16);
  const startB = parseInt(startHex.substring(4, 6), 16);
  
  const endR = parseInt(endHex.substring(0, 2), 16);
  const endG = parseInt(endHex.substring(2, 4), 16);
  const endB = parseInt(endHex.substring(4, 6), 16);
  
  const gradient = [];
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(startR + (endR - startR) * ratio);
    const g = Math.round(startG + (endG - startG) * ratio);
    const b = Math.round(startB + (endB - startB) * ratio);
    
    gradient.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  }
  
  return gradient;
};

// Mix two colors
export const mixColors = (color1: string, color2: string, ratio: number): string => {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Get responsive spacing
export const getResponsiveSpacing = (
  theme: Theme, 
  size: keyof Theme['spacing'], 
  screenType: 'mobile' | 'tablet' | 'desktop' = 'mobile'
): number => {
  const baseSpacing = theme.spacing[size];
  // In a real implementation, you would use actual screen dimensions
  // For now, we'll use a simple multiplier
  const multiplier = screenType === 'mobile' ? 1 : screenType === 'tablet' ? 1.25 : 1.5;
  return baseSpacing * multiplier;
};

// Get responsive typography
export const getResponsiveTypography = (
  theme: Theme, 
  style: keyof Theme['textStyles'], 
  screenType: 'mobile' | 'tablet' | 'desktop' = 'mobile'
): any => {
  const baseStyle = theme.textStyles[style];
  // In a real implementation, you might adjust font sizes for different screens
  return baseStyle;
};