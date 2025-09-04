// Accessibility utilities

// Accessibility roles for React Native components
export const accessibilityRoles = {
  button: 'button',
  header: 'header',
  link: 'link',
  list: 'list',
  listItem: 'listitem',
  main: 'main',
  navigation: 'navigation',
  search: 'search',
  text: 'text',
  image: 'image',
  adjustable: 'adjustable',
  summary: 'summary',
  alert: 'alert',
  checkbox: 'checkbox',
  combobox: 'combobox',
  menu: 'menu',
  menubar: 'menubar',
  menuitem: 'menuitem',
  progressbar: 'progressbar',
  radio: 'radio',
  radiogroup: 'radiogroup',
  scrollbar: 'scrollbar',
  spinbutton: 'spinbutton',
  switch: 'switch',
  tab: 'tab',
  tablist: 'tablist',
  timer: 'timer',
  toolbar: 'toolbar',
} as const;

// Accessibility states
export const accessibilityStates = {
  disabled: 'disabled',
  selected: 'selected',
  checked: 'checked',
  busy: 'busy',
  expanded: 'expanded',
  collapsed: 'collapsed',
  hasPopup: 'haspopup',
  pressed: 'pressed',
  readOnly: 'readonly',
} as const;

// Generate accessibility label for screen
export const generateScreenAccessibilityLabel = (
  screenName: string,
  additionalInfo?: string
): string => {
  let label = `Экран ${screenName}`;
  
  if (additionalInfo) {
    label += `, ${additionalInfo}`;
  }
  
  return label;
};

// Generate accessibility hint for actions
export const generateActionAccessibilityHint = (
  action: string,
  result?: string
): string => {
  if (result) {
    return `Активируйте для ${action}. Это ${result}.`;
  }
  
  return `Активируйте для ${action}.`;
};

// Format number for accessibility
export const formatNumberForAccessibility = (num: number): string => {
  // In Russian, we need to handle cases correctly
  const absNum = Math.abs(num);
  const lastDigit = absNum % 10;
  const lastTwoDigits = absNum % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${num} элементов`;
  }
  
  switch (lastDigit) {
    case 1:
      return `${num} элемент`;
    case 2:
    case 3:
    case 4:
      return `${num} элемента`;
    default:
      return `${num} элементов`;
  }
};

// Format percentage for accessibility
export const formatPercentageForAccessibility = (value: number): string => {
  return `${value} процентов`;
};

// Format time for accessibility
export const formatTimeForAccessibility = (hours: number, minutes: number): string => {
  const hoursText = hours > 0 ? `${hours} часов ` : '';
  const minutesText = minutes > 0 ? `${minutes} минут` : '';
  
  return `${hoursText}${minutesText}`.trim() || '0 минут';
};

// Format date for accessibility
export const formatDateForAccessibility = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('ru-RU', options);
};

// Generate accessibility announcement
export const generateAccessibilityAnnouncement = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): { message: string; priority: 'polite' | 'assertive' } => {
  return {
    message,
    priority,
  };
};

// Check if screen reader is enabled (simplified)
export const isScreenReaderEnabled = (): boolean => {
  // In a real app, you would use a library like react-native-accessibility-info
  // This is a placeholder implementation
  return false;
};

// Get accessibility settings
export const getAccessibilitySettings = (): Record<string, any> => {
  // In a real app, you would use platform-specific APIs
  // This is a placeholder implementation
  return {
    isScreenReaderEnabled: isScreenReaderEnabled(),
    isBoldTextEnabled: false,
    isGrayscaleEnabled: false,
    isInvertColorsEnabled: false,
    isReduceMotionEnabled: false,
    isReduceTransparencyEnabled: false,
  };
};

// Generate contrast ratio description
export const generateContrastRatioDescription = (ratio: number): string => {
  if (ratio >= 7) {
    return 'Хороший контраст';
  } else if (ratio >= 4.5) {
    return 'Удовлетворительный контраст';
  } else {
    return 'Низкий контраст';
  }
};