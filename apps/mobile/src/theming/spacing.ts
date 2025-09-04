// Spacing system

// Base unit for spacing (in points)
const baseUnit = 4;

// Spacing scale
export const spacing = {
  '3xs': baseUnit * 0.5,   // 2
  '2xs': baseUnit,          // 4
  'xs': baseUnit * 1.5,     // 6
  'sm': baseUnit * 2,       // 8
  'md': baseUnit * 3,       // 12
  'lg': baseUnit * 4,       // 16
  'xl': baseUnit * 5,       // 20
  '2xl': baseUnit * 6,      // 24
  '3xl': baseUnit * 8,      // 32
  '4xl': baseUnit * 10,     // 40
  '5xl': baseUnit * 12,     // 48
};

// Common padding presets
export const padding = {
  screen: spacing.lg,       // 16
  card: spacing.md,         // 12
  element: spacing.sm,      // 8
};

// Common margin presets
export const margin = {
  screen: spacing.lg,       // 16
  card: spacing.md,         // 12
  element: spacing.sm,      // 8
};

// Border widths
export const borderWidths = {
  thin: 1,
  thick: 2,
  thicker: 4,
};

// Border radius (as per minimalist design, these should be minimal)
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  full: 9999,
};

// Shadow depths (minimalist design - should be none or very subtle)
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
};

// Z-index levels
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  overlay: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
};

// Layout constraints
export const layout = {
  // Screen constraints
  maxWidth: 500, // Maximum width for content
  minWidth: 320, // Minimum width for content
  
  // Element constraints
  inputHeight: 44, // Standard touch target height
  buttonHeight: 44, // Standard button height
  iconSize: 24, // Standard icon size
};

// Breakpoints for responsive design
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

// Responsive spacing multipliers
export const responsiveSpacing = {
  mobile: 1,
  tablet: 1.25,
  desktop: 1.5,
};