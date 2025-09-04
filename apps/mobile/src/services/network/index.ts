// Network service

import { Platform } from 'react-native';

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
    // Get base URL from environment
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    this.apiKey = process.env.OPENAI_API_KEY || '';
  }
  
  // Make an HTTP request
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
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
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Network request failed:', error);
      throw error;
    }
  }
  
  // Make a GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }
  
  // Make a POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  // Make a PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  // Make a DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
  
  // Check if network is available
  async isNetworkAvailable(): Promise<boolean> {
    try {
      // Simple network check
      const response = await fetch('https://httpbin.org/get', { method: 'HEAD', timeout: 5000 });
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