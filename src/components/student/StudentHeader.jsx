import React, { useState, useEffect, useRef, useMemo } from 'react';

import { FaBell } from "react-icons/fa";

// --- Helpers ---

const getGreetingMessage = (variant, user) => {
    const hour = new Date().getHours();
    const firstName = user?.name || 'Siswa';

    // Base greetings
    let greeting = null;
    let subGreeting = 'Semangat beribadah! 💪';
    let title = `Kakak ${firstName}!`;

    // Time-based improvements for dashboard
    if (variant === 'dashboard') {
        greeting = 'Assalamualaikum 👋'; // Only for dashboard
        if (hour >= 3 && hour < 10) subGreeting = 'Sudah sholat Subuh? 🌅';
        else if (hour >= 10 && hour < 15) subGreeting = 'Jangan lupa Dzuhur ya! ☀️';
        else if (hour >= 15 && hour < 18) subGreeting = 'Waktunya Ashar! 🌤️';
        else subGreeting = 'Sudah Isya belum? 🌙';
    } else if (variant === 'profile') {
        greeting = `👋 Hai ${firstName}!`;
        subGreeting = 'Ini profil dan pencapaianmu. ✨';
        title = greeting;
    } else if (variant === 'simple') {
        title = `Hai, ${firstName}!`;
    }

    return { greeting, subGreeting, title };

    if (variant === 'profile') {
        greeting = `👋 Hai ${firstName}!`;
        subGreeting = 'Ini profil dan pencapaianmu. ✨';
        title = greeting; // Default title
    } else if (variant === 'simple') {
        title = `Hai, ${firstName}!`;
    }

    return { greeting, subGreeting, title };
};

// --- Sub-Components ---

const Avatar = ({ user }) => {
    return (
        <div className="size-12 rounded-full ring-2 ring-teal-400/70 ring-offset-2 ring-offset-blue-50 shrink-0 overflow-hidden">
            {user?.photo ? (
                <img src={user.photo} alt="Avatar" className="size-full rounded-full object-cover" />
            ) : (
                <div className={`size-full rounded-full bg-gradient-to-br ${user?.color || 'from-blue-400 to-blue-600'} flex items-center justify-center text-white font-bold text-lg`}>
                    {user?.initials || user?.name?.substring(0, 2).toUpperCase() || 'S'}
                </div>
            )}
        </div>
    );
};

