import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper function to load all activities from localStorage
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

            // Process prayers - using consistent green theme
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

    // Sort by date and time (newest first - latest input on top)
    allActivities.sort((a, b) => {
        // First compare by date (newest date first)
        const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
        if (dateCompare !== 0) return dateCompare;

        // If same date, compare by time (latest time first)
        return b.rawTime.localeCompare(a.rawTime);
    });
    return allActivities;
};

// Dynamic Points Card - Green Theme
const PointsCard = ({ totalPoints, todayPoints }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div className="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                <span className="material-symbols-outlined">stars</span>
            </div>
            <span className="material-symbols-outlined text-gray-200">star</span>
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Total Poin</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalPoints.toLocaleString()}</h3>
            <p className="text-xs font-medium text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> +{todayPoints} Poin Hari Ini
            </p>
        </div>
    </div>
);

// Dynamic Pending Card - Orange for Warning State (Acceptable)
const PendingCard = ({ pendingCount }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div className="size-10 rounded-full flex items-center justify-center bg-amber-50 text-amber-500">
                <span className="material-symbols-outlined">hourglass_top</span>
            </div>
            <span className="material-symbols-outlined text-gray-200">pending</span>
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Menunggu Konfirmasi</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{pendingCount}</h3>
            <p className="text-xs font-medium text-amber-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">info</span> Belum diperiksa guru
            </p>
        </div>
    </div>
);

// Dynamic Target Card - Green Theme
const TargetCard = ({ current, target }) => {
    const percentage = (current / target) * 100;

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
                <div className="size-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">track_changes</span>
                </div>
                <span className="material-symbols-outlined text-gray-200 text-3xl opacity-50">target</span>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-gray-800">Target Harian</p>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                    <span className="text-3xl font-bold text-gray-900">{current}</span>
                    <span className="text-sm font-medium text-gray-400">/ {target} Kegiatan</span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 leading-tight">
                    {percentage >= 100 ? "Masya Allah! Target harianmu tercapai. Barakallah!" : "Sedikit lagi targetmu tercapai. Ayo semangat!"}
                </p>
            </div>
        </div>
    );
};

