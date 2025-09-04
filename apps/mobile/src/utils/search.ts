// Search utilities

// Search options
export interface SearchOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
  fuzzy?: boolean;
  maxResults?: number;
}

// Search result
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: { property: string; value: string }[];
}

// Simple text search
export const searchText = (
  text: string,
  query: string,
  options: SearchOptions = {}
): boolean => {
  const {
    caseSensitive = false,
    wholeWord = false,
    fuzzy = false
  } = options;
  
  let searchText = caseSensitive ? text : text.toLowerCase();
  let searchQuery = caseSensitive ? query : query.toLowerCase();
  
  if (fuzzy) {
    return fuzzySearch(searchText, searchQuery);
  }
  
  if (wholeWord) {
    const regex = new RegExp(`\\b${escapeRegExp(searchQuery)}\\b`, caseSensitive ? 'g' : 'gi');
    return regex.test(searchText);
  }
  
  return searchText.includes(searchQuery);
};

// Fuzzy search implementation
const fuzzySearch = (text: string, query: string): boolean => {
  let queryIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    if (queryIndex < query.length && text[i] === query[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === query.length;
};

// Escape special regex characters
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Search in object properties
export const searchInObject = <T extends Record<string, any>>(
  obj: T,
  query: string,
  properties: (keyof T)[] = [],
  options: SearchOptions = {}
): boolean => {
  const propsToSearch = properties.length > 0 ? properties : Object.keys(obj) as (keyof T)[];
  
  return propsToSearch.some(prop => {
    const value = obj[prop];
    if (typeof value === 'string') {
      return searchText(value, query, options);
    }
    return false;
  });
};

// Search in array of objects
export const searchInArray = <T extends Record<string, any>>(
  array: T[],
  query: string,
  properties: (keyof T)[] = [],
  options: SearchOptions = {}
): T[] => {
  const {
    maxResults = Infinity
  } = options;
  
  const results = array.filter(item => 
    searchInObject(item, query, properties, options)
  );
  
  return results.slice(0, maxResults);
};

// Ranked search in array of objects
export const rankedSearchInArray = <T extends Record<string, any>>(
  array: T[],
  query: string,
  properties: (keyof T)[] = [],
  options: SearchOptions = {}
): SearchResult<T>[] => {
  const {
    maxResults = Infinity
  } = options;
  
  const results: SearchResult<T>[] = [];
  
  array.forEach(item => {
    let score = 0;
    const matches: { property: string; value: string }[] = [];
    
    const propsToSearch = properties.length > 0 ? properties : Object.keys(item) as (keyof T)[];
    
    propsToSearch.forEach(prop => {
      const value = item[prop];
      if (typeof value === 'string') {
        if (searchText(value, query, options)) {
          score += 1;
          matches.push({ property: prop as string, value });
        }
      }
    });
    
    if (score > 0) {
      results.push({ item, score, matches });
    }
  });
  
  // Sort by score (descending)
  results.sort((a, b) => b.score - a.score);
  
  return results.slice(0, maxResults);
};

// Highlight search matches in text
export const highlightMatches = (
  text: string,
  query: string,
  highlightTag: string = 'mark'
): string => {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, `<${highlightTag}>$1</${highlightTag}>`);
};

// Create search index for faster searches
export class SearchIndex<T extends Record<string, any>> {
  private index: Map<string, Set<T>> = new Map();
  private items: T[] = [];
  private properties: (keyof T)[];
  
  constructor(properties: (keyof T)[]) {
    this.properties = properties;
  }
  
  // Add item to index
  add(item: T): void {
    this.items.push(item);
    this.updateIndex(item);
  }
  
  // Remove item from index
  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.rebuildIndex();
    }
  }
  
  // Update item in index
  update(oldItem: T, newItem: T): void {
    const index = this.items.indexOf(oldItem);
    if (index > -1) {
      this.items[index] = newItem;
      this.rebuildIndex();
    }
  }
  
  // Search in index
  search(query: string, options: SearchOptions = {}): T[] {
    const {
      maxResults = Infinity
    } = options;
    
    // For simplicity, we'll do a linear search
    // In a real implementation, you would use the index for faster lookups
    return searchInArray(this.items, query, this.properties, options).slice(0, maxResults);
  }
  
  // Rebuild the entire index
  private rebuildIndex(): void {
    this.index.clear();
    this.items.forEach(item => this.updateIndex(item));
  }
  
  // Update index for a single item
  private updateIndex(item: T): void {
    this.properties.forEach(prop => {
      const value = item[prop];
      if (typeof value === 'string') {
        const words = value.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (!this.index.has(word)) {
            this.index.set(word, new Set());
          }
          this.index.get(word)!.add(item);
        });
      }
    });
  }
}

// Get search suggestions
export const getSearchSuggestions = <T extends Record<string, any>>(
  array: T[],
  query: string,
  property: keyof T,
  maxSuggestions: number = 5
): string[] => {
  if (!query) return [];
  
  const suggestions = new Set<string>();
  
  array.forEach(item => {
    const value = item[property];
    if (typeof value === 'string' && searchText(value, query)) {
      suggestions.add(value);
    }
  });
  
  return Array.from(suggestions).slice(0, maxSuggestions);
};