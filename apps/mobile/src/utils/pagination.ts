// Pagination utilities

// Pagination state
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Create pagination state
export const createPaginationState = (
  page: number = 1,
  limit: number = 10,
  total: number = 0
): PaginationState => {
  return {
    page,
    limit,
    total,
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
};

// Get pagination info
export const getPaginationInfo = (
  page: number,
  limit: number,
  total: number
): PaginationState => {
  return createPaginationState(page, limit, total);
};

// Get items for current page
export const getPaginatedItems = <T>(
  items: T[],
  page: number,
  limit: number
): T[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return items.slice(startIndex, endIndex);
};

// Generate page numbers for pagination controls
export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | '...')[] => {
  const pages: (number | '...')[] = [];
  
  if (totalPages <= maxVisiblePages) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show first page
    pages.push(1);
    
    // Calculate start and end of visible range
    let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages - 1, start + maxVisiblePages - 3);
    
    // Adjust if we're near the end
    if (end - start < maxVisiblePages - 3) {
      start = Math.max(2, end - (maxVisiblePages - 3));
    }
    
    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Show last page
    pages.push(totalPages);
  }
  
  return pages;
};

// Check if page is valid
export const isValidPage = (
  page: number,
  totalPages: number
): boolean => {
  return page >= 1 && page <= totalPages;
};

// Get next page
export const getNextPage = (
  currentPage: number,
  totalPages: number
): number | null => {
  const nextPage = currentPage + 1;
  return nextPage <= totalPages ? nextPage : null;
};

// Get previous page
export const getPreviousPage = (
  currentPage: number
): number | null => {
  const prevPage = currentPage - 1;
  return prevPage >= 1 ? prevPage : null;
};

// Get first page
export const getFirstPage = (): number => {
  return 1;
};

// Get last page
export const getLastPage = (
  total: number,
  limit: number
): number => {
  return Math.ceil(total / limit);
};

// Format pagination range
export const formatPaginationRange = (
  page: number,
  limit: number,
  total: number
): string => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  
  return `${start}-${end} из ${total}`;
};

// Check if pagination is needed
export const isPaginationNeeded = (
  total: number,
  limit: number
): boolean => {
  return total > limit;
};