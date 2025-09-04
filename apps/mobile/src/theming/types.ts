// Theme types

// Base colors
export interface BaseColors {
  black: string;
  darkGray: string;
  mediumGray: string;
  lightGray: string;
  white: string;
}

// Color palette
export interface ColorPalette {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Secondary colors
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  
  // Background colors
  background: string;
  backgroundSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Border colors
  border: string;
  borderDark: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Interactive colors
  interactive: string;
  interactiveHover: string;
  interactiveActive: string;
}

// Theme colors
export interface ThemeColors {
  light: ColorPalette;
  dark: ColorPalette;
}

// Spacing scale
export interface SpacingScale {
  '3xs': number;
  '2xs': number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
}

// Padding presets
export interface PaddingPresets {
  screen: number;
  card: number;
  element: number;
}

// Margin presets
export interface MarginPresets {
  screen: number;
  card: number;
  element: number;
}

// Border widths
export interface BorderWidths {
  thin: number;
  thick: number;
  thicker: number;
}

// Border radius
export interface BorderRadius {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

// Shadows
export interface Shadows {
  none: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  subtle: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

// Z-index levels
export interface ZIndexLevels {
  base: number;
  raised: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

// Layout constraints
export interface LayoutConstraints {
  // Screen constraints
  maxWidth: number;
  minWidth: number;
  
  // Element constraints
  inputHeight: number;
  buttonHeight: number;
  iconSize: number;
}

// Typography
export interface Typography {
  // Font families
  fonts: {
    regular: string;
    medium: string;
    bold: string;
    mono: string;
  };
  
  // Font sizes
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  
  // Line heights
  lineHeights: {
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  
  // Font weights
  weights: {
    regular: string;
    medium: string;
    bold: string;
  };
}

// Text styles
export interface TextStyles {
  h1: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  h2: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  h3: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  body: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  caption: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  mono: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
}

// Typography scale
export interface TypographyScale {
  // Display headings
  display: {
    large: number;
    medium: number;
    small: number;
  };
  
  // Headings
  heading: {
    large: number;
    medium: number;
    small: number;
  };
  
  // Body text
  body: {
    large: number;
    medium: number;
    small: number;
  };
  
  // Label text
  label: {
    large: number;
    medium: number;
    small: number;
  };
}

// Theme interface
export interface Theme {
  colors: ColorPalette;
  spacing: SpacingScale;
  padding: PaddingPresets;
  margin: MarginPresets;
  borderWidths: BorderWidths;
  borderRadius: BorderRadius;
  shadows: Shadows;
  zIndex: ZIndexLevels;
  layout: LayoutConstraints;
  typography: Typography;
  textStyles: TextStyles;
  typographyScale: TypographyScale;
}

// Theme context props
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