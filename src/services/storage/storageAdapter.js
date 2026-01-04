/**
 * Storage Adapter Interface
 * 
 * Abstract interface for storage operations. 
 * Current implementation uses localStorage.
 * Future: Replace with SupabaseAdapter for cloud sync.
 */

/**
 * @typedef {Object} StorageAdapter
 * @property {(key: string) => Promise<any>} get - Get value by key
 * @property {(key: string, value: any) => Promise<void>} set - Set value by key
 * @property {(key: string) => Promise<void>} remove - Remove value by key
 * @property {(prefix: string) => Promise<Array<{key: string, value: any}>>} getAllByPrefix - Get all entries with key prefix
 * @property {() => Promise<void>} clear - Clear all storage
 */

// Re-export the localStorage adapter as default
export { localStorageAdapter as storageAdapter } from './localStorageAdapter.js';
