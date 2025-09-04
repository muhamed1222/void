import { scenariosService, ScenariosService } from '../index';
import { Scenario } from '@/domain/types';
import { mmkvStorage } from '@/services/storage';

// Mock mmkvStorage
jest.mock('@/services/storage', () => ({
  mmkvStorage: {
    getString: jest.fn(),
    set: jest.fn(),
  },
}));

describe('ScenariosService', () => {
  const mockScenario: Scenario = {
    id: '1',
    title: 'Test Scenario',
    steps: ['Step 1', 'Step 2'],
    durationMin: 30,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockScenarios: Scenario[] = [
    mockScenario,
    {
      id: '2',
      title: 'Another Scenario',
      steps: ['Step A', 'Step B'],
      durationMin: 45,
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z', // More recent updatedAt
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllScenarios', () => {
    it('should return an empty array when no scenarios exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(null);
      
      const scenarios = await scenariosService.getAllScenarios();
      
      expect(scenarios).toEqual([]);
      expect(mmkvStorage.getString).toHaveBeenCalledWith('scenarios');
    });

    it('should return parsed scenarios when they exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      
      const scenarios = await scenariosService.getAllScenarios();
      
      expect(scenarios).toEqual(mockScenarios);
      expect(mmkvStorage.getString).toHaveBeenCalledWith('scenarios');
    });

    it('should return an empty array when JSON parsing fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue('invalid json');
      
      const scenarios = await scenariosService.getAllScenarios();
      
      expect(scenarios).toEqual([]);
    });
  });

  describe('getScenarioById', () => {
    it('should return null when no scenarios exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(null);
      
      const scenario = await scenariosService.getScenarioById('1');
      
      expect(scenario).toBeNull();
    });

    it('should return the correct scenario when it exists', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      
      const scenario = await scenariosService.getScenarioById('1');
      
      expect(scenario).toEqual(mockScenario);
    });

    it('should return null when the scenario does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      
      const scenario = await scenariosService.getScenarioById('non-existent');
      
      expect(scenario).toBeNull();
    });
  });

  describe('saveScenario', () => {
    it('should add a new scenario when it does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([mockScenarios[1]]));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await scenariosService.saveScenario(mockScenario);
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'scenarios',
        JSON.stringify([...mockScenarios.slice(1), mockScenario])
      );
    });

    it('should update an existing scenario', async () => {
      const updatedScenario = { ...mockScenario, title: 'Updated Scenario' };
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await scenariosService.saveScenario(updatedScenario);
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'scenarios',
        JSON.stringify([updatedScenario, mockScenarios[1]])
      );
    });

    it('should return false when saving fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([]));
      (mmkvStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Save error');
      });
      
      const result = await scenariosService.saveScenario(mockScenario);
      
      expect(result).toBe(false);
    });
  });

  describe('deleteScenario', () => {
    it('should delete an existing scenario', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await scenariosService.deleteScenario('1');
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'scenarios',
        JSON.stringify([mockScenarios[1]])
      );
    });

    it('should return true even when scenario does not exist', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify([mockScenarios[1]]));
      (mmkvStorage.set as jest.Mock).mockReturnValue(undefined);
      
      const result = await scenariosService.deleteScenario('non-existent');
      
      expect(result).toBe(true);
      expect(mmkvStorage.set).toHaveBeenCalledWith(
        'scenarios',
        JSON.stringify([mockScenarios[1]])
      );
    });

    it('should return false when deletion fails', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      (mmkvStorage.set as jest.Mock).mockImplementation(() => {
        throw new Error('Delete error');
      });
      
      const result = await scenariosService.deleteScenario('1');
      
      expect(result).toBe(false);
    });
  });

  describe('getRecentScenarios', () => {
    it('should return scenarios sorted by updatedAt', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      
      const scenarios = await scenariosService.getRecentScenarios();
      
      // Expect the scenarios to be sorted by updatedAt in descending order
      expect(scenarios[0].id).toBe('2'); // More recent scenario first
      expect(scenarios[1].id).toBe('1'); // Older scenario second
    });
  });

  describe('searchScenarios', () => {
    it('should return scenarios filtered by title', async () => {
      (mmkvStorage.getString as jest.Mock).mockReturnValue(JSON.stringify(mockScenarios));
      
      const scenarios = await scenariosService.searchScenarios('Test');
      
      expect(scenarios).toEqual([mockScenario]);
    });
  });
});