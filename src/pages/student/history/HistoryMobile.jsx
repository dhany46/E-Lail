import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaMosque,
    FaBookOpen,
    FaStar,
    FaHandHoldingHeart,
    FaHeart,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaRocket,
    FaTrophy,
    FaChalkboardTeacher,
    FaStickyNote,
    FaCalendarAlt,
    FaFilter,
    FaArrowLeft,
    FaBell,
    FaChevronDown,
    FaChevronUp,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
    FaCheck,
    FaCloudSun,
    FaCloudMoon,
    FaDonate
} from "react-icons/fa";
import { MdVerified, MdCampaign, MdNotificationsOff } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";

const AchievementPopup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    // Confetti pieces
    const confettiColors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-blue-400', 'bg-purple-400'];
    const confettiPieces = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        color: confettiColors[i % confettiColors.length],
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${1.5 + Math.random()}s`
    }));

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'bg-black/40 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
            <div
                className={`bg-gradient-to-br from-white to-emerald-50 rounded-[2.5rem] p-8 shadow-2xl max-w-sm w-full relative text-center overflow-hidden border border-white/60 transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}
            >
                {/* Premium Background Effects */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 bg-emerald-100/50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-40 bg-amber-100/50 rounded-full blur-3xl animate-pulse delay-700"></div>

                {/* Confetti Animation */}
                {confettiPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className={`absolute top-0 size-2 rounded-full ${piece.color} animate-confetti`}
                        style={{
                            left: piece.left,
                            animationDelay: piece.animationDelay,
                            animationDuration: piece.animationDuration
                        }}
                    ></div>
                ))}

                <div className={`relative z-10 size-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-100 transform transition-all duration-700 delay-200 border border-white ${isVisible ? 'scale-100 rotate-3' : 'scale-0 -rotate-180'}`}>
                    <FaTrophy className="text-6xl text-amber-500 drop-shadow-sm filter" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">+50 XP</div>
                </div>

                <div className={`relative z-10 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Luar Biasa! 🌟</h2>
                    <p className="text-slate-600 mb-8 text-sm leading-relaxed font-medium">
                        Masya Allah! Kamu telah menyelesaikan <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50">8 Misi Kebaikan</span> hari ini. Istiqomah terus ya!
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className={`relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                    Alhamdulillah 🤲
                </button>
            </div>
        </div>
    );
};

