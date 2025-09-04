// Array utilities

// Chunk array into smaller arrays of specified size
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  
  return chunks;
};

// Remove duplicates from array
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// Shuffle array
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Get random element from array
export const getRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Group array by key
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Sort array by property
export const sortByProperty = <T>(array: T[], property: keyof T, descending: boolean = false): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (aVal < bVal) {
      return descending ? 1 : -1;
    }
    
    if (aVal > bVal) {
      return descending ? -1 : 1;
    }
    
    return 0;
  });
};

// Get unique values by property
export const getUniqueByProperty = <T>(array: T[], property: keyof T): T[] => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[property];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};