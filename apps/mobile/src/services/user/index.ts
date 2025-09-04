// User service

import { UserProfile } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class UserService {
  private static instance: UserService;
  private userKey = 'userProfile';
  
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
  
  // Get user profile
  async getUserProfile(): Promise<UserProfile | null> {
    const userJson = mmkvStorage.getString(this.userKey);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
  
  // Save user profile
  async saveUserProfile(profile: UserProfile): Promise<void> {
    mmkvStorage.set(this.userKey, JSON.stringify(profile));
  }
  
  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const currentProfile = await this.getUserProfile();
    if (!currentProfile) {
      return null;
    }
    
    const updatedProfile = { ...currentProfile, ...updates };
    await this.saveUserProfile(updatedProfile);
    return updatedProfile;
  }
  
  // Generate a new user ID
  generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Create a new user profile
  async createNewUser(goals: string[] = []): Promise<UserProfile> {
    const newProfile: UserProfile = {
      id: this.generateUserId(),
      goals,
      coachMode: 'soft',
    };
    
    await this.saveUserProfile(newProfile);
    return newProfile;
  }
  
  // Clear user data (for reset functionality)
  async clearUserData(): Promise<void> {
    mmkvStorage.delete(this.userKey);
  }
}

// Export singleton instance
export const userService = UserService.getInstance();