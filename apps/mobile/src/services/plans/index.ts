// Plans service

import { DayPlan } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class PlansService {
  private static instance: PlansService;
  private plansKey = 'plans';
  
  static getInstance(): PlansService {
    if (!PlansService.instance) {
      PlansService.instance = new PlansService();
    }
    return PlansService.instance;
  }
  
  // Get all plans
  async getAllPlans(): Promise<DayPlan[]> {
    const plansJson = mmkvStorage.getString(this.plansKey);
    if (plansJson) {
      return JSON.parse(plansJson);
    }
    return [];
  }
  
  // Get plan by date
  async getPlanByDate(date: string): Promise<DayPlan | null> {
    const plans = await this.getAllPlans();
    return plans.find(plan => plan.date === date) || null;
  }
  
  // Save a plan
  async savePlan(plan: DayPlan): Promise<void> {
    const plans = await this.getAllPlans();
    const existingIndex = plans.findIndex(p => p.date === plan.date);
    
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.push(plan);
    }
    
    mmkvStorage.set(this.plansKey, JSON.stringify(plans));
  }
  
  // Delete a plan
  async deletePlan(date: string): Promise<void> {
    const plans = await this.getAllPlans();
    const filtered = plans.filter(plan => plan.date !== date);
    mmkvStorage.set(this.plansKey, JSON.stringify(filtered));
  }
  
  // Get recent plans
  async getRecentPlans(count: number = 7): Promise<DayPlan[]> {
    const plans = await this.getAllPlans();
    return plans.slice(-count).reverse();
  }
}

// Export singleton instance
export const plansService = PlansService.getInstance();