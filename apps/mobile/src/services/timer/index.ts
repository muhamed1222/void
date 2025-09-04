// Timer service

import { AppState } from 'react-native';
import { isSignificantTimeShift } from '@/utils/time';

export interface TimerInterval {
  start: number; // timestamp
  end?: number;  // timestamp
}

export interface TimerSession {
  id: string;
  intervals: TimerInterval[];
  startedAt: string; // ISO string
  type: 'focus' | 'mind' | 'body' | 'social';
}

export class TimerService {
  private static instance: TimerService;
  private currentSession: TimerSession | null = null;
  private lastAppState: string = AppState.currentState;
  private lastTimestamp: number = Date.now();
  
  private constructor() {
    // Subscribe to app state changes
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  
  static getInstance(): TimerService {
    if (!TimerService.instance) {
      TimerService.instance = new TimerService();
    }
    return TimerService.instance;
  }
  
  // Start a new timer session
  startSession(type: 'focus' | 'mind' | 'body' | 'social'): TimerSession {
    const sessionId = this.generateSessionId();
    const now = new Date().toISOString();
    
    this.currentSession = {
      id: sessionId,
      intervals: [{ start: Date.now() }],
      startedAt: now,
      type,
    };
    
    this.lastTimestamp = Date.now();
    return this.currentSession;
  }
  
  // Pause the current session
  pauseSession(): void {
    if (!this.currentSession) return;
    
    const lastInterval = this.currentSession.intervals[this.currentSession.intervals.length - 1];
    if (!lastInterval.end) {
      lastInterval.end = Date.now();
    }
  }
  
  // Resume the current session
  resumeSession(): void {
    if (!this.currentSession) return;
    
    const lastInterval = this.currentSession.intervals[this.currentSession.intervals.length - 1];
    if (lastInterval.end) {
      // Start a new interval
      this.currentSession.intervals.push({ start: Date.now() });
    }
  }
  
  // Stop the current session
  stopSession(): TimerSession | null {
    if (!this.currentSession) return null;
    
    // End the last interval if it's still running
    const lastInterval = this.currentSession.intervals[this.currentSession.intervals.length - 1];
    if (!lastInterval.end) {
      lastInterval.end = Date.now();
    }
    
    const session = this.currentSession;
    this.currentSession = null;
    return session;
  }
  
  // Get current session
  getCurrentSession(): TimerSession | null {
    return this.currentSession;
  }
  
  // Check if timer is running
  isRunning(): boolean {
    return this.currentSession !== null;
  }
  
  // Calculate total duration of session in minutes
  getSessionDuration(session: TimerSession): number {
    let totalMs = 0;
    
    for (const interval of session.intervals) {
      const end = interval.end || Date.now();
      totalMs += (end - interval.start);
    }
    
    return Math.floor(totalMs / (1000 * 60)); // Convert to minutes
  }
  
  // Handle app state changes
  private handleAppStateChange = (nextAppState: string): void => {
    if (!this.currentSession) return;
    
    const now = Date.now();
    
    // Check for significant time shifts
    if (isSignificantTimeShift(new Date(this.lastTimestamp), new Date(now))) {
      // Mark session as suspect
      console.warn('Significant time shift detected in timer session');
      // In a real implementation, you would flag this session for user confirmation
    }
    
    // Handle app going to background
    if (this.lastAppState === 'active' && nextAppState === 'background') {
      // Pause the timer when app goes to background
      this.pauseSession();
    }
    
    // Handle app coming to foreground
    if (this.lastAppState === 'background' && nextAppState === 'active') {
      // Resume the timer when app comes to foreground
      this.resumeSession();
    }
    
    this.lastAppState = nextAppState;
    this.lastTimestamp = now;
  };
  
  // Handle OS killing the app
  handleAppKill(): void {
    if (this.currentSession) {
      // End the last interval with current time
      const lastInterval = this.currentSession.intervals[this.currentSession.intervals.length - 1];
      if (!lastInterval.end) {
        lastInterval.end = Date.now();
      }
      
      // In a real implementation, you would save this session to persistent storage
      console.log('Timer session saved before app kill:', this.currentSession);
    }
  }
  
  // Generate a unique session ID
  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const timerService = TimerService.getInstance();