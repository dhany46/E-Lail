import { ConfigRepositorySync } from '../services/storage/repositories/configRepository.js';

export const INPUT_TYPES = {
    CHECKBOX: 'checkbox',
    TEXT: 'text',
    FORM: 'form',
};

// App Configuration - can be stored in localStorage
export const DEFAULT_APP_CONFIG = {
    dailyTarget: 8,
};

// Get app config from storage or return defaults
// Now uses ConfigRepositorySync for abstraction
export const getAppConfig = () => {
    return ConfigRepositorySync.getAppConfig();
};

// Save app config to storage
// Now uses ConfigRepositorySync for abstraction
export const saveAppConfig = (config) => {
    ConfigRepositorySync.saveAppConfig(config);
};
