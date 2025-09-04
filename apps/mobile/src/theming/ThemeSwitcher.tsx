// Theme switcher component

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';
import { Theme } from './index';

// Theme switcher props
interface ThemeSwitcherProps {
  style?: any;
  labelStyle?: any;
  thumbStyle?: any;
  trackStyle?: any;
  showLabels?: boolean;
  lightLabel?: string;
  darkLabel?: string;
}

// Theme switcher component
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  style,
  labelStyle,
  thumbStyle,
  trackStyle,
  showLabels = true,
  lightLabel = 'Light',
  darkLabel = 'Dark',
}) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  // Render switch track
  const renderTrack = () => {
    return (
      <View style={[
        styles.track,
        {
          backgroundColor: isDarkMode 
            ? theme.colors.primary 
            : theme.colors.secondary,
        },
        trackStyle,
      ]} />
    );
  };

  // Render switch thumb
  const renderThumb = () => {
    return (
      <View style={[
        styles.thumb,
        {
          backgroundColor: theme.colors.background,
          transform: [{ translateX: isDarkMode ? 20 : 0 }],
        },
        thumbStyle,
      ]} />
    );
  };

  // Render label
  const renderLabel = (label: string, isActive: boolean) => {
    if (!showLabels) return null;
    
    return (
      <Text style={[
        styles.label,
        {
          color: isActive 
            ? theme.colors.text 
            : theme.colors.textTertiary,
        },
        labelStyle,
      ]}>
        {label}
      </Text>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLabel(lightLabel, !isDarkMode)}
      
      <TouchableOpacity 
        style={styles.switchContainer}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        {renderTrack()}
        {renderThumb()}
      </TouchableOpacity>
      
      {renderLabel(darkLabel, isDarkMode)}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  track: {
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    position: 'absolute',
    top: 2,
    left: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

// Export default
export default ThemeSwitcher;