const NotificationItem = ({ type, data, showBadge, isFading }) => {
    const isTeacherNote = type === 'teacherNote';
    const bgHover = isTeacherNote ? 'hover:bg-blue-50/30' : 'hover:bg-emerald-50/30';
    const iconBg = isTeacherNote ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600';
    const icon = isTeacherNote ? 'campaign' : 'verified';
    const title = isTeacherNote ? 'Catatan Guru Baru' : 'Laporan Diterima';
    const message = isTeacherNote ? data.message : data.title;
    const footer = isTeacherNote ? `Dari ${data.teacherName}` : `${data.date} • ${data.points} Poin`;
    const footerColor = isTeacherNote ? 'text-blue-500' : 'text-emerald-500';

    return (
        <div className={`p-4 border-b border-gray-50 ${bgHover} transition-colors`}>
            <div className="flex gap-3">
                <div className={`size-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined notranslate text-sm">{icon}</span>
                </div>
                <div className='flex-1'>
                    <p className="text-xs font-bold text-gray-800 mb-0.5">{title}</p>
                    <p className="text-[10px] text-gray-500 line-clamp-2">{message}</p>
                    <p className={`text-[9px] ${footerColor} font-medium mt-1`}>{footer}</p>
                </div>
                {showBadge && (
                    <div className={`size-2 rounded-full bg-red-500 shrink-0 mt-1 transition-opacity duration-[2000ms] ${isFading ? 'opacity-0' : 'opacity-100'}`}></div>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---

const StudentHeader = ({
    user,
    teacherNote,
    verifiedActivities,
    variant = 'simple', // 'dashboard', 'profile', 'simple'
    className = '',
    title: propTitle,
    subtitle: propSubtitle
}) => {
    // State
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const notificationRef = useRef(null);

    // Derived Logic
    const notificationCount = (teacherNote?.isNew ? 1 : 0) + (verifiedActivities?.length || 0);
    const hasNotifications = teacherNote || (verifiedActivities && verifiedActivities.length > 0);

    const [lastReadCount, setLastReadCount] = useState(() => {
        return parseInt(localStorage.getItem('notification_last_read_count') || '0', 10);
    });

    const showBadge = notificationCount > lastReadCount;
    const { greeting, subGreeting, title: generatedTitle } = useMemo(() => getGreetingMessage(variant, user), [variant, user]);

    // Use props if provided, otherwise fallback to generated
    const displayTitle = propTitle || generatedTitle;
    const displaySubtitle = propSubtitle || subGreeting;

    // Click Outside Handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Badge Animation Logic
    useEffect(() => {
        if (isNotificationsOpen && showBadge) {
            const startFadeTimer = setTimeout(() => setIsFading(true), 500);
            localStorage.setItem('notification_last_read_count', notificationCount.toString());
            const markReadTimer = setTimeout(() => {
                setLastReadCount(notificationCount);
                setIsFading(false);
            }, 2500);
            return () => { clearTimeout(startFadeTimer); clearTimeout(markReadTimer); };
        } else if (!isNotificationsOpen) {
            setIsFading(false);
        }
    }, [isNotificationsOpen, showBadge, notificationCount]);

    const handleBellClick = () => {
        if (!hasNotifications && variant !== 'dashboard') return;
        setIsNotificationsOpen((prev) => !prev);
    };

    return (
        <div className={`relative z-[60] bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl shadow-sm px-6 py-4 flex items-center justify-between transition-all duration-300 ${className}`}>

            {/* Left Section: Avatar & Greeting */}
            <div className="flex items-center gap-4">
                <Avatar user={user} />

                <div className="flex flex-col">
                    {variant === 'profile' ? (
                        <>
                            <h1 className="text-lg font-extrabold text-slate-900 leading-tight flex items-center gap-1">
                                {greeting}
                            </h1>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{subGreeting}</p>
                        </>
                    ) : (
                        <>
                            {greeting && (
                                <p className="text-[10px] text-blue-500 font-semibold tracking-wide mb-0.5">{greeting}</p>
                            )}
                            <h2 className="text-base font-extrabold text-slate-800 leading-tight truncate max-w-[180px]">
                                {displayTitle}
                            </h2>
                            {(variant === 'dashboard' || propSubtitle) && (
                                <p className="text-[10px] text-slate-400 font-medium mt-1">{displaySubtitle}</p>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Right Section: Notification Bell */}
            {(hasNotifications || variant === 'dashboard') && (
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={handleBellClick}
                        className="size-10 rounded-full bg-white shadow flex items-center justify-center transition-all active:scale-95 hover:shadow-md border border-slate-100"
                        aria-label="Notifikasi"
                    >
                        <FaBell className="text-lg text-slate-600" />
                        {showBadge && (
                            <span className={`absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}></span>
                        )}
                    </button>

                    {/* Dropdown */}
                    {isNotificationsOpen && (
                        <div className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] overflow-hidden transform origin-top-right animate-fade-in-up">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="text-sm font-bold text-gray-800">Notifikasi</h3>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{notificationCount} Baru</span>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                                {/* Empty State */}
                                {!teacherNote && (!verifiedActivities || verifiedActivities.length === 0) && (
                                    <div className="p-8 text-center text-gray-400">
                                        <div className="mx-auto size-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                            <FaBell className="text-gray-300" />
                                        </div>
                                        <p className="text-xs">Belum ada notifikasi baru</p>
                                    </div>
                                )}

                                {/* Content */}
                                {teacherNote && (
                                    <NotificationItem
                                        type="teacherNote"
                                        data={teacherNote}
                                        showBadge={teacherNote.isNew && showBadge}
                                        isFading={isFading}
                                    />
                                )}
                                {verifiedActivities?.map((activity, idx) => (
                                    <NotificationItem
                                        key={idx}
                                        type="activity"
                                        data={activity}
                                        showBadge={showBadge}
                                        isFading={isFading}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentHeader;
