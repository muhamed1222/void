// Formatting utilities

// Format discipline score (0-100) as a percentage string
export const formatDiscipline = (score: number): string => {
  return `${Math.round(score)}%`;
};

// Format mood value as emoji
export const formatMood = (mood: number): string => {
  switch (mood) {
    case -2: return '😢';
    case -1: return '😕';
    case 0: return '😐';
    case 1: return '🙂';
    case 2: return '😊';
    default: return '😐';
  }
};

// Format domain name for display
export const formatDomain = (domain: string): string => {
  switch (domain) {
    case 'mind': return 'Разум';
    case 'body': return 'Тело';
    case 'social': return 'Социальное';
    default: return domain;
  }
};

// Format duration in minutes as human-readable string
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} ч`;
  }
  
  return `${hours} ч ${remainingMinutes} мин`;
};

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - 3) + '...';
};

// Format number with leading zeros
export const formatNumberWithLeadingZeros = (num: number, digits: number): string => {
  return num.toString().padStart(digits, '0');
};

// Format date as relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} дн. назад`;
  }
  
  if (diffHours > 0) {
    return `${diffHours} ч. назад`;
  }
  
  if (diffMinutes > 0) {
    return `${diffMinutes} мин. назад`;
  }
  
  return 'только что';
};

// Format date as "Today", "Yesterday", or date string
export const formatRelativeDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const dateStr = date.toDateString();
  
  if (dateStr === today.toDateString()) {
    return 'Сегодня';
  }
  
  if (dateStr === yesterday.toDateString()) {
    return 'Вчера';
  }
  
  return date.toLocaleDateString('ru-RU');
};