import React, { useState } from 'react';
import Toast from '../../components/ui/Toast';

const StudentDetail = () => {
    const [toast, setToast] = useState(null);

    // Mock Data for 30 Students
    const students = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: [
            "Ahmad Fulan", "Siti Nurhaliza", "Muhammad Kahfi", "Rizky Pratama", "Fathimah Azzahra",
            "Umar bin Khattab", "Ali bin Abi Thalib", "Usman bin Affan", "Abu Bakar Ash-Shiddiq", "Bilal bin Rabah",
            "Khalid bin Walid", "Salman Al-Farisi", "Zaid bin Haritsah", "Abdullah bin Mas'ud", "Zubair bin Awwam",
            "Talhah bin Ubaidillah", "Sa'ad bin Abi Waqqas", "Abdurrahman bin Auf", "Abu Ubaidah bin Jarrah", "Said bin Zaid",
            "Hasan bin Ali", "Husain bin Ali", "Aisyah binti Abu Bakar", "Hafsah binti Umar", "Zainab binti Jahsy",
            "Fatimah binti Muhammad", "Ruqayyah binti Muhammad", "Ummu Kultsum binti Muhammad", "Maimunah binti Al-Harits", "Safiyyah binti Huyay"
        ][i] || `Siswa ${i + 1}`,
        nis: `123456${78 + i}`,
        class: "5 Al-Kautsar",
        avatar: `https://ui-avatars.com/api/?name=${[
            "Ahmad Fulan", "Siti Nurhaliza", "Muhammad Kahfi", "Rizky Pratama", "Fathimah Azzahra",
            "Umar bin Khattab", "Ali bin Abi Thalib", "Usman bin Affan", "Abu Bakar Ash-Shiddiq", "Bilal bin Rabah",
            "Khalid bin Walid", "Salman Al-Farisi", "Zaid bin Haritsah", "Abdullah bin Mas'ud", "Zubair bin Awwam",
            "Talhah bin Ubaidillah", "Sa'ad bin Abi Waqqas", "Abdurrahman bin Auf", "Abu Ubaidah bin Jarrah", "Said bin Zaid",
            "Hasan bin Ali", "Husain bin Ali", "Aisyah binti Abu Bakar", "Hafsah binti Umar", "Zainab binti Jahsy",
            "Fatimah binti Muhammad", "Ruqayyah binti Muhammad", "Ummu Kultsum binti Muhammad", "Maimunah binti Al-Harits", "Safiyyah binti Huyay"
        ][i]?.replace(' ', '+') || `Siswa+${i + 1}`}&background=random`,
        points: 1250 - (i * 10),
        attendance: 100 - (i % 5),
    })).sort((a, b) => a.name.localeCompare(b.name));

    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('Semua Status');
    const [studentPoints, setStudentPoints] = useState(students[0].points);
    const [prestasiDesc, setPrestasiDesc] = useState('');
    const [prestasiPoin, setPrestasiPoin] = useState('');
    const [pelanggaranDesc, setPelanggaranDesc] = useState('');
    const [pelanggaranPoin, setPelanggaranPoin] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    // Per-student notes storage (keyed by student ID)
    const [studentNotes, setStudentNotes] = useState({
        1: { note: "Pertahankan semangat ibadahnya, Nak!", time: "2024-03-19T14:30:00" }
    });
    const itemsPerPage = 7;

    // Get current student's note
    const teacherNote = studentNotes[selectedStudent.id] || null;

    const [historyData, setHistoryData] = useState([
        {
            id: 1, activity: "Sholat Subuh", detail: "Berjamaah",
            time: "2024-03-20T06:30:00", prayerTime: "04:45", type: "sholat", status: "Menunggu", points: 10
        },
        {
            id: 2, activity: "Sholat Dhuha", detail: "Di Sekolah",
            time: "2024-03-20T10:00:00", prayerTime: "09:15", type: "sholat", status: "Disetujui", points: 15
        },
        {
            id: 3, activity: "Tilawah Quran", detail: "Surat Al-Baqarah",
            time: "2024-03-20T18:30:00", type: "quran", status: "Menunggu", points: 20
        },
        {
            id: 4, activity: "Sholat Subuh", detail: "Mandiri",
            time: "2024-03-20T07:00:00", prayerTime: "05:00", type: "sholat", status: "Ditolak", points: 0
        },
        {
            id: 5, activity: "Infaq Harian", detail: "Untuk Pembangunan Masjid",
            time: "2024-03-20T07:30:00", type: "infaq", status: "Menunggu", points: 25
        },
        {
            id: 6, activity: "Sholat Dzuhur", detail: "Berjamaah",
            time: "2024-03-20T13:00:00", prayerTime: "12:15", type: "sholat", status: "Disetujui", points: 10
        },
        {
            id: 7, activity: "Hafalan Al-Quran", detail: "Surat An-Naba Ayat 1-10",
            time: "2024-03-20T08:00:00", type: "quran", status: "Menunggu", points: 30
        },
        {
            id: 8, activity: "Sholat Ashar", detail: "Berjamaah",
            time: "2024-03-19T16:00:00", prayerTime: "15:30", type: "sholat", status: "Disetujui", points: 10
        },
        {
            id: 9, activity: "Sholat Maghrib", detail: "Berjamaah",
            time: "2024-03-19T18:45:00", prayerTime: "18:00", type: "sholat", status: "Disetujui", points: 10
        },
        {
            id: 10, activity: "Sholat Isya", detail: "Mandiri",
            time: "2024-03-19T20:00:00", prayerTime: "19:30", type: "sholat", status: "Menunggu", points: 10
        }
    ]);

    const allFilteredHistory = historyData.filter(item => {
        if (filterStatus === 'Semua Status') return true;
        if (filterStatus === 'Menunggu') return item.status === 'Menunggu';
        if (filterStatus === 'Disetujui') return item.status === 'Disetujui';
        if (filterStatus === 'Ditolak') return item.status === 'Ditolak';
        if (filterStatus === 'Penambahan') return item.type === 'prestasi';
        if (filterStatus === 'Pengurangan') return item.type === 'pelanggaran';
        return true;
    });

    const totalPages = Math.ceil(allFilteredHistory.length / itemsPerPage);
    const filteredHistory = allFilteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Pagination Reset Fix
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [allFilteredHistory.length, totalPages, currentPage]);

    // Computed Stats
    const stats = React.useMemo(() => {
        const wajibItems = historyData.filter(item => item.type === 'sholat');
        const sunnahItems = historyData.filter(item => item.type === 'quran' || item.type === 'infaq'); // Assuming these are sunnah
        const approvedWajib = wajibItems.filter(item => item.status === 'Disetujui').length;

        return {
            wajibPercentage: wajibItems.length > 0 ? Math.round((approvedWajib / wajibItems.length) * 100) : 0,
            sunnahCount: sunnahItems.length,
            wajibCount: approvedWajib,
            totalWajib: wajibItems.length
        };
    }, [historyData]);

    // Format text to proper EYD Indonesian (capitalize each word, trim, clean up)
    const formatProperText = (text) => {
        if (!text) return '';
        // Trim whitespace and normalize multiple spaces
        let formatted = text.trim().replace(/\s+/g, ' ').toLowerCase();
        // Capitalize first letter of each word
        formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());
        return formatted;
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2000);
    };

    // Mock Handlers for Interactivity
    const handleContact = () => showToast("Membuka WhatsApp Wali Murid...", "info");
    const handleSendNote = () => {
        if (isProcessing) return;
        const noteInput = document.getElementById('teacher-note');
        const note = noteInput.value;
        if (!note) return showToast("Mohon tulis catatan terlebih dahulu.", "error");
        setIsProcessing(true);
        setTimeout(() => {
            // Save note to current student
            setStudentNotes(prev => ({
                ...prev,
                [selectedStudent.id]: {
                    note: note,
                    time: new Date().toISOString()
                }
            }));
            showToast(`Catatan untuk ${selectedStudent.name} berhasil dikirim!`, "success");
            noteInput.value = '';
            setIsProcessing(false);
        }, 500);
    };

    const handleAddPointsClick = () => {
        const poin = parseInt(prestasiPoin) || 0;
        if (poin <= 0 || !prestasiDesc.trim()) {
            return showToast("Mohon isi keterangan dan jumlah poin.", "error");
        }
        setConfirmDialog({
            type: 'add',
            title: 'Konfirmasi Tambah Poin',
            message: `Tambahkan`,
            poinText: `${poin} poin`,
            preposition: `untuk`,
            studentName: selectedStudent.name,
            detail: prestasiDesc,
            poin: poin,
            onConfirm: () => {
                setStudentPoints(prev => prev + poin);
                // Add to history
                const newEntry = {
                    id: Date.now(),
                    activity: "Prestasi",
                    detail: prestasiDesc,
                    time: new Date().toISOString(),
                    type: "prestasi",
                    status: "Disetujui",
                    points: poin
                };
                setHistoryData(prev => [newEntry, ...prev]);
                showToast(`Berhasil! ${selectedStudent.name} mendapat +${poin} poin.`, "success");
                setPrestasiDesc('');
                setPrestasiPoin('');
                setConfirmDialog(null);
            }
        });
    };

    const handleDeductPointsClick = () => {
        const poin = parseInt(pelanggaranPoin) || 0;
        if (poin <= 0 || !pelanggaranDesc.trim()) {
            return showToast("Mohon isi jenis pelanggaran dan jumlah poin.", "error");
        }
        setConfirmDialog({
            type: 'deduct',
            title: 'Konfirmasi Kurangi Poin',
            message: `Kurangi`,
            poinText: `${poin} poin`,
            preposition: `dari`,
            studentName: selectedStudent.name,
            detail: pelanggaranDesc,
            poin: poin,
            onConfirm: () => {
                setStudentPoints(prev => Math.max(0, prev - poin));
                // Add to history
                const newEntry = {
                    id: Date.now(),
                    activity: "Pelanggaran",
                    detail: pelanggaranDesc,
                    time: new Date().toISOString(),
                    type: "pelanggaran",
                    status: "Disetujui",
                    points: -poin
                };
                setHistoryData(prev => [newEntry, ...prev]);
                showToast(`${selectedStudent.name} dikurangi ${poin} poin.`, "warning");
                setPelanggaranDesc('');
                setPelanggaranPoin('');
                setConfirmDialog(null);
            }
        });
    };

    const handleApprove = () => showToast("Kegiatan disetujui.", "success");
    const handleReject = () => showToast("Kegiatan ditolak.", "error");

    // Stats Card Component - Themed like Student Dashboard
    const StatsCard = ({ label, value, subtext, icon, color, bg }) => (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${bg} ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
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

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Confirmation Dialog */}
            {confirmDialog && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setConfirmDialog(null)}
                    />
                    <div className={`relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-200 ${confirmDialog.type === 'add' ? 'ring-4 ring-emerald-100' : 'ring-4 ring-red-100'}`}>
                        <div className="text-center mb-6">
                            <div className={`size-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${confirmDialog.type === 'add' ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-red-400 to-rose-500'}`}>
                                <span className="material-symbols-outlined text-3xl text-white">
                                    {confirmDialog.type === 'add' ? 'add_circle' : 'remove_circle'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{confirmDialog.title}</h3>
                            <p className="text-gray-600 mb-2">
                                {confirmDialog.message} <span className={`font-bold ${confirmDialog.type === 'add' ? 'text-emerald-600' : 'text-red-600'}`}>{confirmDialog.poinText}</span> {confirmDialog.preposition} <span className="font-bold text-purple-600">{confirmDialog.studentName}</span>?
                            </p>
                            <p className={`text-sm px-4 py-2.5 rounded-xl inline-block ${confirmDialog.type === 'add' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                <span className={confirmDialog.type === 'add' ? 'text-emerald-500' : 'text-red-500'}>{confirmDialog.type === 'add' ? 'Keterangan:' : 'Pelanggaran:'}</span>{' '}
                                <span className={`font-bold ${confirmDialog.type === 'add' ? 'text-emerald-700' : 'text-red-700'}`}>{confirmDialog.detail}</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDialog(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDialog.onConfirm}
                                disabled={isProcessing}
                                className={`flex-1 px-4 py-3 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${confirmDialog.type === 'add'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200'
                                    : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200'}`}
                            >
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Breadcrumb - Styled */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2">
                <span className="hover:text-emerald-600 cursor-pointer transition-colors">Beranda</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="hover:text-emerald-600 cursor-pointer transition-colors">Daftar Siswa</span>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Detail Siswa</span>
            </div>

            {/* Profile Header - Clean White Style */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                    <div className="size-28 rounded-full p-1.5 bg-white shadow-sm ring-4 ring-gray-50 shrink-0">
                        <img
                            src={selectedStudent.avatar}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left w-full md:w-auto">
                        <div className="mb-2 flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start relative z-50">
                            {/* Custom Student Selector Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-emerald-700 transition-colors group outline-none"
                                >
                                    {selectedStudent.name}
                                    <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 text-3xl ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={() => setIsDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
                                            <div className="p-2 space-y-1">
                                                {students.map((student) => (
                                                    <button
                                                        key={student.id}
                                                        onClick={() => {
                                                            setSelectedStudent(student);
                                                            setStudentPoints(student.points);
                                                            setIsDropdownOpen(false);
                                                            showToast(`Menampilkan data: ${student.name}`, "info");
                                                        }}
                                                        className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${selectedStudent.id === student.id ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-gray-50 text-gray-600'}`}
                                                    >
                                                        <img src={student.avatar} alt={student.name} className="size-8 rounded-full border border-gray-100 object-cover" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold truncate">{student.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-medium truncate">NIS: {student.nis}</p>
                                                        </div>
                                                        {selectedStudent.id === student.id && (
                                                            <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <span className="material-symbols-outlined text-emerald-600 text-2xl" title="Verified Student">verified</span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold rounded-xl flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">badge</span>
                                <span>NIS: {selectedStudent.nis}</span>
                            </span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold rounded-xl flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">school</span>
                                <span>Kelas: {selectedStudent.class}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 shrink-0">
                    <button onClick={handleContact} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all">
                        <span className="material-symbols-outlined text-lg">chat</span>
                        Hubungi Wali
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard label="Total Poin" value={studentPoints.toLocaleString()} subtext="Total akumulasi poin" icon="stars" color="text-amber-600" bg="bg-amber-100" />
                <StatsCard label="Ibadah Wajib" value={`${stats.wajibPercentage}%`} subtext={`${stats.wajibCount}/${stats.totalWajib} terpenuhi`} icon="verified" color="text-emerald-600" bg="bg-emerald-100" />
                <StatsCard label="Ibadah Sunnah" value={stats.sunnahCount} subtext="Kegiatan sunnah tercatat" icon="favorite" color="text-red-500" bg="bg-red-50" />
                <StatsCard label="Absensi" value={`${selectedStudent.attendance}%`} subtext="Kehadiran sekolah" icon="calendar_month" color="text-blue-600" bg="bg-blue-100" />
            </div>

            {/* Points Management Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Achievement Points */}
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-xl transition-all group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10">
                        <h3 className="text-emerald-800 font-bold mb-4 flex items-center gap-2 text-lg">
                            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shadow-sm">
                                <span className="material-symbols-outlined text-xl">verified</span>
                            </div>
                            Beri Prestasi
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-emerald-700 mb-1.5 uppercase tracking-wide">Keterangan Prestasi</label>
                                <input
                                    type="text"
                                    value={prestasiDesc}
                                    onChange={(e) => setPrestasiDesc(e.target.value)}
                                    placeholder="Contoh: Juara 1 Tahfidz"
                                    className="w-full p-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm font-medium bg-white shadow-sm transition-all"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-emerald-700 mb-1.5 uppercase tracking-wide">Tambahan Poin</label>
                                    <input
                                        type="number"
                                        value={prestasiPoin}
                                        onChange={(e) => setPrestasiPoin(e.target.value)}
                                        placeholder="50"
                                        className="w-full p-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm font-medium bg-white shadow-sm transition-all"
                                    />
                                </div>
                                <button onClick={handleAddPointsClick} disabled={isProcessing} className="self-end px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 h-[46px]">
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deduct Violation Points */}
                <div className="bg-red-50 p-6 rounded-3xl border border-red-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full blur-xl transition-all group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10">
                        <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2 text-lg">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600 shadow-sm">
                                <span className="material-symbols-outlined text-xl">gpp_bad</span>
                            </div>
                            Catat Pelanggaran
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-red-700 mb-1.5 uppercase tracking-wide">Jenis Pelanggaran</label>
                                <input
                                    type="text"
                                    value={pelanggaranDesc}
                                    onChange={(e) => setPelanggaranDesc(e.target.value)}
                                    placeholder="Contoh: Terlambat Masuk Sekolah"
                                    className="w-full p-3 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none text-sm font-medium bg-white shadow-sm transition-all"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-red-700 mb-1.5 uppercase tracking-wide">Pengurangan Poin</label>
                                    <input
                                        type="number"
                                        value={pelanggaranPoin}
                                        onChange={(e) => setPelanggaranPoin(e.target.value)}
                                        placeholder="10"
                                        className="w-full p-3 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none text-sm font-medium bg-white shadow-sm transition-all"
                                    />
                                </div>
                                <button onClick={handleDeductPointsClick} disabled={isProcessing} className="self-end px-6 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all flex items-center gap-2 h-[46px]">
                                    <span className="material-symbols-outlined text-lg">remove_circle</span>
                                    Kurangi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Notes Input with History */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-full blur-xl opacity-50"></div>

                <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                    {/* Left: Title, Description & Last Note */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white shadow-lg shadow-emerald-200">
                                <span className="material-symbols-outlined text-xl">edit_note</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">Catatan Guru</h3>
                                <p className="text-xs text-gray-400">Kirim motivasi untuk siswa</p>
                            </div>
                        </div>

                        {/* Last Note Display */}
                        {teacherNote && teacherNote.note && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl border border-emerald-100/50 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="size-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-xs">chat</span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">Catatan Terakhir</span>
                                </div>
                                <p className="text-sm text-gray-700 font-medium leading-relaxed">{teacherNote.note}</p>
                                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                    {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(teacherNote.time))} • {new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(teacherNote.time)).replace('.', ':')} WIB
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: Input & Button */}
                    <div className="flex-[1.5] flex flex-col gap-3">
                        <textarea
                            id="teacher-note"
                            className="flex-1 p-4 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 outline-none text-sm font-medium resize-none min-h-[120px] bg-gray-50/50 transition-all placeholder:text-gray-400"
                            placeholder={`Tulis pesan untuk ${selectedStudent.name}...`}
                        ></textarea>
                        <button onClick={handleSendNote} className="self-end px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 group">
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform">send</span>
                            Kirim Catatan
                        </button>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">history_edu</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Riwayat Aktivitas Ibadah</h3>
                            <p className="text-xs text-gray-400 font-medium">Rekapitulasi kegiatan siswa</p>
                        </div>
                    </div>

                    <div className="flex bg-gray-50 px-2 py-1.5 rounded-xl border border-gray-100/50 gap-1">
                        {['Semua Status', 'Menunggu', 'Disetujui', 'Ditolak', 'Penambahan', 'Pengurangan'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => { setFilterStatus(filter); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${filterStatus === filter
                                    ? filter === 'Penambahan' ? 'bg-emerald-500 text-white shadow-sm'
                                        : filter === 'Pengurangan' ? 'bg-red-500 text-white shadow-sm'
                                            : 'bg-purple-600 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-purple-600 hover:bg-white'
                                    }`}
                            >
                                {filter === 'Penambahan' && <span className="material-symbols-outlined text-sm">add</span>}
                                {filter === 'Pengurangan' && <span className="material-symbols-outlined text-sm">remove</span>}
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                                <th className="py-3 pl-4 rounded-l-lg w-[18%]">Waktu</th>
                                <th className="py-3 px-3 w-[18%]">Aktivitas</th>
                                <th className="py-3 px-3 w-[36%]">Keterangan</th>
                                <th className="py-3 px-3 pr-4 rounded-r-lg w-[28%] text-right">Status & Poin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredHistory.map((item) => {
                                // Formatting Logic
                                const dateObj = new Date(item.time);
                                const dayStr = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(dateObj);
                                const dateStr = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateObj);
                                const timeStr = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }).format(dateObj).replace('.', ':');

                                const prayerTime = item.prayerTime || '';

                                const getActivityIcon = (type) => {
                                    if (type === 'sholat') return { icon: 'mosque', bg: 'bg-emerald-100', text: 'text-emerald-600' };
                                    if (type === 'quran') return { icon: 'menu_book', bg: 'bg-purple-100', text: 'text-purple-600' };
                                    if (type === 'prestasi') return { icon: 'emoji_events', bg: 'bg-amber-100', text: 'text-amber-600' };
                                    if (type === 'pelanggaran') return { icon: 'gpp_bad', bg: 'bg-red-100', text: 'text-red-600' };
                                    return { icon: 'volunteer_activism', bg: 'bg-orange-100', text: 'text-orange-600' };
                                };
                                const style = getActivityIcon(item.type);

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                                        {/* Waktu */}
                                        <td className="py-3 pl-4">
                                            <div className="font-bold text-sm text-gray-700">{dayStr}, {dateStr}</div>
                                            <div className="text-gray-500 text-xs mt-0.5">{timeStr} WIB</div>
                                        </td>
                                        {/* Aktivitas */}
                                        <td className="py-3 px-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                                                    <span className="material-symbols-outlined text-xl">{style.icon}</span>
                                                </div>
                                                <span className="font-bold text-sm text-gray-800 block">{item.activity}</span>
                                            </div>
                                        </td>
                                        {/* Keterangan */}
                                        <td className="py-3 px-3">
                                            {item.type === 'sholat' ? (
                                                <div>
                                                    <span className="font-bold text-sm text-gray-700 block">
                                                        {formatProperText(item.detail)}
                                                    </span>
                                                    <span className="text-xs text-emerald-600 font-medium mt-0.5 block">
                                                        Waktu: {prayerTime} WIB
                                                    </span>
                                                </div>
                                            ) : item.type === 'prestasi' || item.type === 'pelanggaran' ? (
                                                <span className="font-medium text-sm text-gray-600">
                                                    {formatProperText(item.detail)}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    {formatProperText(item.detail)}
                                                </span>
                                            )}
                                        </td>
                                        {/* Status & Poin */}
                                        <td className="py-3 px-3 pr-4 text-right">
                                            <div className="inline-flex items-center gap-3">
                                                {/* Status Badge */}
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                                                    ${item.status === 'Menunggu' ? 'bg-amber-50 text-amber-600' : ''}
                                                    ${item.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-600' : ''}
                                                    ${item.status === 'Ditolak' ? 'bg-red-50 text-red-600' : ''}
                                                `}>
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {item.status === 'Menunggu' ? 'hourglass_top' : item.status === 'Disetujui' ? 'check_circle' : 'cancel'}
                                                    </span>
                                                    {item.status}
                                                </span>
                                                {/* Point Badge */}
                                                <span className={`inline-flex items-center justify-center min-w-[50px] px-2.5 py-1 rounded-full text-xs font-bold
                                                    ${item.type === 'prestasi' ? 'bg-purple-500 text-white' : ''}
                                                    ${item.type === 'pelanggaran' ? 'bg-red-500 text-white' : ''}
                                                    ${item.type !== 'prestasi' && item.type !== 'pelanggaran' && item.points > 0 ? 'bg-emerald-500 text-white' : ''}
                                                    ${item.type !== 'prestasi' && item.type !== 'pelanggaran' && item.points < 0 ? 'bg-red-500 text-white' : ''}
                                                    ${item.type !== 'prestasi' && item.type !== 'pelanggaran' && item.points === 0 ? 'bg-gray-200 text-gray-500' : ''}
                                                `}>
                                                    {item.points > 0 ? '+' : ''}{item.points}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                    <p>Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, allFilteredHistory.length)} dari {allFilteredHistory.length} data</p>
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`size-8 rounded-lg flex items-center justify-center transition-all ${currentPage === page
                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                                    : 'bg-white border border-gray-100 hover:bg-gray-50 text-gray-600'}`}
                            >
                                {page}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 h-8 bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 rounded-lg flex items-center gap-1 transition-colors"
                            >
                                Selanjutnya
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StudentDetail;
