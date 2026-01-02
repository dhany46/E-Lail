import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import DashboardDesktop from './dashboard/DashboardDesktop';
import DashboardMobile from './dashboard/DashboardMobile';
import { getActivityConfig, getAllWorshipCategories } from '../../utils/worshipConfig';

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
                        title: `Salat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'} • ${descTime} WIB`,
                        category: "Salat Wajib",
                        date: formattedDate,
                        time: `${formattedDate} • ${headerTime} WIB`,
                        points: isCongregation ? 25 : 10,
                        status: "Menunggu",
                        icon: "mosque",
                        color: "text-blue-600",
                        bg: "bg-blue-50"
                    });
                });
            }

            // Process tadarus (Array Support)
            const tadarusList = Array.isArray(data.tadarus)
                ? data.tadarus
                : (data.tadarus ? [data.tadarus] : []);

            tadarusList.forEach((item, idx) => {
                if (!item) return;

                // Process Al-Qur'an (Relaxed check)
                if (item.surah || item.ayatStart) {
                    allActivities.push({
                        id: `${dateStr}-tadarus-quran-${idx}`,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        title: `Tadarus Al-Qur'an`,
                        subtitle: `Surat ${item.surah} • Ayat ${item.ayatStart} - ${item.ayatEnd}`,
                        category: "Tadarus Al-Qur'an",
                        date: formattedDate,
                        time: item.submittedAt ? `${formattedDate} • ${item.submittedAt.substring(0, 5)} WIB` : '-',
                        points: 50,
                        status: "Menunggu",
                        icon: "menu_book",
                        color: "text-blue-600",
                        bg: "bg-blue-50"
                    });
                }

                // Process Hijrati
                if (item.page || item.jilid) {
                    allActivities.push({
                        id: `${dateStr}-tadarus-hijrati-${idx}`,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        title: `Hijrati`,
                        subtitle: `Jilid ${item.jilid || '-'} • Halaman ${item.page || '-'}`,
                        category: "Hijrati",
                        date: formattedDate,
                        time: item.submittedAt ? `${formattedDate} • ${item.submittedAt.substring(0, 5)} WIB` : '-',
                        points: 30,
                        status: "Menunggu",
                        icon: "menu_book",
                        color: "text-amber-600",
                        bg: "bg-amber-50"
                    });
                }
            });

            // Process literacy
            if (data.literacy && typeof data.literacy === 'object' && data.literacy.title) {
                allActivities.push({
                    id: `${dateStr}-literacy`,
                    rawDate: dateStr,
                    rawTime: data.literacy.submittedAt || '23:59:59',
                    title: `Literasi`,
                    subtitle: `${data.literacy.title} • Halaman ${data.literacy.page || '-'}`,
                    category: "Literasi",
                    date: formattedDate,
                    time: data.literacy.submittedAt ? `${formattedDate} • ${data.literacy.submittedAt.substring(0, 5)} WIB` : '-',
                    points: 15,
                    status: "Menunggu",
                    icon: "auto_stories",
                    color: "text-indigo-600",
                    bg: "bg-indigo-50",
                    categoryColor: "text-indigo-600",
                    categoryBg: "bg-indigo-100"
                });
            }

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                // Get all worship categories from admin settings
                const allCategories = getAllWorshipCategories();
                
                // Dynamic activity info lookup
                const getActivityInfo = (activityId) => {
                    for (const cat of allCategories) {
                        const foundItem = cat.items.find(item => item.id === activityId);
                        if (foundItem) {
                            const actConfig = getActivityConfig(activityId);
                            const colorName = actConfig.colorName || 'blue';
                            const catColorName = cat.color?.replace('bg-', '').replace('-500', '') || 'pink';
                            
                            return {
                                label: foundItem.label,
                                points: foundItem.points,
                                category: cat.title,
                                color: `text-${colorName}-600`,
                                bg: `bg-${colorName}-50`,
                                categoryColor: `text-${catColorName}-600`,
                                categoryBg: `bg-${catColorName}-100`
                            };
                        }
                    }
                    return { label: activityId, category: 'Ibadah Lainnya', points: 10, color: 'text-slate-600', bg: 'bg-slate-50', categoryColor: 'text-pink-600', categoryBg: 'bg-pink-100' };
                };
                
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;
                    const info = getActivityInfo(itemId);

                    allActivities.push({
                        id: `${dateStr}-additional-${idx}`,
                        rawDate: dateStr,
                        rawTime: itemTime || '23:59:59',
                        title: info.label,
                        subtitle: (isObject && item.note) ? item.note : 'Ibadah tambahan hari ini',
                        category: info.category,
                        date: formattedDate,
                        time: itemTime ? `${formattedDate} • ${itemTime.substring(0, 5)} WIB` : '-',
                        points: info.points,
                        status: "Menunggu",
                        color: info.color,
                        bg: info.bg,
                        categoryColor: info.categoryColor,
                        categoryBg: info.categoryBg
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

    // Calculate stats (Semester Based)
    useEffect(() => {
        const todayNow = new Date();
        const year = todayNow.getFullYear();
        const month = todayNow.getMonth(); // 0-11
        const today = `${year}-${String(month + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;

        // Semester & Academic Year Logic
        let semesterStart, semesterEnd, semesterLabel, academicYearLabel;

        if (month >= 6) { // Jul - Dec (Semester 1)
            semesterStart = new Date(`${year}-07-01`);
            semesterEnd = new Date(`${year}-12-31`);
            semesterLabel = "Semester 1";
            academicYearLabel = `${year}/${year + 1}`;
        } else { // Jan - Jun (Semester 2)
            semesterStart = new Date(`${year}-01-01`);
            semesterEnd = new Date(`${year}-06-30`);
            semesterLabel = "Semester 2";
            academicYearLabel = `${year - 1}/${year}`;
        }

        // Filter activities for CURRENT SEMESTER only
        const semesterActivities = activities.filter(a => {
            const activityDate = new Date(a.rawDate);
            return activityDate >= semesterStart && activityDate <= semesterEnd;
        });

        const totalPoints = semesterActivities.reduce((sum, a) => sum + a.points, 0);

        // Today stats remains based on ALL activities for today (regardless of semester logic, though usually overlaps)
        const todayActivities = activities.filter(a => a.rawDate === today);
        const todayPoints = todayActivities.reduce((sum, a) => sum + a.points, 0);
        const pendingCount = activities.filter(a => a.status === 'Menunggu').length;
        const todayCount = todayActivities.length;

        setStats({
            totalPoints, // Now stores Semester Points
            todayPoints,
            pendingCount,
            todayCount,
            targetDaily: 8,
            semesterLabel,
            academicYearLabel
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
