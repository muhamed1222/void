// Theme manager

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, lightTheme, darkTheme } from './index';

// Theme storage key
const THEME_STORAGE_KEY = '@white_room/theme';

// Theme manager class
class ThemeManager {
  private currentTheme: Theme = lightTheme;
  private isDarkMode: boolean = false;
  private listeners: Array<(theme: Theme, isDarkMode: boolean) => void> = [];

  // Initialize theme manager
  async initialize(): Promise<void> {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
        this.currentTheme = this.isDarkMode ? darkTheme : lightTheme;
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
      // Use default theme
      this.currentTheme = lightTheme;
      this.isDarkMode = false;
    }
  }

  // Get current theme
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // Get dark mode status
  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  // Toggle theme
  async toggleTheme(): Promise<void> {
    this.isDarkMode = !this.isDarkMode;
    this.currentTheme = this.isDarkMode ? darkTheme : lightTheme;
    
    try {
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY, 
        this.isDarkMode ? 'dark' : 'light'
      );
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
    
    // Notify listeners
    this.notifyListeners();
  }

  // Set theme explicitly
  async setTheme(isDarkMode: boolean): Promise<void> {
    this.isDarkMode = isDarkMode;
    this.currentTheme = isDarkMode ? darkTheme : lightTheme;
    
    try {
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY, 
        isDarkMode ? 'dark' : 'light'
      );
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
    
    // Notify listeners
    this.notifyListeners();
  }

  // Subscribe to theme changes
  subscribe(listener: (theme: Theme, isDarkMode: boolean) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of theme change
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener(this.currentTheme, this.isDarkMode);
    });
  }

  // Get system theme preference (simplified)
  async getSystemThemePreference(): Promise<'light' | 'dark'> {
    // In a real app, you would use Appearance API
    // For now, we'll return light as default
    return 'light';
  }

  // Apply system theme preference
  async applySystemThemePreference(): Promise<void> {
    const systemTheme = await this.getSystemThemePreference();
    const isDarkMode = systemTheme === 'dark';
    
    if (isDarkMode !== this.isDarkMode) {
      await this.setTheme(isDarkMode);
    }
  }
}

// Export singleton instance
export const themeManager = new ThemeManager();

// Export theme manager methods for convenience
export const initializeThemeManager = () => themeManager.initialize();
export const getCurrentTheme = () => themeManager.getCurrentTheme();
export const getIsDarkMode = () => themeManager.getIsDarkMode();
export const toggleTheme = () => themeManager.toggleTheme();
export const setTheme = (isDarkMode: boolean) => themeManager.setTheme(isDarkMode);
export const subscribeToThemeChanges = (listener: (theme: Theme, isDarkMode: boolean) => void) => 
  themeManager.subscribe(listener);
export const getSystemThemePreference = () => themeManager.getSystemThemePreference();
export const applySystemThemePreference = () => themeManager.applySystemThemePreference();