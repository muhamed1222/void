import { TimerService } from '../index';

describe('TimerService', () => {
  let timerService: TimerService;
  
  beforeEach(() => {
    // Create a new instance for each test
    timerService = new TimerService();
  });
  
  describe('startSession', () => {
    it('should start a new session', () => {
      const session = timerService.startSession('focus');
      
      expect(session).toBeDefined();
      expect(session.type).toBe('focus');
      expect(session.intervals).toHaveLength(1);
      expect(session.intervals[0].start).toBeDefined();
      expect(session.intervals[0].end).toBeUndefined();
    });
  });
  
  describe('pauseSession', () => {
    it('should pause the current session', () => {
      timerService.startSession('focus');
      timerService.pauseSession();
      
      const session = timerService.getCurrentSession();
      expect(session).toBeDefined();
      expect(session!.intervals[0].end).toBeDefined();
      expect(session!.intervals[0].end).toBeGreaterThanOrEqual(session!.intervals[0].start);
    });
  });
  
  describe('resumeSession', () => {
    it('should resume the current session', () => {
      timerService.startSession('focus');
      timerService.pauseSession();
      timerService.resumeSession();
      
      const session = timerService.getCurrentSession();
      expect(session).toBeDefined();
      expect(session!.intervals).toHaveLength(2);
      expect(session!.intervals[1].start).toBeDefined();
      expect(session!.intervals[1].start).toBeGreaterThanOrEqual(session!.intervals[0].end!);
    });
  });
  
  describe('stopSession', () => {
    it('should stop the current session', () => {
      timerService.startSession('focus');
      const session = timerService.stopSession();
      
      expect(session).toBeDefined();
      expect(session!.intervals[0].end).toBeDefined();
      expect(timerService.getCurrentSession()).toBeNull();
    });
  });
  
  describe('getSessionDuration', () => {
    it('should calculate session duration correctly', () => {
      // Create a mock session with known intervals
      const session = {
        id: 'test',
        intervals: [
          { start: 1000000, end: 1030000 }, // 30 seconds
          { start: 1040000, end: 1070000 }, // 30 seconds
        ],
        startedAt: new Date().toISOString(),
        type: 'focus',
      } as any;
      
      const duration = timerService.getSessionDuration(session);
      // 60 seconds = 1 minute
      expect(duration).toBe(1);
    });
  });
});