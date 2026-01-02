import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    FaDonate,
    FaSmileWink,
    FaMagic,
    FaCommentSlash
} from "react-icons/fa";
import { MdVerified, MdCampaign, MdNotificationsOff, MdNightsStay, MdNoFood } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { getActivityConfig, getAllWorshipCategories, AVAILABLE_COLORS } from '../../../utils/worshipConfig';


const AchievementPopup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 500);
    };

    // Confetti pieces
    const confettiColors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-blue-400', 'bg-purple-400'];
    const confettiPieces = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        color: confettiColors[i % confettiColors.length],
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 1.5}s`, // Longer delay spread for continuous flow
        animationDuration: `${2.5 + Math.random() * 2.5}s` // Slower, floaty fall (2.5s - 5s)
    }));

    return createPortal(
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'bg-black/40 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
            <div
                className={`bg-gradient-to-br from-white to-blue-50 rounded-[2.5rem] p-8 shadow-2xl max-w-sm w-full relative text-center overflow-hidden border border-white/60 transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}
            >
                {/* Premium Background Effects */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 bg-blue-100/50 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-40 bg-sky-100/50 rounded-full blur-3xl animate-pulse delay-700"></div>

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

                <div className={`relative z-10 size-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-amber-100 transform transition-all duration-700 delay-200 border border-white ${isVisible ? 'scale-100 rotate-3' : 'scale-0 -rotate-180'}`}>
                    <FaTrophy className="text-6xl text-amber-500 drop-shadow-sm filter" />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">+50 XP</div>
                </div>

                <div className={`relative z-10 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <h2 className="text-xl font-extrabold text-slate-800 mb-2 tracking-tight">Luar Biasa! 🌟</h2>
                    <p className="text-slate-600 mb-6 text-[13px] leading-relaxed font-medium px-2">
                        Masya Allah! Kamu telah menyelesaikan <span className="inline-block font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50">8 Target Harian Ibadah</span> hari ini. Istiqomah terus ya!
                    </p>
                </div>

                <div className={`relative z-10 w-full transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                        onClick={handleClose}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold text-base shadow-[0_4px_0_rgb(29,78,216)] active:shadow-none active:translate-y-[4px] transition-all border-t border-white/30 outline-none relative overflow-hidden group hover:brightness-110"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-sm">
                            Alhamdulillah 🤲
                        </span>
                        {/* Shine effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />
                    </button>
                </div>
            </div>
        </div>,
        document.body
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
            className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-sm bg-white rounded-3xl transition-all duration-300 shadow-2xl ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
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
                <div className="px-4 pb-4 pt-1 flex gap-2">
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
            <div className="flex items-center gap-4">
                <div className="size-12 rounded-full ring-2 ring-teal-400/70 ring-offset-2 ring-offset-blue-50 shrink-0">
                    <img src="/avatars/dani.png" alt="Avatar" className="size-full rounded-full object-cover" style={{ objectPosition: 'center 35%' }} />
                </div>
                <div>
                    <h1 className="text-lg font-extrabold text-slate-800 leading-tight">Riwayat Ibadahku ✨</h1>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Lihat semua kebaikanmu! 🤲</p>
                </div>
            </div>
        </div>
    );
};

// Hero Stats Component - Fun & Colorful for Kids
const HeroStats = ({ stats }) => {
    const pendingCount = stats?.pendingCount || 0;
    const monthCount = stats?.monthCount || 0;

    // Calculate Monthly Target (approx days in month * daily target)
    const dailyTarget = stats?.targetDaily || 8;
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const monthlyTarget = daysInMonth * dailyTarget;

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Card 1: Verifikasi - Pending activities counter (styled like Total Ibadah) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-500 p-3.5 shadow-lg shadow-emerald-200/50 group hover:scale-[1.02] transition-all duration-500">
                {/* Fun Background Blobs */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-6 -mt-6 blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-teal-300/20 rounded-full -ml-6 -mb-6 blur-xl"></div>

                {/* Floating Icons */}
                <div className="absolute top-3 right-8 text-white/20 text-sm">✓</div>
                <div className="absolute bottom-4 right-4 text-white/10 text-xl rotate-12">✦</div>

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[90px]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="size-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20 ring-1 ring-white/10">
                            <span className="text-base drop-shadow-sm">⏳</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-white/20 border border-white/20 backdrop-blur-md shadow-sm flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white tracking-wide uppercase">VERIFIKASI</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-emerald-50 uppercase tracking-wider mb-0.5 opacity-90">Belum dinilai

                        </p>
                        <h2 className="text-2xl font-black text-white tracking-tight leading-none drop-shadow-sm">
                            {pendingCount}
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

// Helper function to get activity info from worshipConfig (outside component)
// Helper function to get activity info from worshipConfig (outside component)
const getActivityInfoFromConfig = (activityId) => {
    // Ensure fresh config is loaded every time
    const allWorshipCategories = getAllWorshipCategories();

    // Normalize ID for comparison
    const targetId = String(activityId).trim();

    for (const cat of allWorshipCategories) {
        // Robust find with string normalization
        const foundItem = cat.items.find(item => String(item.id).trim() === targetId);

        if (foundItem) {
            const actConfig = getActivityConfig(targetId);
            const colorName = actConfig.colorName || 'blue';
            const IconComp = actConfig.icon || FaStar;

            // Determine category colors safely
            let catColorName = 'pink';
            if (cat.color) {
                // Try to extract color name from class like 'bg-amber-500' or default to pink
                const match = cat.color.match(/bg-([a-z]+)-/);
                if (match) catColorName = match[1];
            }

            return {
                label: foundItem.label,
                points: foundItem.points,
                category: cat.title,
                icon: <IconComp className="text-xl" />,
                color: `text-${colorName}-600`,
                bg: `bg-${colorName}-50`,
                categoryColor: `text-${catColorName}-600`,
                categoryBg: `bg-${catColorName}-100`
            };
        }
    }

    // Fallback for unknown/deleted activities
    return {
        label: activityId,
        points: 10,
        category: 'Ibadah Lainnya',
        icon: <FaStar className="text-xl" />,
        color: 'text-pink-600',
        bg: 'bg-pink-50',
        categoryColor: 'text-pink-600',
        categoryBg: 'bg-pink-100'
    };
};

// Function to load activities from localStorage
const loadActivitiesFromStorage = () => {
    const allActivities = [];

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

            const dateObj = new Date(dateStr);
            const formattedDate = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            // Process prayers
            if (data.prayers && Array.isArray(data.prayers)) {
                data.prayers.forEach((prayer, idx) => {
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
                        title: `Salat ${prayerId || 'Wajib'} ${isCongregation ? 'Berjamaah' : 'Sendiri'}`,
                        subtitle: `${isCongregation ? 'Dilakukan berjamaah' : 'Munfarid (Sendiri)'}${prayerTime ? ` • ${prayerTime.replace(' WIB', '').replace('WIB', '')} WIB` : ''}`,
                        category: "Salat Wajib",
                        status: "Menunggu",
                        points: isCongregation ? 25 : 10,
                        icon: <FaMosque className="text-xl" />,
                        color: 'text-blue-600',
                        bg: 'bg-blue-50'
                    });
                });
            }

            // Process tadarus
            const tadarusList = Array.isArray(data.tadarus)
                ? data.tadarus
                : (data.tadarus ? [data.tadarus] : []);

            tadarusList.forEach((item, idx) => {
                if (!item) return;

                const isQuran = item.surah || item.ayatStart || item.ayatEnd;
                if (isQuran) {
                    allActivities.push({
                        id: `${dateStr}-tadarus-quran-${idx}`,
                        date: formattedDate,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        time: item.submittedAt ? `${item.submittedAt.substring(0, 5)} WIB` : '-',
                        title: `Tadarus Al-Qur'an`,
                        subtitle: `Surat ${item.surah || '-'} • Ayat ${item.ayatStart || '-'} - ${item.ayatEnd || '-'}`,
                        category: "Tadarus Al-Qur'an",
                        status: "Menunggu",
                        points: 50,
                        icon: <FaBookOpen className="text-xl" />,
                        color: 'text-blue-600',
                        bg: 'bg-blue-50',
                        categoryColor: 'text-blue-600',
                        categoryBg: 'bg-blue-100'
                    });
                }

                const isHijrati = item.page || item.jilid;
                if (isHijrati) {
                    allActivities.push({
                        id: `${dateStr}-tadarus-hijrati-${idx}`,
                        date: formattedDate,
                        rawDate: dateStr,
                        rawTime: item.submittedAt || '23:59:59',
                        time: item.submittedAt ? `${item.submittedAt.substring(0, 5)} WIB` : '-',
                        title: `Hijrati`,
                        subtitle: `Jilid ${item.jilid || '-'} • Halaman ${item.page || '-'}`,
                        category: "Hijrati",
                        status: "Menunggu",
                        points: 30,
                        icon: <FaBookOpen className="text-xl" />,
                        color: 'text-amber-600',
                        bg: 'bg-amber-50',
                        categoryColor: 'text-amber-600',
                        categoryBg: 'bg-amber-100'
                    });
                }
            });

            // Process additional worships
            if (data.additional && Array.isArray(data.additional)) {
                data.additional.forEach((item, idx) => {
                    const isObject = typeof item === 'object' && item !== null;
                    const itemId = isObject ? item.id : item;
                    const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                    const info = getActivityInfoFromConfig(itemId);
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
                        color: info.color || 'text-pink-600',
                        bg: info.bg || 'bg-pink-50',
                        categoryColor: info.categoryColor || 'text-pink-600',
                        categoryBg: info.categoryBg || 'bg-pink-100'
                    });
                });
            }

            // Process Literacy
            if (data.literacy && typeof data.literacy === 'object') {
                allActivities.push({
                    id: `${dateStr}-literacy`,
                    date: formattedDate,
                    rawDate: dateStr,
                    rawTime: data.literacy.submittedAt || '23:59:59',
                    time: data.literacy.submittedAt ? `${data.literacy.submittedAt.substring(0, 5)} WIB` : '-',
                    title: `Membaca Buku: ${data.literacy.title}`,
                    subtitle: `Halaman ${data.literacy.page}`,
                    category: "Literasi",
                    status: "Menunggu",
                    points: 15,
                    icon: <FaBookOpen className="text-xl" />,
                    color: 'text-indigo-600',
                    bg: 'bg-indigo-50'
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
};

const HistoryMobile = () => {
    const navigate = useNavigate();

    // Load activities from localStorage
    const [activities, setActivities] = useState(() => loadActivitiesFromStorage());

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
        { id: "Salat Wajib", label: "Salat Wajib", icon: "🕌", color: "text-blue-600", bg: "bg-blue-50" },
        { id: "Ibadah Sunah", label: "Ibadah Sunah", icon: "⭐", color: "text-amber-600", bg: "bg-amber-50" },
        { id: "Tadarus", label: "Tadarus", icon: "📖", color: "text-amber-600", bg: "bg-amber-50" },
        { id: "Literasi", label: "Literasi", icon: "📚", color: "text-indigo-600", bg: "bg-indigo-50" },
        { id: "Ibadah Lainnya", label: "Ibadah Lainnya", icon: "❤️", color: "text-pink-600", bg: "bg-pink-50" },
        { id: "Poin Guru", label: "Prestasi / Pelanggaran", icon: "🏆", color: "text-emerald-600", bg: "bg-emerald-50" }
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

    // Load activities from localStorage with auto-refresh
    useEffect(() => {
        const loadActivities = () => {
            const loadedActivities = loadActivitiesFromStorage();
            setActivities(loadedActivities);
        };

        loadActivities();

        // Listen for storage events (e.g. from other tabs or updates)
        const handleStorageChange = () => loadActivities();
        window.addEventListener('storage', handleStorageChange);

        // Also simpler interval check or focus check could be added if needed, 
        // but for now relying on storage event + initial load.
        // If the user navigates within the app, the component remounts and loadActivities() runs.

        return () => window.removeEventListener('storage', handleStorageChange);
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
        const pendingCount = activities.filter(a => a.status === 'Menunggu').length;

        setStats({ totalPoints, monthCount, pendingCount });
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
        // Filter by Category
        const matchCategory = filter === "Semua" ||
            a.category === filter ||
            (filter === 'Tadarus' && (a.category === "Tadarus Al-Qur'an" || a.category === 'Hijrati'));

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

    // Calculate total counts per date from the FULL filtered list (not paginated)
    const dateCounts = filteredActivities.reduce((acc, curr) => {
        const date = curr.rawDate;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="h-screen bg-[#F8FAFC] font-sans relative touch-manipulation overflow-hidden notranslate" translate="no">
            {/* Main Scrollable Content */}
            <div className="h-full relative overflow-hidden animate-fade-in">


                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

                <div className="h-full relative overflow-y-auto scrollbar-hide">
                    <div className="min-h-full pb-32">
                        {/* Header - Only title */}
                        <div className="px-6 py-4 pt-[calc(1rem+env(safe-area-inset-top))] relative bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-[60] border-b border-slate-200">
                            <HistoryHeader verifiedActivities={verifiedActivities} />
                        </div>

                        <div className="space-y-5 relative z-10 px-6 mt-6">
                            {/* Daily Target Progress Card - Clean & Theme Aligned */}
                            <div className="bg-gradient-to-r from-blue-500 via-blue-500 to-sky-400 rounded-3xl p-5 shadow-lg shadow-blue-200/40 text-white relative overflow-hidden">
                                {/* Background Decorations - Enhanced */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-28 h-28 bg-sky-300/15 rounded-full -ml-10 -mb-10"></div>
                                <div className="absolute top-1/2 right-4 w-16 h-16 bg-white/5 rounded-full"></div>
                                {/* Floating stars decoration */}
                                <div className="absolute top-3 right-16 text-white/20 text-xl">✦</div>
                                <div className="absolute top-8 right-8 text-white/15 text-sm">✦</div>
                                <div className="absolute bottom-4 right-24 text-white/10 text-2xl">✦</div>
                                {/* Decorative lines */}
                                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>

                                <div className="relative z-10">
                                    {/* Header Row */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                                <span className="text-xl">🚀</span>
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-white">Misi Ibadah Harianmu</h3>
                                                <p className="text-[11px] font-medium text-blue-100 mt-0.5">
                                                    Kumpulkan 8 Kebaikan! ✨
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-baseline justify-end gap-0.5">
                                                <span className="text-2xl font-bold">{todayActivitiesCount}</span>
                                                <span className="text-sm font-medium opacity-80">/ {dailyTarget}</span>
                                            </div>
                                            <span className="text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-md inline-block mt-1">
                                                {progressPercent === 100 ? 'Sempurna! 🌟' : 'Semangat! 🔥'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar - Clean Fun Version */}
                                    <div className="relative">
                                        <div className="bg-blue-900/30 rounded-full h-3.5 overflow-hidden border border-white/10">
                                            <div
                                                className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 h-full rounded-full transition-all duration-700 ease-out"
                                                style={{ width: `${progressPercent}%` }}
                                            ></div>
                                        </div>
                                        {/* Star indicator at end */}
                                        {progressPercent === 100 && (
                                            <div className="absolute -right-1 -top-1.5 text-base animate-bounce">⭐</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hero Stats (Bintangku & Ibadahku) */}
                            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                                <HeroStats stats={{ pendingCount: stats.pendingCount, monthCount: stats.monthCount, targetDaily: dailyTarget }} />
                            </div>

                            {/* Riwayat Container */}
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-8 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
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
                                            <div className="size-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 animate-pulse">
                                                <FaCalendarAlt className="text-4xl text-blue-300" />
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
                                                const totalCountForDate = dateCounts[date] || 0;

                                                return (
                                                    <div key={date}>
                                                        {/* Date Header - Elegant New Style */}
                                                        <div className="px-6 mb-4 mt-2 flex items-center justify-between relative z-10">
                                                            <div className="flex items-center gap-2">
                                                                <FaCalendarAlt className="text-blue-500 text-base" />
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="text-sm font-bold text-slate-800">{formatDateFull(date).split(',')[0]},</span>
                                                                    <span className="text-sm font-medium text-slate-500">{formatDateFull(date).split(',').slice(1).join(',').trim()}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100/50 shadow-sm flex items-center gap-1.5">
                                                                    {totalCountForDate} Aktivitas
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
                                                                            className={`bg-white rounded-2xl p-4 transition-all duration-300 border border-slate-200 shadow-sm ${isExpanded ? 'ring-1 ring-blue-100 border-blue-200' : ''}`}
                                                                        >
                                                                            {/* Header Section */}
                                                                            <div
                                                                                className="flex items-start gap-3.5 cursor-pointer"
                                                                                onClick={() => toggleCardExpansion(activity.id)}
                                                                            >
                                                                                {/* Icon Box - Activity Based Color */}
                                                                                <div className={`size-10 rounded-xl ${activity.bg || activityConfig.bg} flex items-center justify-center shrink-0`}>
                                                                                    <span className={activity.color || activityConfig.color}>
                                                                                        {activity.icon || activityConfig.icon}
                                                                                    </span>
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
                                                                                                <span className="text-blue-500 font-bold text-xs mb-0.5">+{activity.points}</span>
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
                                                                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${activity.categoryBg || activity.bg || activityConfig.bg} ${activity.categoryColor || activity.color || activityConfig.color}`}>
                                                                                                {activity.category}
                                                                                            </span>
                                                                                        </div>

                                                                                        {/* Keterangan */}
                                                                                        <div className="flex items-start gap-3">
                                                                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-20 shrink-0 mt-0.5">Keterangan</span>
                                                                                            <div className="flex-1">
                                                                                                {(activity.subtitle || activity.notes) ? (
                                                                                                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed italic">
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
                                                                                                        <span className="material-symbols-outlined notranslate text-base text-slate-400">calendar_month</span>
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
                                                                            ? 'bg-gradient-to-tr from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-200 scale-110 z-10'
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

                    </div>
                </div>

                {/* Achievement Popup - Outside PullToRefresh for correct fixed positioning */}
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

                {/* Calendar Picker Modal - Outside PullToRefresh for correct fixed positioning */}
                <CalendarPicker
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    selectedDate={dateFilter}
                    onDateSelect={(date) => {
                        setDateFilter(date);
                        if (date) setFilter("Semua");
                    }}
                />
            </div>


        </div>
    );
};

export default HistoryMobile;
