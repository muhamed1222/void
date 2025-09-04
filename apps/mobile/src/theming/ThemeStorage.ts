// Theme storage utilities

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from './index';

// Storage keys
const THEME_STORAGE_KEY = '@white_room/theme';
const CUSTOM_THEME_STORAGE_KEY = '@white_room/custom_theme';

// Save theme preference
export const saveThemePreference = async (isDarkMode: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      THEME_STORAGE_KEY, 
      isDarkMode ? 'dark' : 'light'
    );
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
};

// Load theme preference
export const loadThemePreference = async (): Promise<'light' | 'dark' | null> => {
  try {
    const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    
    if (theme === 'light' || theme === 'dark') {
      return theme;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to load theme preference:', error);
    return null;
  }
};

// Save custom theme
export const saveCustomTheme = async (theme: Theme): Promise<void> => {
  try {
    const themeJson = JSON.stringify(theme);
    await AsyncStorage.setItem(CUSTOM_THEME_STORAGE_KEY, themeJson);
  } catch (error) {
    console.warn('Failed to save custom theme:', error);
  }
};

// Load custom theme
export const loadCustomTheme = async (): Promise<Theme | null> => {
  try {
    const themeJson = await AsyncStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    
    if (themeJson) {
      return JSON.parse(themeJson);
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to load custom theme:', error);
    return null;
  }
};

// Clear theme storage
export const clearThemeStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([THEME_STORAGE_KEY, CUSTOM_THEME_STORAGE_KEY]);
  } catch (error) {
    console.warn('Failed to clear theme storage:', error);
  }
};

// Get all theme storage keys
export const getThemeStorageKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter(key => key.startsWith('@white_room/theme'));
  } catch (error) {
    console.warn('Failed to get theme storage keys:', error);
    return [];
  }
};

// Reset theme to default
export const resetToDefaultTheme = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(THEME_STORAGE_KEY);
    await AsyncStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to reset theme to default:', error);
  }
};

// Check if custom theme exists
export const hasCustomTheme = async (): Promise<boolean> => {
  try {
    const themeJson = await AsyncStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    return !!themeJson;
  } catch (error) {
    console.warn('Failed to check for custom theme:', error);
    return false;
  }
};

// Export storage utilities
export const themeStorage = {
  saveThemePreference,
  loadThemePreference,
  saveCustomTheme,
  loadCustomTheme,
  clearThemeStorage,
  getThemeStorageKeys,
  resetToDefaultTheme,
  hasCustomTheme,
};