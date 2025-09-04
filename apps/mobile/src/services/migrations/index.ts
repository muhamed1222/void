// Migrations service

import { STATE_VERSION, DB_VERSION } from '@/domain/constants';
import { mmkvStorage } from '@/services/storage';

export class MigrationsService {
  private static instance: MigrationsService;
  
  static getInstance(): MigrationsService {
    if (!MigrationsService.instance) {
      MigrationsService.instance = new MigrationsService();
    }
    return MigrationsService.instance;
  }
  
  // Get current state version
  getCurrentStateVersion(): number {
    const version = mmkvStorage.getString('STATE_VERSION');
    return version ? parseInt(version, 10) : 1;
  }
  
  // Set current state version
  setCurrentStateVersion(version: number): void {
    mmkvStorage.set('STATE_VERSION', version.toString());
  }
  
  // Check if state migration is needed
  isStateMigrationNeeded(): boolean {
    const currentVersion = this.getCurrentStateVersion();
    return currentVersion < STATE_VERSION;
  }
  
  // Run state migrations
  async runStateMigrations(): Promise<void> {
    const currentVersion = this.getCurrentStateVersion();
    
    if (currentVersion < STATE_VERSION) {
      // Run migrations here
      // For now, we're at version 1, so no migrations needed
      this.setCurrentStateVersion(STATE_VERSION);
    }
  }
  
  // Get current database version
  async getCurrentDbVersion(): Promise<number> {
    // This would interact with the SQLite database
    // For now, we'll return the constant
    return DB_VERSION;
  }
  
  // Set current database version
  async setCurrentDbVersion(version: number): Promise<void> {
    // This would interact with the SQLite database
    // For now, we'll just log
    console.log(`Setting DB version to ${version}`);
  }
  
  // Check if database migration is needed
  async isDbMigrationNeeded(): Promise<boolean> {
    const currentVersion = await this.getCurrentDbVersion();
    return currentVersion < DB_VERSION;
  }
  
  // Run database migrations
  async runDbMigrations(): Promise<void> {
    const currentVersion = await this.getCurrentDbVersion();
    
    if (currentVersion < DB_VERSION) {
      // Run migrations here
      // For now, we're at version 1, so no migrations needed
      await this.setCurrentDbVersion(DB_VERSION);
    }
  }
  
  // Reset all data (for version mismatch)
  async resetAllData(): Promise<void> {
    // Clear all MMKV storage
    mmkvStorage.clearAll();
    
    // Reset versions
    this.setCurrentStateVersion(STATE_VERSION);
    
    // In a real implementation, you would also reset the database
    console.log('All data has been reset due to version mismatch');
  }
}

// Export singleton instance
export const migrationsService = MigrationsService.getInstance();