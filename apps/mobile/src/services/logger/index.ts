// Logger service

import { mmkvStorage } from '@/services/storage';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, any>;
}

export class LoggerService {
  private static instance: LoggerService;
  private logsKey = 'logs';
  private maxLogs = 1000; // Maximum number of logs to keep
  
  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }
  
  // Get all logs
  async getAllLogs(): Promise<LogEntry[]> {
    const logsJson = mmkvStorage.getString(this.logsKey);
    if (logsJson) {
      return JSON.parse(logsJson);
    }
    return [];
  }
  
  // Add a log entry
  async addLog(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const logs = await this.getAllLogs();
    
    const newLog: LogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    };
    
    // Add new log to the beginning
    logs.unshift(newLog);
    
    // Keep only the most recent logs
    if (logs.length > this.maxLogs) {
      logs.splice(this.maxLogs);
    }
    
    mmkvStorage.set(this.logsKey, JSON.stringify(logs));
  }
  
  // Log debug message
  async debug(message: string, metadata?: Record<string, any>): Promise<void> {
    await this.addLog('debug', message, metadata);
  }
  
  // Log info message
  async info(message: string, metadata?: Record<string, any>): Promise<void> {
    await this.addLog('info', message, metadata);
  }
  
  // Log warning message
  async warn(message: string, metadata?: Record<string, any>): Promise<void> {
    await this.addLog('warn', message, metadata);
  }
  
  // Log error message
  async error(message: string, metadata?: Record<string, any>): Promise<void> {
    await this.addLog('error', message, metadata);
  }
  
  // Clear all logs
  async clearLogs(): Promise<void> {
    mmkvStorage.delete(this.logsKey);
  }
  
  // Get logs by level
  async getLogsByLevel(level: 'debug' | 'info' | 'warn' | 'error'): Promise<LogEntry[]> {
    const logs = await this.getAllLogs();
    return logs.filter(log => log.level === level);
  }
  
  // Get recent logs
  async getRecentLogs(count: number = 50): Promise<LogEntry[]> {
    const logs = await this.getAllLogs();
    return logs.slice(0, count);
  }
  
  // Generate a unique log ID
  private generateLogId(): string {
    return 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const loggerService = LoggerService.getInstance();

// Convenience functions
export const logDebug = (message: string, metadata?: Record<string, any>) => loggerService.debug(message, metadata);
export const logInfo = (message: string, metadata?: Record<string, any>) => loggerService.info(message, metadata);
export const logWarn = (message: string, metadata?: Record<string, any>) => loggerService.warn(message, metadata);
export const logError = (message: string, metadata?: Record<string, any>) => loggerService.error(message, metadata);