import {
  formatDiscipline,
  formatMood,
  formatDomain,
  formatDuration,
  truncateText,
} from '../fmt';

describe('format utilities', () => {
  describe('formatDiscipline', () => {
    it('should format discipline score correctly', () => {
      expect(formatDiscipline(75.6)).toBe('76%');
      expect(formatDiscipline(75.4)).toBe('75%');
      expect(formatDiscipline(0)).toBe('0%');
      expect(formatDiscipline(100)).toBe('100%');
    });
  });
  
  describe('formatMood', () => {
    it('should format mood values correctly', () => {
      expect(formatMood(-2)).toBe('😢');
      expect(formatMood(-1)).toBe('😕');
      expect(formatMood(0)).toBe('😐');
      expect(formatMood(1)).toBe('🙂');
      expect(formatMood(2)).toBe('😊');
      expect(formatMood(3)).toBe('😐'); // default case
    });
  });
  
  describe('formatDomain', () => {
    it('should format domain names correctly', () => {
      expect(formatDomain('mind')).toBe('Разум');
      expect(formatDomain('body')).toBe('Тело');
      expect(formatDomain('social')).toBe('Социальное');
      expect(formatDomain('unknown')).toBe('unknown');
    });
  });
  
  describe('formatDuration', () => {
    it('should format durations correctly', () => {
      expect(formatDuration(30)).toBe('30 мин');
      expect(formatDuration(60)).toBe('1 ч');
      expect(formatDuration(90)).toBe('1 ч 30 мин');
      expect(formatDuration(150)).toBe('2 ч 30 мин');
    });
  });
  
  describe('truncateText', () => {
    it('should truncate text correctly', () => {
      expect(truncateText('short text', 20)).toBe('short text');
      // For text "this is a very long text that should be truncated" (44 chars)
      // With maxLength=20, we expect 17 chars + "..."
      expect(truncateText('this is a very long text that should be truncated', 20)).toBe('this is a very lo...');
    });
  });
});