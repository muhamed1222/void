// Filter utilities

// Filter operators
export type FilterOperator = 
  | 'eq'      // equals
  | 'ne'      // not equals
  | 'gt'      // greater than
  | 'gte'     // greater than or equals
  | 'lt'      // less than
  | 'lte'     // less than or equals
  | 'in'      // in array
  | 'nin'     // not in array
  | 'like'    // contains (for strings)
  | 'ilike'   // contains (case insensitive)
  | 'null'    // is null
  | 'nnull';  // is not null

// Filter condition
export interface FilterCondition<T> {
  property: keyof T;
  operator: FilterOperator;
  value: any;
}

// Filter group
export interface FilterGroup<T> {
  conditions: FilterCondition<T>[];
  operator: 'and' | 'or';
}

// Apply filter to data
export const applyFilter = <T>(
  data: T[],
  filter: FilterCondition<T> | FilterGroup<T>
): T[] => {
  if (isFilterGroup(filter)) {
    return applyFilterGroup(data, filter);
  }
  
  return applyFilterCondition(data, filter);
};

// Check if filter is a group
const isFilterGroup = <T>(
  filter: FilterCondition<T> | FilterGroup<T>
): filter is FilterGroup<T> => {
  return 'conditions' in filter && 'operator' in filter;
};

// Apply filter condition
const applyFilterCondition = <T>(
  data: T[],
  condition: FilterCondition<T>
): T[] => {
  const { property, operator, value } = condition;
  
  return data.filter(item => {
    const itemValue = item[property];
    
    switch (operator) {
      case 'eq':
        return itemValue === value;
      
      case 'ne':
        return itemValue !== value;
      
      case 'gt':
        return itemValue > value;
      
      case 'gte':
        return itemValue >= value;
      
      case 'lt':
        return itemValue < value;
      
      case 'lte':
        return itemValue <= value;
      
      case 'in':
        return Array.isArray(value) && value.includes(itemValue);
      
      case 'nin':
        return Array.isArray(value) && !value.includes(itemValue);
      
      case 'like':
        if (typeof itemValue === 'string' && typeof value === 'string') {
          return itemValue.includes(value);
        }
        return false;
      
      case 'ilike':
        if (typeof itemValue === 'string' && typeof value === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      
      case 'null':
        return itemValue == null;
      
      case 'nnull':
        return itemValue != null;
      
      default:
        return true;
    }
  });
};

// Apply filter group
const applyFilterGroup = <T>(
  data: T[],
  group: FilterGroup<T>
): T[] => {
  const { conditions, operator } = group;
  
  if (operator === 'and') {
    return conditions.reduce((filteredData, condition) => {
      return applyFilter(filteredData, condition);
    }, data);
  }
  
  // For 'or' operator, we need to collect all matching items
  const allMatchingItems = new Set<T>();
  
  conditions.forEach(condition => {
    const matchingItems = applyFilter(data, condition);
    matchingItems.forEach(item => allMatchingItems.add(item));
  });
  
  return Array.from(allMatchingItems);
};

// Create filter condition
export const createFilterCondition = <T>(
  property: keyof T,
  operator: FilterOperator,
  value: any
): FilterCondition<T> => {
  return { property, operator, value };
};

// Create filter group
export const createFilterGroup = <T>(
  conditions: FilterCondition<T>[],
  operator: 'and' | 'or' = 'and'
): FilterGroup<T> => {
  return { conditions, operator };
};

// Combine filters
export const combineFilters = <T>(
  filters: (FilterCondition<T> | FilterGroup<T>)[],
  operator: 'and' | 'or' = 'and'
): FilterGroup<T> => {
  return { conditions: filters, operator };
};

// Get filter value
export const getFilterValue = <T>(
  filter: FilterCondition<T> | FilterGroup<T>,
  property: keyof T
): any | null => {
  if (isFilterGroup(filter)) {
    for (const condition of filter.conditions) {
      if (condition.property === property) {
        return condition.value;
      }
    }
    return null;
  }
  
  return filter.property === property ? filter.value : null;
};

// Update filter value
export const updateFilterValue = <T>(
  filter: FilterCondition<T> | FilterGroup<T>,
  property: keyof T,
  value: any
): FilterCondition<T> | FilterGroup<T> => {
  if (isFilterGroup(filter)) {
    const updatedConditions = filter.conditions.map(condition => {
      if (condition.property === property) {
        return { ...condition, value };
      }
      return condition;
    });
    
    return { ...filter, conditions: updatedConditions };
  }
  
  if (filter.property === property) {
    return { ...filter, value };
  }
  
  return filter;
};

// Remove filter condition
export const removeFilterCondition = <T>(
  filter: FilterCondition<T> | FilterGroup<T>,
  property: keyof T
): FilterCondition<T> | FilterGroup<T> | null => {
  if (isFilterGroup(filter)) {
    const filteredConditions = filter.conditions.filter(
      condition => condition.property !== property
    );
    
    if (filteredConditions.length === 0) {
      return null;
    }
    
    if (filteredConditions.length === 1) {
      return filteredConditions[0];
    }
    
    return { ...filter, conditions: filteredConditions };
  }
  
  return filter.property === property ? null : filter;
};