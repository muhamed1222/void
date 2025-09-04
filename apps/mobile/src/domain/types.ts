// Domain types as defined in the architecture document

export type Mood = -2 | -1 | 0 | 1 | 2;
export type Domain = 'mind' | 'body' | 'social';

export interface UserProfile {
  id: string;
  goals: string[];
  wakeTime?: string;
  coachMode: 'soft' | 'strict';
}

export interface PlanBlock {
  id: string;
  start: string;
  end: string;
  kind: 'focus' | 'mind' | 'body' | 'social' | 'break' | 'ritual';
  required?: boolean;
  exerciseId?: string;
}

export interface DayPlan {
  date: string;
  blocks: PlanBlock[];
  requiredMin: number;
  status: 'new' | 'in_progress' | 'done';
}

export interface Session {
  id: string;
  type: 'focus' | Domain;
  startedAt: string;
  endedAt?: string;
  completed: boolean;
  interruptions?: { t: string; note: string }[];
}

export interface JournalEntry {
  date: string;
  obstacles: string[];
  mood: Mood;
  notes?: string;
}

export interface Stats {
  streak: number;
  mind: number;
  body: number;
  social: number;
  discipline: number;
}

export interface StateVector extends Stats {
  sleepQuality?: number;
  mood?: Mood;
  failures7d: number;
}

// Tasks and messages for Today screen
export interface TaskItem {
  id: string;
  title: string;
  domain: Domain;
  done: boolean; // Indicates if task is completed
  completedAt?: string;
  createdAt: string;
  estimatedDuration: number; // in minutes
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'coach';
  timestamp: string;
  type: 'instruction' | 'suggestion' | 'feedback' | 'reminder';
}

export interface Protocol {
  id: string;
  title: string;
  durationMin: number;
  level: 1 | 2 | 3;
  domain: Domain;
  steps?: string[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[];
}

export interface Scenario {
  id: string;
  title: string;
  steps: string[];
  durationMin: number;
  createdAt: string;
  updatedAt: string;
}


