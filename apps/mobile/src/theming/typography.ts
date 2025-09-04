// Typography system

export const typography = {
  // Font families
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'monospace',
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

// Common text styles
export const textStyles = {
  h1: {
    fontFamily: typography.fonts.bold,
    fontSize: typography.sizes['3xl'],
    lineHeight: typography.lineHeights.tight,
  },
  
  h2: {
    fontFamily: typography.fonts.bold,
    fontSize: typography.sizes['2xl'],
    lineHeight: typography.lineHeights.tight,
  },
  
  h3: {
    fontFamily: typography.fonts.bold,
    fontSize: typography.sizes.xl,
    lineHeight: typography.lineHeights.snug,
  },
  
  body: {
    fontFamily: typography.fonts.regular,
    fontSize: typography.sizes.base,
    lineHeight: typography.lineHeights.normal,
  },
  
  caption: {
    fontFamily: typography.fonts.regular,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.snug,
  },
  
  mono: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.normal,
  },
};

// Typography scale for consistent sizing
export const typographyScale = {
  // Display headings
  display: {
    large: typography.sizes['4xl'],
    medium: typography.sizes['3xl'],
    small: typography.sizes['2xl'],
  },
  
  // Headings
  heading: {
    large: typography.sizes['2xl'],
    medium: typography.sizes.xl,
    small: typography.sizes.lg,
  },
  
  // Body text
  body: {
    large: typography.sizes.lg,
    medium: typography.sizes.base,
    small: typography.sizes.sm,
  },
  
  // Label text
  label: {
    large: typography.sizes.base,
    medium: typography.sizes.sm,
    small: typography.sizes.xs,
  },
};