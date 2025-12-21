import React from 'react';

const ReportManagement = () => {

    // Stats Header
    const ReportStat = ({ label, value, icon, color, bg }) => (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                <h3 className="text-3xl font-black text-gray-800">{value}</h3>
            </div>
            <div className={`size-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
        </div>
    );

    const ReportRow = ({ id, name, classRoom, type, date, time, evidence, status, onAction }) => (
        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <input type="checkbox" className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                    <div className="size-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`} alt={name} className="w-full h-full object-cover" />
                    </div>
                </div>
            </td>
            <td className="p-4">
                <div className="font-bold text-sm text-gray-800">{name}</div>
                <div className="text-xs text-gray-400">{classRoom}</div>
            </td>
            <td className="p-4">
                <span className="font-bold text-sm text-gray-700">{type}</span>
            </td>
            <td className="p-4">
                <div className="font-bold text-sm text-gray-800">{date}</div>
                <div className="text-xs text-gray-400">{time}</div>
            </td>
            <td className="p-4">
                <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                    <span className="material-symbols-outlined text-sm">{evidence.type === 'photo' ? 'image' : 'mic'}</span>
                    {evidence.label}
                </button>
            </td>
            <td className="p-4">
                <span className={`
                    text-xs font-bold px-3 py-1 rounded-full border
                    ${status === 'Menunggu' ? 'bg-orange-50 text-orange-600 border-orange-100' : ''}
                    ${status === 'Disetujui' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}
                    ${status === 'Ditolak' ? 'bg-red-50 text-red-600 border-red-100' : ''}
                 `}>
                    {status}
                </span>
            </td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    {status === 'Menunggu' && (
                        <>
                            <button className="size-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                            <button className="size-8 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-1">Manajemen Laporan Ibadah</h1>
                <p className="text-gray-500 font-medium text-sm">Kelola dan verifikasi kegiatan ibadah harian siswa kelas 5A.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportStat label="Menunggu Verifikasi" value="12" icon="pending_actions" color="text-orange-500" bg="bg-orange-50" />
                <ReportStat label="Disetujui Hari Ini" value="45" icon="check_circle" color="text-emerald-500" bg="bg-emerald-50" />
                <ReportStat label="Total Siswa Aktif" value="28" icon="groups" color="text-blue-500" bg="bg-blue-50" />
            </div>

            {/* Filters Row */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama siswa atau jenis ibadah..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-emerald-500 focus:outline-none">
                        <option>Kelas 5A</option>
                        <option>Kelas 5B</option>
                    </select>
                    <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-emerald-500 focus:outline-none">
                        <option>Semua Ibadah</option>
                        <option>Sholat Wajib</option>
                    </select>
                    <button className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50">
                        <span>Hari Ini</span>
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 p-2 gap-2">
                    {['Semua Status', 'Menunggu', 'Disetujui', 'Ditolak'].map((tab, idx) => (
                        <button
                            key={tab}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${idx === 0 ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table Header actions */}
                <div className="p-4 bg-emerald-50/30 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pilih Semua</span>
                    </div>
                    <button className="text-emerald-600 text-xs font-bold flex items-center gap-1 opacity-50 cursor-not-allowed">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Setujui Terpilih
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="hidden"><tr><th></th></tr></thead>
                        <tbody>
                            <ReportRow
                                id={1} name="Ahmad Fulan" classRoom="Kelas 5A"
                                type="Sholat Tahajud" date="12 Okt 2023" time="03:45 WIB"
                                evidence={{ type: 'photo', label: 'Lihat Foto' }}
                                status="Menunggu"
                            />
                            <ReportRow
                                id={2} name="Siti Nurhaliza" classRoom="Kelas 5A"
                                type="Sholat Dhuha" date="12 Okt 2023" time="09:15 WIB"
                                evidence={{ type: 'none', label: 'Tidak ada lampiran' }}
                                status="Disetujui"
                            />
                            <ReportRow
                                id={3} name="Muhammad Kahfi" classRoom="Kelas 5A"
                                type="Tilawah Quran" date="12 Okt 2023" time="18:30 WIB"
                                evidence={{ type: 'audio', label: 'Putar Rekaman' }}
                                status="Menunggu"
                            />
                            <ReportRow
                                id={4} name="Rizky Pratama" classRoom="Kelas 5A"
                                type="Sholat Subuh" date="11 Okt 2023" time="05:00 WIB"
                                evidence={{ type: 'none', label: 'Tidak ada lampiran' }}
                                status="Ditolak"
                            />
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400">Menampilkan 1-5 dari 12 data</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-600">Sebelumnya</button>
                        <div className="flex gap-1">
                            <button className="size-8 rounded-lg bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">1</button>
                            <button className="size-8 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center hover:bg-gray-50">2</button>
                            <button className="size-8 rounded-lg border border-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center hover:bg-gray-50">3</button>
                        </div>
                        <button className="px-3 py-1 text-xs font-bold text-gray-600 hover:text-gray-900">Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportManagement;