// Fun Leaderboard Item for Kids
const LeaderboardItem = ({ rank, name, points, isFirst }) => {
    // Fun avatar colors for each rank
    const getAvatarStyle = () => {
        switch (rank) {
            case 1: return "bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-2 ring-amber-300";
            case 2: return "bg-gradient-to-br from-slate-300 to-slate-400 text-white ring-2 ring-slate-200";
            case 3: return "bg-gradient-to-br from-amber-600 to-amber-800 text-white ring-2 ring-amber-400";
            default: return "bg-gradient-to-br from-primary/60 to-primary text-white";
        }
    };

    // Get initials from name
    const getInitials = (fullName) => {
        const names = fullName.split(' ');
        if (names.length >= 2) {
            return names[0][0] + names[1][0];
        }
        return names[0].substring(0, 2).toUpperCase();
    };

    // Rank badge for top 3
    const getRankBadge = () => {
        if (rank === 1) return { icon: "👑", bg: "bg-gradient-to-r from-amber-400 to-orange-400", text: "text-white" };
        if (rank === 2) return { icon: "🥈", bg: "bg-gradient-to-r from-slate-300 to-slate-400", text: "text-white" };
        if (rank === 3) return { icon: "🥉", bg: "bg-gradient-to-r from-amber-600 to-amber-700", text: "text-white" };
        return null;
    };

    const rankBadge = getRankBadge();

    if (isFirst) {
        return (
            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 mb-3 hover:scale-[1.02] transition-transform cursor-pointer">
                {/* Crown decoration */}
                <div className="absolute -top-2 left-4 text-xl">👑</div>

                {/* Avatar */}
                <div className={`size-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarStyle()} shadow-lg`}>
                    {getInitials(name)}
                </div>

                {/* Name & Badge */}
                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            ⭐ Juara 1
                        </span>
                    </div>
                </div>

                {/* Points */}
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-md">
                    <span className="text-xs font-bold text-white">{points}</span>
                    <span className="text-[10px] text-white/80">poin</span>
                </div>
            </div>
        );
    }

    if (rank <= 3) {
        return (
            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                {/* Avatar with rank */}
                <div className="relative">
                    <div className={`size-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarStyle()} shadow-md`}>
                        {getInitials(name)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-sm">{rankBadge.icon}</span>
                </div>

                {/* Name */}
                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-700 truncate">{name}</h4>
                    <span className="text-[10px] text-gray-400">Peringkat {rank}</span>
                </div>

                {/* Points */}
                <div className={`${rankBadge.bg} px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 shadow-sm`}>
                    <span className="text-xs font-bold text-white">{points}</span>
                    <span className="text-[10px] text-white/80">poin</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            {/* Rank number */}
            <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                {rank}
            </div>

            {/* Name */}
            <h4 className="text-sm font-medium text-gray-600 flex-1 truncate">{name}</h4>

            {/* Points */}
            <div className="bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold text-primary">{points}</span>
                <span className="text-[10px] text-primary/70">poin</span>
            </div>
        </div>
    );
};



const Dashboard = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
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

    // Load data on mount
    // Load data on mount
    useEffect(() => {
        const allLoadedActivities = loadAllActivities();
        setActivities(allLoadedActivities);
    }, []);

    // Calculate stats and check achievements when activities change
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

    return (
        <div className="space-y-6">
            {/* Greeting Section - Fun for Kids */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/5 to-emerald-50 p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-3xl">🤲</span>
                        Assalamualaikum, {studentInfo.name}! ✨
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Semangat beribadah hari ini! Setiap amalmu dicatat oleh Allah SWT ✨</p>
                    <div className="flex items-center gap-3 mt-3 text-sm">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold border border-blue-100">
                            <span className="text-base">🏫</span>
                            Kelas {studentInfo.classRoom}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg font-bold border border-orange-100">
                            <span className="text-base">👨‍🏫</span>
                            {studentInfo.teacher}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/student/input')}
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2 shrink-0">
                    <span className="text-lg">🚀</span>
                    Lapor Ibadah Sekarang!
                </button>
            </div>

            {/* Stats Grid - Themed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PointsCard totalPoints={stats.totalPoints} todayPoints={stats.todayPoints} />
                <PendingCard pendingCount={stats.pendingCount} />
                <TargetCard current={stats.todayCount} target={stats.targetDaily} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Main) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent Activity - Fun */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                    <span className="text-xl">📝</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Aktivitas Terbaruuu! 🌟</h3>
                                    <p className="text-xs text-gray-400 font-medium">Lihat apa yang sudah kamu kerjakan</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/student/history')}
                                className="text-primary text-sm font-bold hover:text-primary-dark flex items-center gap-1 transition-colors">
                                📜 Lihat Semua
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            {activities.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="text-6xl mb-4">📭</div>
                                    <h4 className="text-base font-bold text-gray-700 mb-2">Belum Ada Aktivitas</h4>
                                    <p className="text-sm text-gray-400 mb-4">Yuk mulai catat ibadahmu hari ini! 🤲</p>
                                    <button
                                        onClick={() => navigate('/student/input')}
                                        className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors"
                                    >
                                        🚀 Mulai Lapor
                                    </button>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Aktivitas</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Waktu</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Poin</th>
                                            <th className="text-right py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {activities.slice(0, 8).map((item, idx) => (
                                            <tr key={item.id || idx} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`size-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                                                            <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-700">{item.date}</span>
                                                        <span className="text-xs text-gray-400">{item.time}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                                                        +{item.points}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    {item.status === 'Terverifikasi' ? (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                                                            <span className="material-symbols-outlined text-[12px]">verified</span>
                                                            {item.status}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                                                            <span className="material-symbols-outlined text-[12px]">hourglass_top</span>
                                                            {item.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>


                {/* Right Column (Sidebar) */}
                < div className="space-y-6" >
                    {/* Teacher Note - Fun Style */}
                    < div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl shadow-sm border border-emerald-100 ring-2 ring-emerald-200/50 relative overflow-hidden" >
                        <div className="flex items-center justify-start gap-2 mb-3">
                            <span className="text-xl">📝</span>
                            <h3 className="font-bold text-emerald-700 uppercase tracking-widest text-xs">Catatan dari Guru</h3>
                        </div>

                        <div className="flex-1 flex flex-col justify-center px-1">
                            <span className="text-3xl text-primary/30 mb-1 text-left font-serif">"</span>
                            <p className="text-sm font-medium leading-relaxed text-gray-700 text-left font-serif italic">
                                "Ananda Ahmad, Alhamdulillah sholat subuhnya sudah istiqomah. Tingkatkan lagi hafalan surat pendeknya ya. Ibu bangga dengan kemajuanmu!"
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-start gap-3">
                            <div className="size-8 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary font-bold shadow-sm shrink-0">
                                <span className="material-symbols-outlined text-[18px]">person</span>
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-gray-900 truncate">Ust. Abdullah</p>
                                <p className="text-[9px] text-primary font-bold uppercase tracking-wide truncate">Wali Kelas 4B</p>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard - Compact */}
                    <div className="bg-gradient-to-br from-amber-50/50 to-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center text-center mb-3">
                            <div className="size-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-200 mb-2">
                                <span className="text-lg">🏆</span>
                            </div>
                            <h3 className="text-base font-extrabold text-gray-900">Siapa Juaranya? ✨</h3>
                            <p className="text-xs text-gray-500 font-medium">Desember 2024</p>
                        </div>

                        <div className="space-y-0.5">
                            <LeaderboardItem rank={1} name="Fathimah Azzahra" points={1250} isFirst={true} />
                            <LeaderboardItem rank={2} name="Muhammad Yusuf" points={1180} />
                            <LeaderboardItem rank={3} name="Aisyah Humaira" points={1120} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
