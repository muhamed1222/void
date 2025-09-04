// Number utilities

// Clamp number between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Round to specified number of decimal places
export const roundTo = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// Format number with thousands separator
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Generate random integer between min and max (inclusive)
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Check if number is even
export const isEven = (num: number): boolean => {
  return num % 2 === 0;
};

// Check if number is odd
export const isOdd = (num: number): boolean => {
  return num % 2 !== 0;
};

// Calculate percentage
export const calculatePercentage = (part: number, whole: number): number => {
  if (whole === 0) return 0;
  return (part / whole) * 100;
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${roundTo(value, decimals)}%`;
};

// Convert to Roman numerals
export const toRoman = (num: number): string => {
  if (num <= 0) return '';
  
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];
  
  let result = '';
  
  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  
  return result;
};

// Generate range of numbers
export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];
  
  if (step > 0) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  }
  
  return result;
};