import React, { useState, useEffect } from 'react';
import DashboardDesktop from './dashboard/DashboardDesktop';
import DashboardMobile from './dashboard/DashboardMobile';

// Helper function to load all activities from localStorage
// Keeping this here for shared access
const loadAllActivities = () => {
    const allActivities = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('daily_report_')) {
            const dateStr = key.replace('daily_report_', '');
            const data = JSON.parse(localStorage.getItem(key));

            const dateObj = new Date(`${dateStr}T00:00:00`); // Force Local Time
            const todayNow = new Date();
            const todayStr = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const formattedDate = isToday ? 'Hari ini' : dateObj.toLocaleDateString('id-ID', {
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
                    // Header Time = Input Time (submittedAt)
                    const headerTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');
                    // Description Time = Actual Prayer Time
                    const descTime = prayerTime ? prayerTime.replace(' WIB', '').replace('WIB', '') : (submittedAt ? submittedAt.substring(0, 5) : '-');

                    allActivities.push({
                        id: `${dateStr}-prayer-${idx}`,
                        rawDate: dateStr,
                        rawTime: submittedAt || prayerTime || '00:00',
                        title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'} • ${descTime} WIB`,
                        date: formattedDate,
                        time: `${formattedDate} • ${headerTime} WIB`,
                        points: isCongregation ? 25 : 10,
                        status: "Menunggu",
                        icon: "mosque",
                        color: "text-primary",
                        bg: "bg-primary/10"
                    });
                });
            }

            // Process tadarus
            if (data.tadarus && typeof data.tadarus === 'object') {
                allActivities.push({
                    id: `${dateStr}-tadarus`,
                    rawDate: dateStr,
                    rawTime: data.tadarus.submittedAt || '23:59:59',
                    title: `Membaca Surat ${data.tadarus.surah}`,
                    subtitle: `Ayat ${data.tadarus.ayatStart} - ${data.tadarus.ayatEnd}`,
                    date: formattedDate,
                    time: data.tadarus.submittedAt ? `${formattedDate} • ${data.tadarus.submittedAt.substring(0, 5)} WIB` : '-',
                    points: 50,
                    status: "Menunggu",
                    icon: "menu_book",
                    color: "text-primary-dark",
                    bg: "bg-primary/10"
                });
            }

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                const additionalLabels = {
                    'dhuha': { label: 'Sholat Dhuha', icon: 'mosque', points: 15 },
                    'infaq': { label: 'Infaq / Sedekah', icon: 'volunteer_activism', points: 10 },
                    'help': { label: 'Membantu Orang Tua', icon: 'favorite', points: 25 }
                };
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;
                    const info = additionalLabels[itemId] || { label: itemId, icon: 'star', points: 10 };

                    allActivities.push({
                        id: `${dateStr}-additional-${idx}`,
                        rawDate: dateStr,
                        rawTime: itemTime || '23:59:59',
                        title: info.label,
                        subtitle: (isObject && item.note) ? item.note : 'Ibadah tambahan hari ini',
                        date: formattedDate,
                        time: itemTime ? `${formattedDate} • ${itemTime.substring(0, 5)} WIB` : '-',
                        points: info.points,
                        status: "Menunggu",
                        icon: info.icon,
                        color: "text-primary",
                        bg: "bg-primary/10"
                    });
                });
            }
        }
    }

    allActivities.sort((a, b) => {
        const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
        if (dateCompare !== 0) return dateCompare;
        return b.rawTime.localeCompare(a.rawTime);
    });
    return allActivities;
};

const Dashboard = () => {
    const [activities, setActivities] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [stats, setStats] = useState({
        totalPoints: 0,
        todayPoints: 0,
        pendingCount: 0,
        todayCount: 0,
        targetDaily: 8
    });

    const studentInfo = {
        name: "Ahmad",
        classRoom: "4B",
        teacher: "Ust. Abdullah"
    };

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load data
    useEffect(() => {
        const allLoadedActivities = loadAllActivities();
        setActivities(allLoadedActivities);
    }, []);

    // Calculate stats
    useEffect(() => {
        const todayNow = new Date();
        const today = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;
        const totalPoints = activities.reduce((sum, a) => sum + a.points, 0);
        const todayActivities = activities.filter(a => a.rawDate === today);
        const todayPoints = todayActivities.reduce((sum, a) => sum + a.points, 0);
        const pendingCount = activities.filter(a => a.status === 'Menunggu').length;
        const todayCount = todayActivities.length;

        setStats({
            totalPoints,
            todayPoints,
            pendingCount,
            todayCount,
            targetDaily: 8
        });
    }, [activities]);

    // Mock teacher note (Centralized data)
    // Mock teacher note properties
    const noteId = 'note-2024-10-20-v1'; // Unique ID for the note
    const noteSentDate = '2024-10-20';

    // State for note display logic
    const [noteStatus, setNoteStatus] = useState({
        isNew: false,
        displayDate: new Date(`${noteSentDate}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    });

    // Effect to handle "First Seen" logic
    useEffect(() => {
        const todayNow = new Date();
        const today = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;
        const storageKey = `teacher_note_seen_${noteId}`;
        const firstSeenDate = localStorage.getItem(storageKey);

        if (!firstSeenDate) {
            // First time seeing this note: Mark as seen TODAY
            localStorage.setItem(storageKey, today);
            setNoteStatus({
                isNew: true,
                displayDate: 'Hari ini'
            });
        } else {
            // Already seen. Check if it's been more than 1 day since first seen.
            // Requirement: "pastikan sudah lewat 1 hari status berubah" (Ensure status changes after 1 day passed)
            // If today is different from firstSeenDate, it's "Old"
            if (today !== firstSeenDate) {
                setNoteStatus({
                    isNew: false,
                    displayDate: new Date(`${noteSentDate}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                });
            } else {
                // Still same day as first seen
                setNoteStatus({
                    isNew: true,
                    displayDate: 'Hari ini'
                });
            }
        }
    }, [noteId, noteSentDate]);

    const teacherNote = {
        teacherName: 'Ustadz Ahmad',
        teacherInitials: 'UA',
        message: 'Alhamdulillah, semangat belajar dan beribadah terus ya! Jangan lupa hafalan Juz 30 minggu depan 📖',
        date: noteStatus.displayDate,
        isNew: noteStatus.isNew
    };

    const props = {
        activities,
        stats,
        studentInfo,
        teacherNote // Pass to children
    };

    return isMobile ? <DashboardMobile {...props} /> : <DashboardDesktop {...props} />;
};

export default Dashboard;
