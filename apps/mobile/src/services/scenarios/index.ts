// Scenarios service

import { Scenario } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class ScenariosService {
  private static instance: ScenariosService;
  private scenariosKey = 'scenarios';
  
  static getInstance(): ScenariosService {
    if (!ScenariosService.instance) {
      ScenariosService.instance = new ScenariosService();
    }
    return ScenariosService.instance;
  }
  
  // Get all scenarios
  async getAllScenarios(): Promise<Scenario[]> {
    try {
      const scenariosJson = mmkvStorage.getString(this.scenariosKey);
      if (scenariosJson) {
        return JSON.parse(scenariosJson);
      }
      return [];
    } catch (error) {
      console.error('Error getting scenarios:', error);
      return [];
    }
  }
  
  // Get scenario by ID
  async getScenarioById(id: string): Promise<Scenario | null> {
    try {
      const scenarios = await this.getAllScenarios();
      return scenarios.find(scenario => scenario.id === id) || null;
    } catch (error) {
      console.error(`Error getting scenario with id ${id}:`, error);
      return null;
    }
  }
  
  // Add or update a scenario
  async saveScenario(scenario: Scenario): Promise<boolean> {
    try {
      const scenarios = await this.getAllScenarios();
      const existingIndex = scenarios.findIndex(p => p.id === scenario.id);
      
      if (existingIndex >= 0) {
        scenarios[existingIndex] = scenario;
      } else {
        scenarios.push(scenario);
      }
      
      mmkvStorage.set(this.scenariosKey, JSON.stringify(scenarios));
      return true;
    } catch (error) {
      console.error('Error saving scenario:', error);
      return false;
    }
  }
  
  // Delete a scenario
  async deleteScenario(id: string): Promise<boolean> {
    try {
      const scenarios = await this.getAllScenarios();
      const filtered = scenarios.filter(scenario => scenario.id !== id);
      mmkvStorage.set(this.scenariosKey, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error(`Error deleting scenario with id ${id}:`, error);
      return false;
    }
  }
  
  // Get recent scenarios
  async getRecentScenarios(limit: number = 10): Promise<Scenario[]> {
    try {
      const scenarios = await this.getAllScenarios();
      return scenarios
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recent scenarios:', error);
      return [];
    }
  }
  
  // Search scenarios by name or description
  async searchScenarios(query: string): Promise<Scenario[]> {
    try {
      const scenarios = await this.getAllScenarios();
      const lowerQuery = query.toLowerCase();
      return scenarios.filter(
        scenario => 
          scenario.title.toLowerCase().includes(lowerQuery) || 
          (scenario.description && scenario.description.toLowerCase().includes(lowerQuery))
      );
    } catch (error) {
      console.error(`Error searching scenarios for query "${query}":`, error);
      return [];
    }
  }
}

// Export singleton instance
export const scenariosService = ScenariosService.getInstance();