import React from 'react';
import { FaMosque, FaStar, FaBookOpen, FaStickyNote } from 'react-icons/fa';
import { getActivityConfig, getAllWorshipCategories } from '../utils/worshipConfig';

// Helper function to get activity info from worshipConfig
const getActivityInfo = (activityId) => {
    // Ensure fresh config is loaded every time, INCLUDING archived items
    const allWorshipCategories = getAllWorshipCategories(true);

    // Normalize ID for comparison
    const targetId = String(activityId).trim();

    for (const cat of allWorshipCategories) {
        // Robust find with string normalization
        const foundItem = cat.items.find(item => String(item.id).trim() === targetId);

        if (foundItem) {
            const actConfig = getActivityConfig(targetId);
            const colorName = actConfig.colorName || 'blue';
            const IconComp = actConfig.icon || FaStar;

            // Determine category colors safely
            let catColorName = 'pink';
            if (cat.color) {
                // Try to extract color name from class like 'bg-amber-500' or default to pink
                const match = cat.color.match(/bg-([a-z]+)-/);
                if (match) catColorName = match[1];
            }

            return {
                label: foundItem.label,
                points: foundItem.points,
                category: cat.title,
                icon: <IconComp className="text-xl" />,
                color: `text-${colorName}-600`,
                bg: `bg-${colorName}-50`,
                categoryColor: `text-${catColorName}-600`,
                categoryBg: `bg-${catColorName}-100`
            };
        }
    }

    // Fallback for unknown/deleted activities
    return {
        label: activityId,
        points: 10,
        category: 'Ibadah Lainnya',
        icon: <FaStar className="text-xl" />,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        categoryColor: 'text-pink-600',
        categoryBg: 'bg-pink-100'
    };
};

