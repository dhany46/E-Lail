import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/ui/Toast';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
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

    // Leaderboard Item Component - Fun Style
    const StudentRank = ({ rank, name, classRoom, points, avatar }) => {
        const getRankStyle = () => {
            if (rank === 1) return { bg: "bg-gradient-to-br from-amber-100 to-orange-100", text: "text-amber-700", icon: "👑" };
            if (rank === 2) return { bg: "bg-gradient-to-br from-slate-100 to-gray-100", text: "text-slate-700", icon: "🥈" };
            if (rank === 3) return { bg: "bg-gradient-to-br from-amber-50 to-orange-50", text: "text-amber-800", icon: "🥉" };
            return { bg: "bg-gray-50", text: "text-gray-600", icon: `#${rank}` };
        }

        const rankStyle = getRankStyle();

        return (
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer ${rank <= 3 ? rankStyle.bg : 'hover:bg-gray-50'}`}>
                <div className={`size-8 flex items-center justify-center font-bold text-lg ${rankStyle.text}`}>
                    {rankStyle.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-800 truncate">{name}</h4>
                    <p className="text-xs text-gray-500 truncate">Kelas {classRoom}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm border border-white/50">
                    <span className="text-xs font-bold text-emerald-600">{points} Poin</span>
                </div>
            </div>
        );
    };

    // Table Row Component


    // Mock Data for Reviews
    const [reviews, setReviews] = useState([
        { id: 1, name: "Budi Santoso", nis: "12345678", activity: "Sholat Subuh Berjamaah", detail: "Di Masjid", time: "04:45 WIB", status: "Menunggu", type: "sholat" },
        { id: 2, name: "Siti Aminah", nis: "12345679", activity: "Membaca Al-Quran", detail: "Surat Al-Mulk", time: "18:30 WIB", status: "Menunggu", type: "quran" },
        { id: 3, name: "Rahmat Hidayat", nis: "12345680", activity: "Infaq Harian", detail: "Sekolah", time: "07:00 WIB", status: "Menunggu", type: "infaq" },
        { id: 4, name: "Dewi Lestari", nis: "12345681", activity: "Sholat Dhuha", detail: "Di Sekolah", time: "09:30 WIB", status: "Menunggu", type: "sholat" },
        { id: 5, name: "Agus Pratama", nis: "12345682", activity: "Membantu Orang Tua", detail: "Membersihkan Rumah", time: "16:15 WIB", status: "Menunggu", type: "infaq" }
    ]);

    const handleReviewAction = (id, newStatus) => {
        setReviews(prev => prev.map(review =>
            review.id === id ? { ...review, status: newStatus } : review
        ));
        const message = newStatus === 'Disetujui' ? 'Laporan disetujui.' : 'Laporan ditolak.';
        const type = newStatus === 'Disetujui' ? 'success' : 'error';
        showToast(message, type);
    };

    // Table Row Component
    const ReviewRow = ({ id, name, nis, activity, detail, time, type, status, onAction }) => (
        <tr className="hover:bg-gray-50/80 transition-colors border-b border-gray-100 last:border-0 group">
            <td className="py-4 pl-4">
                <div className="flex items-center gap-3">
                    <div>
                        <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                        <p className="text-xs text-gray-500">NIS: {nis}</p>
                    </div>
                </div>
            </td>
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${type === 'sholat' ? 'bg-emerald-100 text-emerald-600' :
                        type === 'quran' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                        <span className="material-symbols-outlined text-xl">
                            {type === 'sholat' ? 'mosque' : type === 'quran' ? 'menu_book' : 'volunteer_activism'}
                        </span>
                    </div>
                    <div>
                        <span className="font-bold text-sm text-gray-800 block">{activity}</span>
                        {detail && <span className="text-xs text-gray-500 font-medium">{detail}</span>}
                    </div>
                </div>
            </td>
            <td className="py-4 text-xs">
                <div className="font-bold text-gray-700">{time}</div>
            </td>
            <td className="py-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border
                    ${status === 'Menunggu' ? 'text-amber-600 bg-amber-50 border-amber-100' : ''}
                    ${status === 'Disetujui' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : ''}
                    ${status === 'Ditolak' ? 'text-red-600 bg-red-50 border-red-100' : ''}
                `}>
                    <span className="material-symbols-outlined text-[14px]">
                        {status === 'Menunggu' ? 'hourglass_top' : status === 'Disetujui' ? 'check_circle' : 'cancel'}
                    </span>
                    {status}
                </span>
            </td>
            <td className="py-4 pr-4 text-right w-36">
                {status === 'Menunggu' ? (
                    <div className="flex items-center justify-end gap-3 transition-opacity">
                        <button onClick={() => onAction(id, 'Ditolak')} className="size-9 rounded-xl text-red-500 hover:bg-red-50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center" title="Tolak">
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                        <button onClick={() => onAction(id, 'Disetujui')} className="h-9 pl-3 pr-4 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-200 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-lg">check</span>
                            Setujui
                        </button>
                    </div>
                ) : (
                    <div className="text-xs font-bold text-gray-400 italic">
                        {status === 'Disetujui' ? 'Telah disetujui' : 'Telah ditolak'}
                    </div>
                )}
            </td>
        </tr>
    );

    return (
        <div className="space-y-6">
            {/* Greeting Section - Clean White Style */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Assalamualaikum, Ust. Ahmad! 👋
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Selamat datang kembali di dashboard guru.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">school</span>
                        Wali Kelas 4B
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        24 Okt 2023
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    label="Total Siswa"
                    value="32"
                    subtext="Siswa Aktif"
                    icon="groups"
                    color="text-blue-600"
                    bg="bg-blue-100"
                />
                <StatsCard
                    label="Perlu Tinjauan"
                    value="5"
                    subtext="Laporan Baru"
                    icon="notifications_active"
                    color="text-amber-600"
                    bg="bg-amber-100"
                />
                <StatsCard
                    label="Laporan Disetujui"
                    value="24"
                    subtext="Hari Ini"
                    icon="verified"
                    color="text-emerald-600"
                    bg="bg-emerald-100"
                />
                <StatsCard
                    label="Rata-rata Kelas"
                    value="85"
                    subtext="Poin Aktivitas"
                    icon="monitoring"
                    color="text-purple-600"
                    bg="bg-purple-100"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-2 flex flex-col">

                    {/* Pending Review Table */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined">pending_actions</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">Perlu Tinjauan</h3>
                                    <p className="text-xs text-gray-400 font-medium">5 laporan siswa menunggu konfirmasi</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                                Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                            <table className="w-full">
                                <thead className="sticky top-0 bg-white z-10">
                                    <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                                        <th className="py-3 pl-4 rounded-l-lg">Siswa</th>
                                        <th className="py-3">Aktivitas</th>
                                        <th className="py-3">Waktu</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3 pr-4 text-right rounded-r-lg">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews.map((review) => (
                                        <ReviewRow
                                            key={review.id}
                                            id={review.id}
                                            name={review.name}
                                            nis={review.nis}
                                            activity={review.activity}
                                            detail={review.detail}
                                            time={review.time}
                                            type={review.type}
                                            status={review.status}
                                            onAction={handleReviewAction}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col">
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center gap-3 mb-6 bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                            <div className="size-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-200">
                                <span className="text-xl">🏆</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 leading-none text-lg">Peringkat Siswa Terbaik</h3>
                                <p className="text-[10px] text-gray-500 mt-1 font-medium bg-white/50 inline-block px-1.5 py-0.5 rounded-md">Periode Bulan Ini</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <StudentRank rank={1} name="Aisyah Zahra" classRoom="4B" points={1250} avatar="https://ui-avatars.com/api/?name=Aisyah+Zahra&background=random" />
                            <StudentRank rank={2} name="M. Rizky" classRoom="4B" points={1180} avatar="https://ui-avatars.com/api/?name=M+Rizky&background=random" />
                            <StudentRank rank={3} name="Fatimah" classRoom="4B" points={1150} avatar="https://ui-avatars.com/api/?name=Fatimah&background=random" />
                            <StudentRank rank={4} name="Umar bin Khattab" classRoom="4B" points={1100} avatar="https://ui-avatars.com/api/?name=Umar&background=random" />
                            <StudentRank rank={5} name="Salman Al-Farisi" classRoom="4B" points={1050} avatar="https://ui-avatars.com/api/?name=Salman&background=random" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
