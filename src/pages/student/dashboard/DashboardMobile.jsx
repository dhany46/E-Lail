import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
                    <p className="text-[11px] text-gray-500 font-semibold tracking-wide">Assalamualaikum 👋</p>
                    <h2 className="text-lg font-extrabold text-gray-800 leading-none truncate max-w-[180px]">Kakak {student?.name || 'Sarah'}!</h2>
                    <p className="text-[11px] text-blue-500 font-medium mt-0.5">{subGreeting}</p>
                </div>
            </div>
            <div className="relative" ref={notificationRef}>
                <button
                    onClick={handleBellClick}
                    className="size-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all active:scale-95 relative border border-gray-100"
                >
                    <span className="material-symbols-outlined text-xl text-gray-600">notifications</span>
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
                        <div className="max-h-[300px] overflow-y-auto">
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
                    {/* Badge display instead of Tukar */}
                    <div className="size-14 rounded-2xl bg-white/25 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg">
                        <span className="text-2xl">{levelBadge}</span>
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
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-50 group">

                {/* Header Row */}
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                        Catatan Guru
                    </h3>
                    <div className="relative">
                        <span className="bg-slate-50 text-slate-500 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-100">
                            {note.date}
                        </span>
                        {/* Notification Dot */}
                        {note.isNew && (
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-full w-full bg-rose-500 border-2 border-white"></span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Message Content */}
                <p className="text-xs sm:text-[13px] font-medium text-slate-600 leading-[1.6] mb-3 sm:mb-4">
                    "{note.message}"
                </p>

                {/* Footer / Teacher Name */}
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {note.teacherName} <span className="text-slate-300">•</span> Wali Kelas
                </p>
            </div>
        </div>
    );
};

