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

const Profile = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        totalPoints: 0,
        totalActivities: 0,
        todayPoints: 0
    });

    // Student info - same as Dashboard
    const studentInfo = {
        name: "Ahmad",
        fullName: "Ahmad Zaki",
        classRoom: "4B",
        className: "Kelas 4 Abu Bakar",
        nis: "12345678",
        teacher: "Ust. Abdullah"
    };

    // Load data on mount
    useEffect(() => {
        const allActivities = loadAllActivities();
        setActivities(allActivities);

        // Calculate stats
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

    // Calculate level based on points
    const getLevel = (points) => {
        if (points >= 2000) return { level: 6, name: "Santri Teladan", nextLevel: 2500 };
        if (points >= 1500) return { level: 5, name: "Mujahid Cilik", nextLevel: 2000 };
        if (points >= 1000) return { level: 4, name: "Rajin Ibadah", nextLevel: 1500 };
        if (points >= 500) return { level: 3, name: "Pemula Taat", nextLevel: 1000 };
        if (points >= 200) return { level: 2, name: "Belajar Istiqomah", nextLevel: 500 };
        return { level: 1, name: "Pemula", nextLevel: 200 };
    };

    const levelInfo = getLevel(stats.totalPoints);
    const levelProgress = Math.min(((stats.totalPoints % (levelInfo.nextLevel - (levelInfo.nextLevel === 200 ? 0 : levelInfo.nextLevel / 2))) / (levelInfo.nextLevel / 2)) * 100, 100);

    const badges = [
        { id: 1, name: "Rajin Sholat", icon: "🕌", color: "bg-gradient-to-br from-amber-400 to-orange-500", locked: stats.totalActivities < 5 },
        { id: 2, name: "Pecinta Quran", icon: "📖", color: "bg-gradient-to-br from-blue-400 to-blue-600", locked: activities.filter(a => a.icon === 'menu_book').length < 3 },
        { id: 3, name: "Dermawan", icon: "💝", color: "bg-gradient-to-br from-pink-400 to-rose-500", locked: activities.filter(a => a.icon === 'volunteer_activism').length < 3 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/5 to-emerald-50 p-6 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-3xl">👋</span>
                    Hai {studentInfo.name}!
                </h1>
                <p className="text-gray-500 text-sm mt-1">Ini adalah profil dan pencapaianmu. Terus semangat beribadah! ✨</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (Profile & History) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-200">
                                    {studentInfo.fullName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full size-6 flex items-center justify-center border-2 border-white shadow-md">
                                    <span className="text-xs">✓</span>
                                </div>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{studentInfo.fullName}</h2>
                                <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2 mb-3">
                                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">school</span>
                                        {studentInfo.className}
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200 flex items-center">
                                        NIS: {studentInfo.nis}
                                    </span>
                                </div>
                                <div className="flex justify-center md:justify-start">
                                    <span className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg border border-orange-100 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                        Wali: {studentInfo.teacher}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Level Progress */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">🏆 Peringkat Saat Ini</p>
                                    <h3 className="text-base font-bold text-emerald-600">{levelInfo.name}</h3>
                                </div>
                                <span className="text-xl font-black text-gray-800">Level {levelInfo.level}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((stats.totalPoints / levelInfo.nextLevel) * 100, 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[11px] font-medium text-gray-500">
                                <span>{stats.totalPoints} poin</span>
                                <span>{levelInfo.nextLevel - stats.totalPoints} poin menuju Level {levelInfo.level + 1}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📜</span>
                                <h3 className="text-lg font-bold text-gray-800">Riwayat Ibadah Terakhir</h3>
                            </div>
                            <button
                                onClick={() => navigate('/student/history')}
                                className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1"
                            >
                                Lihat Semua
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>

                        {activities.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                                    <span className="material-symbols-outlined text-3xl">inbox</span>
                                </div>
                                <p className="text-sm text-gray-500">Belum ada aktivitas tercatat</p>
                                <button
                                    onClick={() => navigate('/student/input')}
                                    className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors"
                                >
                                    🚀 Mulai Lapor Ibadah
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {activities.slice(0, 5).map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors">
                                        <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.time}</p>
                                        </div>
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">⭐ +{item.points}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column (Stats & Menu) */}
                <div className="space-y-6">

                    {/* Total Points Card */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-xl shadow-emerald-200 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="text-6xl opacity-20">⭐</span>
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <p className="font-bold text-white/90 text-sm">Total Poin Ibadah</p>
                                <span className="material-symbols-outlined text-white/80">stars</span>
                            </div>
                            <h2 className="text-4xl font-black mb-3 tracking-tight text-white">{stats.totalPoints.toLocaleString()}</h2>
                            <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-sm font-bold border border-white/10">
                                <span className="material-symbols-outlined text-base">trending_up</span>
                                +{stats.todayPoints} hari ini
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 text-center">
                            <div className="text-2xl mb-1">📊</div>
                            <p className="text-xl font-bold text-gray-800">{stats.totalActivities}</p>
                            <p className="text-[11px] text-blue-600 font-medium">Total Kegiatan</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100 text-center">
                            <div className="text-2xl mb-1">🎯</div>
                            <p className="text-xl font-bold text-gray-800">Level {levelInfo.level}</p>
                            <p className="text-[11px] text-pink-600 font-medium">{levelInfo.name}</p>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-all hover:shadow-md group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined">dashboard</span>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-800 text-sm">Dashboard</h4>
                                    <p className="text-xs text-gray-400">Lihat ringkasan harian</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-500">chevron_right</span>
                        </button>

                        <button
                            onClick={() => navigate('/student/input')}
                            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-all hover:shadow-md group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                                    <span className="material-symbols-outlined">edit_note</span>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-800 text-sm">Lapor Ibadah</h4>
                                    <p className="text-xs text-gray-400">Catat kebaikanmu</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-500">chevron_right</span>
                        </button>

                        <button
                            onClick={() => navigate('/student/history')}
                            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-all hover:shadow-md group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                                    <span className="material-symbols-outlined">history</span>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-800 text-sm">Riwayat Lengkap</h4>
                                    <p className="text-xs text-gray-400">Lihat semua catatan</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-500">chevron_right</span>
                        </button>
                    </div>

                    {/* Badges Collection */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <span className="text-lg">🏅</span> Koleksi Badge
                            </h3>
                        </div>

                        <div className="flex justify-between gap-3">
                            {badges.map((badge) => (
                                <div key={badge.id} className={`flex flex-col items-center gap-2 text-center group cursor-pointer flex-1 ${badge.locked ? 'opacity-50' : ''}`}>
                                    <div className={`size-14 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${badge.locked ? 'bg-gray-200' : badge.color}`}>
                                        <span className="text-2xl">{badge.locked ? '🔒' : badge.icon}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold ${badge.locked ? 'text-gray-400' : 'text-gray-700'}`}>
                                        {badge.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
