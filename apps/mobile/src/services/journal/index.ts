// Journal service

import { JournalEntry } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class JournalService {
  private static instance: JournalService;
  private journalKey = 'journal';
  
  static getInstance(): JournalService {
    if (!JournalService.instance) {
      JournalService.instance = new JournalService();
    }
    return JournalService.instance;
  }
  
  // Get all journal entries
  async getAllEntries(): Promise<JournalEntry[]> {
    const journalJson = mmkvStorage.getString(this.journalKey);
    if (journalJson) {
      return JSON.parse(journalJson);
    }
    return [];
  }
  
  // Get journal entry by date
  async getEntryByDate(date: string): Promise<JournalEntry | null> {
    const entries = await this.getAllEntries();
    return entries.find(entry => entry.date === date) || null;
  }
  
  // Save a journal entry
  async saveEntry(entry: JournalEntry): Promise<void> {
    const entries = await this.getAllEntries();
    const existingIndex = entries.findIndex(e => e.date === entry.date);
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    mmkvStorage.set(this.journalKey, JSON.stringify(entries));
  }
  
  // Delete a journal entry
  async deleteEntry(date: string): Promise<void> {
    const entries = await this.getAllEntries();
    const filtered = entries.filter(entry => entry.date !== date);
    mmkvStorage.set(this.journalKey, JSON.stringify(filtered));
  }
  
  // Get recent entries
  async getRecentEntries(count: number = 7): Promise<JournalEntry[]> {
    const entries = await this.getAllEntries();
    return entries.slice(-count).reverse();
  }
}

// Export singleton instance
export const journalService = JournalService.getInstance();