// Constants used throughout the application

// Version constants for store and database migrations
export const STATE_VERSION = 1;
export const DB_VERSION = 1;

// Domain constants
export const DOMAINS: readonly string[] = ['mind', 'body', 'social'] as const;
export const MOOD_VALUES: readonly number[] = [-2, -1, 0, 1, 2] as const;

// Timer constants
export const MIN_FOCUS_DURATION = 10; // minutes
export const MAX_FOCUS_DURATION = 30; // minutes

// Coach AI constants
export const COACH_MODES = ['soft', 'strict'] as const;
export const TONE_MASKS = ['neutral', 'support', 'ultra'] as const;

// Console commands
export const CONSOLE_COMMANDS = {
  MINIMUM: '/minimum',
  PLAN: '/plan',
  LOWER: '/lower',
  REFLECT: '/reflect',
  START: '/start',
} as const;

// Navigation routes
export const ROUTES = {
  TODAY: 'Today',
  DIAGNOSTICS: 'Diagnostics',
  CONSOLE: 'Console',
  RECORD: 'Record',
  CATALOG: 'Catalog',
  SCENARIOS: 'Scenarios',
  PROTOCOLS: 'Protocols',
  SETTINGS: 'Settings',
  STATUS: 'Status',
  PROTOCOL_DETAIL: 'ProtocolDetail',
  ENTRY: 'Entry',
  ARCHIVE: 'Archive',
  DOCS: 'Docs',
} as const;