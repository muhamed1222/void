// Settings service

import { mmkvStorage } from '@/services/storage';

export class SettingsService {
  private static instance: SettingsService;
  private settingsKey = 'settings';
  
  static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance;
  }
  
  // Get all settings
  async getAllSettings(): Promise<Record<string, any>> {
    const settingsJson = mmkvStorage.getString(this.settingsKey);
    if (settingsJson) {
      return JSON.parse(settingsJson);
    }
    return {};
  }
  
  // Get a specific setting
  async getSetting(key: string, defaultValue: any = null): Promise<any> {
    const settings = await this.getAllSettings();
    return settings[key] !== undefined ? settings[key] : defaultValue;
  }
  
  // Set a setting
  async setSetting(key: string, value: any): Promise<void> {
    const settings = await this.getAllSettings();
    settings[key] = value;
    mmkvStorage.set(this.settingsKey, JSON.stringify(settings));
  }
  
  // Remove a setting
  async removeSetting(key: string): Promise<void> {
    const settings = await this.getAllSettings();
    delete settings[key];
    mmkvStorage.set(this.settingsKey, JSON.stringify(settings));
  }
  
  // Clear all settings
  async clearAllSettings(): Promise<void> {
    mmkvStorage.delete(this.settingsKey);
  }
  
  // Get theme setting
  async getTheme(): Promise<'light' | 'dark'> {
    return await this.getSetting('theme', 'light');
  }
  
  // Set theme setting
  async setTheme(theme: 'light' | 'dark'): Promise<void> {
    await this.setSetting('theme', theme);
  }
  
  // Get language setting
  async getLanguage(): Promise<'ru' | 'en'> {
    return await this.getSetting('language', 'ru');
  }
  
  // Set language setting
  async setLanguage(language: 'ru' | 'en'): Promise<void> {
    await this.setSetting('language', language);
  }
}

// Export singleton instance
export const settingsService = SettingsService.getInstance();