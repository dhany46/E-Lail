import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaMosque, FaCloudSun, FaBookOpen, FaHeart, FaStar, FaStickyNote, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";

// --- Sub-Components ---

const HeaderMobile = ({ student, teacherNote, verifiedActivities }) => {
    const navigate = useNavigate();
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
    const notificationRef = React.useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Count new notifications
    const newCount = (teacherNote?.isNew ? 1 : 0) + (verifiedActivities?.length > 0 ? verifiedActivities.length : 0);
    // Track read notifications to manage badge visibility
    const [lastReadCount, setLastReadCount] = React.useState(0);
    const [isFading, setIsFading] = React.useState(false); // State for fade animation
    const showBadge = newCount > lastReadCount;

    const handleBellClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    // Effect to handle fade animation when dropdown opens
    React.useEffect(() => {
        if (isNotificationsOpen && showBadge) {
            // Wait a tiny bit for dropdown to mount with opacity-100, then start fade
            const startFadeTimer = setTimeout(() => {
                setIsFading(true);
            }, 500); // 0.5s delay before fading starts so user sees it

            // Finish "read" process after fade completes
            const markReadTimer = setTimeout(() => {
                setLastReadCount(newCount);
                setIsFading(false);
            }, 2500); // 2.5s total (0.5s delay + 2s fade)

            return () => {
                clearTimeout(startFadeTimer);
                clearTimeout(markReadTimer);
            };
        } else if (!isNotificationsOpen) {
            // If closed early, reset fade state instantly
            setIsFading(false);
        }
    }, [isNotificationsOpen, showBadge, newCount]);

    // Get time-based sub greeting
    const hour = new Date().getHours();
    let subGreeting = 'Semangat beribadah! 💪';

    if (hour >= 3 && hour < 10) {
        subGreeting = 'Sudah sholat Subuh? 🌅';
    } else if (hour >= 10 && hour < 15) {
        subGreeting = 'Jangan lupa Dzuhur ya! ☀️';
    } else if (hour >= 15 && hour < 18) {
        subGreeting = 'Waktunya Ashar! 🌤️';
    } else {
        subGreeting = 'Sudah Isya belum? 🌙';
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="size-11 rounded-full ring-2 ring-teal-400 ring-offset-1 ring-offset-blue-50">
                    <img
                        src={`https://ui-avatars.com/api/?name=${student?.name || 'Sarah'}&background=e0f2fe&color=0284c7&bold=true`}
                        alt="Avatar"
                        className="size-full rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] text-blue-600 font-bold tracking-wide">Assalamualaikum 👋</p>
                    <h2 className="text-lg font-extrabold text-slate-800 leading-none truncate max-w-[180px]">Kakak {student?.name || 'Sarah'}!</h2>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subGreeting}</p>
                </div>
            </div>
            <div className="relative" ref={notificationRef}>
                <button
                    onClick={handleBellClick}
                    className="size-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all active:scale-90 relative border border-gray-100"
                >
                    <FaBell className="text-lg text-gray-600" />
                    {showBadge && (
                        <span className={`absolute top-1 right-1 size-2.5 bg-red-500 rounded-full ring-2 ring-white transition-opacity duration-[2000ms] ${isFading ? 'opacity-0' : 'opacity-100'}`}></span>
                    )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                    <div className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                Notifikasi <span className="text-xs font-normal text-gray-500">({newCount})</span>
                            </h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                            {/* Teacher Note Notification */}
                            {teacherNote && (
                                <div className="p-4 border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-sm">campaign</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 mb-0.5">Catatan Guru Baru</p>
                                            <p className="text-[10px] text-gray-500 line-clamp-2">{teacherNote.message}</p>
                                            <p className="text-[9px] text-blue-500 font-medium mt-1">Dari {teacherNote.teacherName}</p>
                                        </div>
                                        {teacherNote.isNew && showBadge && (
                                            <div className={`size-2 rounded-full bg-red-500 shrink-0 mt-1 transition-opacity duration-[2000ms] ${isFading ? 'opacity-0' : 'opacity-100'}`}></div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Verified Activities Notifications */}
                            {verifiedActivities?.map((activity, idx) => (
                                <div key={idx} className="p-4 border-b border-gray-50 hover:bg-emerald-50/30 transition-colors">
                                    <div className="flex gap-3">
                                        <div className="size-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-sm">verified</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800 mb-0.5">Ibadah Diverifikasi</p>
                                            <p className="text-[10px] text-gray-500">"{activity.title}" sudah diverifikasi oleh guru.</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+{activity.points} Poin</span>
                                                <span className="text-[9px] text-gray-400">• {activity.time}</span>
                                            </div>
                                        </div>
                                        {showBadge && (
                                            <div className={`size-2 rounded-full bg-red-500 shrink-0 mt-1 transition-opacity duration-[2000ms] ${isFading ? 'opacity-0' : 'opacity-100'}`}></div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {(!teacherNote && (!verifiedActivities || verifiedActivities.length === 0)) && (
                                <div className="p-8 text-center">
                                    <span className="text-2xl text-gray-300 block mb-2">notifications_off</span>
                                    <p className="text-xs text-gray-400">Belum ada notifikasi baru</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Total Poin Card - Blue gradient with badge and level progress
const PointsCard = ({ totalPoints }) => {
    const levelThresholds = [0, 100, 300, 600, 1000, 1500];
    const levelNames = ['Pemula', 'Rajin', 'Bintang Ibadah', 'Mujahid', 'Hafidz Cilik', 'Master'];
    const levelBadges = ['🌱', '⭐', '🌟', '🏅', '🏆', '👑'];

    // Calculate current level
    let currentLevel = 0;
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (totalPoints >= levelThresholds[i]) {
            currentLevel = i;
            break;
        }
    }

    const levelName = levelNames[currentLevel];
    const levelBadge = levelBadges[currentLevel];

    // Calculate progress to next level
    const currentThreshold = levelThresholds[currentLevel];
    const nextThreshold = levelThresholds[Math.min(currentLevel + 1, levelThresholds.length - 1)];
    const pointsInLevel = totalPoints - currentThreshold;
    const pointsNeeded = nextThreshold - currentThreshold;
    const progressPercent = pointsNeeded > 0 ? Math.min((pointsInLevel / pointsNeeded) * 100, 100) : 100;

    // Calculate Academic Year
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const startYear = currentMonth < 6 ? currentYear - 1 : currentYear;
    const academicYearLabel = `${startYear}/${startYear + 1}`;

    return (
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
            {/* White glow effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/30 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-16 -mb-16"></div>
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-blue-100 font-medium mb-1">Total Poin Kamu</p>
                        <h1 className="text-4xl font-black text-white flex items-center gap-2">
                            {totalPoints.toLocaleString()} <span className="text-amber-300 text-3xl">★</span>
                        </h1>
                    </div>
                    {/* Academic Year Badge */}
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-2">
                        <div className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">school</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-blue-100 font-medium leading-none mb-0.5">Tahun Ajaran</span>
                            <span className="text-[10px] font-bold text-white leading-none">{academicYearLabel}</span>
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
        </div>
    );
};

// Catatan dari Guru - Single teacher note
const TeacherNotes = ({ note }) => {

    // If no note exists
    if (!note) return null;

    return (
        <div className="mt-5 mb-4 px-1">
            {/* Section Title - Outside Card */}
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-xl text-blue-500">chat</span>
                <h3 className="text-base font-extrabold text-gray-800 tracking-tight">Catatan Guru</h3>
            </div>

            {/* Card Content */}
            <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 transition-all duration-300">
                {/* Message Content */}
                <div className="flex gap-3">
                    {/* Teacher Avatar */}
                    <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-2 ring-blue-50">
                        <span className="text-white text-sm font-bold">
                            {note.teacherName?.split(' ').pop()?.charAt(0) || 'G'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                        {/* Header: Name, Role & Date */}
                        <div className="flex justify-between items-start mb-1.5">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pr-2">
                                <p className="text-[14px] font-extrabold text-slate-800">{note.teacherName}</p>
                                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100/50">Wali Kelas</span>
                                {note.isNew && (
                                    <span className="text-[9px] font-bold text-white bg-rose-500 px-1.5 py-0.5 rounded-full animate-pulse">Baru</span>
                                )}
                            </div>
                            {/* Date moved to top right */}
                            <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                                {note.date}
                            </p>
                        </div>

                        {/* Message */}
                        <p className="text-[12px] text-slate-600 leading-5 font-medium">
                            {note.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Menu Cards Component
const MenuCards = ({ stats, activities }) => {
    const navigate = useNavigate();

    // Fallback stats if undefined
    const safeStats = stats || { todayCount: 4, targetDaily: 5 }; // Defaulting to 4/5 for demo based on screenshot
    const progressPercentage = Math.min((safeStats.todayCount / safeStats.targetDaily) * 100, 100);

    // Calculate pending verification count
    const pendingCount = activities?.filter(a => a.status === 'Menunggu').length || 0;

    const cards = [
        {
            pill: "INPUT IBADAH",
            title: "Catat Ibadah",
            subtitle: "Yuk isi kegiatanmu! \u00A0✨",
            icon: "📝",
            path: "/student/input",
            bg: "bg-gradient-to-br from-amber-400 to-orange-500",
            shadow: "shadow-orange-200",
            iconColor: "text-amber-100",
            delay: "0s"
        },
        {
            pill: "TARGET HARIAN",
            title: "Target Ibadah",
            subtitle: `${safeStats.todayCount}/${safeStats.targetDaily} Ibadah Tuntas! \u00A0🚀`,
            icon: "🎯",
            path: "/student/input",
            bg: "bg-gradient-to-br from-blue-500 to-blue-600",
            shadow: "shadow-blue-200",
            iconColor: "text-blue-100",
            delay: "0.1s",
            hasProgress: true,
            progress: progressPercentage
        },
        {
            pill: "PAPAN JUARA",
            title: "Leaderboard",
            subtitle: "Intip teman rajin! \u00A0🏆",
            icon: "🏆",
            path: "/student/leaderboard",
            bg: "bg-gradient-to-br from-violet-500 to-purple-600",
            shadow: "shadow-violet-200",
            iconColor: "text-violet-100",
            delay: "0.2s"
        },
        {
            pill: "KABAR GURU",
            title: "Verifikasi",
            subtitle: `${pendingCount} Menunggu dinilai \u00A0🧐`,
            icon: "verified", // Material symbol name
            path: "/student/history",
            bg: "bg-gradient-to-br from-emerald-400 to-green-500",
            shadow: "shadow-emerald-200",
            iconColor: "text-emerald-100",
            delay: "0.3s"
        }
    ];

    return (
        <div className="mt-6 mb-4">
            <div className="flex items-center gap-2 mb-4 px-1">
                <div className="size-8 rounded-full bg-blue-100/50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Menu Utama</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {cards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(card.path)}
                        className={`relative text-left w-full h-[120px] rounded-[1.5rem] ${card.bg} overflow-hidden group animate-fade-in-up
                        transition-transform duration-200 active:scale-[0.96] shadow-lg ${card.shadow}`}
                        style={{ animationDelay: card.delay }}
                    >
                        {/* Decorative Large Faded Icon */}
                        <div className={`absolute -bottom-2 -right-2 text-[4rem] opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500 ${card.iconColor}`}>
                            {card.icon === "verified" ? <span className="material-symbols-outlined text-[4rem]">verified</span> : card.icon}
                        </div>

                        {/* Glass Shine */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 via-transparent to-black/5 pointer-events-none"></div>

                        <div className="relative z-10 p-3.5 flex flex-col h-full justify-between">
                            {/* Top Row */}
                            <div className="flex justify-between items-start">
                                <div className="size-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/20 text-white">
                                    {card.icon === "verified" ? (
                                        <span className="material-symbols-outlined text-lg">verified</span>
                                    ) : (
                                        <span className="text-lg filter drop-shadow-sm">{card.icon}</span>
                                    )}
                                </div>
                                <div className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 max-w-[60%] truncate">
                                    <span className="text-[7px] font-black text-white uppercase tracking-wider block truncate">{card.pill}</span>
                                </div>
                            </div>

                            {/* Bottom Content */}
                            {/* Bottom Content */}
                            <div>
                                <h4 className="font-extrabold text-[15px] text-white tracking-tight leading-4 mb-1 drop-shadow-sm line-clamp-1">
                                    {card.title}
                                </h4>
                                {card.hasProgress ? (
                                    <div>
                                        <p className="text-[10px] font-semibold text-white/90 mb-1.5">{card.subtitle.split(' ')[0]}</p>
                                        <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                                            <div
                                                className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                                                style={{ width: `${card.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[10px] font-semibold text-white/90 line-clamp-1">{card.subtitle}</p>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Activity List Component
const ActivityList = ({ activities }) => {
    // Show only last 8 activities
    const recentActivities = activities?.slice(0, 8) || [];
    const [expandedCards, setExpandedCards] = React.useState({});

    const toggleCardExpansion = (cardId) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    const getStatusConfig = (status) => {
        if (status === 'Terverifikasi') {
            return {
                icon: <FaCheckCircle className="text-sm" />,
                color: 'text-emerald-500',
                bg: 'bg-emerald-50',
                label: 'Terverifikasi',
                isPending: false
            };
        }
        return {
            icon: <FaHourglassHalf className="text-sm" />,
            color: 'text-yellow-500', // keeping similar to history
            bg: 'bg-yellow-50',
            label: 'Menunggu',
            isPending: true
        };
    };

    // Helper to determine icon/style matching HistoryMobile.jsx logic
    const getActivityStyle = (title, category) => {
        const t = title ? title.toLowerCase() : '';
        // Exact logic from HistoryMobile.jsx's getActivityConfig and loadActivities

        // Shalat Wajib (HistoryMobile uses: color: 'text-blue-600', bg: 'bg-blue-50', icon: FaMosque)
        if (t.includes('shalat') && (t.includes('wajib') || t.includes('subuh') || t.includes('dzuhur') || t.includes('ashar') || t.includes('maghrib') || t.includes('isya'))) {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaMosque className="text-xl" /> };
        }

        // Shalat Sunnah / Dhuha (HistoryMobile uses: color: 'text-purple-600', bg: 'bg-purple-50', icon: FaCloudSun)
        if (t.includes('dhuha') || (category === 'Shalat Sunnah')) {
            return { bg: 'bg-purple-50', color: 'text-purple-600', icon: <FaCloudSun className="text-xl" /> };
        }

        // Tadarus / Quran (HistoryMobile uses: color: 'text-amber-600', bg: 'bg-amber-50', icon: FaBookOpen)
        if (t.includes('surat') || t.includes('tadarus') || t.includes('iqro') || t.includes('membaca')) {
            return { bg: 'bg-amber-50', color: 'text-amber-600', icon: <FaBookOpen className="text-xl" /> };
        }

        // Infaq / Sedekah (HistoryMobile uses: points: 10, icon: BiSolidDonateHeart, color: 'text-pink-600', bg: 'bg-pink-50')
        // WAIT: HistoryMobile uses pink for infaq in the loadActivities logic!
        if (t.includes('infaq') || t.includes('sedekah')) {
            return { bg: 'bg-pink-50', color: 'text-pink-600', icon: <BiSolidDonateHeart className="text-xl" /> };
        }

        // Bantu Ortu (HistoryMobile uses: points: 25, icon: FaHeart, color: 'text-pink-600', bg: 'bg-pink-50')
        if (t.includes('bantu') || t.includes('orang tua')) {
            return { bg: 'bg-pink-50', color: 'text-pink-600', icon: <FaHeart className="text-xl" /> };
        }

        // Catatan (HistoryMobile uses: color: 'text-blue-600', bg: 'bg-blue-50', icon: FaStickyNote)
        if (t.includes('catatan') || category === 'Catatan') {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaStickyNote className="text-xl" /> };
        }

        // Fallback
        return { bg: 'bg-slate-50', color: 'text-slate-600', icon: <FaStar className="text-xl" /> };
    };

    return (
        <>
            {recentActivities.length > 0 ? (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {recentActivities.map((activity, idx) => {
                            const statusConfig = getStatusConfig(activity.status);
                            const cardId = activity.id || `activity-${idx}`;
                            const isExpanded = expandedCards[cardId];

                            // Get style based on title and category
                            const style = getActivityStyle(activity.title, activity.category);

                            return (
                                <div
                                    key={cardId}
                                    className="bg-transparent transition-all duration-200"
                                >
                                    {/* Main Row - Clickable */}
                                    <div
                                        onClick={() => toggleCardExpansion(cardId)}
                                        className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all duration-200"
                                    >
                                        {/* Activity Icon */}
                                        <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${style.bg}`}>
                                            <span className={`${style.color}`}>
                                                {style.icon}
                                            </span>
                                        </div>

                                        {/* Text Content */}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1 mb-0.5">
                                                {activity.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 line-clamp-1">
                                                {activity.date || 'Hari ini'} • {activity.time}
                                            </p>
                                        </div>

                                        {/* Points & Status */}
                                        <div className="text-right shrink-0">
                                            <div className="text-sm font-black text-emerald-600">
                                                +{activity.points}
                                            </div>
                                            <div className={`text-[9px] font-semibold ${statusConfig.color}`}>
                                                {statusConfig.label}
                                            </div>
                                        </div>

                                        {/* Expand Arrow */}
                                        <span className={`material-symbols-outlined text-lg text-slate-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </div>

                                    {/* Expandable Detail Section */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="px-4 pb-4 pt-0">
                                            <div className="p-3 bg-slate-50/50 rounded-xl space-y-2 border border-slate-100/50">
                                                {/* Category Badge */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-semibold text-slate-400">Kategori:</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activity.bg || 'bg-blue-50'} ${activity.color || 'text-blue-600'}`}>
                                                        {activity.category || 'Ibadah'}
                                                    </span>
                                                </div>
                                                {/* Detail / Notes */}
                                                <div className="flex items-start gap-2">
                                                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">Detail:</span>
                                                    <span className="text-[11px] text-slate-600">
                                                        {activity.subtitle || activity.title}
                                                    </span>
                                                </div>
                                                {/* Status with Icon */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-semibold text-slate-400">Status:</span>
                                                    <div className="flex items-center gap-2">
                                                        {statusConfig.isPending ? (
                                                            <div className="flex items-center gap-2 animate-pulse">
                                                                <FaHourglassHalf className="text-yellow-600 text-sm" />
                                                                <span className="text-[11px] font-semibold text-yellow-600">
                                                                    {statusConfig.label}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className={`flex items-center gap-1 text-[11px] font-semibold ${statusConfig.color}`}>
                                                                {statusConfig.icon}
                                                                {statusConfig.label}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <span className="material-symbols-outlined text-3xl mb-2 opacity-30 text-gray-400">event_note</span>
                    <p className="text-xs text-gray-400 font-medium">Belum ada aktivitas hari ini</p>
                </div>
            )}
        </>
    );
};

const DashboardMobile = ({ activities, stats, studentInfo, teacherNote }) => {
    const navigate = useNavigate();

    // Filter verified activities for notifications
    const verifiedActivities = activities?.filter(a => a.status === 'Terverifikasi') || [];

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth overscroll-y-auto bg-[#EEF7FF] font-sans relative select-none touch-manipulation animate-fade-in pb-32">
            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

            {/* Header - Sticky with Staggered Entrance */}
            <div className="px-6 py-4 sticky top-0 bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 transition-all duration-300 animate-fade-in-up border-b border-slate-200" style={{ animationDuration: '0.6s' }}>
                <HeaderMobile
                    student={studentInfo}
                    teacherNote={teacherNote}
                    verifiedActivities={verifiedActivities}
                />
            </div>

            <div className="px-6 space-y-8 relative z-10 pt-4">
                {/* 1. Points Card (Delay 0.1s) */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <PointsCard totalPoints={stats?.totalPoints || 0} />
                </div>

                {/* 2. Teacher Notes (Delay 0.2s) - Moved up as Progress is now in Menu */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <TeacherNotes note={teacherNote} />
                </div>

                {/* 3. Menu Cards (Delay 0.3s) - Now contains Progress in Riwayat */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <MenuCards stats={stats} activities={activities} />
                </div>

                {/* 4. Recent Activity (Delay 0.4s) */}
                <div className="animate-fade-in-up opacity-0 pb-6" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.9s' }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-emerald-100/50 text-emerald-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">history</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-800">Aktivitas Terakhir</h3>
                        </div>
                        <button
                            onClick={() => navigate('/student/history')}
                            className="text-xs font-bold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                        >
                            Lihat Semua
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <ActivityList activities={activities} />
                </div>
            </div>

            {/* Bottom Navigation handled by StudentLayout */}
        </div>
    );
};

export default DashboardMobile;
