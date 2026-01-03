import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, Clock, Calendar, ChevronRight, User } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import { loadAllActivities } from '../../../services/activityService.jsx';

const ActivitiesMobile = () => {
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const activities = loadAllActivities();
        const mappedLogs = activities.map((act, index) => {
            // Map student-side status to admin-side status names
            let status = 'Pending';
            if (act.status === 'Terverifikasi' || act.status === 'Disetujui') status = 'Verified';
            else if (act.status === 'Ditolak') status = 'Rejected';

            return {
                id: act.id || index,
                student: "Siswa",
                class: 'Umum',
                activity: act.title,
                subtitle: act.subtitle,
                time: act.time,
                date: act.date,
                status: status,
                points: `+${act.points}`,
                rawActivity: act // Keep original for more details if expanded
            };
        });
        setLogs(mappedLogs);
    }, []);

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
                                <div className="mt-0.5">
                                    <p className="text-xs font-bold text-slate-700">{log.activity}</p>
                                    {log.subtitle && <p className="text-[11px] text-slate-500 italic mt-0.5">"{log.subtitle}"</p>}
                                </div>
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
