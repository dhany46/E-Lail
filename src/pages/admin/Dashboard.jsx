import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';

const Dashboard = () => {
    const navigate = useNavigate();
    const [chartPeriod, setChartPeriod] = useState('week');


    // Chart data based on period
    const chartData = chartPeriod === 'week'
        ? [
            { day: 'Sen', h: '80%', value: 156 },
            { day: 'Sel', h: '90%', value: 178 },
            { day: 'Rab', h: '85%', value: 168 },
            { day: 'Kam', h: '95%', value: 189 },
            { day: 'Jum', h: '60%', value: 118 },
            { day: 'Sab', h: '40%', value: 79 },
            { day: 'Min', h: '45%', value: 89 },
        ]
        : [
            { day: 'W1', h: '75%', value: 580 },
            { day: 'W2', h: '82%', value: 640 },
            { day: 'W3', h: '88%', value: 690 },
            { day: 'W4', h: '91%', value: 720 },
        ];

    return (
        <div className="w-full space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight">Assalamualaikum, Admin 👋</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">Berikut adalah ringkasan aktivitas ibadah SD Plus 3 Al-Muhajirin hari ini.</p>
            </div>

            {/* Stats Grid - Clickable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Stat 1 - Total Siswa */}
                <Link to="/admin/students" className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Total Siswa</p>
                            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">452</h3>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined text-2xl">groups</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        <span>+12 minggu ini</span>
                    </div>
                </Link>

                {/* Stat 2 - Wali Kelas */}
                <Link to="/admin/teachers" className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Wali Kelas</p>
                            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">24</h3>
                        </div>
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined text-2xl">badge</span>
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Aktif memantau</p>
                </Link>

                {/* Stat 3 - Kelas Aktif */}
                <Link to="/admin/classes" className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Kelas Aktif</p>
                            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">12</h3>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Tahun Ajaran 2023/2024</p>
                </Link>

                {/* Stat 4 - Log Ibadah */}
                <Link to="/admin/activities" className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow ring-1 ring-primary/20 cursor-pointer">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Log Ibadah Hari Ini</p>
                            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">1,203</h3>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined text-2xl">auto_stories</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        <span>92% Partisipasi</span>
                    </div>
                </Link>
            </div>

            {/* Chart & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Grafik Kepatuhan Ibadah</h2>
                        <select
                            value={chartPeriod}
                            onChange={(e) => setChartPeriod(e.target.value)}
                            className="bg-background-light dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-xs rounded-lg py-1.5 px-3 text-text-primary-light dark:text-text-primary-dark focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                        >
                            <option value="week">Minggu Ini</option>
                            <option value="month">Bulan Ini</option>
                        </select>
                    </div>

                    {/* Interactive Bar Chart */}
                    <div className="w-full h-64 flex items-end justify-between gap-2 px-2">
                        {chartData.map((item, idx) => (
                            <div key={idx} className="group flex flex-col items-center gap-2 w-full relative">
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {item.value} aktivitas
                                </div>
                                <div
                                    className="w-full bg-primary/20 dark:bg-primary/10 rounded-t-sm relative group-hover:bg-primary/30 transition-all cursor-pointer"
                                    style={{ height: chartPeriod === 'month' ? '10rem' : (item.h === '95%' ? '12rem' : '8rem') }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all" style={{ height: item.h }}></div>
                                </div>
                                <span className="text-xs text-gray-400">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">Aktivitas Terbaru</h2>
                        <Link to="/admin/activities" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Lihat Semua</Link>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[25rem]">
                        {[
                            { name: 'Ahmad Fulan', class: 'Kelas 5A', action: 'Sholat Dhuha', time: '2 menit yang lalu', color: 'bg-blue-100 text-blue-600', icon: 'person' },
                            { name: 'Siti Aminah', class: 'Kelas 3B', action: 'Tadarus Al-Quran', time: '15 menit yang lalu', color: 'bg-pink-100 text-pink-600', icon: 'person_2' },
                            { name: 'Budi Santoso', class: 'Kelas 6A', action: 'Sholat Dzuhur', time: '30 menit yang lalu', color: 'bg-indigo-100 text-indigo-600', icon: 'person' },
                            { name: 'Rizky Ramadhan', class: 'Kelas 4C', action: 'Hafalan Surat', time: '45 menit yang lalu', color: 'bg-teal-100 text-teal-600', icon: 'person' },
                            { name: 'Dewi Sartika', class: 'Kelas 2A', action: 'Infaq', time: '1 jam yang lalu', color: 'bg-purple-100 text-purple-600', icon: 'person_2' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 last:pb-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 -mx-2 px-2 py-1 rounded-lg transition-colors cursor-pointer">
                                <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                                    <span className="material-symbols-outlined text-base">{activity.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{activity.name}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{activity.class} • {activity.action}</p>
                                    <p className="text-[0.625rem] text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions - Working */}

        </div>
    );
};

export default Dashboard;
