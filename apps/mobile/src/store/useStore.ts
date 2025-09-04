import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
const storage = new MMKV();

// Create a storage interface for zustand persist
const mmkvStorage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    storage.set(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

// Define the store state
interface AppState {
  // Today screen state
  todayTasks: string[];
  addTask: (task: string) => void;
  removeTask: (index: number) => void;
  
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
      todayTasks: [],
      consoleMessages: [],
      isTimerRunning: false,
      
      // Actions
      addTask: (task) => set((state) => ({ 
        todayTasks: [...state.todayTasks, task] 
      })),
      
      removeTask: (index) => set((state) => ({
        todayTasks: state.todayTasks.filter((_, i) => i !== index)
      })),
      
      addConsoleMessage: (message) => set((state) => ({
        consoleMessages: [...state.consoleMessages, message]
      })),
      
      setTimerRunning: (running) => set({ isTimerRunning: running }),
    }),
    {
      name: 'white-room-storage',
      storage: {
        getItem: (name) => mmkvStorage.getItem(name),
        setItem: (name, value) => mmkvStorage.setItem(name, value),
        removeItem: (name) => mmkvStorage.removeItem(name),
      },
      version: 1, // STATE_VERSION for migrations
    }
  )
);