// Analytics service

import * as Sentry from 'sentry-expo';
import { IS_DEVELOPMENT } from '@/domain/flags';
import { loggerService } from '@/services/logger';

export class AnalyticsService {
  private static instance: AnalyticsService;
  private initialized = false;
  
  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  // Initialize analytics
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    try {
      // Initialize Sentry
      Sentry.init({
        dsn: 'YOUR_SENTRY_DSN_HERE', // Replace with actual Sentry DSN
        enableInExpoDevelopment: false,
        debug: IS_DEVELOPMENT,
      });
      
      this.initialized = true;
      loggerService.info('Analytics service initialized');
    } catch (error) {
      loggerService.error('Failed to initialize analytics service', { error });
    }
  }
  
  // Log an event
  logEvent(name: string, properties: Record<string, any> = {}): void {
    if (!this.initialized) {
      return;
    }
    
    try {
      // Log to Sentry
      Sentry.Native.captureMessage(`Event: ${name}`, {
        level: 'info',
        contexts: {
          event: {
            name,
            properties,
          },
        },
      });
      
      // Log to local logger
      loggerService.info(`Analytics event: ${name}`, properties);
    } catch (error) {
      loggerService.error('Failed to log analytics event', { error, name, properties });
    }
  }
  
  // Log an error
  logError(error: Error, extras: Record<string, any> = {}): void {
    if (!this.initialized) {
      return;
    }
    
    try {
      // Log to Sentry
      Sentry.Native.captureException(error, {
        contexts: {
          extras,
        },
      });
      
      // Log to local logger
      loggerService.error('Analytics error', { error: error.message, stack: error.stack, extras });
    } catch (logError) {
      loggerService.error('Failed to log analytics error', { error, logError });
    }
  }
  
  // Log a user action
  logUserAction(action: string, details: Record<string, any> = {}): void {
    this.logEvent('user_action', { action, ...details });
  }
  
  // Set user context
  setUserContext(userId: string, properties: Record<string, any> = {}): void {
    if (!this.initialized) {
      return;
    }
    
    try {
      Sentry.Native.setUser({
        id: userId,
        ...properties,
      });
    } catch (error) {
      loggerService.error('Failed to set user context', { error, userId, properties });
    }
  }
  
  // Clear user context
  clearUserContext(): void {
    if (!this.initialized) {
      return;
    }
    
    try {
      Sentry.Native.setUser(null);
    } catch (error) {
      loggerService.error('Failed to clear user context', { error });
    }
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance();