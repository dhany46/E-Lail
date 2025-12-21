import React from 'react';

const TeacherDashboard = () => {

    // Stats Card Component
    const StatsCard = ({ label, value, subtext, icon, color, bg }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between group transition-all hover:shadow-md">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className={`size-8 rounded-lg flex items-center justify-center ${bg} ${color}`}>
                        <span className="material-symbols-outlined text-lg">{icon}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{label}</span>
                </div>
                <h3 className="text-3xl font-black text-gray-800 mb-1">{value}</h3>
                <p className={`text-xs font-semibold ${color}`}>{subtext}</p>
            </div>
        </div>
    );

    // Leaderboard Item Component
    const StudentRank = ({ rank, name, classRoom, points, avatar }) => (
        <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-xl transition-colors">
            <span className={`w-6 text-center font-bold text-lg ${rank === 1 ? 'text-amber-500' : rank === 2 ? 'text-gray-400' : 'text-amber-700'}`}>{rank}</span>
            <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-400">Kelas {classRoom}</p>
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">
                {points} Poin
            </span>
        </div>
    );

    // Table Row Component
    const ReviewRow = ({ name, classRoom, activity, time, type, status, avatar }) => (
        <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
            <td className="py-4 pl-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-100 overflow-hidden">
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                        <p className="text-xs text-gray-400">{classRoom}</p>
                    </div>
                </div>
            </td>
            <td className="py-4">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500 text-lg">
                        {type === 'sholat' ? 'mosque' : type === 'quran' ? 'menu_book' : 'volunteer_activism'}
                    </span>
                    <span className="font-bold text-sm text-gray-700">{activity}</span>
                </div>
            </td>
            <td className="py-4 text-xs">
                <div className="font-bold text-gray-600">{time.split('•')[0]}</div>
                <div className="text-gray-400">{time.split('•')[1]}</div>
            </td>
            <td className="py-4">
                <span className="bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full border border-amber-100">
                    {status}
                </span>
            </td>
            <td className="py-4 pr-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 shadow-sm shadow-emerald-200 transition-all flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check</span>
                        Setujui
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1">Dashboard Guru</h1>
                <p className="text-gray-500 font-medium text-sm">
                    Ringkasan aktivitas ibadah siswa kelas 4B hari ini, <span className="text-emerald-600 font-bold">Selasa, 24 Oktober 2023</span>.
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    label="Total Siswa"
                    value="32"
                    subtext="Siswa aktif di kelas"
                    icon="groups"
                    color="text-emerald-600"
                    bg="bg-emerald-50"
                />
                <StatsCard
                    label="Perlu Persetujuan"
                    value="5"
                    subtext="Laporan baru masuk"
                    icon="pending_actions"
                    color="text-amber-600"
                    bg="bg-amber-50"
                />
                <StatsCard
                    label="Laporan Disetujui"
                    value="24"
                    subtext="Hari ini"
                    icon="check_circle"
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <StatsCard
                    label="Rata-rata Poin"
                    value="85"
                    subtext="+2.4% dari kemarin"
                    icon="bar_chart"
                    color="text-emerald-600"
                    bg="bg-emerald-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Charts Panel */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Status Laporan Mingguan</h3>
                            <button className="text-xs font-bold text-emerald-600 hover:underline">Lihat Detail</button>
                        </div>

                        {/* Mock Bar Chart */}
                        <div className="flex items-end justify-between h-48 px-2 gap-4">
                            {/* Days */}
                            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => {
                                const height = [60, 80, 45, 90, 75, 30, 20][idx];
                                const isHigh = height > 50;
                                return (
                                    <div key={day} className="flex flex-col items-center gap-2 flex-1 group">
                                        <div className="w-full bg-gray-50 rounded-t-xl relative h-full flex items-end overflow-hidden group-hover:bg-gray-100 transition-colors">
                                            <div
                                                className={`w-full rounded-t-xl transition-all duration-1000 ${isHigh ? 'bg-emerald-500' : 'bg-emerald-200'}`}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600">{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pending Review Table */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800">Perlu Tinjauan (5 Terbaru)</h3>
                            <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700">
                                Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                        <th className="pb-3 pl-4">Siswa</th>
                                        <th className="pb-3">Aktivitas Ibadah</th>
                                        <th className="pb-3">Waktu & Bukti</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3 pr-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ReviewRow
                                        name="Budi Santoso" classRoom="Kelas 4B"
                                        activity="Sholat Subuh Berjamaah"
                                        time="04:45 WIB • Di Masjid"
                                        type="sholat"
                                        status="Menunggu"
                                        avatar="https://ui-avatars.com/api/?name=Budi+Santoso&background=random"
                                    />
                                    <ReviewRow
                                        name="Siti Aminah" classRoom="Kelas 4B"
                                        activity="Membaca Al-Quran"
                                        time="18:30 WIB • Surat Al-Mulk"
                                        type="quran"
                                        status="Menunggu"
                                        avatar="https://ui-avatars.com/api/?name=Siti+Aminah&background=random"
                                    />
                                    <ReviewRow
                                        name="Rahmat Hidayat" classRoom="Kelas 4B"
                                        activity="Infaq Harian"
                                        time="07:00 WIB • Sekolah"
                                        type="social"
                                        status="Menunggu"
                                        avatar="https://ui-avatars.com/api/?name=Rahmat+Hidayat&background=random"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-amber-500 font-bold">trophy</span>
                            <div>
                                <h3 className="font-bold text-gray-800 leading-none">Siswa Teladan</h3>
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">Berdasarkan poin kebaikan minggu ini</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <StudentRank rank={1} name="Aisyah Zahra" classRoom="Kelas 4B" points={1250} avatar="https://ui-avatars.com/api/?name=Aisyah+Zahra&background=random" />
                            <StudentRank rank={2} name="M. Rizky" classRoom="Kelas 4B" points={1180} avatar="https://ui-avatars.com/api/?name=M+Rizky&background=random" />
                            <StudentRank rank={3} name="Fatimah" classRoom="Kelas 4B" points={1150} avatar="https://ui-avatars.com/api/?name=Fatimah&background=random" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
