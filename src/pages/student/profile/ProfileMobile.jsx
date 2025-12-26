import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to load all activities from localStorage (same as Dashboard)
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

                    allActivities.push({
                        id: `${dateStr}-prayer-${idx}`,
                        rawDate: dateStr,
                        rawTime: prayerTime || '00:00',
                        title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        time: `${formattedDate}${prayerTime ? `, ${prayerTime} WIB` : ''}`,
                        points: isCongregation ? 25 : 10,
                        icon: "mosque",
                        color: "bg-primary/10 text-primary"
                    });
                });
            }

            // Process tadarus
            if (data.tadarus && typeof data.tadarus === 'object') {
                allActivities.push({
                    id: `${dateStr}-tadarus`,
                    rawDate: dateStr,
                    rawTime: data.tadarus.submittedAt || '23:59',
                    title: `Membaca Surat ${data.tadarus.surah}`,
                    time: formattedDate,
                    points: 50,
                    icon: "menu_book",
                    color: "bg-amber-100 text-amber-600"
                });
            }

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                const additionalLabels = {
                    'dhuha': { label: 'Sholat Dhuha', icon: 'mosque', points: 15 },
                    'infaq': { label: 'Infaq / Sedekah', icon: 'volunteer_activism', points: 10 },
                    'help': { label: 'Bantu Orang Tua', icon: 'favorite', points: 25 }
                };
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                    const info = additionalLabels[itemId] || { label: itemId, icon: 'star', points: 10 };
                    allActivities.push({
                        id: `${dateStr}-additional-${idx}`,
                        rawDate: dateStr,
                        rawTime: itemTime || '23:59',
                        title: info.label,
                        time: `${formattedDate}${itemTime ? `, ${itemTime} WIB` : ''}`,
                        points: info.points,
                        icon: info.icon,
                        color: "bg-purple-100 text-purple-600"
                    });
                });
            }
        }
    }

    // Sort by date and time (newest first)
    allActivities.sort((a, b) => {
        const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
        if (dateCompare !== 0) return dateCompare;
        return b.rawTime.localeCompare(a.rawTime);
    });
    return allActivities;
};

const ProfileMobile = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        totalPoints: 0,
        totalActivities: 0,
        todayPoints: 0
    });

    const studentInfo = {
        name: "Ahmad",
        fullName: "Ahmad Zaki",
        classRoom: "4B",
        className: "Kelas 4 Abu Bakar",
        nis: "12345678",
        teacher: "Ust. Abdullah"
    };

    useEffect(() => {
        const allActivities = loadAllActivities();
        setActivities(allActivities);

        const today = new Date().toISOString().split('T')[0];
        const totalPoints = allActivities.reduce((sum, a) => sum + a.points, 0);
        const todayActivities = allActivities.filter(a => a.rawDate === today);
        const todayPoints = todayActivities.reduce((sum, a) => sum + a.points, 0);

        setStats({
            totalPoints,
            totalActivities: allActivities.length,
            todayPoints
        });
    }, []);

    const getLevel = (points) => {
        if (points >= 2000) return { level: 6, name: "Santri Teladan", nextLevel: 2500 };
        if (points >= 1500) return { level: 5, name: "Mujahid Cilik", nextLevel: 2000 };
        if (points >= 1000) return { level: 4, name: "Rajin Ibadah", nextLevel: 1500 };
        if (points >= 500) return { level: 3, name: "Pemula Taat", nextLevel: 1000 };
        if (points >= 200) return { level: 2, name: "Belajar Istiqomah", nextLevel: 500 };
        return { level: 1, name: "Pemula", nextLevel: 200 };
    };

    const levelInfo = getLevel(stats.totalPoints);

    // Badges logic (using mock data for structure mostly)
    const badges = [
        { id: 1, name: "Rajin Sholat", icon: "🕌", color: "bg-gradient-to-br from-amber-400 to-orange-500", locked: stats.totalActivities < 5 },
        { id: 2, name: "Pecinta Quran", icon: "📖", color: "bg-gradient-to-br from-blue-400 to-blue-600", locked: activities.filter(a => a.icon === 'menu_book').length < 3 },
        { id: 3, name: "Dermawan", icon: "💝", color: "bg-gradient-to-br from-pink-400 to-rose-500", locked: activities.filter(a => a.icon === 'volunteer_activism').length < 3 },
        { id: 4, name: "Shubuh Warrior", icon: "🌅", color: "bg-gradient-to-br from-purple-400 to-indigo-500", locked: true }, // Extra mock badge for scroll demo
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-24 font-sans">
            {/* Sticky Header */}
            <div className="bg-white/90 backdrop-blur-md sticky top-0 z-20 px-5 pt-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                <h1 className="text-xl font-extrabold text-gray-800">Profil Saya 👤</h1>
                <button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>

            <div className="p-5 space-y-6">

                {/* Profile Information Block */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3">
                        <div className="size-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-emerald-200 ring-4 ring-white">
                            {studentInfo.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                            <div className="bg-emerald-500 text-white rounded-full size-6 flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{studentInfo.fullName}</h2>
                    <p className="text-sm text-gray-500 font-medium mb-3">{studentInfo.className} • {studentInfo.nis}</p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold border border-orange-100">
                        <span className="material-symbols-outlined text-sm">person</span>
                        Wali: {studentInfo.teacher}
                    </div>
                </div>

                {/* Level Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <span className="text-8xl">🏆</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Peringkat</span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[10px] font-bold">Level {levelInfo.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-emerald-600 mb-3">{levelInfo.name}</h3>

                        <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min((stats.totalPoints / levelInfo.nextLevel) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-gray-400">
                            <span>{stats.totalPoints} Poin</span>
                            <span>Target: {levelInfo.nextLevel}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="size-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{stats.todayPoints}</span>
                        <span className="text-xs text-gray-400 font-bold">Poin Hari Ini</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="size-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined">event_note</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{stats.totalActivities}</span>
                        <span className="text-xs text-gray-400 font-bold">Total Laporan</span>
                    </div>
                </div>

                {/* Badges Horizontal Scroll */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-800 text-sm">Koleksi Badge</h3>
                        <span className="text-xs font-bold text-gray-400">{badges.filter(b => !b.locked).length}/{badges.length}</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
                        {badges.map((badge) => (
                            <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-2 w-20 group ${badge.locked ? 'opacity-60 saturate-0' : ''}`}>
                                <div className={`size-16 rounded-2xl flex items-center justify-center shadow-md transition-transform active:scale-95 ${badge.locked ? 'bg-gray-200' : badge.color}`}>
                                    <span className="text-3xl">{badge.locked ? '🔒' : badge.icon}</span>
                                </div>
                                <span className="text-[10px] font-bold text-center text-gray-600 leading-tight">
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links Menu */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button onClick={() => navigate('/student/history')} className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">history</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700">Riwayat Ibadah</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                    <button onClick={() => navigate('/student/leaderboard')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">leaderboard</span>
                            </div>
                            <span className="text-sm font-bold text-gray-700">Peringkat & Klasemen</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfileMobile;
