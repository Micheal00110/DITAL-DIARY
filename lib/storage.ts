/**
 * LocalStorage utility module
 * Provides safe, typed access to browser storage with error handling
 */

import { STORAGE_KEYS, ERROR_MESSAGES } from './constants';

type StorageKey = keyof typeof STORAGE_KEYS;

/**
 * Checks if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generic get from localStorage with type safety and error handling
 */
export function getFromStorage<T>(key: StorageKey, fallback?: T): T | null {
  try {
    if (!isStorageAvailable()) {
      console.warn(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
      return fallback ?? null;
    }

    const storageKey = STORAGE_KEYS[key];
    const item = localStorage.getItem(storageKey);

    if (!item) {
      return fallback ?? null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return fallback ?? null;
  }
}

/**
 * Generic set to localStorage with error handling
 */
export function setToStorage<T>(key: StorageKey, value: T): boolean {
  try {
    if (!isStorageAvailable()) {
      console.warn(ERROR_MESSAGES.STORAGE_UNAVAILABLE);
      return false;
    }

    const storageKey = STORAGE_KEYS[key];
    localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to storage (${key}):`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage
 */
export function removeFromStorage(key: StorageKey): boolean {
  try {
    if (!isStorageAvailable()) {
      return false;
    }

    const storageKey = STORAGE_KEYS[key];
    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
}

/**
 * Clear all diary-related storage
 */
export function clearDiaryStorage(): boolean {
  try {
    removeFromStorage('ACADEMIC_DIARY_DATA');
    removeFromStorage('USER_PREFERENCES');
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}
