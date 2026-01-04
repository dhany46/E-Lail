/**
 * localStorage Adapter
 * 
 * Implements StorageAdapter interface using browser's localStorage.
 * All methods return Promises for consistency with future async backends.
 */

export const localStorageAdapter = {
    /**
     * Get value from localStorage
     * @param {string} key 
     * @returns {Promise<any>} Parsed JSON value or null
     */
    get: async (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error(`[Storage] Error reading key "${key}":`, e);
            return null;
        }
    },

    /**
     * Set value in localStorage
     * @param {string} key 
     * @param {any} value - Will be JSON stringified
     * @returns {Promise<void>}
     */
    set: async (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`[Storage] Error writing key "${key}":`, e);
            throw e;
        }
    },

    /**
     * Remove value from localStorage
     * @param {string} key 
     * @returns {Promise<void>}
     */
    remove: async (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`[Storage] Error removing key "${key}":`, e);
        }
    },

    /**
     * Get all entries with keys matching a prefix
     * @param {string} prefix 
     * @returns {Promise<Array<{key: string, value: any}>>}
     */
    getAllByPrefix: async (prefix) => {
        const results = [];
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(prefix)) {
                    try {
                        const value = JSON.parse(localStorage.getItem(key));
                        results.push({ key, value });
                    } catch (parseError) {
                        console.error(`[Storage] Error parsing key "${key}":`, parseError);
                    }
                }
            }
        } catch (e) {
            console.error(`[Storage] Error getting keys by prefix "${prefix}":`, e);
        }
        return results;
    },

    /**
     * Remove all entries with keys matching a prefix
     * @param {string} prefix 
     * @returns {Promise<void>}
     */
    removeByPrefix: async (prefix) => {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    },

    /**
     * Clear all localStorage (use with caution!)
     * @returns {Promise<void>}
     */
    clear: async () => {
        localStorage.clear();
    },

    /**
     * Get raw string value (for non-JSON values like numbers/strings)
     * @param {string} key 
     * @returns {Promise<string|null>}
     */
    getRaw: async (key) => {
        return localStorage.getItem(key);
    },

    /**
     * Set raw string value (for non-JSON values)
     * @param {string} key 
     * @param {string} value 
     * @returns {Promise<void>}
     */
    setRaw: async (key, value) => {
        localStorage.setItem(key, value);
    }
};
