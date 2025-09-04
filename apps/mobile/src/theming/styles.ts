// Common styles

import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';
import { Theme } from './index';

// Global styles
export const createGlobalStyles = (theme: Theme) => {
  return StyleSheet.create({
    // Screen containers
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.padding.screen,
    },
    
    // Card styles
    card: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: theme.borderWidths.thin,
      borderRadius: theme.borderRadius.sm,
      padding: theme.padding.card,
      marginVertical: theme.margin.card,
    },
    
    cardHeader: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: theme.borderWidths.thin,
      paddingBottom: theme.padding.element,
      marginBottom: theme.margin.element,
    },
    
    // List styles
    listItem: {
      paddingVertical: theme.padding.element,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: theme.borderWidths.thin,
    },
    
    listItemLast: {
      borderBottomWidth: 0,
    },
    
    // Button styles
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.padding.element,
      paddingHorizontal: theme.padding.md,
      borderRadius: theme.borderRadius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: theme.layout.buttonHeight,
    },
    
    buttonSecondary: {
      backgroundColor: theme.colors.secondary,
    },
    
    buttonOutline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: theme.borderWidths.thin,
    },
    
    buttonDisabled: {
      opacity: 0.5,
    },
    
    buttonText: {
      color: theme.colors.background,
      fontSize: theme.typography.sizes.base,
      fontWeight: theme.typography.weights.medium,
    },
    
    buttonTextSecondary: {
      color: theme.colors.text,
    },
    
    buttonTextOutline: {
      color: theme.colors.primary,
    },
    
    // Input styles
    input: {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderColor: theme.colors.border,
      borderWidth: theme.borderWidths.thin,
      borderRadius: theme.borderRadius.sm,
      paddingVertical: theme.padding.element,
      paddingHorizontal: theme.padding.md,
      fontSize: theme.typography.sizes.base,
      height: theme.layout.inputHeight,
    },
    
    inputError: {
      borderColor: theme.colors.error,
    },
    
    // Text styles
    textError: {
      color: theme.colors.error,
      fontSize: theme.typography.sizes.sm,
      marginTop: theme.margin.element,
    },
    
    textSuccess: {
      color: theme.colors.success,
    },
    
    textWarning: {
      color: theme.colors.warning,
    },
    
    // Divider
    divider: {
      height: theme.borderWidths.thin,
      backgroundColor: theme.colors.border,
      marginVertical: theme.margin.element,
    },
    
    // Spacing utilities
    marginTopSm: {
      marginTop: theme.margin.element,
    },
    
    marginTopMd: {
      marginTop: theme.margin.card,
    },
    
    marginBottomSm: {
      marginBottom: theme.margin.element,
    },
    
    marginBottomMd: {
      marginBottom: theme.margin.card,
    },
    
    marginVerticalSm: {
      marginVertical: theme.margin.element,
    },
    
    marginVerticalMd: {
      marginVertical: theme.margin.card,
    },
    
    paddingTopSm: {
      paddingTop: theme.padding.element,
    },
    
    paddingTopMd: {
      paddingTop: theme.padding.card,
    },
    
    paddingBottomSm: {
      paddingBottom: theme.padding.element,
    },
    
    paddingBottomMd: {
      paddingBottom: theme.padding.card,
    },
    
    paddingVerticalSm: {
      paddingVertical: theme.padding.element,
    },
    
    paddingVerticalMd: {
      paddingVertical: theme.padding.card,
    },
  });
};

// Hook to use global styles
export const useGlobalStyles = () => {
  const { theme } = useTheme();
  return createGlobalStyles(theme);
};

// Utility function to create themed styles
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  theme: Theme,
  styles: (theme: Theme) => T
) => {
  return StyleSheet.create(styles(theme));
};

// Common layout styles
export const layoutStyles = (theme: Theme) => {
  return {
    // Flex layouts
    flexRow: {
      flexDirection: 'row',
    },
    
    flexColumn: {
      flexDirection: 'column',
    },
    
    flexCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    flexBetween: {
      justifyContent: 'space-between',
    },
    
    flexAround: {
      justifyContent: 'space-around',
    },
    
    alignItemsCenter: {
      alignItems: 'center',
    },
    
    justifyContentCenter: {
      justifyContent: 'center',
    },
    
    // Width and height
    fullWidth: {
      width: '100%',
    },
    
    fullHeight: {
      height: '100%',
    },
    
    // Positioning
    positionRelative: {
      position: 'relative',
    },
    
    positionAbsolute: {
      position: 'absolute',
    },
    
    // Overflow
    overflowHidden: {
      overflow: 'hidden',
    },
    
    // Z-index
    zIndexRaised: {
      zIndex: theme.zIndex.raised,
    },
    
    zIndexModal: {
      zIndex: theme.zIndex.modal,
    },
  };
};

// Text utility styles
export const textStylesUtils = (theme: Theme) => {
  return {
    // Alignment
    textCenter: {
      textAlign: 'center',
    },
    
    textLeft: {
      textAlign: 'left',
    },
    
    textRight: {
      textAlign: 'right',
    },
    
    // Transform
    textUppercase: {
      textTransform: 'uppercase',
    },
    
    textLowercase: {
      textTransform: 'lowercase',
    },
    
    textCapitalize: {
      textTransform: 'capitalize',
    },
    
    // Weight
    fontWeightRegular: {
      fontWeight: theme.typography.weights.regular,
    },
    
    fontWeightMedium: {
      fontWeight: theme.typography.weights.medium,
    },
    
    fontWeightBold: {
      fontWeight: theme.typography.weights.bold,
    },
    
    // Decoration
    textUnderline: {
      textDecorationLine: 'underline',
    },
    
    textLineThrough: {
      textDecorationLine: 'line-through',
    },
  };
};