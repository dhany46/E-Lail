import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: 'home', label: 'Dashboard', path: '/student/dashboard' },
        { icon: 'history', label: 'Riwayat', path: '/student/history' },
        { icon: 'leaderboard', label: 'Peringkat', path: '/student/leaderboard' },
        { icon: 'person', label: 'Profil', path: '/student/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_-5px_rgba(59,130,246,0.15)] border-t-2 border-blue-400/30 px-4 pt-3 pb-5 z-40">
            <div className="flex justify-around items-center relative">
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path;

                    // FAB in center (after 2nd item)
                    if (idx === 2) {
                        return (
                            <React.Fragment key={idx}>
                                <button
                                    onClick={() => navigate('/student/input')}
                                    className="relative -top-5 size-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-2xl">add</span>
                                </button>

                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`flex flex-col items-center gap-0.5 ${isActive ? 'text-blue-500' : 'text-gray-400'} active:scale-95 transition-all`}
                                >
                                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                                        {item.icon}
                                    </span>
                                    <span className="text-[9px] font-semibold">{item.label}</span>
                                </button>
                            </React.Fragment>
                        );
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-0.5 ${isActive ? 'text-blue-500' : 'text-gray-400'} active:scale-95 transition-all`}
                        >
                            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                                {item.icon}
                            </span>
                            <span className="text-[9px] font-semibold">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileBottomNav;
