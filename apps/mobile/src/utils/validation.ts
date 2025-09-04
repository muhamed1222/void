// Validation utilities

// Validate email
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (Russian format)
export const validatePhoneNumber = (phone: string): boolean => {
  const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return re.test(phone);
};

// Validate password strength
export const validatePasswordStrength = (password: string): { 
  isValid: boolean; 
  score: number; 
  feedback: string 
} => {
  let score = 0;
  const feedback: string[] = [];
  
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Пароль должен содержать минимум 8 символов');
  }
  
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Пароль должен содержать строчные буквы');
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Пароль должен содержать заглавные буквы');
  }
  
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Пароль должен содержать цифры');
  }
  
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Пароль должен содержать специальные символы');
  }
  
  const isValid = score >= 4;
  return {
    isValid,
    score,
    feedback: feedback.join(', ') || 'Пароль надежный',
  };
};

// Validate URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate credit card number (Luhn algorithm)
export const validateCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// Validate date format (YYYY-MM-DD)
export const validateDateFormat = (date: string): boolean => {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(date)) return false;
  
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

// Validate time format (HH:MM)
export const validateTimeFormat = (time: string): boolean => {
  const re = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(time);
};

// Check if value is required
export const isRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

// Check if value has minimum length
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

// Check if value has maximum length
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};