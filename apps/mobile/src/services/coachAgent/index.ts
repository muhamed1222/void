// Coach AI Agent service

import { StateVector, DayPlan, JournalEntry, Protocol } from '@/domain/types';
import { generateId } from '@/utils/id';

// Tool definitions as specified in the architecture
export interface CoachTools {
  readDayState: () => Promise<StateVector>;
  readJournal: (days: number) => Promise<JournalEntry[]>;
  writePlan: (plan: DayPlan) => Promise<{ ok: boolean; nonce: string }>;
  startFocusTimer: (minutes: number, nonce: string) => Promise<{ startedAt: string }>;
  adjustLoad: (level: 'down' | 'up' | 'stable', reason?: string) => Promise<void>;
  suggestRitual: (trigger: 'start' | 'midday' | 'evening') => Promise<{ title: string; steps: string[] }>;
  safetyCheck: (symptoms: string[]) => Promise<{ allowed: boolean; altPlan?: any }>;
}

export class CoachAgent {
  private apiKey: string;
  private baseUrl: string;
  private tools: CoachTools;
  
  constructor(apiKey: string, baseUrl: string, tools: CoachTools) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.tools = tools;
  }
  
  // Generate a nonce for idempotent operations
  generateNonce(): string {
    return generateId();
  }
  
  // Call the AI with a prompt and available tools
  async callAI(prompt: string, maxTokens: number = 500): Promise<string> {
    // In a real implementation, this would make an HTTP request to an AI service
    // For now, we'll return a placeholder response
    
    console.log('AI call:', prompt);
    
    // Simulate AI response
    return "OK, I've analyzed your state and prepared recommendations. Use the available tools to implement changes.";
  }
  
  // Get system prompt for the AI
  getSystemPrompt(): string {
    return `
      You are a helpful coach assistant. Follow these guidelines:
      - Keep responses concise (≤3 points)
      - Focus on one problem area at a time
      - Create plans for 20-120 minutes
      - Consider bestWindow and signals
      - Always end with "Ответь ОК"
      - For risks, use safetyCheck and simplify plans
    `.trim();
  }
  
  // Handle reliability features
  async reliableCall(prompt: string, retries: number = 3): Promise<string | null> {
    let lastError: Error | null = null;
    
    for (let i = 0; i < retries; i++) {
      try {
        // Add delay between retries (exponential backoff)
        if (i > 0) {
          const delay = 500 * Math.pow(2, i - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        const response = await this.callAI(prompt);
        return response;
      } catch (error) {
        lastError = error as Error;
        console.warn(`AI call failed (attempt ${i + 1}/${retries}):`, error);
      }
    }
    
    console.error('AI call failed after all retries:', lastError);
    return null;
  }
  
  // Get offline fallback response
  getOfflineFallback(): string {
    return "I'm currently unavailable. Here are some general tips to help you stay focused and productive.";
  }
  
  // Log AI interaction (without PII)
  logInteraction(promptId: string, toolsUsed: string[], duration: number, resultCode: string): void {
    console.log('AI interaction logged:', { promptId, toolsUsed, duration, resultCode });
    // In a real implementation, this would save to a local log
  }
}

// Export a default instance (in a real app, you would initialize this with proper config)
export const coachAgent = new CoachAgent(
  process.env.OPENAI_API_KEY || 'placeholder-key',
  process.env.AI_BASE_URL || 'http://localhost:3000',
  {
    readDayState: async () => {
      // Placeholder implementation
      return {
        streak: 1,
        mind: 50,
        body: 50,
        social: 50,
        discipline: 75,
        failures7d: 0,
      };
    },
    readJournal: async () => {
      // Placeholder implementation
      return [];
    },
    writePlan: async () => {
      // Placeholder implementation
      return { ok: true, nonce: generateId() };
    },
    startFocusTimer: async () => {
      // Placeholder implementation
      return { startedAt: new Date().toISOString() };
    },
    adjustLoad: async () => {
      // Placeholder implementation
    },
    suggestRitual: async () => {
      // Placeholder implementation
      return { title: 'Quick Breathing Exercise', steps: ['Breathe in for 4 seconds', 'Hold for 4 seconds', 'Breathe out for 4 seconds'] };
    },
    safetyCheck: async () => {
      // Placeholder implementation
      return { allowed: true };
    },
  }
);