export const loadAllActivities = () => {
    const allActivities = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('daily_report_')) {
            const dateStr = key.replace('daily_report_', '');
            let data = null;
            try {
                data = JSON.parse(localStorage.getItem(key));
            } catch (e) {
                console.error("Error parsing data for key:", key, e);
                continue;
            }

            if (!data) continue;

            const dateObj = new Date(`${dateStr}T00:00:00`); // Force Local Time
            const todayNow = new Date();
            const todayStr = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            const relativeDate = isToday ? 'Hari ini' : dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
            });

            // Process prayers
            if (data.prayers && Array.isArray(data.prayers)) {
                data.prayers.forEach((prayer, idx) => {
                    const isObject = typeof prayer === 'object' && prayer !== null;
                    const prayerId = isObject ? prayer.id : prayer;
                    const prayerTime = isObject && prayer.time ? prayer.time : null;
                    const isCongregation = isObject ? prayer.isCongregation : false;
                    const submittedAt = isObject && prayer.submittedAt ? prayer.submittedAt : null;
                    const displayTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');
                    const descTime = prayerTime ? prayerTime.replace(' WIB', '').replace('WIB', '') : (submittedAt ? submittedAt.substring(0, 5) : '-');

                    // Get style from config
                    const info = getActivityInfo(prayerId);

                    allActivities.push({
                        id: `${dateStr}-prayer-${idx}`,
                        date: formattedDate,
                        relativeDate: relativeDate,
                        rawDate: dateStr,
                        rawTime: submittedAt || prayerTime || '00:00',
                        time: `${displayTime} WIB`,
                        displayTime: `${relativeDate} • ${displayTime} WIB`,
                        title: `Salat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'} • ${descTime} WIB`,
                        category: "Salat Wajib",
                        status: "Menunggu",
                        points: info.points,
                        icon: info.icon,
                        color: info.color,
                        bg: info.bg
                    });
                });
            }

            // Process tadarus
            const tadarusList = Array.isArray(data.tadarus)
                ? data.tadarus
                : (data.tadarus ? [data.tadarus] : []);

            tadarusList.forEach((item, idx) => {
                if (!item) return;

                const isQuran = item.surah || item.ayatStart || item.ayatEnd;
                if (isQuran) {
                    const info = getActivityInfo('alquran');
                    allActivities.push({
                        id: `${dateStr}-tadarus-quran-${idx}`,
                        date: formattedDate,
                        relativeDate: relativeDate,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        time: item.submittedAt ? `${item.submittedAt.substring(0, 5)} WIB` : '-',
                        displayTime: item.submittedAt ? `${relativeDate} • ${item.submittedAt.substring(0, 5)} WIB` : '-',
                        title: `Tadarus Al-Qur'an`,
                        subtitle: `Surat ${item.surah || '-'} • Ayat ${item.ayatStart || '-'} - ${item.ayatEnd || '-'}`,
                        category: "Tadarus Al-Qur'an",
                        status: "Menunggu",
                        points: 50,
                        icon: info.icon,
                        color: info.color,
                        bg: info.bg,
                        categoryColor: info.categoryColor,
                        categoryBg: info.categoryBg
                    });
                }

                const isHijrati = item.page || item.jilid;
                if (isHijrati) {
                    const info = getActivityInfo('hijrati');
                    allActivities.push({
                        id: `${dateStr}-tadarus-hijrati-${idx}`,
                        date: formattedDate,
                        relativeDate: relativeDate,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        time: item.submittedAt ? `${item.submittedAt.substring(0, 5)} WIB` : '-',
                        displayTime: item.submittedAt ? `${relativeDate} • ${item.submittedAt.substring(0, 5)} WIB` : '-',
                        title: `Hijrati`,
                        subtitle: `Jilid ${item.jilid || '-'} • Halaman ${item.page || '-'}`,
                        category: "Hijrati",
                        status: "Menunggu",
                        points: 30,
                        icon: info.icon,
                        color: info.color,
                        bg: info.bg,
                        categoryColor: info.categoryColor,
                        categoryBg: info.categoryBg
                    });
                }
            });

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                    const info = getActivityInfo(itemId);
                    allActivities.push({
                        id: `${dateStr}-additional-${idx}`,
                        date: formattedDate,
                        relativeDate: relativeDate,
                        rawDate: dateStr,
                        rawTime: itemTime || '23:59:59',
                        time: itemTime ? `${itemTime.substring(0, 5)} WIB` : '-',
                        displayTime: itemTime ? `${relativeDate} • ${itemTime.substring(0, 5)} WIB` : '-',
                        title: info.label,
                        subtitle: (isObject && item.note) ? item.note : 'Ibadah tambahan hari ini',
                        category: info.category,
                        status: "Menunggu",
                        points: info.points,
                        icon: info.icon,
                        color: info.color || 'text-pink-600',
                        bg: info.bg || 'bg-pink-50',
                        categoryColor: info.categoryColor || 'text-pink-600',
                        categoryBg: info.categoryBg || 'bg-pink-100'
                    });
                });
            }

            // Process Literacy
            if (data.literacy && typeof data.literacy === 'object') {
                const info = getActivityInfo('literasi');
                allActivities.push({
                    id: `${dateStr}-literacy`,
                    date: formattedDate,
                    relativeDate: relativeDate,
                    rawDate: dateStr,
                    rawTime: data.literacy.submittedAt || '23:59:59',
                    time: data.literacy.submittedAt ? `${data.literacy.submittedAt.substring(0, 5)} WIB` : '-',
                    displayTime: data.literacy.submittedAt ? `${relativeDate} • ${data.literacy.submittedAt.substring(0, 5)} WIB` : '-',
                    title: `Literasi`,
                    subtitle: `${data.literacy.title} • Halaman ${data.literacy.page || '-'}`,
                    category: "Literasi",
                    status: "Menunggu",
                    points: 15,
                    icon: info.icon,
                    color: info.color,
                    bg: info.bg,
                    categoryColor: info.categoryColor,
                    categoryBg: info.categoryBg
                });
            }

            // Process General Notes
            if (data.notes) {
                allActivities.push({
                    id: `${dateStr}-note`,
                    date: formattedDate,
                    relativeDate: relativeDate,
                    rawDate: dateStr,
                    rawTime: data.submittedAt || '23:59:59',
                    time: data.submittedAt ? `${data.submittedAt.substring(0, 5)} WIB` : '-',
                    displayTime: data.submittedAt ? `${relativeDate} • ${data.submittedAt.substring(0, 5)} WIB` : '-',
                    title: 'Catatan Tambahan',
                    subtitle: data.notes,
                    category: "Catatan",
                    status: "Disetujui",
                    points: 0,
                    icon: <FaStickyNote className="text-xl" />,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50'
                });
            }
        }
    }

    // Sort by date and time (newest first - latest input on top)
    allActivities.sort((a, b) => {
        const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
        if (dateCompare !== 0) return dateCompare;
        return b.rawTime.localeCompare(a.rawTime);
    });

    return allActivities;
};
