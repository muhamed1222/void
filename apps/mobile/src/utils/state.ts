// State management utilities

// Deep equality check
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    
    return true;
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  
  return true;
};

// Shallow equality check
export const shallowEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (a[key] !== b[key]) return false;
  }
  
  return true;
};

// Immutably update object property
export const updateProperty = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T => {
  return { ...obj, [key]: value };
};

// Immutably update nested object property
export const updateNestedProperty = <T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any
): T => {
  const keys = path.split('.');
  const result = { ...obj };
  let current: any = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
  
  return result;
};

// Immutably add item to array
export const addItemToArray = <T>(array: T[], item: T): T[] => {
  return [...array, item];
};

// Immutably remove item from array by index
export const removeItemFromArray = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

// Immutably update item in array by index
export const updateItemInArray = <T>(array: T[], index: number, item: T): T[] => {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
};

// Immutably remove item from array by predicate
export const removeItemFromArrayByPredicate = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  const index = array.findIndex(predicate);
  if (index === -1) return array;
  return removeItemFromArray(array, index);
};

// Immutably update item in array by predicate
export const updateItemInArrayByPredicate = <T>(
  array: T[],
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): T[] => {
  const index = array.findIndex(predicate);
  if (index === -1) return array;
  
  const updatedItem = updater(array[index]);
  return updateItemInArray(array, index, updatedItem);
};

// Merge two objects
export const mergeObjects = <T extends Record<string, any>>(
  obj1: T,
  obj2: Partial<T>
): T => {
  return { ...obj1, ...obj2 };
};

// Get nested property value
export const getNestedProperty = <T>(
  obj: Record<string, any>,
  path: string,
  defaultValue: T | null = null
): T | null => {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current !== undefined ? current : defaultValue;
};

// Create a reducer for use with useReducer
export const createReducer = <S, A>(
  initialState: S,
  handlers: Record<string, (state: S, action: A) => S>
) => {
  return (state: S = initialState, action: A & { type: string }): S => {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
};

// Create a simple store
export class SimpleStore<T> {
  private state: T;
  private listeners: ((state: T) => void)[] = [];
  
  constructor(initialState: T) {
    this.state = initialState;
  }
  
  getState(): T {
    return this.state;
  }
  
  setState(newState: T): void {
    this.state = newState;
    this.listeners.forEach(listener => listener(this.state));
  }
  
  subscribe(listener: (state: T) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  
  update(updater: (state: T) => T): void {
    this.setState(updater(this.state));
  }
}

// Create a memoized selector
export const createSelector = <T, R>(
  selector: (state: T) => R,
  equalityFn: (a: R, b: R) => boolean = shallowEqual
) => {
  let lastState: T | null = null;
  let lastResult: R | null = null;
  
  return (state: T): R => {
    if (lastState !== null && equalityFn(lastResult as R, selector(state))) {
      return lastResult as R;
    }
    
    lastState = state;
    lastResult = selector(state);
    return lastResult;
  };
};