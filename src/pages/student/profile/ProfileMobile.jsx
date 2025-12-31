import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle, FaTrash } from "react-icons/fa";
import { BookOpen, User, Mail, Sparkles, Phone } from 'lucide-react';
import iconWarning from '../../../assets/icon_warning.png';

// Custom Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'danger' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const typeConfig = {
        danger: {
            icon: <FaTrash className="text-2xl text-rose-500" />,
            bg: 'bg-rose-50',
            confirmBg: 'bg-rose-500 active:bg-rose-600',
            confirmText: 'text-white'
        },
        success: {
            icon: <FaCheckCircle className="text-2xl text-emerald-500" />,
            bg: 'bg-emerald-50',
            confirmBg: 'bg-emerald-500 active:bg-emerald-600',
            confirmText: 'text-white'
        },
        warning: {
            icon: <FaExclamationTriangle className="text-2xl text-amber-500" />,
            bg: 'bg-amber-50',
            confirmBg: 'bg-amber-500 active:bg-amber-600',
            confirmText: 'text-white'
        }
    };

    const config = typeConfig[type] || typeConfig.danger;

    return (
        <div
            className={`fixed inset-0 z-[100] transition-all duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0'}`}
            onClick={onClose}
        >
            <div
                className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 bg-slate-300 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="px-6 pb-24 pt-4 text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${config.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        {config.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>

                    {/* Message */}
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm active:bg-slate-200 transition-colors"
                        >
                            {cancelText || 'Batal'}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className={`flex-1 py-3 rounded-xl ${config.confirmBg} ${config.confirmText} font-bold text-sm transition-colors`}
                        >
                            {confirmText || 'Ya, Lanjutkan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to load all activities from localStorage (same as Dashboard)
const loadAllActivities = () => {
    const allActivities = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('daily_report_')) {
            const dateStr = key.replace('daily_report_', '');
            const data = JSON.parse(localStorage.getItem(key));

            const dateObj = new Date(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const formattedDate = isToday ? 'Hari ini' : dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short'
            });

            // Process prayers
            if (data.prayers && Array.isArray(data.prayers)) {
                data.prayers.forEach((prayer, idx) => {
                    const isObject = typeof prayer === 'object' && prayer !== null;
                    const prayerId = isObject ? prayer.id : prayer;
                    const prayerTime = isObject && prayer.time ? prayer.time : null;
                    const isCongregation = isObject ? prayer.isCongregation : false;

                    allActivities.push({
                        id: `${dateStr}-prayer-${idx}`,
                        rawDate: dateStr,
                        rawTime: prayerTime || '00:00',
                        title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        time: `${formattedDate}${prayerTime ? `, ${prayerTime} WIB` : ''}`,
                        points: isCongregation ? 25 : 10,
                        icon: "mosque",
                        color: "bg-primary/10 text-primary"
                    });
                });
            }

            // Process tadarus
            if (data.tadarus && typeof data.tadarus === 'object') {
                allActivities.push({
                    id: `${dateStr}-tadarus`,
                    rawDate: dateStr,
                    rawTime: data.tadarus.submittedAt || '23:59',
                    title: `Membaca Surat ${data.tadarus.surah}`,
                    time: formattedDate,
                    points: 50,
                    icon: "menu_book",
                    color: "bg-amber-100 text-amber-600"
                });
            }

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                const additionalLabels = {
                    'dhuha': { label: 'Sholat Dhuha', icon: 'mosque', points: 15 },
                    'infaq': { label: 'Infaq / Sedekah', icon: 'volunteer_activism', points: 10 },
                    'help': { label: 'Bantu Orang Tua', icon: 'favorite', points: 25 }
                };
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                    const info = additionalLabels[itemId] || { label: itemId, icon: 'star', points: 10 };
                    allActivities.push({
                        id: `${dateStr}-additional-${idx}`,
                        rawDate: dateStr,
                        rawTime: itemTime || '23:59',
                        title: info.label,
                        time: `${formattedDate}${itemTime ? `, ${itemTime} WIB` : ''}`,
                        points: info.points,
                        icon: info.icon,
                        color: "bg-purple-100 text-purple-600"
                    });
                });
            }
        }
    }

    // Sort by date and time (newest first)
    allActivities.sort((a, b) => {
        const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
        if (dateCompare !== 0) return dateCompare;
        return b.rawTime.localeCompare(a.rawTime);
    });
    return allActivities;
};