// Menu Cards Component
const MenuCards = ({ stats }) => {
    const navigate = useNavigate();

    // Fallback stats if undefined
    const safeStats = stats || { todayCount: 4, targetDaily: 5 }; // Defaulting to 4/5 for demo based on screenshot
    const progressPercentage = Math.min((safeStats.todayCount / safeStats.targetDaily) * 100, 100);

    const cards = [
        {
            title: "Lapor Ibadah",
            subtitle: "Catat kegiatanmu",
            icon: "📝", // Emoji back for fun
            path: "/student/input",
            bg: "bg-gradient-to-br from-amber-400 to-orange-500", // Adjusted for "smooth light" feel
            shadow: "shadow-orange-200",
            delay: "0s"
        },
        {
            title: "Riwayat",
            // subtitle: "Lihat catatan lalu",
            subtitle: `${safeStats.todayCount}/${safeStats.targetDaily} Selesai • ${Math.round(progressPercentage)}%`, // New progress subtitle
            icon: "📚",
            path: "/student/history",
            bg: "bg-gradient-to-br from-blue-400 to-blue-600",
            shadow: "shadow-blue-200",
            delay: "0.1s",
            hasProgress: true, // Flag to render progress bar
            progress: progressPercentage
        },
        {
            title: "Peringkat",
            subtitle: "Juara minggu ini",
            icon: "🏆",
            path: "/student/leaderboard",
            bg: "bg-gradient-to-br from-purple-400 to-purple-600",
            shadow: "shadow-purple-200",
            delay: "0.2s"
        },
        {
            title: "Jadwal Sholat",
            subtitle: "Waktu ibadah",
            icon: "🕌",
            path: "/student/input",
            bg: "bg-gradient-to-br from-teal-300 to-teal-500",
            shadow: "shadow-teal-200",
            delay: "0.3s"
        }
    ];

    return (
        <div className="mt-6 mb-4 px-1">
            <h3 className="text-sm font-bold text-gray-800 mb-3 ml-1">Menu Utama</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {cards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(card.path)}
                        className={`relative text-left p-4 sm:p-5 rounded-[1.8rem] ${card.bg} overflow-hidden group animate-fade-in-up
                        transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-95 shadow-lg ${card.shadow}`}
                        style={{ animationDelay: card.delay }}
                    >
                        {/* Smooth White Light Overlay - The "Glow" */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none"></div>

                        {/* Soft Radial Highlight in Corner */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none mix-blend-overlay"></div>

                        <div className="relative z-10 w-full">
                            {/* Bouncy Icon Container */}
                            <div className="size-10 sm:size-12 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center mb-4 sm:mb-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/20 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl sm:text-2xl filter drop-shadow-sm">{card.icon}</span>
                            </div>
                            <h4 className="font-extrabold text-base sm:text-lg text-white mb-0.5 leading-tight tracking-wide drop-shadow-md">{card.title}</h4>
                            <p className="text-[10px] sm:text-xs font-semibold text-white/90">{card.subtitle}</p>

                            {/* Mini Progress Bar for History Card */}
                            {card.hasProgress && (
                                <div className="mt-2 w-full h-1.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                                    <div
                                        className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${card.progress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Activity List Component
const ActivityList = ({ activities }) => {
    // Show only last 5 activities
    const recentActivities = activities?.slice(0, 5) || [];

    return (
        <div className="space-y-3">
            {recentActivities.length > 0 ? (
                recentActivities.map((activity, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-50 animate-fade-in-up"
                        style={{ animationDelay: `${0.1 * idx}s` }}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="size-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                                <span className="material-symbols-outlined text-xl">{activity.icon || 'history'}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{activity.title}</h4>
                                <p className="text-[10px] text-gray-400 font-medium truncate">{activity.time} • {activity.status}</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 ml-2">
                            +{activity.points}
                        </span>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <span className="material-symbols-outlined text-2xl mb-2 opacity-50 text-gray-400">event_note</span>
                    <p className="text-xs text-gray-400 font-medium">Belum ada aktivitas hari ini</p>
                </div>
            )}
        </div>
    );
};

const DashboardMobile = ({ activities, stats, studentInfo }) => {
    // Mock teacher note (di sini agar bisa dipass ke HeaderMobile dan TeacherNotes)
    const mockTeacherNote = {
        teacherName: 'Ustadz Ahmad',
        teacherInitials: 'UA',
        message: 'Alhamdulillah, semangat belajar dan beribadah terus ya! Jangan lupa hafalan Juz 30 minggu depan 📖',
        date: 'Hari ini',
        isNew: true
    };

    // Filter verified activities for notifications
    const verifiedActivities = activities?.filter(a => a.status === 'Terverifikasi') || [];

    return (
        <div className="min-h-screen bg-[#EEF7FF] font-sans pb-32 overflow-x-hidden">
            {/* Smooth Background Gradient Decoration */}
            <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>

            {/* Header - Sticky with Staggered Entrance */}
            <div className="px-6 pt-8 pb-6 sticky top-0 bg-[#EEF7FF]/95 backdrop-blur-xl z-30 transition-all duration-300 animate-fade-in-up border-b border-blue-200 shadow-sm" style={{ animationDuration: '0.6s' }}>
                <HeaderMobile
                    student={studentInfo}
                    teacherNote={mockTeacherNote}
                    verifiedActivities={verifiedActivities}
                />
            </div>

            <div className="px-6 space-y-5 relative z-10 pt-2">
                {/* 1. Points Card (Delay 0.1s) */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <PointsCard totalPoints={stats?.totalPoints || 0} />
                </div>

                {/* 2. Teacher Notes (Delay 0.2s) - Moved up as Progress is now in Menu */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <TeacherNotes note={mockTeacherNote} />
                </div>

                {/* 3. Menu Cards (Delay 0.3s) - Now contains Progress in Riwayat */}
                <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <MenuCards stats={stats} />
                </div>

                {/* 4. Recent Activity (Delay 0.4s) */}
                <div className="animate-fade-in-up opacity-0 pb-6" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.9s' }}>
                    <h3 className="text-sm font-bold text-gray-800 mb-4 ml-1 flex items-center gap-2">
                        <span>Aktivitas Terakhir</span>
                        <div className="h-px w-full bg-gray-100 flex-1"></div>
                    </h3>
                    <ActivityList activities={activities} />
                </div>
            </div>

            {/* Bottom Navigation handled by StudentLayout */}
        </div>
    );
};

export default DashboardMobile;
