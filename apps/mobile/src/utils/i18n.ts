// Internationalization utilities

// Supported languages
export type Language = 'ru' | 'en';

// Translation resources
const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation
    'nav.today': 'Сегодня',
    'nav.diagnostics': 'Диагностика',
    'nav.console': 'Консоль',
    
    // Common
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.add': 'Добавить',
    'common.close': 'Закрыть',
    'common.ok': 'ОК',
    'common.yes': 'Да',
    'common.no': 'Нет',
    
    // Today screen
    'today.title': 'Сегодня',
    'today.tasks': 'Задачи',
    'today.add_task': 'Добавить задачу',
    
    // Diagnostics screen
    'diagnostics.title': 'Диагностика',
    'diagnostics.metrics': 'Метрики',
    
    // Console screen
    'console.title': 'Консоль',
    'console.placeholder': 'Введите команду...',
    
    // Settings
    'settings.title': 'Настройки',
    'settings.language': 'Язык',
    'settings.theme': 'Тема',
    
    // Errors
    'error.network': 'Ошибка сети',
    'error.validation': 'Ошибка валидации',
  },
  en: {
    // Navigation
    'nav.today': 'Today',
    'nav.diagnostics': 'Diagnostics',
    'nav.console': 'Console',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.close': 'Close',
    'common.ok': 'OK',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Today screen
    'today.title': 'Today',
    'today.tasks': 'Tasks',
    'today.add_task': 'Add task',
    
    // Diagnostics screen
    'diagnostics.title': 'Diagnostics',
    'diagnostics.metrics': 'Metrics',
    
    // Console screen
    'console.title': 'Console',
    'console.placeholder': 'Enter command...',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    
    // Errors
    'error.network': 'Network error',
    'error.validation': 'Validation error',
  },
};

// Current language
let currentLanguage: Language = 'ru';

// Set current language
export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
};

// Get current language
export const getLanguage = (): Language => {
  return currentLanguage;
};

// Translate a key
export const t = (key: string, params: Record<string, any> = {}): string => {
  let translation = translations[currentLanguage][key] || key;
  
  // Replace parameters
  Object.keys(params).forEach(param => {
    translation = translation.replace(`{{${param}}}`, params[param]);
  });
  
  return translation;
};

// Check if translation exists
export const hasTranslation = (key: string): boolean => {
  return !!translations[currentLanguage][key];
};

// Get all translations for current language
export const getCurrentTranslations = (): Record<string, string> => {
  return translations[currentLanguage];
};

// Format translation with pluralization
export const tp = (
  key: string, 
  count: number, 
  params: Record<string, any> = {}
): string => {
  // Simple pluralization for Russian
  let form = key;
  
  if (currentLanguage === 'ru') {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      form = `${key}_many`;
    } else if (lastDigit === 1) {
      form = `${key}_one`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      form = `${key}_few`;
    } else {
      form = `${key}_many`;
    }
  } else {
    // English pluralization
    form = count === 1 ? key : `${key}_plural`;
  }
  
  return t(form, { ...params, count });
};