// Native-style Calendar Picker Component
const CalendarPicker = ({ isOpen, onClose, selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for Monday start (0 = Mon, 6 = Sun)
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onDateSelect(dateStr);
        onClose();
    };

    const isToday = (day) => {
        return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return dateStr === selectedDate;
    };

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
                <div className="flex justify-center pt-2 pb-1">
                    <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <button onClick={onClose} className="text-sm font-medium text-slate-500">Batal</button>
                    <h3 className="text-sm font-bold text-slate-800">Pilih Tanggal</h3>
                    <button
                        onClick={() => {
                            onDateSelect('');
                            onClose();
                        }}
                        className="text-sm font-medium text-rose-500"
                    >
                        Reset
                    </button>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between px-4 py-2">
                    <button
                        onClick={handlePrevMonth}
                        className="size-8 rounded-full bg-slate-100 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <FaChevronLeft className="text-slate-600 text-xs" />
                    </button>
                    <h4 className="text-sm font-bold text-slate-800">{monthNames[month]} {year}</h4>
                    <button
                        onClick={handleNextMonth}
                        className="size-8 rounded-full bg-slate-100 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <FaChevronRight className="text-slate-600 text-xs" />
                    </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 px-4">
                    {dayNames.map(day => (
                        <div key={day} className="text-center py-1 text-[10px] font-bold text-slate-400">{day}</div>
                    ))}
                </div>

                {/* Calendar Grid - Compact */}
                <div className="grid grid-cols-7 px-4 pb-3">
                    {/* Empty cells before first day */}
                    {Array.from({ length: startDay }, (_, i) => (
                        <div key={`empty-${i}`} className="h-9"></div>
                    ))}

                    {/* Day cells */}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const isTodayDate = isToday(day);
                        const isSelectedDate = isSelected(day);

                        return (
                            <button
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`h-9 flex items-center justify-center m-0.5 rounded-lg text-xs font-semibold transition-all active:scale-90 ${isSelectedDate
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                    : isTodayDate
                                        ? 'bg-blue-100 text-blue-600 font-bold'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>

                {/* Quick Actions - Compact */}
                <div className="px-4 pb-24 pt-1 flex gap-2">
                    <button
                        onClick={() => {
                            const todayStr = today.toISOString().split('T')[0];
                            onDateSelect(todayStr);
                            onClose();
                        }}
                        className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs active:scale-95 transition-transform"
                    >
                        Hari Ini
                    </button>
                    <button
                        onClick={() => {
                            const yesterday = new Date(today);
                            yesterday.setDate(yesterday.getDate() - 1);
                            onDateSelect(yesterday.toISOString().split('T')[0]);
                            onClose();
                        }}
                        className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs active:scale-95 transition-transform"
                    >
                        Kemarin
                    </button>
                </div>
            </div>
        </div>
    );
};

const HistoryHeader = ({ verifiedActivities, teacherNote }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/student/dashboard')}
                    className="size-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <FaArrowLeft className="text-lg" />
                </button>
                <div>
                    <h1 className="text-xl font-extrabold text-slate-800">Riwayat Ibadahku ✨</h1>
                    <p className="text-xs text-blue-500 font-medium">Lihat semua kebaikan yang sudah kamu lakukan! 🤲</p>
                </div>
            </div>
        </div>
    );
};

// Hero Stats Component - Fun & Colorful for Kids
const HeroStats = ({ stats }) => {
    const totalPoints = stats?.totalPoints || 0;
    const monthCount = stats?.monthCount || 0;

    // Calculate Monthly Target (approx days in month * daily target)
    // Using 30 days * 5 daily target (default) = 150 approx, or dynamically
    const dailyTarget = stats?.targetDaily || 5;
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const monthlyTarget = daysInMonth * dailyTarget;

    // Simple level logic for display
    const levelThresholds = [0, 100, 300, 600, 1000, 1500];
    const levelNames = ['Pemula', 'Rajin', 'Bintang', 'Juara', 'Hebat', 'Master'];
    let currentLevel = 0;
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (totalPoints >= levelThresholds[i]) {
            currentLevel = i;
            break;
        }
    }
    const levelName = levelNames[currentLevel];

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Card 1: Bintangku (Points) - Fun & Playful Orange */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-400 p-3.5 shadow-lg shadow-orange-200/50 group hover:scale-[1.02] transition-all duration-500">
                {/* Fun Background Blobs matching Misi Harianku style */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-6 -mt-6 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200/20 rounded-full -ml-6 -mb-6 blur-xl"></div>

                {/* Floating Icons */}
                <FaStar className="absolute top-4 right-8 text-white/20 text-sm animate-spin-slow" />
                <FaTrophy className="absolute bottom-3 right-3 text-white/10 text-2xl -rotate-12" />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[90px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="size-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20 ring-1 ring-white/10">
                            <span className="text-base drop-shadow-sm">⭐</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-white/20 border border-white/20 backdrop-blur-md shadow-sm flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white tracking-wide uppercase">{levelName}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-orange-50 uppercase tracking-wider mb-0.5 opacity-90">Total Poin</p>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                            {totalPoints.toLocaleString()}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Card 2: Ibadahku (Activities) - Fun & Playful Purple */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-violet-500 p-3.5 shadow-lg shadow-purple-200/50 group hover:scale-[1.02] transition-all duration-500">
                {/* Fun Background Blobs */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-6 -mt-6 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-fuchsia-300/20 rounded-full -ml-6 -mb-6 blur-xl"></div>

                {/* Floating Icons */}
                <FaMosque className="absolute top-3 right-8 text-white/20 text-sm" />
                <FaHeart className="absolute bottom-4 right-4 text-white/10 text-xl rotate-12 animate-pulse" />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[90px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="size-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20 ring-1 ring-white/10">
                            <span className="text-base drop-shadow-sm">🕌</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-white/20 border border-white/20 backdrop-blur-md shadow-sm flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white tracking-wide uppercase">Bulan Ini</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-indigo-50 uppercase tracking-wider mb-0.5 opacity-90">Total Ibadah</p>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                            {monthCount}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HistoryMobile = () => {
    const navigate = useNavigate();
    // Load activities from localStorage with lazy initialization to prevent flash
    const [activities, setActivities] = useState(() => {
        const allActivities = [];
        // Get all localStorage keys that match our pattern
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('daily_report_')) {
                const dateStr = key.replace('daily_report_', '');
                let data = null;
                try {
                    data = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    continue;
                }

                if (!data) continue;

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
                            subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'}${prayerTime ? ` • ${prayerTime.replace(' WIB', '').replace('WIB', '')} WIB` : ''}`,
                            category: "Shalat Wajib",
                            status: "Menunggu",
                            points: isCongregation ? 25 : 10,
                            icon: <FaMosque className="text-xl" />,
                            color: 'text-teal-600',
                            bg: 'bg-teal-50'
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
                        points: 50,
                        icon: <FaBookOpen className="text-xl" />,
                        color: 'text-amber-600',
                        bg: 'bg-amber-50'
                    });
                }

                // Process additional worships - handle both old (string) and new (object)
                if (data.additional && Array.isArray(data.additional)) {
                    const additionalLabels = {
                        'dhuha': { label: 'Sholat Dhuha', points: 15, category: 'Shalat Sunnah', icon: <FaCloudSun className="text-xl" /> },
                        'infaq': { label: 'Infaq / Sedekah', points: 10, category: 'Ibadah Lainnya', icon: <BiSolidDonateHeart className="text-xl" /> },
                        'help': { label: 'Bantu Orang Tua', points: 25, category: 'Ibadah Lainnya', icon: <FaHeart className="text-xl" /> }
                    };
                    data.additional.forEach((item, idx) => {
                        // Handle both string ID and object format
                        const isObject = typeof item === 'object' && item !== null;
                        const itemId = isObject ? item.id : item;
                        const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                        const info = additionalLabels[itemId] || { label: itemId, points: 10, category: 'Lainnya', icon: <FaStar className="text-xl" /> };
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
                            points: info.points,
                            icon: info.icon,
                            color: itemId === 'dhuha' ? 'text-purple-600' : 'text-pink-600',
                            bg: itemId === 'dhuha' ? 'bg-purple-50' : 'bg-pink-50'
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
                        points: 0,
                        icon: <FaStickyNote className="text-xl" />,
                        color: 'text-blue-600',
                        bg: 'bg-blue-50'
                    });
                }
            }
        }

        // Sort by date and time (newest first - latest input on top)
        allActivities.sort((a, b) => {
            const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
            if (dateCompare !== 0) return dateCompare;
            return b.rawTime.localeCompare(a.rawTime);
        });
        return allActivities;
    });

    const [filter, setFilter] = useState("Semua");
    const [stats, setStats] = useState({ totalPoints: 0, todayPoints: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [expandedCards, setExpandedCards] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const filterOptions = [
        { id: "Semua", label: "Semua", icon: "✨", color: "text-blue-600", bg: "bg-blue-50" },
        { id: "Shalat Wajib", label: "Wajib", icon: "🕌", color: "text-emerald-600", bg: "bg-emerald-50" },
        { id: "Shalat Sunnah", label: "Sunnah", icon: "🌙", color: "text-purple-600", bg: "bg-purple-50" },
        { id: "Tadarus", label: "Al-Qur'an", icon: "📖", color: "text-amber-600", bg: "bg-amber-50" },
        { id: "Poin Guru", label: "Dari Guru", icon: "👨‍🏫", color: "text-indigo-600", bg: "bg-indigo-50" },
        { id: "Catatan", label: "Lainnya", icon: "📝", color: "text-rose-600", bg: "bg-rose-50" }
    ];

    // Calculate today's progress - count ALL activities for today (matching desktop logic)
    const todayDate = new Date();
    const today = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
    const todayActivitiesCount = activities.filter(a => a.rawDate === today).length;
    const dailyTarget = 8;
    const progressPercent = Math.min((todayActivitiesCount / dailyTarget) * 100, 100);

    // Toggle card expansion
    const toggleCardExpansion = (cardId) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

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
                            // Header Time = Input Time (submittedAt)
                            const headerTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');
                            // Description Time = Actual Prayer Time
                            const descTime = prayerTime ? prayerTime.replace(' WIB', '').replace('WIB', '') : (submittedAt ? submittedAt.substring(0, 5) : '-');

                            allActivities.push({
                                id: `${dateStr}-prayer-${idx}`,
                                date: formattedDate,
                                rawDate: dateStr,
                                rawTime: submittedAt || prayerTime || '00:00', // Sort by input time usually
                                time: `${headerTime} WIB`,
                                title: `Shalat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                                subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'} • ${descTime} WIB`,
                                category: "Shalat Wajib",
                                status: "Menunggu",
                                points: isCongregation ? 25 : 10,
                                icon: <FaMosque className="text-xl" />,
                                color: 'text-teal-600',
                                bg: 'bg-teal-50'
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
                            points: 50,
                            icon: <FaBookOpen className="text-xl" />,
                            color: 'text-amber-600',
                            bg: 'bg-amber-50'
                        });
                    }

                    // Process additional worships - handle both old (string) and new (object)
                    if (data.additional && Array.isArray(data.additional)) {
                        const additionalLabels = {
                            'dhuha': { label: 'Sholat Dhuha', points: 15, category: 'Shalat Sunnah', icon: <FaCloudSun className="text-xl" /> },
                            'infaq': { label: 'Infaq', points: 10, category: 'Ibadah Lainnya', icon: <BiSolidDonateHeart className="text-xl" /> },
                            'help': { label: 'Bantu Ortu', points: 25, category: 'Ibadah Lainnya', icon: <FaHeart className="text-xl" /> }
                        };
                        data.additional.forEach((item, idx) => {
                            // Handle both string ID and object format
                            const isObject = typeof item === 'object' && item !== null;
                            const itemId = isObject ? item.id : item;
                            const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                            const info = additionalLabels[itemId] || { label: itemId, points: 10, category: 'Lainnya', icon: <FaStar className="text-xl" /> };
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
                                points: info.points,
                                icon: info.icon,
                                color: itemId === 'dhuha' ? 'text-purple-600' : 'text-pink-600',
                                bg: itemId === 'dhuha' ? 'bg-purple-50' : 'bg-pink-50'
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
                            points: 0,
                            icon: <FaStickyNote className="text-xl" />,
                            color: 'text-blue-600',
                            bg: 'bg-blue-50'
                        });
                    }
                }
            }

            // Sort by date and time (newest first - latest input on top)
            allActivities.sort((a, b) => {
                const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
                if (dateCompare !== 0) return dateCompare;
                return b.rawTime.localeCompare(a.rawTime);
            });
            setActivities(allActivities);
        };

        loadActivities();
    }, []);

    // Calculate stats
    useEffect(() => {
        const totalPoints = activities.reduce((sum, a) => sum + a.points, 0);

        // Calculate monthly activity count
        const now = new Date();
        // Use local time instead of UTC (toISOString) to ensure correct month match
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const currentMonthPrefix = `${year}-${month}`; // YYYY-MM

        const monthCount = activities.filter(a => a.rawDate.startsWith(currentMonthPrefix)).length;

        setStats({ totalPoints, monthCount });
    }, [activities]);

    // Check for achievement
    useEffect(() => {
        if (activities.length === 0) return;

        // Use Local Date (en-CA gives YYYY-MM-DD) to match storage keys
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;

        // Count ALL activities for today
        const todayCount = activities.filter(a => a.rawDate === today).length;

        const achievementKey = `daily_achievement_${today}`;
        const hasShownAchievement = localStorage.getItem(achievementKey);

        // Debug log - temporarily enabled for testing
        // console.log("🎯 Achievement Check:", { today, todayCount, hasShownAchievement, activitiesLength: activities.length });

        // Show popup when daily target (8 activities) is reached
        if (todayCount >= 8 && !hasShownAchievement) {
            // Small delay to ensure UI is ready
            const timer = setTimeout(() => {
                // console.log("🎉 Showing achievement popup!");
                setShowPopup(true);
                localStorage.setItem(achievementKey, 'true');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [activities]);

    // Filter activities
    const filteredActivities = activities.filter(a => {
        // Filter by Category
        const matchCategory = filter === "Semua" || a.category === filter;

        // Filter by Date
        const matchDate = dateFilter === '' || a.rawDate === dateFilter;

        return matchCategory && matchDate;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

    // Group activities by date
    const groupedActivities = paginatedActivities.reduce((groups, activity) => {
        const date = activity.rawDate;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {});

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, dateFilter]);

    const getStatusConfig = (status) => {
        if (status === 'Terverifikasi' || status === 'Disetujui') {
            return {
                icon: <FaCheckCircle className="text-base" />,
                color: 'text-emerald-500',
                bg: 'bg-emerald-50',
                label: 'Terverifikasi'
            };
        } else if (status === 'Ditolak') {
            return {
                icon: <FaTimesCircle className="text-base" />,
                color: 'text-red-500',
                bg: 'bg-red-50',
                label: 'Ditolak'
            };
        }
        return {
            color: 'text-yellow-600',
            label: 'Menunggu',
            isPending: true
        };
    };


    const getActivityConfig = (category, title) => {
        if (category === 'Shalat Wajib') return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaMosque className="text-xl" /> };
        if (category === 'Shalat Sunnah') return { bg: 'bg-purple-50', color: 'text-purple-600', icon: <FaCloudMoon className="text-xl" /> };
        if (category === 'Tadarus' || category === 'Hafalan') return { bg: 'bg-emerald-50', color: 'text-emerald-600', icon: <FaBookOpen className="text-xl" /> };
        if (title.toLowerCase().includes('infaq') || title.toLowerCase().includes('shodaqoh')) return { bg: 'bg-green-50', color: 'text-green-600', icon: <BiSolidDonateHeart className="text-xl" /> };
        if (category === 'Catatan' || title.toLowerCase().includes('bantu')) return { bg: 'bg-orange-50', color: 'text-orange-600', icon: <FaHeart className="text-xl" /> };
        return { bg: 'bg-slate-50', color: 'text-slate-600', icon: <FaStar className="text-xl" /> };
    };

    // Helper to safely format date
    const formatDateFull = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            // Check if valid
            if (isNaN(date.getTime())) return dateStr;

            return date.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    // Derived state for notifications
    const verifiedActivities = activities.filter(a => a.status === 'Terverifikasi' || a.status === 'Disetujui');

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth overscroll-none bg-[#EEF7FF] font-sans relative pb-28">
            {/* Achievement Popup */}
            {showPopup && <AchievementPopup onClose={() => setShowPopup(false)} />}

            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

            {/* Header - Only title */}
            <div className="px-6 py-4 sticky top-0 bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-[60] border-b border-slate-200">
                <HistoryHeader verifiedActivities={verifiedActivities} />
            </div>

            <div className="space-y-5 relative z-10 px-6 mt-6">
                {/* Daily Target Progress Card - Fun & Theme Aligned */}
                <div className="bg-gradient-to-tr from-blue-400 via-blue-500 to-sky-500 rounded-3xl p-5 shadow-xl shadow-blue-200/50 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-300/20 rounded-full -ml-8 -mb-8 blur-xl"></div>

                    {/* Floating Icons Background */}
                    <FaStar className="absolute top-4 right-12 text-white/10 text-xl animate-pulse" />
                    <FaRocket className="absolute bottom-8 right-4 text-white/10 text-2xl rotate-12" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex items-center gap-3.5">
                                <div className="size-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 ring-2 ring-white/10">
                                    <FaRocket className="text-2xl text-yellow-300 drop-shadow-sm animate-bounce-slow" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-white tracking-wide drop-shadow-sm">Misi Harianmu</h3>
                                    <p className="text-[11px] font-bold text-blue-50 bg-blue-800/20 px-2.5 py-0.5 rounded-full mt-1 border border-white/10 inline-block">
                                        Kumpulkan 8 Kebaikan! ✨
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black tracking-tight">{todayActivitiesCount}</span>
                                    <span className="text-sm font-bold opacity-80">/ {dailyTarget}</span>
                                </div>
                                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-lg backdrop-blur-sm mt-0.5">
                                    {progressPercent === 100 ? 'Sempurna! 🌟' : 'Semangat! 🔥'}
                                </span>
                            </div>
                        </div>

                        {/* Custom Fun Progress Bar */}
                        <div className="relative pt-1">
                            <div className="bg-black/20 rounded-full h-4 backdrop-blur-sm overflow-hidden border border-white/10 shadow-inner p-0.5">
                                <div
                                    className="bg-gradient-to-r from-yellow-300 to-amber-400 h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(253,224,71,0.5)]"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.4)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)50%,rgba(255,255,255,0.4)75%,transparent_75%,transparent)] bg-[length:12px_12px] animate-[progress-stripes_1s_linear_infinite]"></div>
                                </div>
                            </div>
                            {/* Milestone Markers */}
                            <div className="absolute top-1 w-full h-4 flex justify-between px-[1%] pointer-events-none left-0 p-0.5">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <div key={i} className={`w-0.5 h-full rounded-full ${i <= todayActivitiesCount ? 'bg-white/0' : 'bg-white/20 mx-auto'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Stats (Bintangku & Ibadahku) */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <HeroStats stats={{ totalPoints: stats.totalPoints, monthCount: stats.monthCount, targetDaily: dailyTarget }} />
                </div>

                {/* Riwayat Container */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 mb-8 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    {/* Filter Header */}
                    <div className="relative border-b border-slate-100 bg-slate-50/50">
                        <div className="flex">
                            {/* Date Filter Trigger */}
                            <div className="relative z-30 w-fit shrink-0 border-r border-slate-100">
                                <button
                                    onClick={() => {
                                        setIsFilterOpen(false);
                                        setIsCalendarOpen(true);
                                    }}
                                    className={`h-full px-5 py-4 flex items-center gap-2 transition-colors relative ${dateFilter ? 'bg-green-50 text-green-600 pr-9' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <FaCalendarAlt className={`text-lg transition-transform ${dateFilter ? 'scale-110' : ''}`} />
                                    {dateFilter && (
                                        <span className="text-xs font-bold whitespace-nowrap">
                                            {new Date(dateFilter).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </span>
                                    )}
                                </button>

                                {dateFilter && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDateFilter('');
                                        }}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 size-5 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 transition-colors pointer-events-auto z-[60]"
                                    >
                                        <FaTimes className="text-[10px] font-bold" />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter Trigger */}
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex-1 px-5 py-4 flex items-center justify-between transition-all active:bg-slate-50 relative z-20 outline-none"
                            >
                                <div className="flex items-center gap-2.5 truncate">
                                    <div className="size-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <FaFilter className="text-xs" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Filter</span>
                                    <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                                    <div className={`flex items-center gap-1.5 text-sm font-bold truncate ${filterOptions.find(opt => opt.id === filter)?.color || 'text-primary'
                                        }`}>
                                        <span className="text-base leading-none">
                                            {filterOptions.find(opt => opt.id === filter)?.icon}
                                        </span>
                                        <span className="truncate">
                                            {filterOptions.find(opt => opt.id === filter)?.label || filter}
                                        </span>
                                    </div>
                                </div>
                                <FaChevronDown className={`text-slate-400 text-sm transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Category Dropdown Content */}
                        <div className={`absolute top-full left-0 right-0 bg-white border-b border-x border-slate-100 shadow-xl rounded-b-2xl z-20 transition-all duration-300 origin-top overflow-hidden ${isFilterOpen ? 'opacity-100 scale-y-100 max-h-[400px]' : 'opacity-0 scale-y-0 max-h-0'}`}>
                            <div className="p-3 grid grid-cols-2 gap-2.5">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setFilter(opt.id);
                                            setIsFilterOpen(false);
                                            setDateFilter('');
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border outline-none ${filter === opt.id
                                            ? `${opt.bg} ${opt.color} border-current ring-1 ring-current font-bold`
                                            : 'border-transparent hover:bg-slate-50 text-slate-600 font-medium'
                                            }`}
                                    >
                                        <span className="text-lg">{opt.icon}</span>
                                        <span className="text-xs">{opt.label}</span>
                                        {filter === opt.id && <FaCheck className="text-sm ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity List */}
                    <div className="pb-2">
                        {Object.keys(groupedActivities).length === 0 ? (
                            <div className="text-center py-20 px-6">
                                <div className="size-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 animate-pulse">
                                    <FaCalendarAlt className="text-4xl text-green-300" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800 mb-2">Belum ada kegiatan</h3>
                                <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                                    {dateFilter
                                        ? "Tidak ada catatan ibadah pada tanggal yang dipilih."
                                        : "Yuk, isi ibadah harianmu untuk mulai melihat riwayat kebaikanmu disini!"}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 pt-4">
                                {Object.entries(groupedActivities).map(([date, dateActivities], index) => {
                                    // Calculate total points for this day
                                    const dayPointTotal = dateActivities.reduce((sum, item) => sum + item.points, 0);

                                    return (
                                        <div key={date}>
                                            {/* Date Header - Elegant New Style */}
                                            <div className="px-6 mb-4 mt-2 flex items-center justify-between relative z-10">
                                                <div className="flex flex-col">
                                                    <h3 className="text-base font-black text-slate-800 tracking-tight leading-none">
                                                        {formatDateFull(date).split(',')[0]}
                                                    </h3>
                                                    <span className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                                                        <FaCalendarAlt className="text-[10px] opacity-70" />
                                                        {formatDateFull(date).split(',').slice(1).join(',').trim()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold border border-green-100/50 shadow-sm flex items-center gap-1.5">
                                                        {dateActivities.length} Aktivitas
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Activities for this date */}
                                            <div className="space-y-0">
                                                {dateActivities.map((activity) => {
                                                    const statusConfig = getStatusConfig(activity.status);
                                                    const activityConfig = getActivityConfig(activity.category, activity.title);
                                                    const isExpanded = expandedCards[activity.id];

                                                    return (
                                                        <div key={activity.id} className="mb-4 mx-4">
                                                            <div
                                                                className={`bg-white rounded-2xl p-4 transition-all duration-300 border border-slate-200 shadow-sm ${isExpanded ? 'ring-1 ring-green-100 border-green-200' : ''}`}
                                                            >
                                                                {/* Header Section */}
                                                                <div
                                                                    className="flex items-start gap-3.5 cursor-pointer"
                                                                    onClick={() => toggleCardExpansion(activity.id)}
                                                                >
                                                                    {/* Icon Box - Activity Based Color */}
                                                                    <div className={`size-10 rounded-xl ${activityConfig.bg} ${activityConfig.color} flex items-center justify-center shrink-0`}>
                                                                        {activity.icon || activityConfig.icon}
                                                                    </div>

                                                                    {/* Main Info */}
                                                                    <div className="flex-1 min-w-0 pt-0.5">
                                                                        <div className="flex justify-between items-start">
                                                                            <div className="pr-2">
                                                                                <h4 className="font-semibold text-slate-800 text-[13px] leading-snug mb-1">{activity.title}</h4>

                                                                                {/* Modern Date Pill */}
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-500">
                                                                                        <span>{activity.rawDate === today ? 'Hari ini' : new Date(activity.rawDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                                                                        <span className="size-0.5 bg-slate-300 rounded-full"></span>
                                                                                        <span>{activity.time}</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            {/* Right Side: Points & Status */}
                                                                            <div className="flex flex-col items-end shrink-0 pl-1">
                                                                                {activity.points > 0 && (
                                                                                    <span className="text-emerald-500 font-bold text-xs mb-0.5">+{activity.points}</span>
                                                                                )}
                                                                                <span className={`text-[9px] font-semibold ${statusConfig.isPending ? 'text-yellow-600' : statusConfig.color}`}>
                                                                                    {statusConfig.label}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Chevron */}
                                                                    <FaChevronDown className={`text-slate-300 text-lg transition-transform duration-300 pt-1 ${isExpanded ? 'rotate-180' : ''}`} />
                                                                </div>

                                                                {/* Expanded Content */}
                                                                {isExpanded && (
                                                                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200 animate-fadeIn relative">
                                                                        {/* Decorative Circles for 'Ticket' Look */}
                                                                        <div className="absolute -left-6 top-[-9px] w-5 h-5 bg-white rounded-full border border-slate-100"></div>
                                                                        <div className="absolute -right-6 top-[-9px] w-5 h-5 bg-white rounded-full border border-slate-100"></div>

                                                                        <div className="space-y-4 px-1">
                                                                            {/* Kategori */}
                                                                            <div className="flex items-center gap-3">
                                                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-20 shrink-0">Kategori</span>
                                                                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${activityConfig.bg} ${activityConfig.color}`}>
                                                                                    {activity.category}
                                                                                </span>
                                                                            </div>

                                                                            {/* Keterangan */}
                                                                            <div className="flex items-start gap-3">
                                                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-20 shrink-0 mt-0.5">Keterangan</span>
                                                                                <div className="flex-1">
                                                                                    {(activity.subtitle || activity.notes) ? (
                                                                                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                                                                                            "{activity.subtitle || activity.notes}"
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p className="text-[11px] text-slate-400 font-medium italic">
                                                                                            -
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            {/* Status - Style rapi tanpa shape box */}
                                                                            <div className="flex items-start gap-3">
                                                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-20 shrink-0 mt-1">Status</span>
                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                    {statusConfig.isPending ? (
                                                                                        <div className="flex items-center gap-2 animate-pulse">
                                                                                            <FaHourglassHalf className="text-yellow-600 text-sm" />
                                                                                            <span className="text-[11px] font-semibold text-yellow-600">
                                                                                                {statusConfig.label}
                                                                                            </span>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                                                                                            <span className="material-symbols-outlined text-base">{statusConfig.icon}</span>
                                                                                            <span>{statusConfig.label}</span>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {totalPages > 1 && (
                            <div className="flex flex-col items-center mt-6 mb-8 pt-6 border-t border-slate-50 mx-6">
                                <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="size-9 flex items-center justify-center rounded-xl text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all"
                                    >
                                        <FaChevronLeft className="text-sm" />
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {(() => {
                                            const range = [];
                                            const delta = 1; // Number of pages to show around current page

                                            for (let i = 1; i <= totalPages; i++) {
                                                if (
                                                    i === 1 ||
                                                    i === totalPages ||
                                                    (i >= currentPage - delta && i <= currentPage + delta)
                                                ) {
                                                    range.push(i);
                                                } else if (
                                                    (i === currentPage - delta - 1 && i > 1) ||
                                                    (i === currentPage + delta + 1 && i < totalPages)
                                                ) {
                                                    range.push('...');
                                                }
                                            }

                                            // Filter duplicates just in case logic overlaps
                                            const uniqueRange = [...new Set(range)];

                                            return uniqueRange.map((page, idx) => (
                                                <React.Fragment key={idx}>
                                                    {page === '...' ? (
                                                        <span className="w-8 flex justify-center text-xs text-slate-400 font-bold tracking-widest select-none">...</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`size-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${currentPage === page
                                                                ? 'bg-gradient-to-tr from-green-500 to-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110 z-10'
                                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                                                }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    )}
                                                </React.Fragment>
                                            ));
                                        })()}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="size-9 flex items-center justify-center rounded-xl text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all"
                                    >
                                        <FaChevronRight className="text-sm" />
                                    </button>
                                </div>

                                <p className="text-[10px] text-slate-400 font-medium mt-3 bg-slate-50/50 px-3 py-1 rounded-full border border-slate-100/50">
                                    Halaman {currentPage} dari {totalPages}
                                </p>
                            </div>
                        )}
                    </div>
                </div>


            </div>


            {/* Achievement Popup */}
            {
                showPopup && (
                    <AchievementPopup
                        onClose={() => setShowPopup(false)}
                        title="Target Tercapai! 🎯"
                        message="Masya Allah! Kamu hebat sekali sudah menyelesaikan 8 ibadah wajib hari ini."
                        points="+50 XP"
                    />
                )
            }

            {/* Calendar Picker Modal */}
            <CalendarPicker
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                selectedDate={dateFilter}
                onDateSelect={(date) => {
                    setDateFilter(date);
                    if (date) setFilter("Semua");
                }}
            />
        </div >
    );
};

export default HistoryMobile;
