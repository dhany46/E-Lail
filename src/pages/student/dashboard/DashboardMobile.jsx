import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaMosque, FaCloudSun, FaBookOpen, FaHeart, FaStar, FaStickyNote, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaHandHoldingHeart, FaSmileWink, FaMagic, FaCommentSlash } from "react-icons/fa";
import { MdNightsStay, MdNoFood } from "react-icons/md";
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

    // Track read notifications using localStorage to persist across navigation
    const [lastReadCount, setLastReadCount] = React.useState(() => {
        return parseInt(localStorage.getItem('notification_last_read_count') || '0', 10);
    });

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

            // Mark as read in storage IMMEDIATELY to prevent state loss on navigation
            localStorage.setItem('notification_last_read_count', newCount.toString());

            // Finish "read" process (Visual only) after fade completes
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
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="size-12 rounded-full ring-2 ring-teal-400/70 ring-offset-2 ring-offset-blue-50 shrink-0">
                    <img
                        src="/avatars/dani.png"
                        alt="Avatar"
                        className="size-full rounded-full object-cover"
                        style={{ objectPosition: 'center 35%' }}
                    />
                </div>
                {/* Text Content */}
                <div className="flex flex-col">
                    <p className="text-[10px] text-blue-500 font-semibold tracking-wide mb-0.5">Assalamualaikum 👋</p>
                    <h2 className="text-base font-extrabold text-slate-800 leading-tight truncate max-w-[180px]">Kakak {student?.name || 'Sarah'}!</h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{subGreeting}</p>
                </div>
            </div>
            <div className="relative" ref={notificationRef}>
                <button
                    onClick={handleBellClick}
                    className="size-10 rounded-full bg-white shadow items-center justify-center transition-all active:scale-90 relative border-none outline-none ring-0 flex"
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
                                            <span className="material-symbols-outlined notranslate text-sm">campaign</span>
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
                                            <span className="material-symbols-outlined notranslate text-sm">verified</span>
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
const PointsCard = ({ totalPoints, semesterLabel, academicYearLabel }) => {
    const levelThresholds = [0, 100, 300, 600, 1000, 1500];
    const levelNames = ['Pemula', 'Rajin', 'Bintang Ibadah', 'Mujahid', 'Hafidz Cilik', 'Master'];
    const levelBadges = ['🌱', '⭐', '🌟', '🏅', '🏆', '👑'];
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // 5500ms allows the bounce to finish at the "bottom" (landed) state
        // Cycle is approx 1s, landing is at ~0.5s, 1.5s, ... 5.5s
        const timer = setTimeout(() => setIsAnimating(false), 5500);
        return () => clearTimeout(timer);
    }, []);

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

    return (
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
            {/* White glow effects */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/30 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-16 -mb-16"></div>
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

            {/* Decorative Stars with floating animation */}
            <div className="absolute -bottom-4 right-8 text-[5rem] opacity-10 rotate-12 text-yellow-200 pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
                ★
            </div>
            <div className="absolute bottom-8 right-16 text-[2rem] opacity-15 -rotate-6 text-yellow-200 pointer-events-none animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                ★
            </div>
            <div className="absolute bottom-2 right-24 text-[1.5rem] opacity-10 rotate-3 text-yellow-200 pointer-events-none animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                ★
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-blue-100 font-medium mb-1">Total Poin Kamu</p>
                        <h1 className="text-4xl font-black text-white flex items-center gap-2">
                            {totalPoints.toLocaleString()} <span className="text-amber-300 text-3xl">★</span>
                        </h1>
                    </div>
                    {/* Academic Year Badge */}
                    <div className="bg-white/10 backdrop-blur-md px-2 py-1 rounded-xl border border-white/20 shadow-sm flex items-center gap-2">
                        <div className={`size-7 rounded-full bg-white/20 flex items-center justify-center border border-white/10 ${isAnimating ? 'animate-bounce' : ''}`}>
                            <span className="material-symbols-outlined notranslate text-sm text-white">school</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-blue-50 font-bold leading-none">{semesterLabel || 'Semester'}</span>
                            <span className="text-[10px] font-bold text-white leading-none">{academicYearLabel || '-'}</span>
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
            {/* Section Title */}
            <div className="flex items-center gap-2.5 mb-3">
                <div className="size-8 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined notranslate text-lg">chat</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Catatan Guru</h3>
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
            subtitle: `${safeStats.todayCount}/${safeStats.targetDaily}`,
            icon: "🎯",
            path: "/student/input",
            bg: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
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
            count: pendingCount,
            subtitle: "Menunggu dinilai \u00A0🧐",
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
            {/* Section Title */}
            <div className="flex items-center gap-2.5 mb-4">
                <div className="size-8 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined notranslate text-lg">grid_view</span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Menu Utama</h3>
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
                            {card.icon === "verified" ? <span className="material-symbols-outlined notranslate text-[4rem]">verified</span> : card.icon}
                        </div>

                        {/* Glass Shine */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 via-transparent to-black/5 pointer-events-none"></div>

                        <div className="relative z-10 p-3.5 flex flex-col h-full">
                            {/* Top Row */}
                            <div className="flex justify-between items-start">
                                <div className="size-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm border border-white/20 text-white">
                                    {card.icon === "verified" ? (
                                        <span className="material-symbols-outlined notranslate text-lg">verified</span>
                                    ) : (
                                        <span className="text-lg filter drop-shadow-sm">{card.icon}</span>
                                    )}
                                </div>
                                <div className="px-2 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center min-h-[18px]">
                                    <span className="text-[7px] font-black text-white uppercase tracking-widest drop-shadow-sm leading-none pt-[1px]">{card.pill}</span>
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className="flex-1 flex items-center justify-between gap-1">
                                <div className="min-w-0 flex-1">
                                    {card.hasProgress ? (
                                        <>
                                            <h4 className="font-extrabold text-[13px] text-white tracking-tight leading-4 mb-1 drop-shadow-sm line-clamp-1">
                                                {card.title}
                                            </h4>
                                            <p className="text-[10px] font-semibold text-white/90 mb-1">{card.subtitle}</p>
                                            <div className="bg-blue-900/30 rounded-full h-2 overflow-hidden border border-white/10">
                                                <div
                                                    className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 h-full rounded-full transition-all duration-700 ease-out"
                                                    style={{ width: `${card.progress}%` }}
                                                ></div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="font-extrabold text-[13px] text-white tracking-tight leading-4 mb-1 drop-shadow-sm line-clamp-1">
                                                {card.title}
                                            </h4>
                                            <p className="text-[10px] font-semibold text-white/90 line-clamp-1">{card.subtitle}</p>
                                        </>
                                    )}
                                </div>

                                {/* Right Side Big Count */}
                                {card.count !== undefined && (
                                    <span className="text-4xl font-black text-white leading-none tracking-tight drop-shadow-sm -mb-1 mr-3">{card.count}</span>
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
    const navigate = useNavigate();
    // Show only last 6 activities
    const recentActivities = activities?.slice(0, 6) || [];
    const [expandedCards, setExpandedCards] = React.useState({});

    const toggleCardExpansion = (cardId) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    const formatDateIndonesian = (dateStr) => {
        if (!dateStr) return { dayName: '', fullDate: '' };
        let date;
        if (dateStr === 'Hari ini') {
            date = new Date();
        } else {
            date = new Date(dateStr);
            if (isNaN(date.getTime())) return { dayName: dateStr, fullDate: '' };
        }

        const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(date);
        const fullDate = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);

        return { dayName, fullDate };
    };

    const getStatusConfig = (status) => {
        if (status === 'Terverifikasi' || status === 'Disetujui') {
            return {
                icon: <FaCheckCircle className="text-sm" />,
                color: 'text-emerald-500',
                bg: 'bg-emerald-50',
                label: status === 'Disetujui' ? 'Disetujui' : 'Terverifikasi',
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
        const c = category ? category.toLowerCase() : '';

        // Salat Wajib
        if (c.includes('salat wajib') || (t.includes('salat') && (t.includes('subuh') || t.includes('dzuhur') || t.includes('ashar') || t.includes('maghrib') || t.includes('isya')))) {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaMosque className="text-xl" /> };
        }

        // Tadarus Al-Qur'an
        if (c.includes('tadarus') || c.includes('al-qur')) {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaBookOpen className="text-xl" /> };
        }

        // Hijrati
        if (c.includes('hijrati')) {
            return { bg: 'bg-amber-50', color: 'text-amber-600', icon: <FaBookOpen className="text-xl" /> };
        }

        // Salat Duha
        if (t.includes('duha') || t.includes('dhuha')) {
            return { bg: 'bg-amber-50', color: 'text-amber-600', icon: <FaCloudSun className="text-xl" /> };
        }

        // Salat Tahajud
        if (t.includes('tahajud')) {
            return { bg: 'bg-indigo-50', color: 'text-indigo-600', icon: <MdNightsStay className="text-xl" /> };
        }

        // Salat Rawatib
        if (t.includes('rawatib')) {
            return { bg: 'bg-cyan-50', color: 'text-cyan-600', icon: <FaMosque className="text-xl" /> };
        }

        // Puasa
        if (t.includes('puasa')) {
            if (t.includes('daud')) return { bg: 'bg-purple-50', color: 'text-purple-600', icon: <MdNoFood className="text-xl" /> };
            return { bg: 'bg-rose-50', color: 'text-rose-600', icon: <MdNoFood className="text-xl" /> };
        }

        // Infaq / Sedekah
        if (t.includes('infaq') || t.includes('infak') || t.includes('sedekah')) {
            return { bg: 'bg-emerald-50', color: 'text-emerald-600', icon: <BiSolidDonateHeart className="text-xl" /> };
        }

        // Bantu Orang Tua
        if (t.includes('bantu orang tua') || t.includes('ortu')) {
            return { bg: 'bg-rose-50', color: 'text-rose-600', icon: <FaHeart className="text-xl" /> };
        }

        // Bantu Sesama
        if (t.includes('bantu sesama')) {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaHandHoldingHeart className="text-xl" /> };
        }

        // Melakukan 5S
        if (t.includes('5s') || t.includes('melakukan 5s')) {
            return { bg: 'bg-amber-50', color: 'text-amber-600', icon: <FaSmileWink className="text-xl" /> };
        }

        // 5 Kata Ajaib
        if (t.includes('kata ajaib') || t.includes('5 kata')) {
            return { bg: 'bg-purple-50', color: 'text-purple-600', icon: <FaMagic className="text-xl" /> };
        }

        // Tidak Berkata Kasar
        if (t.includes('tidak berkata') || t.includes('kasar')) {
            return { bg: 'bg-teal-50', color: 'text-teal-600', icon: <FaCommentSlash className="text-xl" /> };
        }

        // Catatan
        if (t.includes('catatan') || category === 'Catatan') {
            return { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FaStickyNote className="text-xl" /> };
        }

        // Ibadah Sunah (general)
        if (c.includes('ibadah sunah')) {
            return { bg: 'bg-amber-50', color: 'text-amber-600', icon: <FaStar className="text-xl" /> };
        }

        // Literasi
        if (c.includes('literasi') || t.includes('literasi')) {
            return { bg: 'bg-indigo-50', color: 'text-indigo-600', icon: <FaBookOpen className="text-xl" /> };
        }

        // Ibadah Lainnya (general)
        if (c.includes('ibadah lainnya')) {
            return { bg: 'bg-pink-50', color: 'text-pink-600', icon: <FaHeart className="text-xl" /> };
        }

        // Fallback
        return { bg: 'bg-slate-50', color: 'text-slate-600', icon: <FaStar className="text-xl" /> };
    };

    // Group activities by date using a unique key but keeping formatting info
    const groupedActivities = recentActivities.reduce((groups, activity) => {
        const rawDate = activity.date || 'Hari ini';
        const { dayName, fullDate } = formatDateIndonesian(rawDate);
        const key = `${dayName}, ${fullDate}`;
        if (!groups[key]) {
            groups[key] = { activities: [], dayName, fullDate };
        }
        groups[key].activities.push(activity);
        return groups;
    }, {});

    // NEW: Calculate total counts per date from the full activities list (using the same key)
    const fullDateCounts = (activities || []).reduce((acc, curr) => {
        const rawDate = curr.date || 'Hari ini';
        const { dayName, fullDate } = formatDateIndonesian(rawDate);
        const key = `${dayName}, ${fullDate}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const hasActivities = Object.keys(groupedActivities).length > 0;

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {hasActivities ? (
                Object.entries(groupedActivities).map(([key, group], groupIdx) => (
                    <div key={key}>
                        {/* Date Header - Redesigned to match Mockup */}
                        {(groupIdx > 0 || Object.keys(groupedActivities).length === 1) && (
                            <div className={`pl-6 pr-6 py-3.5 flex items-center justify-between bg-slate-50/60 border-b border-slate-100 ${groupIdx > 0 ? 'border-t border-dashed border-slate-200' : ''}`}>
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-none">
                                        {group.dayName}
                                    </h4>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <span className="material-symbols-outlined text-[10px]">calendar_month</span>
                                        <span className="text-[11px] font-medium">{group.fullDate}</span>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100/50 shadow-sm flex items-center gap-1.5">
                                    {fullDateCounts[key] || 0} Aktivitas
                                </span>
                            </div>
                        )}
                        {/* Activities Grid */}
                        <div className="px-4 pt-3 pb-4 space-y-3">
                            {group.activities.map((activity, idx) => {
                                const statusConfig = getStatusConfig(activity.status);
                                const cardId = activity.id || `activity-${key}-${idx}`;
                                const isExpanded = expandedCards[cardId];
                                // Use activity's own styling if available, otherwise use getActivityStyle
                                const fallbackStyle = getActivityStyle(activity.title, activity.category);
                                const style = {
                                    bg: activity.bg || fallbackStyle.bg,
                                    color: activity.color || fallbackStyle.color,
                                    icon: fallbackStyle.icon
                                };

                                return (
                                    <div
                                        key={cardId}
                                        className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ring-1 ring-slate-100/50"
                                    >
                                        {/* Ticket Stub (Main Header) */}
                                        <div
                                            onClick={() => toggleCardExpansion(cardId)}
                                            className="p-4 relative cursor-pointer active:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${style.bg}`}>
                                                    <span className={`${style.color} text-xl`}>
                                                        {style.icon}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 pt-0.5">
                                                    <h4 className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug mb-1">
                                                        {activity.title}
                                                    </h4>
                                                    {/* Date Badge */}
                                                    <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-medium text-slate-500 border border-slate-100">
                                                        {activity.time}
                                                    </div>
                                                </div>

                                                {/* Right Side Info & Chevron Wrapper */}
                                                <div className="flex items-start gap-2 shrink-0 pl-1">
                                                    <div className="text-right">
                                                        <div className="text-xs font-bold text-blue-500 mb-0.5">
                                                            +{activity.points}
                                                        </div>
                                                        <div className={`text-[9px] font-semibold ${statusConfig.isPending ? 'text-yellow-600' : 'text-slate-400'}`}>
                                                            {statusConfig.isPending ? 'Menunggu' : statusConfig.label}
                                                        </div>
                                                    </div>

                                                    {/* Chevron (Flex Item) */}
                                                    <div className={`text-slate-300 transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}>
                                                        <span className="material-symbols-outlined text-lg">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Ticket Body */}
                                        <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>

                                            {/* Dashed Separator with Cutouts */}
                                            <div className="relative flex items-center h-4 overflow-hidden">
                                                <div className="w-full border-t border-dashed border-slate-100"></div>
                                                {/* Left Cutout */}
                                                <div className="absolute -left-2 size-4 bg-[#F8FAFC] rounded-full shadow-[inset_-1px_0_2px_rgba(0,0,0,0.02)]"></div>
                                                {/* Right Cutout */}
                                                <div className="absolute -right-2 size-4 bg-[#F8FAFC] rounded-full shadow-[inset_1px_0_2px_rgba(0,0,0,0.02)]"></div>
                                            </div>

                                            {/* Detail Content */}
                                            <div className="px-4 pb-4 pt-1 space-y-3">
                                                {/* Category */}
                                                <div className="grid grid-cols-[90px_1fr] items-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Kategori</span>
                                                    <div>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block ${activity.categoryBg || activity.bg || 'bg-blue-50'} ${activity.categoryColor || activity.color || 'text-blue-600'}`}>
                                                            {activity.category || 'Ibadah'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="grid grid-cols-[90px_1fr] items-baseline">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Keterangan</span>
                                                    <p className="text-[11px] font-medium text-slate-600 italic leading-relaxed">
                                                        {(() => {
                                                            const title = activity.title || '';
                                                            const time = activity.time || '';
                                                            const lowerTitle = title.toLowerCase();

                                                            // NEW: Prefer subtitle if available (carries custom formatted info)
                                                            if (activity.subtitle) return activity.subtitle;

                                                            // Check if it's a prayer activity
                                                            if (lowerTitle.includes('shalat') || lowerTitle.includes('sholat')) {
                                                                // Extract prayer name (remove common words)
                                                                const prayerName = title.replace(/Shalat|Sholat|Berjamaah|Sendiri|Munfarid|Wajib|Sunnah/gi, '').trim();

                                                                // Determine status
                                                                let status = '';
                                                                if (lowerTitle.includes('berjamaah')) status = 'Berjamaah';
                                                                else if (lowerTitle.includes('sendiri') || lowerTitle.includes('munfarid')) status = 'Sendiri';

                                                                // Format: "Shalat [Name] [Status] - [Time] WIB"
                                                                const cleanedTime = time.replace(/\s*WIB\s*/gi, '').trim();
                                                                return `Shalat ${prayerName} ${status} - ${cleanedTime} WIB`.replace(/\s+/g, ' ');
                                                            }

                                                            // Default fallback
                                                            const cleanTime = time.replace(/\s*WIB\s*$/i, '');
                                                            return `"${activity.subtitle || title} • ${cleanTime} WIB"`;
                                                        })()}
                                                    </p>
                                                </div>

                                                {/* Status */}
                                                <div className="grid grid-cols-[90px_1fr] items-center">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Status</span>
                                                    <div className="flex items-center gap-2">
                                                        {statusConfig.isPending ? (
                                                            <div className="flex items-center gap-2">
                                                                <FaHourglassHalf className="text-yellow-500 text-xs animate-pulse" />
                                                                <span className="text-[11px] font-semibold text-yellow-600">Menunggu</span>
                                                            </div>
                                                        ) : (
                                                            <div className={`flex items-center gap-2 ${statusConfig.color}`}>
                                                                {statusConfig.icon}
                                                                <span className="text-[11px] font-semibold">{statusConfig.label}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 border-none m-4">
                    <span className="material-symbols-outlined text-3xl mb-2 opacity-30 text-gray-400">event_note</span>
                    <p className="text-xs text-gray-400 font-medium">Belum ada aktivitas hari ini</p>
                </div>
            )}

            {hasActivities && (
                <div className="border-t border-slate-50 bg-slate-50/30">
                    <button
                        onClick={() => navigate('/student/history')}
                        className="w-full py-3.5 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-blue-600 active:bg-blue-50/50 transition-all duration-200"
                    >
                        Lihat Semua Aktivitas
                        <span className="material-symbols-outlined notranslate text-[18px] opacity-70">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
};

const DashboardMobile = ({ activities, stats, studentInfo, teacherNote }) => {
    const navigate = useNavigate();

    // Filter verified activities for notifications
    const verifiedActivities = activities?.filter(a => a.status === 'Terverifikasi') || [];

    return (
        <div className="h-screen bg-[#F8FAFC] font-sans relative overflow-hidden notranslate" translate="no">
            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

            <div className="h-full relative overflow-y-auto scrollbar-hide">
                <div className="min-h-full pb-24">
                    {/* Header - Sticky with Staggered Entrance */}
                    <div className="px-6 py-4 pt-[calc(1rem+env(safe-area-inset-top))] relative bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-[60] transition-all duration-300 animate-fade-in-up opacity-0 border-b border-slate-200" style={{ animationDuration: '0.6s' }}>
                        <HeaderMobile
                            student={studentInfo}
                            teacherNote={teacherNote}
                            verifiedActivities={verifiedActivities}
                        />
                    </div>

                    <div className="px-6 space-y-6 relative z-10 pt-4">
                        {/* 1. Points Card (Delay 0.1s) */}
                        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                            <PointsCard
                                totalPoints={stats?.totalPoints || 0}
                                semesterLabel={stats?.semesterLabel}
                                academicYearLabel={stats?.academicYearLabel}
                            />
                        </div>

                        {/* 2. Teacher Notes (Delay 0.2s) */}
                        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                            <TeacherNotes note={teacherNote} />
                        </div>

                        {/* 3. Menu Cards (Delay 0.3s) */}
                        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                            <MenuCards stats={stats} activities={activities} />
                        </div>

                        {/* 4. Recent Activity (Delay 0.4s) */}
                        <div className="animate-fade-in-up opacity-0 pb-1" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.9s' }}>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="size-8 rounded-xl bg-blue-100/50 text-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined notranslate text-lg">history</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-slate-800">Aktivitas Terakhir</h3>
                            </div>
                            <ActivityList activities={activities} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMobile;
