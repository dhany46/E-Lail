import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Toast from '../../components/ui/Toast';

const ReportManagement = () => {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [toast, setToast] = useState(null);
    const [activeTab, setActiveTab] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [reports, setReports] = useState([
        {
            id: 1, name: "Ahmad Fulan", nis: "12345678",
            activity: "Sholat Subuh", detail: "Berjamaah", time: "2024-03-20T04:45:00",
            type: "sholat", status: "Menunggu"
        },
        {
            id: 2, name: "Siti Nurhaliza", nis: "12345679",
            activity: "Sholat Dhuha", detail: "Di Sekolah", time: "2024-03-20T09:15:00",
            type: "sholat", status: "Disetujui"
        },
        {
            id: 3, name: "Muhammad Kahfi", nis: "12345680",
            activity: "Tilawah Quran", detail: "Surat Al-Baqarah", time: "2024-03-20T18:30:00",
            type: "quran", status: "Menunggu"
        },
        {
            id: 4, name: "Rizky Pratama", nis: "12345681",
            activity: "Sholat Subuh", detail: "Mandiri", time: "2024-03-20T05:00:00",
            type: "sholat", status: "Ditolak"
        },
        {
            id: 5, name: "Fathimah Azzahra", nis: "12345682",
            activity: "Infaq Harian", detail: "Untuk Pembangunan Masjid", time: "2024-03-20T07:30:00",
            type: "infaq", status: "Menunggu"
        },
        {
            id: 6, name: "Zaki Abdullah", nis: "12345683",
            activity: "Sholat Dzuhur", detail: "Berjamaah", time: "2024-03-20T12:15:00",
            type: "sholat", status: "Disetujui"
        },
        {
            id: 7, name: "Aisyah Putri", nis: "12345684",
            activity: "Hafalan Al-Quran", detail: "Surat An-Naba Ayat 1-10", time: "2024-03-20T08:00:00",
            type: "quran", status: "Menunggu"
        },
        {
            id: 8, name: "Ibrahim Malik", nis: "12345685",
            activity: "Sholat Ashar", detail: "Di Sekolah", time: "2024-03-20T15:30:00",
            type: "sholat", status: "Disetujui"
        },
        {
            id: 9, name: "Khadijah Amina", nis: "12345686",
            activity: "Sedekah Jumat", detail: "Masjid Sekolah", time: "2024-03-20T11:45:00",
            type: "infaq", status: "Menunggu"
        },
        {
            id: 10, name: "Yusuf Rahman", nis: "12345687",
            activity: "Membaca Al-Quran", detail: "Surat Yasin", time: "2024-03-20T19:00:00",
            type: "quran", status: "Disetujui"
        },
        {
            id: 11, name: "Budi Santoso", nis: "12345688",
            activity: "Sholat Maghrib", detail: "Berjamaah", time: "2024-03-20T18:10:00",
            type: "sholat", status: "Menunggu"
        },
        {
            id: 12, name: "Ani Wijaya", nis: "12345689",
            activity: "Sholat Isya", detail: "Mandiri", time: "2024-03-20T19:30:00",
            type: "sholat", status: "Disetujui"
        }
    ]);

    // Filter reports based on active tab
    const filteredReports = activeTab === 'Semua'
        ? reports
        : reports.filter(r => r.status === activeTab);

    // Pagination Logic
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };





    const handleExportRecap = () => {
        // Mock Data for Semester Recap
        const students = [
            { id: 1, name: "Ahmad Fulan", nis: "12345678", class: "4B", total_points: 1250, attendance: "98%", prayer_score: 95, quran_score: 88, predicate: "Mumtaz" },
            { id: 2, name: "Siti Nurhaliza", nis: "12345679", class: "4B", total_points: 1180, attendance: "95%", prayer_score: 92, quran_score: 90, predicate: "Jayyid Jiddan" },
            { id: 3, name: "Muhammad Kahfi", nis: "12345680", class: "4B", total_points: 1150, attendance: "94%", prayer_score: 90, quran_score: 85, predicate: "Jayyid Jiddan" },
            { id: 4, name: "Rizky Pratama", nis: "12345681", class: "4B", total_points: 980, attendance: "88%", prayer_score: 80, quran_score: 75, predicate: "Jayyid" },
            { id: 5, name: "Fathimah Azzahra", nis: "12345682", class: "4B", total_points: 1280, attendance: "100%", prayer_score: 98, quran_score: 95, predicate: "Mumtaz" },
        ];

        // Format data for Excel (Indonesian Headers)
        const excelData = students.map((s, index) => ({
            "No": index + 1,
            "Nama Lengkap": s.name,
            "NIS": s.nis,
            "Kelas": s.class,
            "Total Poin": s.total_points,
            "Kehadiran (%)": s.attendance,
            "Nilai Ibadah Wajib": s.prayer_score,
            "Nilai Tahfidz": s.quran_score,
            "Predikat Akhir": s.predicate
        }));

        // Create Worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Adjust Column Widths for better readability
        const wscols = [
            { wch: 5 },  // No
            { wch: 25 }, // Nama
            { wch: 15 }, // NIS
            { wch: 10 }, // Kelas
            { wch: 12 }, // Total Poin
            { wch: 15 }, // Kehadiran
            { wch: 18 }, // Nilai Ibadah
            { wch: 15 }, // Nilai Tahfidz
            { wch: 15 }  // Predikat
        ];
        worksheet['!cols'] = wscols;

        // Create Workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap 4B");

        // Download File with Date Range
        const filename = `Rekap_Kelas_4B_${startDate}_sd_${endDate}.xlsx`;
        XLSX.writeFile(workbook, filename);
        showToast(`Berhasil mengunduh rekap: ${filename}`, "success");
    };

    // Stats Card Component - Themed like Student Dashboard
    const StatsCard = ({ label, value, subtext, icon, color, bg }) => (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${bg} ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-xs text-gray-400">trending_up</span>
                    <span className="text-[10px] font-bold text-gray-500">2.4%</span>
                </div>
            </div>
            <div>
                <p className="text-sm font-bold text-gray-600 mb-1">{label}</p>
                <h3 className="text-3xl font-black text-gray-800 mb-1 tracking-tight">{value}</h3>
                <p className={`text-xs font-bold flex items-center gap-1 ${color}`}>
                    {subtext}
                </p>
            </div>
            {/* Decorative Circle */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full ${bg} opacity-50`}></div>
        </div>
    );

    // Table Row Component
    const ReportRow = ({ id, name, nis, activity, detail, time, type, status }) => {
        // Format Date and Time
        const dateObj = new Date(time);
        const dateStr = dateObj.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const timeStr = dateObj.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        }) + ' WIB';

        // Keterangan Content
        let keterangan = detail;
        if (type === 'sholat') {
            // Check if activity string contains specific prayer times for "wajib" check context if needed
            // For now, assuming mock data is correct structure: "Sholat [Nama]" and detail is "Berjamaah/Mandiri"
            // or "Di [Lokasi]" which implies logic adjustment. 
            // Based on user request: "sholat wajib": waktu pelaksanaan + berjamaah/mandiri/notes

            // If the existing 'activity' is just "Sholat ..." and detail is the method/location.
            keterangan = (
                <div>
                    <span className="block font-medium text-gray-700">{activity.replace('Sholat ', '')}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="font-semibold text-emerald-600">{timeStr}</span>
                        <span>&bull;</span>
                        <span>{detail}</span>
                    </span>
                </div>
            );
        } else {
            keterangan = <span className="text-sm text-gray-600">{detail}</span>;
        }

        return (
            <tr className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group">
                <td className="py-4 px-6 w-[250px]">
                    <div className="flex items-center gap-3">
                        <div>
                            <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                            <p className="text-xs text-gray-500">NIS: {nis}</p>
                        </div>
                    </div>
                </td>
                <td className="py-4 px-4 w-[200px]">
                    <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${type === 'sholat' ? 'bg-emerald-100 text-emerald-600' :
                            type === 'quran' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                            <span className="material-symbols-outlined text-lg">
                                {type === 'sholat' ? 'mosque' : type === 'quran' ? 'menu_book' : 'volunteer_activism'}
                            </span>
                        </div>
                        <span className="font-bold text-sm text-gray-800 block">{activity}</span>
                    </div>
                </td>
                <td className="py-4 px-4">
                    {keterangan}
                </td>
                <td className="py-4 px-4 text-xs w-[200px]">
                    <div className="font-bold text-gray-700">{dateStr}</div>
                    <div className="text-gray-500">{timeStr}</div>
                </td>
                <td className="py-4 pl-4 pr-10 w-[150px]">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold
                        ${status === 'Menunggu' ? 'text-amber-600' : ''}
                        ${status === 'Disetujui' ? 'text-emerald-600' : ''}
                        ${status === 'Ditolak' ? 'text-red-600' : ''}
                    `}>
                        <span className="material-symbols-outlined text-[18px]">
                            {status === 'Menunggu' ? 'hourglass_top' : status === 'Disetujui' ? 'check_circle' : 'cancel'}
                        </span>
                        {status}
                    </span>
                </td>

            </tr>
        );
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header - Themed Standard */}
            {/* Header - Clean White Style */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-3xl">📋</span>
                        Manajemen Laporan
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Kelola dan verifikasi kegiatan ibadah harian siswa kelas <span className="font-bold text-emerald-600">4B</span>.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatsCard label="Menunggu Verifikasi" value="12" subtext="Perlu tindakan" icon="pending_actions" color="text-amber-600" bg="bg-amber-100" />
                <StatsCard label="Disetujui Hari Ini" value="45" subtext="+12% dari kemarin" icon="check_circle" color="text-emerald-600" bg="bg-emerald-100" />
                <StatsCard label="Total Siswa Aktif" value="28" subtext="Semua hadir" icon="groups" color="text-blue-600" bg="bg-blue-100" />
            </div>

            {/* Filters Row */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama siswa atau jenis ibadah..."
                        className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scroll-smooth items-center">
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-600 outline-none p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        />
                        <span className="text-gray-400 text-xs font-bold">-</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-transparent text-xs font-bold text-gray-600 outline-none p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        />
                    </div>

                    <button
                        onClick={handleExportRecap}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-200 shrink-0"
                    >
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export Rekap
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs */}
                {/* Table Header with Filter Tabs */}
                <div className="px-6 py-4 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-600">history_edu</span>
                            Riwayat Aktivitas Ibadah
                        </span>
                    </div>

                    <div className="flex bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100/50">
                        {['Semua', 'Menunggu', 'Disetujui', 'Ditolak'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-500'
                                    : 'text-gray-500 hover:text-purple-600 hover:bg-white'
                                    }`}
                            >
                                {tab === 'Semua' ? 'Semua Status' : tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                                <th className="py-3 px-6 w-[250px]">Siswa</th>
                                <th className="py-3 px-4 w-[200px]">Aktivitas</th>
                                <th className="py-3 px-4">Keterangan</th>
                                <th className="py-3 px-4 w-[200px]">Waktu</th>
                                <th className="py-3 pl-4 pr-10 w-[150px]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((report) => (
                                <ReportRow
                                    key={report.id}
                                    {...report}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <p className="text-xs font-bold text-gray-400">
                        Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredReports.length)} dari {filteredReports.length} data
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 rounded-lg border border-transparent hover:bg-gray-50 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Sebelumnya
                        </button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`size-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${currentPage === page
                                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-200'
                                        : 'border border-gray-100 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 rounded-lg border border-transparent hover:bg-gray-50 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast Container */}
            {toast && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-5 fade-in duration-300">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            {/* Confirmation Dialog for Reject */}

        </div>
    );
};

export default ReportManagement;
