import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskItem, Message } from '@/domain/types';

// Create a storage interface for zustand persist
const customStorage = {
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error getting item from storage:', e);
      return null;
    }
  },
  setItem: async (key: string, value: any) => {
    try {
      const valueString = JSON.stringify(value);
      await AsyncStorage.setItem(key, valueString);
    } catch (e) {
      console.error('Error setting item in storage:', e);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing item from storage:', e);
    }
  },
};

// Define the store state
interface AppState {
  // User ID state
  userId: string | null;
  hasAssignedId: boolean;

  // Today screen state
  contextualInstruction: string;
  todayTasks: TaskItem[];
  coachMessages: Message[];
  streak: number;
  disciplineScore: number;
  focusTime: number; // minutes today

  // Actions for Today screen
  addTask: (task: TaskItem) => void;
  updateTask: (id: string, patch: Partial<TaskItem>) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  setContextualInstruction: (instruction: string) => void;
  addCoachMessage: (message: Message) => void;
  setStreak: (value: number) => void;
  setDisciplineScore: (value: number) => void;
  setFocusTime: (minutes: number) => void;

  // User ID actions
  setUserId: (id: string) => void;
  setHasAssignedId: (assigned: boolean) => void;

  // Console state
  consoleMessages: string[];
  addConsoleMessage: (message: string) => void;

  // UI flags
  isTimerRunning: boolean;
  setTimerRunning: (running: boolean) => void;
}

// Create the store with persistence
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: null,
      hasAssignedId: false,
      contextualInstruction: '',
      todayTasks: [],
      streak: 0,
      disciplineScore: 0,
      focusTime: 0,
      coachMessages: [],
      consoleMessages: [],
      isTimerRunning: false,
      
      // Actions
      addTask: (task) => set((state) => ({
        todayTasks: [...state.todayTasks, task],
      })),
      updateTask: (id, patch) => set((state) => ({
        todayTasks: state.todayTasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),
      removeTask: (id) => set((state) => ({
        todayTasks: state.todayTasks.filter((t) => t.id !== id),
      })),
      completeTask: (id) => set((state) => ({
        todayTasks: state.todayTasks.map((t) => (t.id === id ? { ...t, completed: true, completedAt: new Date().toISOString() } : t)),
      })),
      setContextualInstruction: (instruction) => set({ contextualInstruction: instruction }),
      addCoachMessage: (message) => set((state) => {
        // Check if a message with the same ID already exists
        const messageExists = state.coachMessages.some(msg => msg.id === message.id);
        
        // Only add the message if it doesn't already exist
        if (!messageExists) {
          return { coachMessages: [...state.coachMessages, message] };
        }
        
        // If message already exists, return the current state unchanged
        return { coachMessages: state.coachMessages };
      }),
      setStreak: (value) => set({ streak: value }),
      setDisciplineScore: (value) => set({ disciplineScore: value }),
      setFocusTime: (minutes) => set({ focusTime: minutes }),
      
      addConsoleMessage: (message) => set((state) => ({
        consoleMessages: [...state.consoleMessages, message]
      })),
      
      setTimerRunning: (running) => set({ isTimerRunning: running }),

      // User ID actions
      setUserId: (id) => set({ userId: id }),
      setHasAssignedId: (assigned) => set({ hasAssignedId: assigned }),
    }),
    {
      name: 'white-room-storage',
      storage: customStorage,
      version: 1, // STATE_VERSION for migrations
    }
  )
);