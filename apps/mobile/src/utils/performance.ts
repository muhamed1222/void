// Performance utilities

// Performance timer
export class PerformanceTimer {
  private startTime: number | null = null;
  private endTime: number | null = null;
  
  start(): void {
    this.startTime = performance.now();
  }
  
  stop(): number | null {
    if (this.startTime === null) {
      console.warn('Timer not started');
      return null;
    }
    
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  }
  
  reset(): void {
    this.startTime = null;
    this.endTime = null;
  }
  
  getDuration(): number | null {
    if (this.startTime === null || this.endTime === null) {
      return null;
    }
    
    return this.endTime - this.startTime;
  }
}

// Measure function execution time
export const measureExecutionTime = async <T>(
  fn: () => Promise<T>,
  label: string = 'Execution'
): Promise<T> => {
  const timer = new PerformanceTimer();
  timer.start();
  
  try {
    const result = await fn();
    const duration = timer.stop();
    
    if (duration !== null) {
      console.log(`${label} took ${duration.toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    timer.stop();
    throw error;
  }
};

// Measure sync function execution time
export const measureSyncExecutionTime = <T>(
  fn: () => T,
  label: string = 'Execution'
): T => {
  const timer = new PerformanceTimer();
  timer.start();
  
  try {
    const result = fn();
    const duration = timer.stop();
    
    if (duration !== null) {
      console.log(`${label} took ${duration.toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    timer.stop();
    throw error;
  }
};

// Memory usage tracker (simplified)
export const getMemoryUsage = (): Record<string, any> => {
  // In a real app, you might use a library or platform-specific APIs
  // This is a placeholder implementation
  return {
    timestamp: Date.now(),
    // Add actual memory usage when available
  };
};

// Track component render time
export const trackRenderTime = (componentName: string): PerformanceTimer => {
  const timer = new PerformanceTimer();
  timer.start();
  
  // Log when component unmounts (this would need to be called in useEffect cleanup)
  const stopTracking = () => {
    const duration = timer.stop();
    if (duration !== null) {
      console.log(`Component ${componentName} rendered in ${duration.toFixed(2)}ms`);
    }
  };
  
  return timer;
};

// Debounce function for performance optimization
export const performanceDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Throttle function for performance optimization
export const performanceThrottle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Cache with TTL for performance optimization
export class PerformanceCache<T> {
  private cache: Map<string, { value: T; expiry: number }> = new Map();
  private defaultTTL: number;
  
  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.defaultTTL = defaultTTL;
  }
  
  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }
  
  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  has(key: string): boolean {
    return this.get(key) !== null;
  }
  
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}