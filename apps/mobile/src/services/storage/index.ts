// Storage service - wrapper for MMKV and SQLite

import { MMKV } from 'react-native-mmkv';
import * as SQLite from 'expo-sqlite';

// Initialize MMKV
export const mmkvStorage = new MMKV();

// Database initialization
let db: SQLite.SQLiteDatabase | null = null;

export const initializeDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) {
    return db;
  }
  
  db = await SQLite.openDatabaseAsync('white-room.db');
  
  // Create tables if they don't exist
  await createTables();
  
  return db;
};

const createTables = async (): Promise<void> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  
  // Create sessions table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      type TEXT,
      startedAt TEXT,
      endedAt TEXT,
      completed INTEGER,
      interruptions_json TEXT
    )
  `);
  
  // Create journal table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS journal (
      date TEXT PRIMARY KEY,
      obstacles_json TEXT,
      mood INTEGER,
      notes TEXT
    )
  `);
  
  // Create plans table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS plans (
      date TEXT PRIMARY KEY,
      json TEXT
    )
  `);
  
  // Create stats table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS stats (
      date TEXT PRIMARY KEY,
      streak INTEGER,
      mind INTEGER,
      body INTEGER,
      social INTEGER,
      discipline INTEGER
    )
  `);
  
  // Create protocols table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS protocols (
      id TEXT PRIMARY KEY,
      title TEXT,
      domain TEXT,
      durationMin INTEGER,
      level INTEGER,
      steps_json TEXT
    )
  `);
  
  // Create schema_version table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_version (
      version INTEGER
    )
  `);
  
  // Insert initial version if not exists
  const versionResult = await db.getAllAsync('SELECT version FROM schema_version LIMIT 1');
  if (versionResult.length === 0) {
    await db.runAsync('INSERT INTO schema_version (version) VALUES (1)');
  }
};

// MMKV helper functions
export const mmkvSet = (key: string, value: any): void => {
  mmkvStorage.set(key, JSON.stringify(value));
};

export const mmkvGet = (key: string): any => {
  const value = mmkvStorage.getString(key);
  return value ? JSON.parse(value) : null;
};

export const mmkvDelete = (key: string): void => {
  mmkvStorage.delete(key);
};

export const mmkvHasKey = (key: string): boolean => {
  return mmkvStorage.contains(key);
};

// Database helper functions
export const dbRun = async (sql: string, args: any[] = []): Promise<SQLite.SQLiteRunResult> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return await db.runAsync(sql, args);
};

export const dbGetAll = async (sql: string, args: any[] = []): Promise<any[]> => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return await db.getAllAsync(sql, args);
};

export const dbGetFirst = async (sql: string, args: any[] = []): Promise<any> => {
  const results = await dbGetAll(sql, args);
  return results.length > 0 ? results[0] : null;
};

// Migration functions
export const getCurrentDbVersion = async (): Promise<number> => {
  const result = await dbGetFirst('SELECT version FROM schema_version LIMIT 1');
  return result ? result.version : 1;
};

export const setDbVersion = async (version: number): Promise<void> => {
  await dbRun('UPDATE schema_version SET version = ?', [version]);
};

// Migration scripts
export const runMigrations = async (): Promise<void> => {
  const currentVersion = await getCurrentDbVersion();
  const targetVersion = 1; // Update this as needed
  
  if (currentVersion < targetVersion) {
    // Run migrations here
    // For now, we're at version 1, so no migrations needed
    await setDbVersion(targetVersion);
  }
};