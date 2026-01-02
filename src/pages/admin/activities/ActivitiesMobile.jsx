import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Clock, Calendar, ChevronRight, User } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

const ActivitiesMobile = () => {
    const [filterStatus, setFilterStatus] = useState('Semua');

    const logs = [
        { id: 1, student: 'Ahmad Fulan', class: '5A', activity: 'Sholat Subuh', time: '04:45', date: '2 Jan 2026', status: 'Verified', points: '+20' },
        { id: 2, student: 'Siti Aminah', class: '4A', activity: 'Tilawah Quran', time: '05:15', date: '2 Jan 2026', status: 'Pending', points: '+15' },
        { id: 3, student: 'Budi Santoso', class: '6B', activity: 'Sholat Dhuha', time: '07:30', date: '2 Jan 2026', status: 'Verified', points: '+10' },
        { id: 4, student: 'Laila Husna', class: '3A', activity: 'Sedekah Subuh', time: '06:00', date: '2 Jan 2026', status: 'Pending', points: '+25' },
        { id: 5, student: 'Zidan Ali', class: '5A', activity: 'Hafalan Surah', time: '08:00', date: '2 Jan 2026', status: 'Verified', points: '+50' },
    ];

    const filteredLogs = filterStatus === 'Semua'
        ? logs
        : logs.filter(l => l.status === filterStatus);

    return (
        <div className="min-h-[100dvh] bg-[#F8FAFC] pb-32 scrollbar-hide">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1">
                <AdminHeader
                    title="Log Aktivitas"
                    subtitle="Monitoring Ibadah Siswa"
                />
            </div>

            <div className="p-5 max-w-lg mx-auto">
                <div className="mb-4 px-1">
                    <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.15em]">Log Aktivitas Harian</h3>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {['Semua', 'Verified', 'Pending'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`h-9 px-5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${filterStatus === status
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                : 'bg-white text-slate-400 border border-slate-100 active:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Log List */}
                <div className="space-y-3 mt-6">
                    {filteredLogs.map((log) => (
                        <div key={log.id} className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform">
                            {/* Status Icon */}
                            <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${log.status === 'Verified' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                                }`}>
                                {log.status === 'Verified' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-bold text-slate-800 truncate">{log.student}</h3>
                                    <span className={`text-[10px] font-black ${log.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'
                                        }`}>{log.points}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{log.activity}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <Clock size={10} /> {log.time}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <Calendar size={10} /> {log.date}
                                    </span>
                                    <span className="text-[10px] font-black text-indigo-400 px-1.5 py-0.5 bg-indigo-50 rounded uppercase">
                                        {log.class}
                                    </span>
                                </div>
                            </div>

                            <div className="text-slate-200">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivitiesMobile;
