// Sort utilities

// Sort directions
export type SortDirection = 'asc' | 'desc';

// Sort options
export interface SortOption<T> {
  key: keyof T;
  label: string;
  direction: SortDirection;
}

// Sort data by property
export const sortByProperty = <T>(
  data: T[],
  property: keyof T,
  direction: SortDirection = 'asc'
): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return direction === 'asc' ? -1 : 1;
    if (bVal == null) return direction === 'asc' ? 1 : -1;
    
    // Handle different types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal, 'ru');
      return direction === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      const comparison = aVal - bVal;
      return direction === 'asc' ? comparison : -comparison;
    }
    
    if (aVal instanceof Date && bVal instanceof Date) {
      const comparison = aVal.getTime() - bVal.getTime();
      return direction === 'asc' ? comparison : -comparison;
    }
    
    // Convert to string for other types
    const aStr = String(aVal);
    const bStr = String(bVal);
    const comparison = aStr.localeCompare(bStr, 'ru');
    return direction === 'asc' ? comparison : -comparison;
  });
};

// Sort by multiple properties
export const sortByMultipleProperties = <T>(
  data: T[],
  sortOptions: SortOption<T>[]
): T[] => {
  return [...data].sort((a, b) => {
    for (const option of sortOptions) {
      const { key, direction } = option;
      const aVal = a[key];
      const bVal = b[key];
      
      // Handle null/undefined values
      if (aVal == null && bVal == null) continue;
      if (aVal == null) return direction === 'asc' ? -1 : 1;
      if (bVal == null) return direction === 'asc' ? 1 : -1;
      
      let comparison = 0;
      
      // Handle different types
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal, 'ru');
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        // Convert to string for other types
        const aStr = String(aVal);
        const bStr = String(bVal);
        comparison = aStr.localeCompare(bStr, 'ru');
      }
      
      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison;
      }
    }
    
    return 0;
  });
};

// Toggle sort direction
export const toggleSortDirection = (
  direction: SortDirection
): SortDirection => {
  return direction === 'asc' ? 'desc' : 'asc';
};

// Get sort icon based on direction
export const getSortIcon = (
  direction: SortDirection | null
): string => {
  if (direction === 'asc') {
    return '↑';
  }
  
  if (direction === 'desc') {
    return '↓';
  }
  
  return '↕';
};

// Create sort option
export const createSortOption = <T>(
  key: keyof T,
  label: string,
  direction: SortDirection = 'asc'
): SortOption<T> => {
  return { key, label, direction };
};

// Apply sort to data
export const applySort = <T>(
  data: T[],
  sortOption: SortOption<T> | null
): T[] => {
  if (!sortOption) {
    return [...data];
  }
  
  return sortByProperty(data, sortOption.key, sortOption.direction);
};

// Get default sort option
export const getDefaultSortOption = <T>(
  key: keyof T,
  label: string
): SortOption<T> => {
  return createSortOption(key, label, 'asc');
};

// Check if data is sorted by property
export const isSortedBy = <T>(
  sortOption: SortOption<T> | null,
  property: keyof T
): boolean => {
  return sortOption?.key === property;
};

// Get current sort direction for property
export const getCurrentSortDirection = <T>(
  sortOption: SortOption<T> | null,
  property: keyof T
): SortDirection | null => {
  if (sortOption?.key === property) {
    return sortOption.direction;
  }
  
  return null;
};