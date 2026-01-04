/**
 * Storage Layer - Central Export
 * 
 * Import repositories and adapter from this file.
 */

// Adapter
export { storageAdapter } from './storageAdapter.js';
export { localStorageAdapter } from './localStorageAdapter.js';

// Repositories (Async)
export { DailyReportRepository } from './repositories/dailyReportRepository.js';
export { ConfigRepository } from './repositories/configRepository.js';
export { UIStateRepository } from './repositories/uiStateRepository.js';

// Repositories (Sync - for backward compatibility)
export { DailyReportRepositorySync } from './repositories/dailyReportRepository.js';
export { ConfigRepositorySync } from './repositories/configRepository.js';
export { UIStateRepositorySync } from './repositories/uiStateRepository.js';
