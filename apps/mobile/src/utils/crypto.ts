// Crypto utilities

// Generate a simple hash (not cryptographically secure)
export const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Generate a random token
export const generateToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// Mask sensitive data
export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }
  
  const visiblePart = data.slice(-visibleChars);
  const maskedPart = '*'.repeat(data.length - visibleChars);
  
  return maskedPart + visiblePart;
};

// Validate token format
export const validateTokenFormat = (token: string): boolean => {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(token) && token.length >= 16;
};

// Obfuscate email
export const obfuscateEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  
  if (!localPart || !domain) {
    return email;
  }
  
  const obfuscatedLocalPart = 
    localPart.length > 2 
      ? localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
      : '*'.repeat(localPart.length);
  
  return `${obfuscatedLocalPart}@${domain}`;
};

// Generate checksum
export const generateChecksum = (data: string): string => {
  let checksum = 0;
  
  for (let i = 0; i < data.length; i++) {
    checksum ^= data.charCodeAt(i);
  }
  
  return checksum.toString(16).padStart(2, '0');
};

// Validate checksum
export const validateChecksum = (data: string, checksum: string): boolean => {
  return generateChecksum(data) === checksum;
};

// Encode data to base64
export const encodeBase64 = (data: string): string => {
  try {
    return Buffer.from(data, 'utf-8').toString('base64');
  } catch {
    // Fallback for environments without Buffer
    return btoa(unescape(encodeURIComponent(data)));
  }
};

// Decode data from base64
export const decodeBase64 = (data: string): string => {
  try {
    return Buffer.from(data, 'base64').toString('utf-8');
  } catch {
    // Fallback for environments without Buffer
    return decodeURIComponent(escape(atob(data)));
  }
};