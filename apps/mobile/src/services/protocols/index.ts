// Protocols service

import { Protocol } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

export class ProtocolsService {
  private static instance: ProtocolsService;
  private protocolsKey = 'protocols';
  
  static getInstance(): ProtocolsService {
    if (!ProtocolsService.instance) {
      ProtocolsService.instance = new ProtocolsService();
    }
    return ProtocolsService.instance;
  }
  
  // Get all protocols
  async getAllProtocols(): Promise<Protocol[]> {
    try {
      const protocolsJson = mmkvStorage.getString(this.protocolsKey);
      if (protocolsJson) {
        return JSON.parse(protocolsJson);
      }
      return [];
    } catch (error) {
      console.error('Error getting protocols:', error);
      return [];
    }
  }
  
  // Get protocol by ID
  async getProtocolById(id: string): Promise<Protocol | null> {
    try {
      const protocols = await this.getAllProtocols();
      return protocols.find(protocol => protocol.id === id) || null;
    } catch (error) {
      console.error(`Error getting protocol with id ${id}:`, error);
      return null;
    }
  }
  
  // Add or update a protocol
  async saveProtocol(protocol: Protocol): Promise<boolean> {
    try {
      const protocols = await this.getAllProtocols();
      const existingIndex = protocols.findIndex(p => p.id === protocol.id);
      
      if (existingIndex >= 0) {
        protocols[existingIndex] = protocol;
      } else {
        protocols.push(protocol);
      }
      
      mmkvStorage.set(this.protocolsKey, JSON.stringify(protocols));
      return true;
    } catch (error) {
      console.error('Error saving protocol:', error);
      return false;
    }
  }
  
  // Delete a protocol
  async deleteProtocol(id: string): Promise<boolean> {
    try {
      const protocols = await this.getAllProtocols();
      const filtered = protocols.filter(protocol => protocol.id !== id);
      mmkvStorage.set(this.protocolsKey, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error(`Error deleting protocol with id ${id}:`, error);
      return false;
    }
  }
  
  // Get protocols by domain
  async getProtocolsByDomain(domain: string): Promise<Protocol[]> {
    try {
      const protocols = await this.getAllProtocols();
      return protocols.filter(protocol => protocol.domain === domain);
    } catch (error) {
      console.error(`Error getting protocols for domain ${domain}:`, error);
      return [];
    }
  }
  
  // Get protocols by level
  async getProtocolsByLevel(level: number): Promise<Protocol[]> {
    try {
      const protocols = await this.getAllProtocols();
      return protocols.filter(protocol => protocol.level === level);
    } catch (error) {
      console.error(`Error getting protocols for level ${level}:`, error);
      return [];
    }
  }
  
  // Get recent protocols
  async getRecentProtocols(limit: number = 10): Promise<Protocol[]> {
    try {
      const protocols = await this.getAllProtocols();
      return protocols
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting recent protocols:', error);
      return [];
    }
  }
  
  // Search protocols by name or description
  async searchProtocols(query: string): Promise<Protocol[]> {
    try {
      const protocols = await this.getAllProtocols();
      const lowerQuery = query.toLowerCase();
      return protocols.filter(
        protocol => 
          protocol.name.toLowerCase().includes(lowerQuery) || 
          protocol.description.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error(`Error searching protocols for query "${query}":`, error);
      return [];
    }
  }
}

// Export singleton instance
export const protocolsService = ProtocolsService.getInstance();