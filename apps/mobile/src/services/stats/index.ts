// Stats service

import { Stats } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class StatsService {
  private static instance: StatsService;
  private statsKey = 'stats';
  
  static getInstance(): StatsService {
    if (!StatsService.instance) {
      StatsService.instance = new StatsService();
    }
    return StatsService.instance;
  }
  
  // Get all stats
  async getAllStats(): Promise<Stats[]> {
    const statsJson = mmkvStorage.getString(this.statsKey);
    if (statsJson) {
      return JSON.parse(statsJson);
    }
    return [];
  }
  
  // Get stats by date
  async getStatsByDate(date: string): Promise<Stats | null> {
    const stats = await this.getAllStats();
    return stats.find(s => s.date === date) || null;
  }
  
  // Save stats
  async saveStats(stats: Stats): Promise<void> {
    const allStats = await this.getAllStats();
    const existingIndex = allStats.findIndex(s => s.date === stats.date);
    
    if (existingIndex >= 0) {
      allStats[existingIndex] = stats;
    } else {
      allStats.push(stats);
    }
    
    mmkvStorage.set(this.statsKey, JSON.stringify(allStats));
  }
  
  // Delete stats
  async deleteStats(date: string): Promise<void> {
    const stats = await this.getAllStats();
    const filtered = stats.filter(s => s.date !== date);
    mmkvStorage.set(this.statsKey, JSON.stringify(filtered));
  }
  
  // Get recent stats
  async getRecentStats(count: number = 7): Promise<Stats[]> {
    const stats = await this.getAllStats();
    return stats.slice(-count).reverse();
  }
  
  // Calculate streak
  async calculateStreak(): Promise<number> {
    const stats = await this.getRecentStats(30); // Check last 30 days
    let streak = 0;
    
    // Count consecutive days with discipline > 0
    for (const stat of stats) {
      if (stat.discipline > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
}

// Export singleton instance
export const statsService = StatsService.getInstance();