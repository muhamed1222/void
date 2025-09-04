// Metrics service

import { Session, Stats, StateVector } from '@/domain/types';
import { calculateDuration } from '@/utils/time';

export class MetricsService {
  // Calculate Success Rate (SR)
  // SR = обязательные_выполненные / обязательные_всего
  static calculateSuccessRate(completedRequired: number, totalRequired: number): number {
    if (totalRequired === 0) return 0;
    return completedRequired / totalRequired;
  }
  
  // Calculate normalized focus metric
  // FOCUS_NORM = clamp(минуты_фокуса/60, 0, 1)
  static calculateFocusNorm(focusMinutes: number): number {
    return Math.min(Math.max(focusMinutes / 60, 0), 1);
  }
  
  // Calculate normalized Time To Start metric
  // TTS_NORM = clamp(медиана_TTS/60с, 0, 1)
  static calculateTtsNorm(medianTtsSeconds: number): number {
    return Math.min(Math.max(medianTtsSeconds / 60, 0), 1);
  }
  
  // Calculate Discipline score
  // Discipline = clamp(round((0.5*SR + 0.3*FOCUS_NORM + 0.2*(1-TTS_NORM))*100), 0, 100)
  static calculateDiscipline(sr: number, focusNorm: number, ttsNorm: number): number {
    const score = (0.5 * sr + 0.3 * focusNorm + 0.2 * (1 - ttsNorm)) * 100;
    return Math.min(Math.max(Math.round(score), 0), 100);
  }
  
  // Calculate Exponential Moving Average (EMA) with α=0.2
  static calculateEMA(currentValue: number, previousEMA: number, alpha: number = 0.2): number {
    return alpha * currentValue + (1 - alpha) * previousEMA;
  }
  
  // Calculate total focus minutes from sessions
  static calculateFocusMinutes(sessions: Session[]): number {
    return sessions
      .filter(session => session.type === 'focus' && session.completed)
      .reduce((total, session) => {
        if (session.startedAt && session.endedAt) {
          return total + calculateDuration(new Date(session.startedAt), new Date(session.endedAt));
        }
        return total;
      }, 0);
  }
  
  // Calculate stats from sessions and journal entries
  static calculateStats(sessions: Session[], stateVector: StateVector): Stats {
    // This is a simplified implementation
    // In a real app, you would calculate these values based on actual data
    
    const focusMinutes = this.calculateFocusMinutes(sessions);
    const focusNorm = this.calculateFocusNorm(focusMinutes);
    
    // For now, we'll use placeholder values
    // In a real implementation, you would calculate these from actual data
    const sr = stateVector.streak > 0 ? Math.min(stateVector.streak / 7, 1) : 0;
    const ttsNorm = 0.5; // Placeholder
    
    const discipline = this.calculateDiscipline(sr, focusNorm, ttsNorm);
    
    return {
      streak: stateVector.streak,
      mind: stateVector.mind,
      body: stateVector.body,
      social: stateVector.social,
      discipline,
    };
  }
  
  // Find best window for tasks based on success rates
  static findBestWindow(dailyStats: { date: string; sr: number }[]): 'morning' | 'afternoon' | 'evening' {
    // This is a simplified implementation
    // In a real app, you would analyze actual data to determine best windows
    
    // For now, we'll return a default value
    return 'morning';
  }
}