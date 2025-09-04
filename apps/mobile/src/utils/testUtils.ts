// Test utilities

// Mock data generators
export const generateMockId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Generate mock date
export const generateMockDate = (daysOffset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

// Generate mock time
export const generateMockTime = (hours: number = 0, minutes: number = 0): string => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

// Mock user profile
export const generateMockUserProfile = (overrides: Partial<UserProfile> = {}): UserProfile => {
  return {
    id: generateMockId(),
    goals: ['Улучшить фокус', 'Развить тело'],
    wakeTime: '07:00',
    coachMode: 'soft',
    ...overrides,
  };
};

// Mock day plan
export const generateMockDayPlan = (overrides: Partial<DayPlan> = {}): DayPlan => {
  return {
    date: generateMockDate(),
    blocks: [
      {
        id: generateMockId(),
        start: '09:00',
        end: '10:00',
        kind: 'focus',
        required: true,
      },
    ],
    requiredMin: 60,
    status: 'new',
    ...overrides,
  };
};

// Mock session
export const generateMockSession = (overrides: Partial<Session> = {}): Session => {
  return {
    id: generateMockId(),
    type: 'focus',
    startedAt: generateMockTime(9, 0),
    endedAt: generateMockTime(9, 30),
    completed: true,
    interruptions: [],
    ...overrides,
  };
};

// Mock journal entry
export const generateMockJournalEntry = (overrides: Partial<JournalEntry> = {}): JournalEntry => {
  return {
    date: generateMockDate(),
    obstacles: ['Отвлекся на соцсети', 'Почувствовал усталость'],
    mood: 1,
    notes: 'Хороший день для продуктивной работы',
    ...overrides,
  };
};

// Mock stats
export const generateMockStats = (overrides: Partial<Stats> = {}): Stats => {
  return {
    date: generateMockDate(),
    streak: 3,
    mind: 75,
    body: 60,
    social: 80,
    discipline: 70,
    ...overrides,
  };
};

// Mock protocol
export const generateMockProtocol = (overrides: Partial<Protocol> = {}): Protocol => {
  return {
    id: generateMockId(),
    title: 'Утренняя медитация',
    durationMin: 15,
    level: 1,
    domain: 'mind',
    steps: ['Сесть удобно', 'Закрыть глаза', 'Сосредоточиться на дыхании'],
    ...overrides,
  };
};

// Mock scenario
export const generateMockScenario = (overrides: Partial<Scenario> = {}): Scenario => {
  return {
    id: generateMockId(),
    title: 'Планирование дня',
    steps: ['Определить 3 главные задачи', 'Оценить время на каждую', 'Запланировать перерывы'],
    durationMin: 20,
    ...overrides,
  };
};

// Mock state vector
export const generateMockStateVector = (overrides: Partial<StateVector> = {}): StateVector => {
  return {
    streak: 3,
    mind: 75,
    body: 60,
    social: 80,
    discipline: 70,
    sleepQuality: 85,
    mood: 1,
    failures7d: 2,
    ...overrides,
  };
};

// Wait for condition
export const waitForCondition = async (
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<boolean> => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (condition()) {
      return true;
    }
    
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  return false;
};

// Mock async function
export const mockAsyncFunction = async <T>(result: T, delay: number = 0): Promise<T> => {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return result;
};

// Mock error function
export const mockErrorFunction = async (error: string, delay: number = 0): Promise<never> => {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  throw new Error(error);
};

// Spy on function
export const spyOnFunction = <T extends (...args: any[]) => any>(
  fn: T
): { fn: T; calls: any[][]; reset: () => void } => {
  const calls: any[][] = [];
  
  const spyFn = ((...args: any[]) => {
    calls.push(args);
    return fn(...args);
  }) as T;
  
  const reset = () => {
    calls.length = 0;
  };
  
  return { fn: spyFn, calls, reset };
};