// Color system

// Base colors as specified in the design requirements
export const baseColors = {
  black: '#000000',
  darkGray: '#111111',
  mediumGray: '#666666',
  lightGray: '#AAAAAA',
  white: '#FFFFFF',
};

// Color palette
export const colorPalette = {
  // Primary colors
  primary: baseColors.black,
  primaryDark: baseColors.darkGray,
  primaryLight: baseColors.mediumGray,
  
  // Secondary colors
  secondary: baseColors.lightGray,
  secondaryDark: baseColors.mediumGray,
  secondaryLight: baseColors.white,
  
  // Background colors
  background: baseColors.white,
  backgroundSecondary: baseColors.lightGray,
  
  // Text colors
  text: baseColors.black,
  textSecondary: baseColors.darkGray,
  textTertiary: baseColors.mediumGray,
  
  // Border colors
  border: baseColors.lightGray,
  borderDark: baseColors.mediumGray,
  
  // Status colors
  success: baseColors.black, // Using black for success as per minimalist design
  warning: baseColors.mediumGray,
  error: baseColors.black,
  
  // Interactive colors
  interactive: baseColors.black,
  interactiveHover: baseColors.darkGray,
  interactiveActive: baseColors.mediumGray,
};

// Theme colors
export const themeColors = {
  light: {
    ...colorPalette,
  },
  dark: {
    ...colorPalette,
    background: baseColors.black,
    backgroundSecondary: baseColors.darkGray,
    text: baseColors.white,
    textSecondary: baseColors.lightGray,
    textTertiary: baseColors.mediumGray,
    border: baseColors.darkGray,
    borderDark: baseColors.mediumGray,
  },
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

// Validate color format
export const isValidColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
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
  
  return luminance > 0.5 ? baseColors.black : baseColors.white;
};

// Color utility functions
export const colorUtils = {
  // Generate a gradient
  generateGradient: (startColor: string, endColor: string, steps: number): string[] => {
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
  },
  
  // Mix two colors
  mixColors: (color1: string, color2: string, ratio: number): string => {
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
  },
};