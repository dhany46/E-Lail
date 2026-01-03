import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaBookOpen, FaArrowRight } from "react-icons/fa";
import { loadAllActivities } from '../../../services/activityService.jsx';

const DashboardMobile = () => {
    const [recentLogs, setRecentLogs] = useState([]);

    useEffect(() => {
        const activities = loadAllActivities();
        // Limit to 5 most recent for the dashboard feed
        setRecentLogs(activities.slice(0, 5).map((act, index) => ({
            id: act.id || index,
            name: "Siswa", // Since we don't have student names in localStorage yet, using placeholder or info from context if available
            action: act.title,
            time: act.time,
            class: "Umum",
            color: act.bg || 'bg-blue-500',
            textColor: act.color || 'text-white'
        })));
    }, []);

    // Dummy Data for Logic (keeping generic stats for now)
    const stats = {
        totalStudents: 450,
        studentGrowth: 12,
        totalTeachers: 24,
        activeClasses: 12,
        todayAttendance: 85,
        pendingReports: recentLogs.length // Using real count for pending if applicable
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/50 font-sans pb-28 scrollbar-hide">
            {/* Sticky Header Section with Border */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1">
                <AdminHeader showGreeting={true} showBell={true} user={{ name: "Fulan" }} />
            </div>

            <div className="p-5 max-w-lg mx-auto">

                {/* Hero Section - Crystal Tech Design */}
                <div className="relative overflow-hidden rounded-[24px] p-6 mb-6 shadow-xl shadow-blue-200/40 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px]"></div>
                    {/* Decorative Shapes */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest shadow-sm">
                                👋 Ahlan Wa Sahlan
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-md">
                            Semangat Mengabdi, <br /> <span className="text-blue-200">Ustadz Fulan!</span>
                        </h2>
                        <p className="text-sm font-medium text-blue-100/90 leading-relaxed max-w-[85%]">
                            Ada <span className="text-white font-bold bg-white/20 px-1.5 py-0.5 rounded mx-0.5 shadow-sm border border-white/10">{stats.pendingReports} laporan</span> aktivitas siswa yang belum diperiksa hari ini.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <button className="flex-1 bg-white text-blue-700 text-xs font-black py-2.5 px-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all hover:bg-blue-50 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-base">check_circle</span>
                                Mulai Verifikasi
                            </button>
                            <button className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold backdrop-blur-md active:scale-95 transition-all hover:bg-white/20">
                                Lihat Jadwal
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* Stat 1: Students - Crystal Blue */}
                    <Link to="/admin/students" className="relative group overflow-hidden rounded-[20px] p-5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/40">
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800"></div>

                        {/* Depth Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>

                        {/* Glass Border Effect */}
                        <div className="absolute inset-[1px] rounded-[19px] border border-white/20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        {/* Decor Shapes */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl group-hover:bg-blue-300/40 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-white text-[20px]">groups</span>
                                </div>
                                <FaUserGraduate className="text-white/20 text-3xl -rotate-12 transform group-hover:rotate-0 transition-all duration-500" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">{stats.totalStudents}</h3>
                                <div className="flex items-center gap-1.5 mt-1.5 opacity-90">
                                    <span className="h-0.5 w-3 bg-blue-300 rounded-full"></span>
                                    <p className="text-[11px] font-bold text-blue-50 uppercase tracking-widest">Siswa</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Stat 2: Teachers - Deep Indigo */}
                    <Link to="/admin/teachers" className="relative group overflow-hidden rounded-[20px] p-5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/40">
                        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500 via-purple-600 to-indigo-800"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
                        <div className="absolute inset-[1px] rounded-[19px] border border-white/20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl group-hover:bg-purple-300/40 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-white text-[20px]">badge</span>
                                </div>
                                <FaChalkboardTeacher className="text-white/20 text-3xl -rotate-12 transform group-hover:rotate-0 transition-all duration-500" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">{stats.totalTeachers}</h3>
                                <div className="flex items-center gap-1.5 mt-1.5 opacity-90">
                                    <span className="h-0.5 w-3 bg-purple-300 rounded-full"></span>
                                    <p className="text-[11px] font-bold text-indigo-50 uppercase tracking-widest">Guru</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Stat 3: Classes - Royal Cyan */}
                    <Link to="/admin/classes" className="relative group overflow-hidden rounded-[20px] p-5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:shadow-cyan-300/40">
                        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500 via-blue-600 to-cyan-800"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
                        <div className="absolute inset-[1px] rounded-[19px] border border-white/20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl group-hover:bg-cyan-300/40 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-white text-[20px]">school</span>
                                </div>
                                <FaSchool className="text-white/20 text-3xl -rotate-12 transform group-hover:rotate-0 transition-all duration-500" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">{stats.activeClasses}</h3>
                                <div className="flex items-center gap-1.5 mt-1.5 opacity-90">
                                    <span className="h-0.5 w-3 bg-cyan-300 rounded-full"></span>
                                    <p className="text-[11px] font-bold text-cyan-50 uppercase tracking-widest">Kelas</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Stat 4: Verification - Oceanic Teal */}
                    <Link to="/admin/activities" className="relative group overflow-hidden rounded-[20px] p-5 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/40">
                        {stats.pendingReports > 0 && (
                            <div className="absolute top-4 right-4 flex h-3 w-3 z-20">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 ring-2 ring-white"></span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-bl from-teal-500 via-emerald-600 to-teal-800"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
                        <div className="absolute inset-[1px] rounded-[19px] border border-white/20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/30 rounded-full blur-3xl group-hover:bg-emerald-300/40 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-white text-[20px]">fact_check</span>
                                </div>
                                <FaBookOpen className="text-white/20 text-3xl -rotate-12 transform group-hover:rotate-0 transition-all duration-500" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none drop-shadow-sm">{stats.pendingReports}</h3>
                                <div className="flex items-center gap-1.5 mt-1.5 opacity-90">
                                    <span className="h-0.5 w-3 bg-teal-300 rounded-full"></span>
                                    <p className="text-[11px] font-bold text-teal-50 uppercase tracking-widest">Verif</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Section: Quick Actions (Glass Pill Design) */}
                <div className="mt-8">
                    <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Control Center</h3>
                    <div className="flex gap-3 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
                        <button className="flex items-center gap-3 pl-2 pr-5 py-2.5 bg-white/80 backdrop-blur-xl border border-white/60 rounded-full shadow-lg shadow-blue-100/50 shrink-0 active:scale-95 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-200 hover:border-blue-300">
                            <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-lg">person_add</span>
                            </div>
                            <span className="text-[11px] font-black text-slate-700 tracking-tight group-hover:text-blue-600 transition-colors">ADD SISWA</span>
                        </button>

                        <button className="flex items-center gap-3 pl-2 pr-5 py-2.5 bg-white/80 backdrop-blur-xl border border-white/60 rounded-full shadow-lg shadow-blue-100/50 shrink-0 active:scale-95 transition-all duration-300 group hover:shadow-xl hover:shadow-cyan-200 hover:border-cyan-300">
                            <div className="size-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-lg">campaign</span>
                            </div>
                            <span className="text-[11px] font-black text-slate-700 tracking-tight group-hover:text-cyan-600 transition-colors">BROADCAST</span>
                        </button>

                        <button className="flex items-center gap-3 pl-2 pr-5 py-2.5 bg-white/80 backdrop-blur-xl border border-white/60 rounded-full shadow-lg shadow-blue-100/50 shrink-0 active:scale-95 transition-all duration-300 group hover:shadow-xl hover:shadow-indigo-200 hover:border-indigo-300">
                            <div className="size-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-lg">settings</span>
                            </div>
                            <span className="text-[11px] font-black text-slate-700 tracking-tight group-hover:text-indigo-600 transition-colors">CONFIG</span>
                        </button>
                    </div>
                </div>

                {/* Section: Live Activity Feed */}
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-5 px-1 pb-2 border-b border-slate-200/60 border-dashed">
                        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Real-time Log</h3>
                        <Link to="/admin/activities" className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-0.5 hover:text-blue-700 transition-colors bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl shadow-slate-200/40 p-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 size-40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        {recentLogs.map((log) => (
                            <div key={log.id} className="flex items-center gap-4 p-3.5 rounded-3xl hover:bg-white/80 transition-all border border-transparent hover:border-white/50 group relative">
                                <div className={`size-12 rounded-2xl ${log.color} flex items-center justify-center font-black text-sm shadow-lg shadow-current/10 shrink-0 group-hover:scale-105 transition-transform ${log.textColor}`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    {log.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[13px] font-bold text-slate-800 truncate tracking-tight group-hover:text-blue-700 transition-colors">Siswa</p>
                                        <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight bg-slate-100 px-1.5 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors">{log.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-[11px] font-medium text-slate-500 truncate">{log.action}</p>
                                        <span className="size-1 rounded-full bg-slate-300"></span>
                                        <span className="text-[10px] font-black text-slate-500 tracking-tight">{log.class}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMobile;
