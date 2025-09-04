// Network service

import { Platform } from 'react-native';
import Constants from 'expo-constants';

export class NetworkService {
  private static instance: NetworkService;
  private baseUrl: string;
  private apiKey: string;
  
  static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }
  
  constructor() {
    // Get base URL from app.json
    this.baseUrl = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:3000';
    this.apiKey = process.env.OPENAI_API_KEY || '';
  }
  
  // Make an HTTP request with timeout and retries
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeout: number = 12000, // 12 seconds
    maxRetries: number = 3
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {}),
        ...options.headers,
      },
    };
    
    const config: RequestInit = {
      ...defaultOptions,
      ...options,
    };
    
    // Add timeout to the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    config.signal = controller.signal;
    
    // Exponential backoff retry logic
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, config);
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        
        // If this was the last attempt, throw the error
        if (attempt === maxRetries) {
          console.error('Network request failed after retries:', error);
          throw error;
        }
        
        // Wait before retrying (exponential backoff: 500ms * 2^attempt)
        const delay = 500 * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Unexpected error in request');
  }
  
  // Make a GET request
  async get<T>(endpoint: string, timeout?: number, maxRetries?: number): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, timeout, maxRetries);
  }
  
  // Make a POST request
  async post<T>(endpoint: string, data: any, timeout?: number, maxRetries?: number): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }, timeout, maxRetries);
  }
  
  // Make a PUT request
  async put<T>(endpoint: string, data: any, timeout?: number, maxRetries?: number): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, timeout, maxRetries);
  }
  
  // Make a DELETE request
  async delete<T>(endpoint: string, timeout?: number, maxRetries?: number): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, timeout, maxRetries);
  }
  
  // Check if network is available
  async isNetworkAvailable(): Promise<boolean> {
    try {
      // Simple network check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://httpbin.org/get', { 
        method: 'HEAD', 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  // Get platform-specific user agent
  getUserAgent(): string {
    return `WhiteRoom/${Platform.OS}`;
  }
}

// Export singleton instance
export const networkService = NetworkService.getInstance();