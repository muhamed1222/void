// Sessions service

import { Session } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class SessionsService {
  private static instance: SessionsService;
  private sessionsKey = 'sessions';
  
  static getInstance(): SessionsService {
    if (!SessionsService.instance) {
      SessionsService.instance = new SessionsService();
    }
    return SessionsService.instance;
  }
  
  // Get all sessions
  async getAllSessions(): Promise<Session[]> {
    const sessionsJson = mmkvStorage.getString(this.sessionsKey);
    if (sessionsJson) {
      return JSON.parse(sessionsJson);
    }
    return [];
  }
  
  // Get session by ID
  async getSessionById(id: string): Promise<Session | null> {
    const sessions = await this.getAllSessions();
    return sessions.find(session => session.id === id) || null;
  }
  
  // Save a session
  async saveSession(session: Session): Promise<void> {
    const sessions = await this.getAllSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    
    mmkvStorage.set(this.sessionsKey, JSON.stringify(sessions));
  }
  
  // Delete a session
  async deleteSession(id: string): Promise<void> {
    const sessions = await this.getAllSessions();
    const filtered = sessions.filter(session => session.id !== id);
    mmkvStorage.set(this.sessionsKey, JSON.stringify(filtered));
  }
  
  // Get sessions by date range
  async getSessionsByDateRange(startDate: string, endDate: string): Promise<Session[]> {
    const sessions = await this.getAllSessions();
    return sessions.filter(session => {
      const sessionDate = session.startedAt.split('T')[0];
      return sessionDate >= startDate && sessionDate <= endDate;
    });
  }
  
  // Get completed sessions
  async getCompletedSessions(): Promise<Session[]> {
    const sessions = await this.getAllSessions();
    return sessions.filter(session => session.completed);
  }
}

// Export singleton instance
export const sessionsService = SessionsService.getInstance();