// Image cache utilities

// Simple in-memory image cache
class ImageCache {
  private cache: Map<string, string> = new Map(); // URL -> base64 data
  private loading: Set<string> = new Set(); // URLs currently being loaded
  private maxSize: number;
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }
  
  // Get image from cache
  get(url: string): string | null {
    return this.cache.get(url) || null;
  }
  
  // Set image in cache
  set(url: string, data: string): void {
    // If cache is at max size, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(url, data);
  }
  
  // Check if image is in cache
  has(url: string): boolean {
    return this.cache.has(url);
  }
  
  // Check if image is currently loading
  isLoading(url: string): boolean {
    return this.loading.has(url);
  }
  
  // Mark image as loading
  setLoading(url: string): void {
    this.loading.add(url);
  }
  
  // Mark image as finished loading
  setLoaded(url: string): void {
    this.loading.delete(url);
  }
  
  // Clear cache
  clear(): void {
    this.cache.clear();
    this.loading.clear();
  }
  
  // Get cache size
  getSize(): number {
    return this.cache.size;
  }
  
  // Get max cache size
  getMaxSize(): number {
    return this.maxSize;
  }
}

// Export singleton instance
export const imageCache = new ImageCache();

// Preload image
export const preloadImage = async (url: string): Promise<string | null> => {
  // Check if already in cache
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }
  
  // Check if already loading
  if (imageCache.isLoading(url)) {
    // Wait for loading to complete
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (imageCache.has(url)) {
          clearInterval(checkInterval);
          resolve(imageCache.get(url));
        } else if (!imageCache.isLoading(url)) {
          clearInterval(checkInterval);
          resolve(null);
        }
      }, 100);
    });
  }
  
  // Mark as loading
  imageCache.setLoading(url);
  
  try {
    // In a real app, you would fetch the image and convert it to base64
    // This is a placeholder implementation
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Convert blob to base64 (simplified)
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    
    // Cache the result
    imageCache.set(url, dataUrl);
    imageCache.setLoaded(url);
    
    return dataUrl;
  } catch (error) {
    console.error('Failed to preload image:', error);
    imageCache.setLoaded(url);
    return null;
  }
};

// Get cached image or preload it
export const getCachedImage = async (url: string): Promise<string | null> => {
  // Check cache first
  const cached = imageCache.get(url);
  if (cached) {
    return cached;
  }
  
  // Preload if not in cache
  return await preloadImage(url);
};

// Clear image cache
export const clearImageCache = (): void => {
  imageCache.clear();
};

// Get image cache statistics
export const getImageCacheStats = (): { 
  size: number; 
  maxSize: number; 
  usage: number 
} => {
  const size = imageCache.getSize();
  const maxSize = imageCache.getMaxSize();
  const usage = maxSize > 0 ? (size / maxSize) * 100 : 0;
  
  return {
    size,
    maxSize,
    usage: Math.round(usage * 100) / 100, // Round to 2 decimal places
  };
};