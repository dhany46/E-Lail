/**
 * UI State Repository
 * 
 * Manages UI-related persisted state:
 * - Notification tracking
 * - Achievement flags
 * - Leaderboard cache
 * - First-seen tracking
 */

import { localStorageAdapter as storage } from '../localStorageAdapter.js';

// Key Prefixes
const PREFIXES = {
    NOTIFICATION: 'notification_',
    ACHIEVEMENT: 'achievement_',
    LEADERBOARD_CACHE: 'leaderboard_',
    FIRST_SEEN: 'first_seen_'
};

export const UIStateRepository = {
    // ============ Notifications ============

    /**
     * Get last read notification count
     * @returns {Promise<number>}
     */
    getLastReadNotificationCount: async () => {
        const raw = await storage.getRaw(`${PREFIXES.NOTIFICATION}last_read_count`);
        return raw ? parseInt(raw, 10) : 0;
    },

    /**
     * Set last read notification count
     * @param {number} count 
     * @returns {Promise<void>}
     */
    setLastReadNotificationCount: async (count) => {
        await storage.setRaw(`${PREFIXES.NOTIFICATION}last_read_count`, count.toString());
    },

    // ============ Achievements ============

    /**
     * Check if achievement has been shown
     * @param {string} achievementKey 
     * @returns {Promise<boolean>}
     */
    hasShownAchievement: async (achievementKey) => {
        const value = await storage.getRaw(`${PREFIXES.ACHIEVEMENT}${achievementKey}`);
        return value === 'true';
    },

    /**
     * Mark achievement as shown
     * @param {string} achievementKey 
     * @returns {Promise<void>}
     */
    markAchievementShown: async (achievementKey) => {
        await storage.setRaw(`${PREFIXES.ACHIEVEMENT}${achievementKey}`, 'true');
    },

    // ============ Leaderboard Cache ============

    /**
     * Get cached leaderboard data
     * @param {string} cacheKey 
     * @returns {Promise<{data: any, timestamp: number}|null>}
     */
    getLeaderboardCache: async (cacheKey) => {
        return await storage.get(`${PREFIXES.LEADERBOARD_CACHE}${cacheKey}`);
    },

    /**
     * Set leaderboard cache
     * @param {string} cacheKey 
     * @param {any} data 
     * @returns {Promise<void>}
     */
    setLeaderboardCache: async (cacheKey, data) => {
        await storage.set(`${PREFIXES.LEADERBOARD_CACHE}${cacheKey}`, {
            data,
            timestamp: Date.now()
        });
    },

    /**
     * Check if cache is still valid (within TTL)
     * @param {string} cacheKey 
     * @param {number} ttlMs - Time-to-live in milliseconds
     * @returns {Promise<boolean>}
     */
    isLeaderboardCacheValid: async (cacheKey, ttlMs = 5 * 60 * 1000) => {
        const cached = await UIStateRepository.getLeaderboardCache(cacheKey);
        if (!cached) return false;
        return (Date.now() - cached.timestamp) < ttlMs;
    },

    // ============ First Seen Tracking ============

    /**
     * Get first seen date for a key
     * @param {string} key 
     * @returns {Promise<string|null>}
     */
    getFirstSeenDate: async (key) => {
        return await storage.getRaw(`${PREFIXES.FIRST_SEEN}${key}`);
    },

    /**
     * Set first seen date (only if not already set)
     * @param {string} key 
     * @param {string} dateStr 
     * @returns {Promise<boolean>} - Returns true if this was the first time
     */
    setFirstSeenDate: async (key, dateStr) => {
        const existing = await UIStateRepository.getFirstSeenDate(key);
        if (existing) return false;

        await storage.setRaw(`${PREFIXES.FIRST_SEEN}${key}`, dateStr);
        return true;
    },

    // ============ Clear All UI State ============

    /**
     * Clear all UI state (useful for logout/reset)
     * @returns {Promise<void>}
     */
    clearAll: async () => {
        await storage.removeByPrefix(PREFIXES.NOTIFICATION);
        await storage.removeByPrefix(PREFIXES.ACHIEVEMENT);
        await storage.removeByPrefix(PREFIXES.LEADERBOARD_CACHE);
        await storage.removeByPrefix(PREFIXES.FIRST_SEEN);
    }
};

// ============ Sync Wrappers for Backward Compatibility ============

export const UIStateRepositorySync = {
    getLastReadNotificationCount: () => {
        const raw = localStorage.getItem(`${PREFIXES.NOTIFICATION}last_read_count`);
        return raw ? parseInt(raw, 10) : 0;
    },

    setLastReadNotificationCount: (count) => {
        localStorage.setItem(`${PREFIXES.NOTIFICATION}last_read_count`, count.toString());
    },

    hasShownAchievement: (achievementKey) => {
        return localStorage.getItem(`${PREFIXES.ACHIEVEMENT}${achievementKey}`) === 'true';
    },

    markAchievementShown: (achievementKey) => {
        localStorage.setItem(`${PREFIXES.ACHIEVEMENT}${achievementKey}`, 'true');
    },

    getLeaderboardCache: (cacheKey) => {
        const raw = localStorage.getItem(`${PREFIXES.LEADERBOARD_CACHE}${cacheKey}`);
        return raw ? JSON.parse(raw) : null;
    },

    setLeaderboardCache: (cacheKey, data) => {
        localStorage.setItem(`${PREFIXES.LEADERBOARD_CACHE}${cacheKey}`, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    },

    getFirstSeenDate: (key) => {
        return localStorage.getItem(`${PREFIXES.FIRST_SEEN}${key}`);
    },

    setFirstSeenDate: (key, dateStr) => {
        const existing = localStorage.getItem(`${PREFIXES.FIRST_SEEN}${key}`);
        if (existing) return false;
        localStorage.setItem(`${PREFIXES.FIRST_SEEN}${key}`, dateStr);
        return true;
    }
};
