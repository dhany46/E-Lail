import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide on dashboard page (has its own nav)
    if (location.pathname === '/student/dashboard') {
        return null;
    }

    const navItems = [
        { icon: 'home', label: 'Dashboard', path: '/student/dashboard' },
        { icon: 'schedule', label: 'Riwayat', path: '/student/history' },
        { icon: 'leaderboard', label: 'Peringkat', path: '/student/leaderboard' },
        { icon: 'person', label: 'Profil', path: '/student/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            {/* FAB Button */}
            <div className="flex justify-center pointer-events-auto">
                <button
                    onClick={() => navigate('/student/input')}
                    className="relative -mb-10 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(59,130,246,0.5)] active:scale-95 transition-transform z-10 border-4 border-white"
                >
                    <span className="material-symbols-outlined notranslate text-white text-3xl">add</span>
                </button>
            </div>

            {/* Nav Bar - Full Width with Rounded Top */}
            <div className="bg-white px-8 pt-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pointer-events-auto rounded-t-3xl border-t border-slate-200 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                    {navItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;

                        // Spacer for FAB in center
                        if (idx === 2) {
                            return (
                                <React.Fragment key={item.path}>
                                    {/* Empty space for FAB */}
                                    <div className="w-16" />

                                    {/* Nav Item */}
                                    <button
                                        onClick={() => navigate(item.path)}
                                        className={`flex flex-col items-center min-w-[60px] transition-all active:scale-95 ${isActive ? 'text-blue-600' : 'text-slate-400'
                                            }`}
                                    >
                                        <span
                                            className="material-symbols-outlined notranslate text-[28px]"
                                            style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                                        >
                                            {item.icon}
                                        </span>
                                        <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                                            {item.label}
                                        </span>
                                    </button>
                                </React.Fragment>
                            );
                        }

                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center min-w-[60px] transition-all active:scale-95 ${isActive ? 'text-blue-600' : 'text-slate-400'
                                    }`}
                            >
                                <span
                                    className="material-symbols-outlined notranslate text-[28px]"
                                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                                >
                                    {item.icon}
                                </span>
                                <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileBottomNav;
