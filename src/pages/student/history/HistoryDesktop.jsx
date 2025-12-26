import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AchievementPopup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}`}>
            <div
                className={`bg-white rounded-[2rem] p-8 shadow-2xl max-w-sm w-full relative text-center overflow-hidden transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
                {/* Decor */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>

                {/* Confetti-like background decor using CSS radial gradients if simple, or just simple circles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                    <div className="absolute top-10 left-10 size-4 rounded-full bg-yellow-400 animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 size-6 rounded-full bg-orange-400 animate-bounce delay-100"></div>
                    <div className="absolute top-20 right-20 size-3 rounded-full bg-green-400 animate-pulse"></div>
                </div>

                <div className={`size-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-700 delay-200 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
                    <span className="text-6xl drop-shadow-sm">🏆</span>
                </div>

                <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h2 className="text-2xl font-black text-gray-800 mb-3 tracking-tight">Masya Allah! 🌟</h2>
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed font-medium">
                        Selamat! Kamu telah menyelesaikan <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Target Harian</span> hari ini.
                        <br />Barakallah fiik!
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className={`w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                    Alhamdulillah 🤲
                </button>
            </div>
        </div>
    );
};

const HistoryDesktop = () => {
    const [activities, setActivities] = useState([]);
    const [filter, setFilter] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const itemsPerPage = 8;
    const navigate = useNavigate();

    // Check for achievement when activities follow
    useEffect(() => {
        if (activities.length === 0) return;

        const today = new Date().toISOString().split('T')[0];
        const todayActivities = activities.filter(a => a.rawDate === today);
        const todayCount = todayActivities.length;

        const achievementKey = `daily_achievement_${today}`;
        const hasShownAchievement = localStorage.getItem(achievementKey);

        if (todayCount >= 8 && !hasShownAchievement) {
            setShowPopup(true);
            localStorage.setItem(achievementKey, 'true');
        }
    }, [activities]);

    // Load activities from localStorage
    useEffect(() => {
        const loadActivities = () => {
            const allActivities = [];

            // Get all localStorage keys that match our pattern
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('daily_report_')) {
                    const dateStr = key.replace('daily_report_', '');
                    const data = JSON.parse(localStorage.getItem(key));

                    // Format date for display
                    const dateObj = new Date(dateStr);
                    const formattedDate = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });

                    // Process prayers - handle both old format (string) and new format (object)
                    if (data.prayers && Array.isArray(data.prayers)) {
                        data.prayers.forEach((prayer, idx) => {
                            // Handle both formats: string ID or object {id, time, isCongregation}
                            const isObject = typeof prayer === 'object' && prayer !== null;
                            const prayerId = isObject ? prayer.id : prayer;
                            const prayerTime = isObject && prayer.time ? prayer.time : null;
                            const isCongregation = isObject ? prayer.isCongregation : false;

                            const submittedAt = isObject && prayer.submittedAt ? prayer.submittedAt : null;
                            const displayTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');

                            allActivities.push({
                                id: `${dateStr}-prayer-${idx}`,
                                date: formattedDate,
                                rawDate: dateStr,
                                rawTime: submittedAt || prayerTime || '00:00',
                                time: `${displayTime} WIB`,
                                title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                                subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'} ${prayerTime ? `• ${prayerTime} WIB` : ''}`,
                                category: "Shalat Wajib",
                                status: "Menunggu",
                                points: isCongregation ? 25 : 10
                            });
                        });
                    }

                    // Process tadarus
                    if (data.tadarus && typeof data.tadarus === 'object') {
                        allActivities.push({
                            id: `${dateStr}-tadarus`,
                            date: formattedDate,
                            rawDate: dateStr,
                            rawTime: data.tadarus.submittedAt || '23:59:59',
                            time: data.tadarus.submittedAt ? `${data.tadarus.submittedAt.substring(0, 5)} WIB` : '-',
                            title: `Membaca Surat ${data.tadarus.surah}`,
                            subtitle: `Ayat ${data.tadarus.ayatStart} - ${data.tadarus.ayatEnd}`,
                            category: "Tadarus",
                            status: "Menunggu",
                            points: 50
                        });
                    }

                    // Process additional worships - handle both old (string) and new (object) format
                    if (data.additional && Array.isArray(data.additional)) {
                        const additionalLabels = {
                            'dhuha': { label: 'Sholat Dhuha', points: 15, category: 'Shalat Sunnah' },
                            'infaq': { label: 'Infaq / Sedekah', points: 10, category: 'Ibadah Lainnya' },
                            'help': { label: 'Membantu Orang Tua', points: 25, category: 'Ibadah Lainnya' }
                        };
                        data.additional.forEach((item, idx) => {
                            // Handle both string ID and object format
                            const isObject = typeof item === 'object' && item !== null;
                            const itemId = isObject ? item.id : item;
                            const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                            const info = additionalLabels[itemId] || { label: itemId, points: 10, category: 'Lainnya' };
                            allActivities.push({
                                id: `${dateStr}-additional-${idx}`,
                                date: formattedDate,
                                rawDate: dateStr,
                                rawTime: itemTime || '23:59:59',
                                time: itemTime ? `${itemTime.substring(0, 5)} WIB` : '-',
                                title: info.label,
                                subtitle: (isObject && item.note) ? item.note : 'Ibadah tambahan hari ini',
                                category: info.category,
                                status: "Menunggu",
                                points: info.points
                            });
                        });
                    }

                    // Process General Notes
                    if (data.notes) {
                        allActivities.push({
                            id: `${dateStr}-note`,
                            date: formattedDate,
                            rawDate: dateStr,
                            rawTime: data.submittedAt || '23:59:59',
                            time: data.submittedAt ? `${data.submittedAt.substring(0, 5)} WIB` : '-',
                            title: 'Catatan Tambahan',
                            subtitle: data.notes,
                            category: "Catatan",
                            status: "Disetujui",
                            points: 0
                        });
                    }
                }
            }

            // Sort by date and time (newest first - latest input on top)
            allActivities.sort((a, b) => {
                // First compare by date (newest date first)
                const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
                if (dateCompare !== 0) return dateCompare;

                // If same date, compare by time (latest time first)
                return b.rawTime.localeCompare(a.rawTime);
            });
            setActivities(allActivities);
        };

        loadActivities();
    }, []);

    // Filter activities
    const filteredActivities = filter === "Semua"
        ? activities
        : activities.filter(a => a.category === filter);

    // Pagination
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedActivities = filteredActivities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filter changes
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    // Calculate totals
    const totalPoints = activities.reduce((sum, a) => sum + a.points, 0);
    const thisMonthCount = activities.length;

    // Helper for Status Badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "Disetujui":
                return (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                        <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                        Disetujui
                    </span>
                );
            case "Menunggu":
                return (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                        <span className="material-symbols-outlined text-sm font-bold">schedule</span>
                        Menunggu
                    </span>
                );
            case "Ditolak":
                return (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                        <span className="material-symbols-outlined text-sm font-bold">cancel</span>
                        Ditolak
                    </span>
                );
            default:
                return null;
        }
    };

    // Helper for Category Badge Color - Fun and colorful for each type
    const getCategoryColor = (category) => {
        switch (category) {
            case "Shalat Wajib": return "text-teal-600 bg-teal-50 border-teal-200";
            case "Shalat Sunnah": return "text-purple-600 bg-purple-50 border-purple-200";
            case "Tadarus": return "text-amber-600 bg-amber-50 border-amber-200";
            case "Ibadah Lainnya": return "text-pink-600 bg-pink-50 border-pink-200";
            case "Catatan": return "text-blue-600 bg-blue-50 border-blue-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    // Get emoji for category
    const getCategoryEmoji = (category) => {
        switch (category) {
            case "Shalat Wajib": return "🕌";
            case "Shalat Sunnah": return "🌙";
            case "Tadarus": return "📖";
            case "Ibadah Lainnya": return "💝";
            case "Catatan": return "📝";
            default: return "✨";
        }
    };

    return (
        <div className="space-y-6">

            {/* Header Section - Fun for Kids */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div className="bg-gradient-to-r from-primary/5 to-emerald-50 p-6 rounded-2xl flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">📜</span>
                        <span className="text-xs font-bold text-primary tracking-widest uppercase">Catatan Kebaikanmu</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Riwayat Ibadahku ✨</h1>
                    <p className="text-gray-500 max-w-2xl leading-relaxed text-sm">
                        Lihat semua kebaikan yang sudah kamu lakukan! Setiap ibadah dicatat dan dihargai Allah SWT. 🤲
                    </p>
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 shadow-sm flex-1 lg:min-w-[160px]">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">⭐</span>
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Total Poin</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{totalPoints}</p>
                        <p className="text-xs text-amber-600 font-medium mt-1">Keren banget! 🎉</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 shadow-sm flex-1 lg:min-w-[160px]">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">📊</span>
                            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Kegiatan</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{thisMonthCount}</p>
                        <p className="text-xs text-purple-600 font-medium mt-1">Aktivitas tercatat</p>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

                {/* Controls */}
                <div className="p-6 border-b border-gray-100 space-y-4">
                    {/* Filter Tags */}
                    <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar">
                        <span className="text-sm font-bold text-gray-500 mr-2 shrink-0">🔍 Filter:</span>
                        {[
                            { id: "Semua", icon: "✨", label: "Semua" },
                            { id: "Shalat Wajib", icon: "🕌", label: "Shalat Wajib" },
                            { id: "Shalat Sunnah", icon: "🌙", label: "Shalat Sunnah" },
                            { id: "Tadarus", icon: "📖", label: "Tadarus" },
                            { id: "Ibadah Lainnya", icon: "💝", label: "Lainnya" },
                            { id: "Catatan", icon: "📝", label: "Catatan" }
                        ].map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => handleFilterChange(tag.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-1.5 ${filter === tag.id
                                    ? "bg-primary text-white border-primary shadow-md shadow-emerald-200 scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:scale-105"
                                    }`}
                            >
                                <span>{tag.icon}</span>
                                {tag.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table or Empty State */}
                {filteredActivities.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Belum Ada Riwayat</h3>
                        <p className="text-sm text-gray-500 mb-4">Yuk mulai catat ibadahmu! Setiap kebaikan pasti dicatat Allah 🤲</p>
                        <a href="/student/input" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors">
                            🚀 Mulai Lapor Ibadah
                        </a>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Tanggal & Waktu</th>
                                    <th className="text-left py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Kegiatan Ibadah</th>
                                    <th className="text-left py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Kategori</th>
                                    <th className="text-left py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="text-right py-4 px-6 text-xs font-extrabold text-gray-400 uppercase tracking-wider">Poin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedActivities.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">{item.date}</span>
                                                <span className="text-xs text-gray-400">{item.time}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">{item.title}</span>
                                                <span className="text-xs text-gray-400">{item.subtitle}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border inline-flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                                                <span>{getCategoryEmoji(item.category)}</span>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {getStatusBadge(item.status)}
                                        </td>
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <span className={`font-bold ${item.points > 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                                                {item.points > 0 ? `+${item.points}` : item.points}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {filteredActivities.length > itemsPerPage && (
                    <div className="p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
                        <p className="text-sm text-gray-500 font-medium">
                            Menampilkan <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredActivities.length)}</span> dari <span className="font-bold text-gray-900">{filteredActivities.length}</span> kegiatan
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${currentPage === page
                                        ? 'bg-primary text-white shadow-sm shadow-emerald-200'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200/50">
                <p className="text-xs text-gray-400 font-medium">
                    &copy; 2023 SD Plus 3 Al-Muhajirin. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">Kebijakan Privasi</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors font-medium">Bantuan</a>
                </div>
            </div>
            {/* Achievement Popup */}
            {showPopup && <AchievementPopup onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default HistoryDesktop;
