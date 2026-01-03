import React from 'react';
import { FaBell } from "react-icons/fa";

const AdminHeader = ({ title, subtitle, user, showGreeting = false, showBell = false }) => {
    // Time-based greeting logic
    const hour = new Date().getHours();
    let dynamicSubGreeting = 'Memantau aktivitas ibadah harian';

    if (hour >= 3 && hour < 10) {
        dynamicSubGreeting = 'Monitoring laporan ibadah pagi hari';
    } else if (hour >= 10 && hour < 15) {
        dynamicSubGreeting = 'Verifikasi laporan ibadah siang hari';
    } else if (hour >= 15 && hour < 18) {
        dynamicSubGreeting = 'Rekapitulasi aktivitas ibadah sore';
    } else {
        dynamicSubGreeting = 'Evaluasi laporan ibadah harian';
    }

    const displaySubtitle = subtitle || dynamicSubGreeting;
    // Use user.name if provided, otherwise fallback to title or default
    const displayTitle = user?.name ? `Ustadz ${user.name}` : (title || 'Dashboard Utama');

    return (
        <div className="flex items-center justify-between py-1.5 mb-5 antialiased">
            <div className="flex items-center gap-4">
                {/* Avatar with professional ring and subtle shadow */}
                <div className="size-12 rounded-full ring-2 ring-blue-500/80 ring-offset-2 ring-offset-blue-50 shrink-0 shadow-md">
                    <img
                        src={user?.photo || "/avatars/dani.png"}
                        alt="Admin Avatar"
                        className="size-full rounded-full object-cover object-[center_20%]"
                    />
                </div>

                {/* Professional Text Content with refined typography */}
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 leading-tight truncate max-w-[200px]">
                        {displayTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {displaySubtitle}
                    </p>
                    {showGreeting && (
                        <p className="text-[10px] text-blue-500 font-semibold mt-0.5">
                            SD Plus 3 Al-Muhajirin
                        </p>
                    )}
                </div>
            </div>

            {/* Notification Bell - Only shown when showBell is true */}
            {showBell && (
                <div className="relative">
                    <button
                        className="size-11 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-all active:scale-95 hover:bg-slate-50 hover:shadow-md hover:border-blue-100 relative group"
                    >
                        <FaBell className="text-xl text-slate-500 group-hover:text-blue-600 transition-colors" />
                        <span className="absolute top-3 right-3 size-2.5 bg-red-500 rounded-full ring-2 ring-white shadow-sm transition-transform group-hover:scale-110"></span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminHeader;
