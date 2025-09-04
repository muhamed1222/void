// Safety service

import { SAFETY_GATE_ENABLED } from '@/domain/flags';

export class SafetyService {
  private static instance: SafetyService;
  
  static getInstance(): SafetyService {
    if (!SafetyService.instance) {
      SafetyService.instance = new SafetyService();
    }
    return SafetyService.instance;
  }
  
  // Check for safety triggers
  checkForSafetyTriggers(text: string): boolean {
    if (!SAFETY_GATE_ENABLED) {
      return false;
    }
    
    const triggers = [
      'боль',
      'паника',
      'самоповреждение',
      'suicide',
      'суицид',
      'умереть',
      'смерть',
      'kill myself',
      'убить себя',
    ];
    
    const lowerText = text.toLowerCase();
    return triggers.some(trigger => lowerText.includes(trigger));
  }
  
  // Handle safety trigger
  handleSafetyTrigger(): { allowed: boolean; message: string } {
    return {
      allowed: false,
      message: 'Обнаружены потенциальные риски. План упрощен для вашей безопасности. Если вам нужна помощь, обратитесь к специалисту.',
    };
  }
  
  // Filter PII from data
  filterPII(data: any): any {
    // In a real implementation, this would remove personal identifiable information
    // For now, we'll just return the data as-is
    return data;
  }
}

// Export singleton instance
export const safetyService = SafetyService.getInstance();