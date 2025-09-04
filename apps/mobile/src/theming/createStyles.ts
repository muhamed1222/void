// Style creation utilities

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Theme } from './index';

// Style creators
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// Create styles with theme
export const createStyles = <T extends NamedStyles<T>>(
  theme: Theme,
  styles: (theme: Theme) => T | NamedStyles<T>
): T => {
  return StyleSheet.create(styles(theme)) as T;
};

// Create themed styles hook
export const createThemedStylesHook = <T extends NamedStyles<T>>(
  stylesCreator: (theme: Theme) => T | NamedStyles<T>
) => {
  return (theme: Theme) => createStyles(theme, stylesCreator);
};

// Merge style objects
export const mergeStyles = <T>(
  ...styles: (T | undefined | null)[]
): T => {
  return styles.reduce((acc, style) => {
    if (style) {
      return { ...acc, ...style };
    }
    return acc;
  }, {} as T);
};

// Conditional styles
export const conditionalStyles = <T>(
  condition: boolean,
  trueStyles: T,
  falseStyles?: T
): T | undefined => {
  return condition ? trueStyles : falseStyles;
};

// Responsive styles
export const responsiveStyles = <T>(
  theme: Theme,
  screenType: 'mobile' | 'tablet' | 'desktop',
  styles: Record<'mobile' | 'tablet' | 'desktop', T>
): T => {
  return styles[screenType];
};

// Style modifiers
export const styleModifiers = {
  // Add padding
  withPadding: <T extends ViewStyle>(style: T, padding: number): T => ({
    ...style,
    padding,
  }),
  
  // Add margin
  withMargin: <T extends ViewStyle>(style: T, margin: number): T => ({
    ...style,
    margin,
  }),
  
  // Add border
  withBorder: <T extends ViewStyle>(style: T, borderWidth: number, borderColor: string): T => ({
    ...style,
    borderWidth,
    borderColor,
  }),
  
  // Add rounded corners
  withBorderRadius: <T extends ViewStyle>(style: T, borderRadius: number): T => ({
    ...style,
    borderRadius,
  }),
  
  // Add shadow
  withShadow: <T extends ViewStyle>(style: T, shadow: ViewStyle['shadowColor']): T => ({
    ...style,
    shadowColor: shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }),
  
  // Add background color
  withBackgroundColor: <T extends ViewStyle>(style: T, backgroundColor: string): T => ({
    ...style,
    backgroundColor,
  }),
  
  // Add text color
  withTextColor: <T extends TextStyle>(style: T, color: string): T => ({
    ...style,
    color,
  }),
  
  // Add font size
  withFontSize: <T extends TextStyle>(style: T, fontSize: number): T => ({
    ...style,
    fontSize,
  }),
  
  // Add font weight
  withFontWeight: <T extends TextStyle>(style: T, fontWeight: TextStyle['fontWeight']): T => ({
    ...style,
    fontWeight,
  }),
};

// Utility to create style variants
export const createStyleVariants = <T extends NamedStyles<T>, V extends Record<string, Partial<T>>>(
  baseStyles: T,
  variants: V
): { [K in keyof V]: T } => {
  const result: any = {};
  
  Object.keys(variants).forEach(variantName => {
    result[variantName] = {
      ...baseStyles,
      ...variants[variantName],
    };
  });
  
  return result;
};

// Utility to create responsive styles
export const createResponsiveStyles = <T extends NamedStyles<T>>(
  theme: Theme,
  styles: {
    base: (theme: Theme) => T;
    tablet?: (theme: Theme) => Partial<T>;
    desktop?: (theme: Theme) => Partial<T>;
  }
) => {
  const base = styles.base(theme);
  
  // In a real implementation, you would check actual screen dimensions
  // For now, we'll just return base styles
  return StyleSheet.create(base);
};

// Utility to create adaptive styles based on theme
export const createAdaptiveStyles = <T extends NamedStyles<T>>(
  lightStyles: (theme: Theme) => T,
  darkStyles: (theme: Theme) => T
) => {
  return (theme: Theme, isDarkMode: boolean) => {
    const styles = isDarkMode ? darkStyles(theme) : lightStyles(theme);
    return StyleSheet.create(styles);
  };
};