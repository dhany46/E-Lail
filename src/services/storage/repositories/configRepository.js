/**
 * Config Repository
 * 
 * Manages application configuration and worship settings.
 * Keys: app_config, worship_points_settings, custom_activity_configs
 */

import { localStorageAdapter as storage } from '../localStorageAdapter.js';

// Storage Keys
const KEYS = {
    APP_CONFIG: 'app_config',
    WORSHIP_SETTINGS: 'worship_points_settings',
    CUSTOM_ACTIVITY_CONFIGS: 'custom_activity_configs'
};

// Default Values
const DEFAULT_APP_CONFIG = {
    dailyTarget: 8
};

export const ConfigRepository = {
    // ============ App Config ============

    /**
     * Get app configuration
     * @returns {Promise<{dailyTarget: number}>}
     */
    getAppConfig: async () => {
        const saved = await storage.get(KEYS.APP_CONFIG);
        return saved ? { ...DEFAULT_APP_CONFIG, ...saved } : DEFAULT_APP_CONFIG;
    },

    /**
     * Save app configuration
     * @param {Object} config 
     * @returns {Promise<void>}
     */
    saveAppConfig: async (config) => {
        await storage.set(KEYS.APP_CONFIG, config);
    },

    // ============ Worship Points Settings ============

    /**
     * Get worship categories settings (from admin)
     * @returns {Promise<Array|null>}
     */
    getWorshipSettings: async () => {
        return await storage.get(KEYS.WORSHIP_SETTINGS);
    },

    /**
     * Save worship categories settings
     * @param {Array} settings 
     * @returns {Promise<void>}
     */
    saveWorshipSettings: async (settings) => {
        await storage.set(KEYS.WORSHIP_SETTINGS, settings);
    },

    // ============ Custom Activity Configs ============

    /**
     * Get custom activity icon/color configs
     * @returns {Promise<Object>}
     */
    getCustomActivityConfigs: async () => {
        const saved = await storage.get(KEYS.CUSTOM_ACTIVITY_CONFIGS);
        return saved || {};
    },

    /**
     * Save a single custom activity config
     * @param {string} activityId 
     * @param {string} iconId 
     * @param {string} colorName 
     * @returns {Promise<void>}
     */
    saveCustomActivityConfig: async (activityId, iconId, colorName) => {
        const configs = await ConfigRepository.getCustomActivityConfigs();
        configs[activityId] = { iconId, colorName };
        await storage.set(KEYS.CUSTOM_ACTIVITY_CONFIGS, configs);
    },

    /**
     * Get all custom activity configs
     * @returns {Promise<Object>}
     */
    getAllCustomActivityConfigs: async () => {
        return await ConfigRepository.getCustomActivityConfigs();
    }
};

// ============ Sync Wrappers for Backward Compatibility ============
// These are synchronous versions for use in existing code that expects sync behavior
// They should be gradually migrated to async versions

export const ConfigRepositorySync = {
    getAppConfig: () => {
        const saved = localStorage.getItem(KEYS.APP_CONFIG);
        if (saved) {
            try {
                return { ...DEFAULT_APP_CONFIG, ...JSON.parse(saved) };
            } catch (e) {
                return DEFAULT_APP_CONFIG;
            }
        }
        return DEFAULT_APP_CONFIG;
    },

    saveAppConfig: (config) => {
        localStorage.setItem(KEYS.APP_CONFIG, JSON.stringify(config));
    },

    getWorshipSettings: () => {
        const saved = localStorage.getItem(KEYS.WORSHIP_SETTINGS);
        return saved ? JSON.parse(saved) : null;
    },

    getCustomActivityConfigs: () => {
        const saved = localStorage.getItem(KEYS.CUSTOM_ACTIVITY_CONFIGS);
        return saved ? JSON.parse(saved) : {};
    },

    saveCustomActivityConfig: (activityId, iconId, colorName) => {
        const configs = ConfigRepositorySync.getCustomActivityConfigs();
        configs[activityId] = { iconId, colorName };
        localStorage.setItem(KEYS.CUSTOM_ACTIVITY_CONFIGS, JSON.stringify(configs));
    }
};
