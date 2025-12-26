import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dynamic Points Card
const PointsCard = ({ totalPoints, todayPoints }) => (
    <div className="bg-gradient-to-br from-white to-emerald-50/50 p-6 rounded-3xl shadow-sm border border-emerald-100 relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-emerald-100/50 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6 relative">
            <div className="size-12 rounded-2xl flex items-center justify-center bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                <span className="material-symbols-outlined text-2xl">stars</span>
            </div>
            <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> +{todayPoints}
                </p>
            </div>
        </div>
        <div className="relative">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Poin Saya</p>
            <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{totalPoints.toLocaleString()}</h3>
        </div>
    </div>
);

// Dynamic Pending Card
const PendingCard = ({ pendingCount }) => (
    <div className="bg-gradient-to-br from-white to-amber-50/50 p-6 rounded-3xl shadow-sm border border-amber-100 relative overflow-hidden h-full">
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 size-32 bg-amber-100/30 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6 relative">
            <div className="size-12 rounded-2xl flex items-center justify-center bg-amber-500 text-white shadow-lg shadow-amber-200">
                <span className="material-symbols-outlined text-2xl">hourglass_top</span>
            </div>
            {pendingCount > 0 && (
                <span className="flex size-3 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
        </div>
        <div className="relative">
            <p className="text-sm font-medium text-gray-500 mb-1">Menunggu Guru</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-extrabold text-gray-800 tracking-tight">{pendingCount}</h3>
                <span className="text-sm font-medium text-gray-400">Laporan</span>
            </div>
            <p className="text-xs text-amber-600 font-medium mt-2">
                {pendingCount > 0 ? "Harap bersabar ya..." : "Semua aman!"}
            </p>
        </div>
    </div>
);

// Dynamic Target Card
const TargetCard = ({ current, target }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return (
        <div className="bg-gradient-to-br from-white to-blue-50/50 p-6 rounded-3xl shadow-sm border border-blue-100 relative overflow-hidden h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 bg-blue-100/20 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative">
                <div className="size-12 rounded-2xl flex items-center justify-center bg-blue-500 text-white shadow-lg shadow-blue-200">
                    <span className="material-symbols-outlined text-2xl">track_changes</span>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</span>
                </div>
            </div>
            <div className="relative">
                <p className="text-sm font-medium text-gray-500 mb-2">Target Harian</p>
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-800">{current} <span className="text-gray-400 font-normal">/ {target} Selesai</span></span>
                </div>
            </div>
        </div>
    );
};

// Leaderboard Item
const LeaderboardItem = ({ rank, name, points, isFirst }) => {
    const getAvatarStyle = () => {
        switch (rank) {
            case 1: return "bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-2 ring-amber-300";
            case 2: return "bg-gradient-to-br from-slate-300 to-slate-400 text-white ring-2 ring-slate-200";
            case 3: return "bg-gradient-to-br from-amber-600 to-amber-800 text-white ring-2 ring-amber-400";
            default: return "bg-gradient-to-br from-primary/60 to-primary text-white";
        }
    };

    const getInitials = (fullName) => {
        const names = fullName.split(' ');
        if (names.length >= 2) return names[0][0] + names[1][0];
        return names[0].substring(0, 2).toUpperCase();
    };

    const getRankBadge = () => {
        if (rank === 1) return { icon: "👑", bg: "bg-gradient-to-r from-amber-400 to-orange-400" };
        if (rank === 2) return { icon: "🥈", bg: "bg-gradient-to-r from-slate-300 to-slate-400" };
        if (rank === 3) return { icon: "🥉", bg: "bg-gradient-to-r from-amber-600 to-amber-700" };
        return null;
    };

    const rankBadge = getRankBadge();

    if (isFirst) {
        return (
            <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 mb-3 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="absolute -top-2 left-4 text-xl">👑</div>
                <div className={`size-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getAvatarStyle()} shadow-lg`}>
                    {getInitials(name)}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            ⭐ Juara 1
                        </span>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-md">
                    <span className="text-xs font-bold text-white">{points}</span>
                </div>
            </div>
        );
    }

    // Simplified specific item return for brevity in this example, assuming simpler list for desktop or same
    return (
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                {rank}
            </div>
            <h4 className="text-sm font-medium text-gray-600 flex-1 truncate">{name}</h4>
            <div className="bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold text-primary">{points}</span>
            </div>
        </div>
    );
};

const DashboardDesktop = ({ activities, stats, studentInfo }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Greeting Section */}
            <div className="flex flex-row items-center justify-between gap-4 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-emerald-100/30 rounded-full blur-3xl -z-10 group-hover:bg-emerald-100/40 transition-colors duration-500"></div>
                <div className="flex-1 relative z-10">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-3xl animate-bounce-slow">👋</span>
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Assalamualaikum, {studentInfo.name}!</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Semangat beribadah hari ini! ✨ Allah Maha Melihat setiap amalmu.</p>
                </div>
                <button
                    onClick={() => navigate('/student/input')}
                    className="relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-200/50 transition-all hover:shadow-emerald-200 hover:-translate-y-0.5 flex items-center gap-2 shrink-0 group/btn overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    <span className="text-lg relative z-10">🚀</span>
                    <span className="relative z-10">Lapor Ibadah</span>
                </button>
            </div>

            {/* Stats Grid - Standard 3-col Grid */}
            <div className="grid grid-cols-3 gap-6">
                <PointsCard totalPoints={stats.totalPoints} todayPoints={stats.todayPoints} />
                <PendingCard pendingCount={stats.pendingCount} />
                <TargetCard current={stats.todayCount} target={stats.targetDaily} />
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left Column (Main) */}
                <div className="col-span-2 space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-white/60 relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-200 text-white">
                                    <span className="text-xl">📝</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">Aktivitas Terbaru</h3>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Pantau ibadah harianmu</p>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/student/history')}
                                className="text-emerald-600 text-sm font-bold hover:text-emerald-700 flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-emerald-50 rounded-xl">
                                📜 Lihat Semua
                            </button>
                        </div>

                        {activities.length === 0 ? (
                            <div className="text-center py-12">Belum ada aktivitas</div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100/50">
                                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Aktivitas</th>
                                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Waktu</th>
                                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Poin</th>
                                        <th className="text-right py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50/50">
                                    {activities.slice(0, 8).map((item, idx) => (
                                        <tr key={item.id || idx} className="group hover:bg-white/50 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105`}>
                                                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700 transition-colors">{item.title}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 hidden sm:table-cell">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-600">{item.time}</span>
                                                    <span className="text-xs text-gray-400">{item.date}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">+{item.points}</span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                {item.status === 'Terverifikasi' ? (
                                                    <div className="inline-flex items-center justify-center size-8 rounded-full bg-emerald-100 text-emerald-600">
                                                        <span className="material-symbols-outlined text-lg">check</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center size-8 rounded-full bg-amber-50 text-amber-500">
                                                        <span className="material-symbols-outlined text-lg">hourglass_top</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="space-y-6">
                    <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 relative overflow-hidden">
                        <div className="flex items-center justify-start gap-3 mb-4">
                            <div className="size-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">sticky_note_2</span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Catatan Guru</h3>
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-2 py-2 mb-2 bg-white/50 rounded-2xl border border-white/40">
                            <span className="text-3xl text-emerald-500/20 mb-1 text-left font-serif leading-none">"</span>
                            <p className="text-sm font-medium leading-relaxed text-gray-700 text-left font-serif italic px-2 -mt-2 pb-2">
                                Ananda Ahmad, Alhamdulillah sholat subuhnya sudah istiqomah. Tingkatkan lagi hafalan surat pendeknya ya. Ibu bangga dengan kemajuanmu!
                            </p>
                        </div>
                    </div>
                    <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50">
                        <div className="flex flex-col items-center text-center mb-6">
                            <h3 className="text-lg font-extrabold text-gray-800">Peringkat Kelas 🏆</h3>
                            <div className="space-y-1 w-full mt-4">
                                <LeaderboardItem rank={1} name="Fathimah Azzahra" points={1250} isFirst={true} />
                                <LeaderboardItem rank={2} name="Muhammad Yusuf" points={1180} />
                                <LeaderboardItem rank={3} name="Aisyah Humaira" points={1120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardDesktop;
