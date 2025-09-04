// Feature flags for the application

// Development flags
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Feature flags
export const FEATURE_AI_COACH = false; // Enable when AI integration is ready
export const FEATURE_NOTIFICATIONS = false; // Enable when notifications are implemented
export const FEATURE_DETAILED_STATS = false; // Enable detailed statistics

// Migration flags
export const MIGRATION_STORE_RESET = false; // Reset store on version mismatch
export const MIGRATION_DB_RESET = false; // Reset database on version mismatch

// Safety flags
export const SAFETY_GATE_ENABLED = true; // Enable safety checks for critical situations