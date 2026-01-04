/**
 * Daily Report Repository
 * 
 * Manages daily_report_{date} entries in storage.
 * This is the main data store for student activities.
 */

import { localStorageAdapter as storage } from '../localStorageAdapter.js';

const KEY_PREFIX = 'daily_report_';

/**
 * @typedef {Object} Prayer
 * @property {string} id - Prayer ID (subuh, zuhur, etc.)
 * @property {string} time - Time string (HH:MM)
 * @property {boolean} isCongregation - Whether prayed in congregation
 * @property {string} submittedAt - Submission time (HH:MM:SS)
 */

/**
 * @typedef {Object} TadarusEntry
 * @property {string|null} surah - Surah name (for Al-Quran)
 * @property {string|null} ayatStart - Start verse
 * @property {string|null} ayatEnd - End verse
 * @property {string|null} page - Page number (for Hijrati)
 * @property {string|null} jilid - Volume number (for Hijrati)
 * @property {string} submittedAt - Submission time
 */

/**
 * @typedef {Object} DailyReport
 * @property {Prayer[]} prayers - Array of completed prayers
 * @property {TadarusEntry[]} tadarus - Array of tadarus entries
 * @property {Object|null} literacy - Literacy activity
 * @property {Array<{id: string, submittedAt: string, note: string}>} additional - Additional worships
 * @property {string} notes - General notes
 * @property {string} submittedAt - Last submission time
 */

export const DailyReportRepository = {
    /**
     * Get today's date string in YYYY-MM-DD format
     * @returns {string}
     */
    getTodayKey: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    /**
     * Get report by date
     * @param {string} dateStr - Date in YYYY-MM-DD format
     * @returns {Promise<DailyReport|null>}
     */
    getByDate: async (dateStr) => {
        return await storage.get(`${KEY_PREFIX}${dateStr}`);
    },

    /**
     * Get today's report
     * @returns {Promise<DailyReport|null>}
     */
    getToday: async () => {
        const today = DailyReportRepository.getTodayKey();
        return await DailyReportRepository.getByDate(today);
    },

    /**
     * Save report for a specific date
     * @param {string} dateStr - Date in YYYY-MM-DD format
     * @param {DailyReport} data - Report data
     * @returns {Promise<void>}
     */
    save: async (dateStr, data) => {
        await storage.set(`${KEY_PREFIX}${dateStr}`, data);
    },

    /**
     * Save today's report
     * @param {DailyReport} data 
     * @returns {Promise<void>}
     */
    saveToday: async (data) => {
        const today = DailyReportRepository.getTodayKey();
        await DailyReportRepository.save(today, data);
    },

    /**
     * Get all daily reports
     * @returns {Promise<Array<{date: string, data: DailyReport}>>}
     */
    getAll: async () => {
        const entries = await storage.getAllByPrefix(KEY_PREFIX);
        return entries.map(({ key, value }) => ({
            date: key.replace(KEY_PREFIX, ''),
            data: value
        }));
    },

    /**
     * Delete report by date
     * @param {string} dateStr 
     * @returns {Promise<void>}
     */
    deleteByDate: async (dateStr) => {
        await storage.remove(`${KEY_PREFIX}${dateStr}`);
    },

    /**
     * Delete all reports
     * @returns {Promise<void>}
     */
    deleteAll: async () => {
        await storage.removeByPrefix(KEY_PREFIX);
    },

    /**
     * Merge new data with existing report (for incremental saves)
     * @param {string} dateStr 
     * @param {Partial<DailyReport>} newData 
     * @returns {Promise<DailyReport>}
     */
    merge: async (dateStr, newData) => {
        const existing = await DailyReportRepository.getByDate(dateStr) || {
            prayers: [],
            tadarus: [],
            literacy: null,
            additional: [],
            notes: '',
            submittedAt: ''
        };

        const merged = {
            prayers: [...(existing.prayers || []), ...(newData.prayers || [])],
            tadarus: [...(existing.tadarus || []), ...(newData.tadarus || [])].filter(Boolean),
            literacy: newData.literacy || existing.literacy,
            additional: [...(existing.additional || []), ...(newData.additional || [])],
            notes: newData.notes || existing.notes,
            submittedAt: newData.submittedAt || existing.submittedAt
        };

        await DailyReportRepository.save(dateStr, merged);
        return merged;
    }
};

// ============ Sync Wrappers for Backward Compatibility ============

const KEY_PREFIX_SYNC = 'daily_report_';

export const DailyReportRepositorySync = {
    getTodayKey: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getByDate: (dateStr) => {
        const raw = localStorage.getItem(`${KEY_PREFIX_SYNC}${dateStr}`);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error(`[Storage] Error parsing daily_report_${dateStr}:`, e);
            return null;
        }
    },

    getToday: () => {
        return DailyReportRepositorySync.getByDate(DailyReportRepositorySync.getTodayKey());
    },

    save: (dateStr, data) => {
        localStorage.setItem(`${KEY_PREFIX_SYNC}${dateStr}`, JSON.stringify(data));
    },

    saveToday: (data) => {
        DailyReportRepositorySync.save(DailyReportRepositorySync.getTodayKey(), data);
    },

    getAll: () => {
        const reports = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(KEY_PREFIX_SYNC)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    reports.push({
                        date: key.replace(KEY_PREFIX_SYNC, ''),
                        data
                    });
                } catch (e) {
                    console.error(`[Storage] Error parsing ${key}:`, e);
                }
            }
        }
        return reports;
    },

    deleteByDate: (dateStr) => {
        localStorage.removeItem(`${KEY_PREFIX_SYNC}${dateStr}`);
    },

    deleteAll: () => {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(KEY_PREFIX_SYNC)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
};
