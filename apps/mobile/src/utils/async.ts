// Async utilities

// Sleep for specified milliseconds
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Retry a function with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay);
    }
  }
  
  throw lastError;
};

// Timeout a promise
export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms)),
  ]);
};

// Execute promises in sequence
export const sequence = async <T>(promises: (() => Promise<T>)[]): Promise<T[]> => {
  const results: T[] = [];
  
  for (const promise of promises) {
    results.push(await promise());
  }
  
  return results;
};

// Execute promises in parallel with concurrency limit
export const parallelWithLimit = async <T>(
  promises: (() => Promise<T>)[],
  limit: number
): Promise<T[]> => {
  const results: T[] = [];
  
  for (let i = 0; i < promises.length; i += limit) {
    const batch = promises.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map(p => p()));
    results.push(...batchResults);
  }
  
  return results;
};

// Debounce a function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
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

// Throttle a function
export const throttle = <T extends (...args: any[]) => any>(
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