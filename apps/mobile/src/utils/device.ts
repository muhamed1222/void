// Device utilities

import { Dimensions, Platform } from 'react-native';

// Get screen dimensions
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// Check if device is iOS
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

// Check if device is Android
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

// Check if device is tablet
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = Math.max(width, height) / Math.min(width, height);
  return aspectRatio < 1.6;
};

// Get platform-specific padding
export const getPlatformPadding = (): number => {
  return isIOS() ? 20 : 16;
};

// Get platform-specific border radius
export const getPlatformBorderRadius = (): number => {
  return isIOS() ? 8 : 4;
};

// Check if device has notch (simplified check)
export const hasNotch = (): boolean => {
  // This is a simplified check. In a real app, you might want to use a library like react-native-device-info
  const { height } = Dimensions.get('window');
  return isIOS() && height >= 812; // iPhone X and newer
};

// Get safe area insets (simplified)
export const getSafeAreaInsets = () => {
  const { height } = Dimensions.get('window');
  
  if (isIOS() && height >= 812) {
    // iPhone X and newer
    return {
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    };
  }
  
  return {
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
  };
};

// Get device orientation
export const getDeviceOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? 'landscape' : 'portrait';
};

// Check if device is in landscape mode
export const isLandscape = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

// Check if device is in portrait mode
export const isPortrait = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return height > width;
};

// Get platform version
export const getPlatformVersion = (): string => {
  return Platform.Version.toString();
};

// Check if device supports force touch (iOS only)
export const supportsForceTouch = (): boolean => {
  return isIOS() && Platform.Version >= 9;
};