const ProfileMobile = () => {
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({
        totalPoints: 0,
        totalActivities: 0,
        pointsIn: 0,
        pointsOut: 0,
        academicYearLabel: ''
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const studentInfo = {
        name: "Ahmad",
        fullName: "Ahmad Zaki",
        classRoom: "4B",
        className: "Kelas 4 Abu Bakar",
        nis: "12345678",
        teacher: "Ust. Abdullah"
    };

    useEffect(() => {
        const allActivities = loadAllActivities();
        setActivities(allActivities);

        const today = new Date();
        const currentMonth = today.getMonth(); // 0-11
        const currentYear = today.getFullYear();

        // Academic Year Logic (starts July 1st)
        // If current month is before July (0-5 i.e., Jan-Jun), start year is previous year
        const startYear = currentMonth < 6 ? currentYear - 1 : currentYear;
        const academicYearStart = new Date(`${startYear}-07-01`);
        const academicYearLabel = `${startYear}/${startYear + 1}`;

        // Filter activities for current academic year
        const academicActivities = allActivities.filter(a => new Date(a.rawDate) >= academicYearStart);

        // Calculate stats
        const totalPoints = academicActivities.reduce((sum, a) => sum + (a.points || 0), 0);
        const pointsIn = academicActivities.filter(a => (a.points || 0) > 0).reduce((sum, a) => sum + a.points, 0);
        const pointsOut = academicActivities.filter(a => (a.points || 0) < 0).reduce((sum, a) => sum + Math.abs(a.points), 0);

        setStats({
            totalPoints,
            totalActivities: academicActivities.length,
            pointsIn,
            pointsOut,
            academicYearLabel
        });
    }, []);

    const getLevel = (points) => {
        if (points >= 2000) return { level: 6, name: "Santri Teladan", nextLevel: 2500 };
        if (points >= 1500) return { level: 5, name: "Mujahid Cilik", nextLevel: 2000 };
        if (points >= 1000) return { level: 4, name: "Rajin Ibadah", nextLevel: 1500 };
        if (points >= 500) return { level: 3, name: "Pemula Taat", nextLevel: 1000 };
        if (points >= 200) return { level: 2, name: "Belajar Istiqomah", nextLevel: 500 };
        return { level: 1, name: "Pemula", nextLevel: 200 };
    };

    const levelInfo = getLevel(stats.totalPoints);

    // Badges logic (using mock data for structure mostly)
    const badges = [
        { id: 1, name: "Rajin Sholat", icon: "🕌", color: "bg-gradient-to-br from-amber-400 to-orange-500", locked: stats.totalActivities < 5 },
        { id: 2, name: "Pecinta Quran", icon: "📖", color: "bg-gradient-to-br from-blue-400 to-blue-600", locked: activities.filter(a => a.icon === 'menu_book').length < 3 },
        { id: 3, name: "Dermawan", icon: "💝", color: "bg-gradient-to-br from-pink-400 to-rose-500", locked: activities.filter(a => a.icon === 'volunteer_activism').length < 3 },
        { id: 4, name: "Shubuh Warrior", icon: "🌅", color: "bg-gradient-to-br from-purple-400 to-indigo-500", locked: true }, // Extra mock badge for scroll demo
    ];

    // Handle reset data - opens modal
    const handleResetData = () => {
        setShowConfirmModal(true);
    };

    // Execute the actual reset
    const executeResetData = () => {
        // Collect all keys to remove
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('daily_report_') || key.startsWith('daily_achievement_') || key.startsWith('teacher_note_seen_') || key === 'notification_last_read_count')) {
                keysToRemove.push(key);
            }
        }

        // Remove all collected keys
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Close modal and reload
        setShowConfirmModal(false);
        window.location.reload();
    };

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth overscroll-none bg-[#EEF7FF] font-sans relative animate-fade-in pb-32">
            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

            {/* Header - Native Style */}
            <div className="sticky top-0 z-[60] bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between transition-all duration-300">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="w-10 h-10 rounded-full bg-white/50 active:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                    >
                        <FaArrowLeft className="text-sm" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 leading-tight flex items-center gap-1">
                            <span className="text-xl">👋</span>
                            Hai {studentInfo.name}!
                        </h1>
                        <p className="text-xs text-blue-600 font-medium">Ini profil dan pencapaianmu. ✨</p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/settings')}
                    className="w-10 h-10 rounded-full text-slate-600 active:bg-white/50 flex items-center justify-center transition-colors"
                >
                    <span className="material-symbols-outlined notranslate text-xl">settings</span>
                </button>
            </div>

            <div className="px-5 mt-6 space-y-6 relative z-10">

                {/* Profile Card - Large & Clean */}
                <div className="flex flex-col items-center animate-fade-in-up">
                    <div className="relative mb-3 group">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-emerald-400 shadow-xl shadow-primary/20 ring-4 ring-white relative z-10 overflow-hidden">
                            <img src="/avatars/dani.png" alt={studentInfo.fullName} className="w-full h-full object-cover" style={{ objectPosition: 'center 35%' }} />
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute 0 -bottom-1 -right-1 bg-white p-1.5 rounded-full z-20 shadow-sm">
                            <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="material-symbols-outlined notranslate text-xs text-white font-bold">check</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900 text-center tracking-tight mb-2">{studentInfo.fullName}</h2>
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mt-0">
                        <span className="px-3.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                            {studentInfo.className}
                        </span>
                        <span className="px-3.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                            NIS: {studentInfo.nis}
                        </span>
                    </div>
                </div>

                {/* Total Points Card - Mobile Dashboard Style */}
                {/* Total Points Card - Mobile Dashboard Style */}
                <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    {/* White glow effects */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/30 to-transparent rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-16 -mb-16"></div>
                    <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

                    {(() => {
                        // Embedded Level Logic akin to Dashboard
                        const levelThresholds = [0, 100, 300, 600, 1000, 1500];
                        const levelNames = ['Pemula', 'Rajin', 'Bintang Ibadah', 'Mujahid', 'Hafidz Cilik', 'Master'];
                        const levelBadges = ['🌱', '⭐', '🌟', '🏅', '🏆', '👑'];

                        let currentLevel = 0;
                        for (let i = levelThresholds.length - 1; i >= 0; i--) {
                            if (stats.totalPoints >= levelThresholds[i]) {
                                currentLevel = i;
                                break;
                            }
                        }

                        const levelName = levelNames[currentLevel];
                        // const levelBadge = levelBadges[currentLevel]; // Unused variable removed

                        const currentThreshold = levelThresholds[currentLevel];
                        const nextThreshold = levelThresholds[Math.min(currentLevel + 1, levelThresholds.length - 1)];
                        const pointsInLevel = stats.totalPoints - currentThreshold;
                        const pointsNeeded = nextThreshold - currentThreshold;
                        const progressPercent = pointsNeeded > 0 ? Math.min((pointsInLevel / pointsNeeded) * 100, 100) : 100;

                        return (
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs text-blue-100 font-medium mb-1">Total Poin Kamu</p>
                                        <h1 className="text-4xl font-black text-white flex items-center gap-2">
                                            {stats.totalPoints.toLocaleString()} <span className="text-amber-300 text-3xl">★</span>
                                        </h1>
                                    </div>
                                    {/* Academic Year Badge */}
                                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined notranslate text-sm">school</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-blue-100 font-medium leading-none mb-0.5">Tahun Ajaran</span>
                                            <span className="text-[10px] font-bold text-white leading-none">{stats.academicYearLabel}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Level badge */}
                                <div className="mt-3 mb-3">
                                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                                        <span className="text-sm">🏆</span>
                                        <span className="text-xs font-bold text-white">Level: {levelName}</span>
                                    </div>
                                </div>

                                {/* Progress bar to next level */}
                                <div className="bg-white/15 rounded-full p-0.5">
                                    <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-amber-300 to-yellow-400 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${progressPercent}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-1.5">
                                    <span className="text-[10px] text-blue-100">{pointsInLevel} / {pointsNeeded} ke level berikutnya</span>
                                    <span className="text-[10px] text-blue-100 font-bold">{Math.round(progressPercent)}%</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    {/* Prestasi Card - Vibrant Green */}
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3.5 rounded-3xl flex items-center gap-2.5 relative overflow-hidden shadow-lg shadow-emerald-200/50 active:scale-[0.98] transition-all group">
                        <div className="absolute right-0 top-0 w-20 h-20 bg-white/20 rounded-full -mr-8 -mt-8 blur-sm"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-black/5 rounded-full -ml-4 -mb-4"></div>

                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0 z-10">
                            <span className="text-2xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform">🏆</span>
                        </div>

                        <div className="flex flex-col z-10 min-w-0">
                            <span className="text-[9px] font-bold text-emerald-50 uppercase tracking-wider truncate opacity-90">Prestasi</span>
                            <span className="text-xl font-black text-white leading-none tracking-tight drop-shadow-sm">+{stats.pointsIn}</span>
                        </div>
                    </div>

                    {/* Pelanggaran Card - Vibrant Red */}
                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-3.5 rounded-3xl flex items-center gap-2.5 relative overflow-hidden shadow-lg shadow-rose-200/50 active:scale-[0.98] transition-all group">
                        <div className="absolute right-0 top-0 w-20 h-20 bg-white/20 rounded-full -mr-8 -mt-8 blur-sm"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-black/5 rounded-full -ml-4 -mb-4"></div>

                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 shrink-0 z-10">
                            <span className="text-2xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform">⚠️</span>
                        </div>

                        <div className="flex flex-col z-10 min-w-0">
                            <span className="text-[9px] font-bold text-rose-50 uppercase tracking-wider truncate opacity-90">Pelanggaran</span>
                            <span className="text-xl font-black text-white leading-none tracking-tight drop-shadow-sm">-{stats.pointsOut}</span>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="animate-fade-in-up space-y-2 opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-gray-900 text-sm">Koleksi Badge</h3>
                        <span className="text-[10px] font-semibold text-gray-500">{badges.filter(b => !b.locked).length} / {badges.length} Terbuka</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
                        {badges.map((badge) => (
                            <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-1.5 w-[64px] ${badge.locked ? 'opacity-50 grayscale' : ''}`}>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 ${badge.locked ? 'bg-gray-100' : 'bg-white'}`}>
                                    <span className="text-2xl">{badge.locked ? '🔒' : badge.icon}</span>
                                </div>
                                <span className="text-[9px] font-medium text-center text-gray-600 leading-tight line-clamp-2">
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu List - Native iOS Style */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <div
                        onClick={() => navigate('/student/history')}
                        className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">history_edu</span>
                            </div>
                            <span className="text-sm font-bold text-gray-800">Jejak Kebaikan 📜</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
                    </div>

                    <div
                        onClick={() => navigate('/student/leaderboard')}
                        className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">military_tech</span>
                            </div>
                            <span className="text-sm font-bold text-gray-800">Lihat Teman 🏆</span>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-lg">chevron_right</span>
                    </div>
                </div>

                {/* Reset Data Button (Development Only) */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <button
                        type="button"
                        onClick={handleResetData}
                        className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                                <span className="material-symbols-outlined notranslate text-lg">delete_sweep</span>
                            </div>
                            <div className="text-left">
                                <span className="text-sm font-semibold text-gray-800 block">Reset Data Ibadah</span>
                                <span className="text-[10px] text-gray-400">Hapus semua riwayat (untuk testing)</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined notranslate text-gray-400 text-lg">chevron_right</span>
                    </button>
                </div>

                {/* Logout Button */}
                <div className="px-6 pb-8 mt-4">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="group w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold active:scale-[0.96] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-rose-300/40 hover:shadow-xl hover:shadow-rose-300/50 outline-none ring-0 border-none"
                    >
                        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-colors group-hover:bg-white/30">
                            <span className="material-symbols-outlined notranslate text-base group-hover:-translate-x-0.5 transition-transform text-white">logout</span>
                        </div>
                        <span className="text-xs tracking-wide">Keluar Akun</span>
                    </button>
                    <button
                        onClick={() => setShowAboutModal(true)}
                        className="w-full text-center mt-6 group"
                    >
                        <p className="text-[10px] text-slate-300 font-medium tracking-widest uppercase opacity-60 group-hover:text-blue-500 group-hover:opacity-100 transition-all underline decoration-dotted underline-offset-4">
                            Versi Aplikasi 1.0.0
                        </p>
                    </button>
                </div>

            </div>

            {/* Confirm Logout Modal */}
            <ConfirmModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => navigate('/')}
                title="Keluar Akun?"
                message="Kamu akan kembali ke halaman login. Lanjutkan?"
                confirmText="Ya, Keluar"
                cancelText="Batal"
                type="danger"
            />

            {/* Confirm Reset Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={executeResetData}
                title="Hapus Semua Data?"
                message="Semua riwayat ibadah dan pencapaian akan dihapus permanen. Tindakan ini tidak bisa dibatalkan."
                confirmText="Ya, Hapus"
                cancelText="Batal"
                type="danger"
            />

            {/* Elegant About App Modal */}
            {showAboutModal && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in pb-20"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowAboutModal(false);
                    }}
                >
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm max-h-[75vh] flex flex-col relative animate-pop-in overflow-hidden ring-1 ring-black/5">
                        {/* Header with Premium Gradient */}
                        <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-6 text-center relative shrink-0 overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-300/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                            {/* Close Button - Glass style */}
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-all active:scale-90 border border-white/10"
                            >
                                <span className="material-symbols-outlined notranslate text-lg">close</span>
                            </button>

                            <div className="relative z-10 flex flex-col items-center mt-2">
                                <div className="w-16 h-16 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-3 shadow-xl ring-1 ring-white/30 border border-white/20">
                                    <BookOpen size={32} className="text-white drop-shadow-md" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-white text-2xl font-black tracking-tight mb-1 drop-shadow-sm">
                                    Buku Lail Online
                                </h3>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/30 backdrop-blur-md rounded-full border border-white/20 shadow-inner">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                    </span>
                                    <span className="text-emerald-50 text-[10px] font-bold tracking-widest uppercase">Versi 1.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 space-y-5 overflow-y-auto no-scrollbar bg-slate-50/50">

                            {/* Tech Stack - Floating Cards */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-slate-200 rounded-full"></span>
                                    Powered By
                                </h4>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {[
                                        { name: 'React', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-4 h-4" /> },
                                        { name: 'Vite', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" className="w-4 h-4" /> },
                                        { name: 'Tailwind', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="w-4 h-4" /> },
                                        { name: 'Lucide', icon: <Sparkles size={16} className="text-amber-500" /> }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                                            <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                                {item.icon}
                                            </div>
                                            <span className="text-slate-600 font-bold text-xs">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Developer Profile - Premium Card */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2.5 flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-slate-200 rounded-full"></span>
                                    Creator
                                </h4>
                                <div className="bg-white rounded-3xl p-4 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-10 -mt-10"></div>

                                    <div className="flex items-center gap-3.5 mb-4 relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h5 className="text-slate-800 font-black text-sm">Dani Ramdani, S.Kom</h5>
                                            <p className="text-blue-500 text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-0.5">Full Stack Developer</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 relative z-10">
                                        <a href="mailto:dhany46@gmail.com" className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors group/link border border-transparent hover:border-blue-100">
                                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover/link:text-blue-500 transition-colors">
                                                <Mail size={14} />
                                            </div>
                                            <span className="text-[11px] font-bold">dhany46@gmail.com</span>
                                        </a>
                                        <a href="https://wa.me/6283820374734" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors group/link border border-transparent hover:border-emerald-100">
                                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover/link:text-emerald-500 transition-colors">
                                                <Phone size={14} />
                                            </div>
                                            <span className="text-[11px] font-bold">0838-2037-4734</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3.5 rounded-2xl text-center shadow-lg shadow-emerald-200/50">
                                <p className="text-white/90 text-[10px] font-medium italic leading-relaxed">
                                    "Didedikasikan sebagai wujud khidmat untuk kemajuan dan digitalisasi pendidikan Islam."
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-slate-300 hover:shadow-slate-400 active:scale-[0.98]"
                            >
                                Tutup Panel
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ProfileMobile;
