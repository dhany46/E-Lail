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

            const dateObj = new Date(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
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
                    const displayTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');

                    allActivities.push({
                        id: `${dateStr}-prayer-${idx}`,
                        rawDate: dateStr,
                        rawTime: submittedAt || prayerTime || '00:00',
                        title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        date: formattedDate,
                        time: `${displayTime} WIB`,
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
                    date: formattedDate,
                    time: data.tadarus.submittedAt ? `${data.tadarus.submittedAt.substring(0, 5)} WIB` : '-',
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
                        date: formattedDate,
                        time: itemTime ? `${itemTime.substring(0, 5)} WIB` : '-',
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
        const today = new Date().toISOString().split('T')[0];
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

    const props = {
        activities,
        stats,
        studentInfo
    };

    return isMobile ? <DashboardMobile {...props} /> : <DashboardDesktop {...props} />;
};

export default Dashboard;
