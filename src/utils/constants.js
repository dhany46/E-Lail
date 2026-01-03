export const INPUT_TYPES = {
    CHECKBOX: 'checkbox',
    TEXT: 'text',
    FORM: 'form',
};

// App Configuration - can be stored in localStorage
export const DEFAULT_APP_CONFIG = {
    dailyTarget: 8,
};

// Get app config from localStorage or return defaults
export const getAppConfig = () => {
    const saved = localStorage.getItem('app_config');
    if (saved) {
        try {
            return { ...DEFAULT_APP_CONFIG, ...JSON.parse(saved) };
        } catch (e) {
            return DEFAULT_APP_CONFIG;
        }
    }
    return DEFAULT_APP_CONFIG;
};

// Save app config to localStorage
export const saveAppConfig = (config) => {
    localStorage.setItem('app_config', JSON.stringify(config));
};
