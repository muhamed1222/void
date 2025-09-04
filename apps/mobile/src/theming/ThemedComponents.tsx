// Themed components

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ViewProps, 
  TextProps, 
  TouchableOpacity, 
  TouchableOpacityProps,
  TextInput,
  TextInputProps,
  ScrollView,
  ScrollViewProps
} from 'react-native';
import { useTheme } from './ThemeProvider';
import { Theme } from './index';

// Themed View component
interface ThemedViewProps extends ViewProps {
  theme?: Theme;
}

export const ThemedView: React.FC<ThemedViewProps> = ({ 
  style, 
  theme: customTheme, 
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const themedStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.background,
    },
    style,
  ]);
  
  return <View style={themedStyle} {...props} />;
};

// Themed Text component
interface ThemedTextProps extends TextProps {
  theme?: Theme;
  type?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono';
}

export const ThemedText: React.FC<ThemedTextProps> = ({ 
  style, 
  theme: customTheme, 
  type = 'body',
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const textStyle = StyleSheet.flatten([
    currentTheme.textStyles[type],
    {
      color: currentTheme.colors.text,
    },
    style,
  ]);
  
  return <Text style={textStyle} {...props} />;
};

// Themed Button component
interface ThemedButtonProps extends TouchableOpacityProps {
  theme?: Theme;
  title: string;
  onPress: () => void;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  style, 
  theme: customTheme, 
  title,
  onPress,
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const buttonStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.primary,
      paddingVertical: currentTheme.spacing.sm,
      paddingHorizontal: currentTheme.spacing.md,
      borderRadius: currentTheme.borderRadius.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    style,
  ]);
  
  const textStyle = {
    color: currentTheme.colors.background,
    fontSize: currentTheme.typography.sizes.base,
    fontWeight: currentTheme.typography.weights.medium,
  };
  
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} {...props}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// Themed Input component
interface ThemedInputProps extends TextInputProps {
  theme?: Theme;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({ 
  style, 
  theme: customTheme, 
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const inputStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.text,
      borderColor: currentTheme.colors.border,
      borderWidth: currentTheme.borderWidths.thin,
      borderRadius: currentTheme.borderRadius.sm,
      paddingVertical: currentTheme.spacing.sm,
      paddingHorizontal: currentTheme.spacing.md,
      fontSize: currentTheme.typography.sizes.base,
      height: currentTheme.layout.inputHeight,
    },
    style,
  ]);
  
  return <TextInput style={inputStyle} {...props} />;
};

// Themed ScrollView component
interface ThemedScrollViewProps extends ScrollViewProps {
  theme?: Theme;
}

export const ThemedScrollView: React.FC<ThemedScrollViewProps> = ({ 
  style, 
  theme: customTheme, 
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const scrollViewStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.background,
    },
    style,
  ]);
  
  return <ScrollView style={scrollViewStyle} {...props} />;
};

// Themed Card component
interface ThemedCardProps extends ViewProps {
  theme?: Theme;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({ 
  style, 
  theme: customTheme, 
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const cardStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.background,
      borderColor: currentTheme.colors.border,
      borderWidth: currentTheme.borderWidths.thin,
      borderRadius: currentTheme.borderRadius.sm,
      padding: currentTheme.padding.card,
      margin: currentTheme.margin.card,
    },
    style,
  ]);
  
  return <View style={cardStyle} {...props} />;
};

// Themed Divider component
interface ThemedDividerProps extends ViewProps {
  theme?: Theme;
  vertical?: boolean;
}

export const ThemedDivider: React.FC<ThemedDividerProps> = ({ 
  style, 
  theme: customTheme, 
  vertical = false,
  ...props 
}) => {
  const { theme } = useTheme();
  const currentTheme = customTheme || theme;
  
  const dividerStyle = StyleSheet.flatten([
    {
      backgroundColor: currentTheme.colors.border,
      height: vertical ? '100%' : currentTheme.borderWidths.thin,
      width: vertical ? currentTheme.borderWidths.thin : '100%',
    },
    style,
  ]);
  
  return <View style={dividerStyle} {...props} />;
};