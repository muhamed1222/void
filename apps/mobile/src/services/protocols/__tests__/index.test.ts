import { protocolsService, ProtocolsService } from '../index';
import { Protocol } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

// Mock mmkvStorage
jest.mock('@/services/storage', () => ({
  mmkvStorage: {
    getString: jest.fn(),
    set: jest.fn(),
  },
}));

describe('ProtocolsService', () => {
  const mockProtocol: Protocol = {
    id: '1',
    title: 'Test Protocol',
    durationMin: 30,
    level: 1,
    domain: 'mind',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    description: 'A test protocol',
    tags: ['test'],
  };

  const mockProtocols: Protocol[] = [
    mockProtocol,
    {
      id: '2',
      title: 'Another Protocol',
      durationMin: 45,
      level: 2,
      domain: 'body',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProtocols', () => {
    it('should return an empty array when no protocols exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(null);
      
      const protocols = await protocolsService.getAllProtocols();
      
      expect(protocols).toEqual([]);
      expect(mmkvStorage.getString).toHaveBeenCalledWith('protocols');
    });

    it('should return parsed protocols when they exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const protocols = await protocolsService.getAllProtocols();
      
      expect(protocols).toEqual(mockProtocols);
      expect(mmkvStorage.getString).toHaveBeenCalledWith('protocols');
    });

    it('should return an empty array when JSON parsing fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue('invalid json');
      
      const protocols = await protocolsService.getAllProtocols();
      
      expect(protocols).toEqual([]);
    });
  });

  describe('getProtocolById', () => {
    it('should return null when no protocols exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(null);
      
      const protocol = await protocolsService.getProtocolById('1');
      
      expect(protocol).toBeNull();
    });

    it('should return the correct protocol when it exists', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const protocol = await protocolsService.getProtocolById('1');
      
      expect(protocol).toEqual(mockProtocol);
    });

    it('should return null when the protocol does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const protocol = await protocolsService.getProtocolById('non-existent');
      
      expect(protocol).toBeNull();
    });
  });

  describe('saveProtocol', () => {
    it('should add a new protocol when it does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([mockProtocols[1]]));
      
      const result = await protocolsService.saveProtocol(mockProtocol);
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'protocols',
        JSON.stringify([...mockProtocols.slice(1), mockProtocol])
      );
    });

    it('should update an existing protocol', async () => {
      const updatedProtocol = { ...mockProtocol, title: 'Updated Protocol' };
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const result = await protocolsService.saveProtocol(updatedProtocol);
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'protocols',
        JSON.stringify([updatedProtocol, mockProtocols[1]])
      );
    });

    it('should return false when saving fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([]));
      (mmkvStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Save error');
      });
      
      const result = await protocolsService.saveProtocol(mockProtocol);
      
      expect(result).toBe(false);
    });
  });

  describe('deleteProtocol', () => {
    it('should delete an existing protocol', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await protocolsService.deleteProtocol('1');
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'protocols',
        JSON.stringify([mockProtocols[1]])
      );
    });

    it('should return true even when protocol does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([mockProtocols[1]]));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await protocolsService.deleteProtocol('non-existent');
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'protocols',
        JSON.stringify([mockProtocols[1]])
      );
    });

    it('should return false when deletion fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      (mmkvStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Delete error');
      });
      
      const result = await protocolsService.deleteProtocol('1');
      
      expect(result).toBe(false);
    });
  });

  describe('getProtocolsByDomain', () => {
    it('should return protocols filtered by domain', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const protocols = await protocolsService.getProtocolsByDomain('mind');
      
      expect(protocols).toEqual([mockProtocol]);
    });
  });

  describe('getProtocolsByLevel', () => {
    it('should return protocols filtered by level', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockProtocols));
      
      const protocols = await protocolsService.getProtocolsByLevel(1);
      
      expect(protocols).toEqual([mockProtocol]);
    });
  });
});