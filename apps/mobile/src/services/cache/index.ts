// Cache service

import { mmkvStorage } from '@/services/storage';

export class CacheService {
  private static instance: CacheService;
  private cachePrefix = 'cache_';
  private defaultTTL = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }
  
  // Generate cache key
  private generateCacheKey(key: string): string {
    return `${this.cachePrefix}${key}`;
  }
  
  // Set item in cache with TTL
  setItem(key: string, value: any, ttl: number = this.defaultTTL): void {
    const cacheKey = this.generateCacheKey(key);
    const expiry = Date.now() + ttl;
    
    const cacheItem = {
      value,
      expiry,
    };
    
    mmkvStorage.set(cacheKey, JSON.stringify(cacheItem));
  }
  
  // Get item from cache
  getItem<T>(key: string): T | null {
    const cacheKey = this.generateCacheKey(key);
    const cacheItemJson = mmkvStorage.getString(cacheKey);
    
    if (!cacheItemJson) {
      return null;
    }
    
    try {
      const cacheItem = JSON.parse(cacheItemJson);
      
      // Check if item has expired
      if (Date.now() > cacheItem.expiry) {
        // Remove expired item
        mmkvStorage.delete(cacheKey);
        return null;
      }
      
      return cacheItem.value;
    } catch (error) {
      console.error('Error parsing cache item:', error);
      return null;
    }
  }
  
  // Remove item from cache
  removeItem(key: string): void {
    const cacheKey = this.generateCacheKey(key);
    mmkvStorage.delete(cacheKey);
  }
  
  // Clear all cache items
  clearCache(): void {
    const keys = mmkvStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(this.cachePrefix));
    
    cacheKeys.forEach(key => {
      mmkvStorage.delete(key);
    });
  }
  
  // Check if item exists in cache and is not expired
  hasItem(key: string): boolean {
    const item = this.getItem(key);
    return item !== null;
  }
  
  // Get item expiry time
  getItemExpiry(key: string): number | null {
    const cacheKey = this.generateCacheKey(key);
    const cacheItemJson = mmkvStorage.getString(cacheKey);
    
    if (!cacheItemJson) {
      return null;
    }
    
    try {
      const cacheItem = JSON.parse(cacheItemJson);
      return cacheItem.expiry;
    } catch (error) {
      console.error('Error parsing cache item:', error);
      return null;
    }
  }
}

// Export singleton instance
export const cacheService = CacheService.getInstance();