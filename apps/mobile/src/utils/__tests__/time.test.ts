import {
  formatTime,
  formatDate,
  calculateDuration,
  addMinutes,
  isSignificantTimeShift,
  getTimeStringFromMinutes,
  getMinutesFromTimeString,
} from '../time';

describe('time utilities', () => {
  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date(2023, 0, 1, 9, 5);
      expect(formatTime(date)).toBe('09:05');
      
      const date2 = new Date(2023, 0, 1, 14, 30);
      expect(formatTime(date2)).toBe('14:30');
    });
  });
  
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date(2023, 0, 5);
      expect(formatDate(date)).toBe('2023-01-05');
      
      const date2 = new Date(2023, 11, 25);
      expect(formatDate(date2)).toBe('2023-12-25');
    });
  });
  
  describe('calculateDuration', () => {
    it('should calculate duration correctly', () => {
      const start = new Date(2023, 0, 1, 10, 0);
      const end = new Date(2023, 0, 1, 10, 30);
      expect(calculateDuration(start, end)).toBe(30);
      
      const start2 = new Date(2023, 0, 1, 10, 0);
      const end2 = new Date(2023, 0, 1, 11, 15);
      expect(calculateDuration(start2, end2)).toBe(75);
    });
  });
  
  describe('addMinutes', () => {
    it('should add minutes correctly', () => {
      const date = new Date(2023, 0, 1, 10, 0);
      const result = addMinutes(date, 30);
      expect(result.getHours()).toBe(10);
      expect(result.getMinutes()).toBe(30);
      
      const result2 = addMinutes(date, 90);
      expect(result2.getHours()).toBe(11);
      expect(result2.getMinutes()).toBe(30);
    });
  });
  
  describe('isSignificantTimeShift', () => {
    it('should detect significant time shifts', () => {
      const oldTime = new Date(2023, 0, 1, 10, 0);
      const newTime = new Date(2023, 0, 1, 10, 6);
      expect(isSignificantTimeShift(oldTime, newTime)).toBe(true);
      
      const newTime2 = new Date(2023, 0, 1, 10, 4);
      expect(isSignificantTimeShift(oldTime, newTime2)).toBe(false);
    });
  });
  
  describe('getTimeStringFromMinutes', () => {
    it('should convert minutes to time string', () => {
      expect(getTimeStringFromMinutes(0)).toBe('00:00');
      expect(getTimeStringFromMinutes(90)).toBe('01:30');
      expect(getTimeStringFromMinutes(1440)).toBe('24:00'); // 24 hours
    });
  });
  
  describe('getMinutesFromTimeString', () => {
    it('should convert time string to minutes', () => {
      expect(getMinutesFromTimeString('00:00')).toBe(0);
      expect(getMinutesFromTimeString('01:30')).toBe(90);
      expect(getMinutesFromTimeString('24:00')).toBe(1440);
    });
  });
});