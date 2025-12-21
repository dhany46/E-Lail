import React from 'react';

const StudentDetail = () => {

    // Header Stats
    const Metric = ({ label, value, subtext, icon, color }) => (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${color}`}>
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-800">{value}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-[10px] font-bold text-emerald-600">{subtext}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <span className="hover:text-emerald-600 cursor-pointer">Beranda</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="hover:text-emerald-600 cursor-pointer">Daftar Siswa</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="text-gray-800">Detail Siswa</span>
            </div>

            {/* Profile Header */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="size-24 rounded-full p-1 border-2 border-dashed border-emerald-200">
                        <img
                            src="https://ui-avatars.com/api/?name=Ahmad+Fulan&background=random"
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Ahmad Fulan</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">badge</span> NIS: 12345678
                            </span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">school</span> Kelas: 5 Al-Kautsar
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-lg">chat</span>
                        Hubungi Wali
                    </button>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-emerald-200 shadow-md transition-all">
                        <span className="material-symbols-outlined text-lg">edit</span>
                        Edit Profil
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Metric label="Total Poin" value="1,250" subtext="+50 minggu ini" icon="stars" color="text-amber-500" />
                <Metric label="Ibadah Wajib" value="98%" subtext="+2% kehadiran" icon="verified" color="text-emerald-500" />
                <Metric label="Ibadah Sunnah" value="15" subtext="+3 kegiatan baru" icon="favorite" color="text-red-500" />
                <Metric label="Absensi" value="100%" subtext="Stabil" icon="calendar_month" color="text-blue-500" />
            </div>

            {/* Teacher Notes Input */}
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-emerald-600 text-xl">edit_note</span>
                    <h3 className="font-bold text-emerald-900">Catatan Guru untuk Siswa</h3>
                </div>
                <div className="flex gap-4">
                    <textarea
                        className="flex-1 p-4 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm font-medium resize-none h-24"
                        placeholder="Tuliskan motivasi, teguran, atau apresiasi untuk Ahmad..."
                    ></textarea>
                    <button className="h-24 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all">
                        Kirim Catatan
                    </button>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800">Riwayat Kegiatan Ibadah</h3>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 cursor-pointer">
                            <option>Bulan Ini</option>
                        </select>
                        <button className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100">
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                <th className="pb-4 pl-4">Tanggal</th>
                                <th className="pb-4">Jenis Ibadah</th>
                                <th className="pb-4">Catatan Siswa</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4 pr-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3, 4].map((item) => (
                                <tr key={item} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 pl-4">
                                        <p className="text-xs font-bold text-gray-800">24 Okt 2023</p>
                                        <p className="text-[10px] text-gray-400 font-bold">05:15 AM</p>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-500 bg-emerald-50 p-1 rounded">mosque</span>
                                            <span className="text-sm font-bold text-gray-700">Shalat Subuh</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-sm font-medium text-gray-500 truncate max-w-xs">Berjamaah di masjid dekat rumah...</p>
                                    </td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold border border-orange-100">Menunggu</span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex justify-end gap-2">
                                            <button className="size-8 rounded bg-emerald-100 text-emerald-600 hover:bg-emerald-200 flex items-center justify-center transition-colors">
                                                <span className="material-symbols-outlined text-sm">check</span>
                                            </button>
                                            <button className="size-8 rounded bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center text-xs font-bold text-gray-400">
                    <p>Menampilkan 4 dari 28 kegiatan</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-gray-50 rounded hover:bg-gray-100 text-gray-600">Sebelumnya</button>
                        <button className="px-3 py-1 bg-gray-50 rounded hover:bg-gray-100 text-gray-600">Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
