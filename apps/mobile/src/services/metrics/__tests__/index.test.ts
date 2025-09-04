import { MetricsService } from '../index';

describe('MetricsService', () => {
  describe('calculateSuccessRate', () => {
    it('should calculate success rate correctly', () => {
      expect(MetricsService.calculateSuccessRate(3, 5)).toBe(0.6);
      expect(MetricsService.calculateSuccessRate(0, 5)).toBe(0);
      expect(MetricsService.calculateSuccessRate(5, 5)).toBe(1);
    });
    
    it('should handle division by zero', () => {
      expect(MetricsService.calculateSuccessRate(0, 0)).toBe(0);
    });
  });
  
  describe('calculateFocusNorm', () => {
    it('should normalize focus minutes correctly', () => {
      expect(MetricsService.calculateFocusNorm(0)).toBe(0);
      expect(MetricsService.calculateFocusNorm(30)).toBe(0.5);
      expect(MetricsService.calculateFocusNorm(60)).toBe(1);
      expect(MetricsService.calculateFocusNorm(90)).toBe(1); // clamped
    });
  });
  
  describe('calculateTtsNorm', () => {
    it('should normalize TTS correctly', () => {
      expect(MetricsService.calculateTtsNorm(0)).toBe(0);
      expect(MetricsService.calculateTtsNorm(30)).toBe(0.5);
      expect(MetricsService.calculateTtsNorm(60)).toBe(1);
      expect(MetricsService.calculateTtsNorm(90)).toBe(1); // clamped
    });
  });
  
  describe('calculateDiscipline', () => {
    it('should calculate discipline score correctly', () => {
      const score = MetricsService.calculateDiscipline(0.8, 0.7, 0.3);
      // Calculation: (0.5*0.8 + 0.3*0.7 + 0.2*(1-0.3))*100 = (0.4 + 0.21 + 0.14)*100 = 75
      expect(score).toBe(75);
    });
    
    it('should clamp discipline score between 0 and 100', () => {
      expect(MetricsService.calculateDiscipline(0, 0, 1)).toBe(0);
      expect(MetricsService.calculateDiscipline(1, 1, 0)).toBe(100);
    });
  });
  
  describe('calculateEMA', () => {
    it('should calculate exponential moving average correctly', () => {
      expect(MetricsService.calculateEMA(10, 5)).toBe(6); // 0.2 * 10 + 0.8 * 5
      expect(MetricsService.calculateEMA(10, 5, 0.5)).toBe(7.5); // 0.5 * 10 + 0.5 * 5
    });
  });
});