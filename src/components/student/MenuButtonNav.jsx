import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaTrophy, FaUser } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

const MenuButtonNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/student/dashboard' },
        { icon: <FaHistory />, label: 'Riwayat', path: '/student/history' },
        { icon: <FaTrophy />, label: 'Peringkat', path: '/student/leaderboard' },
        { icon: <FaUser />, label: 'Profil', path: '/student/profile' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none flex justify-center">
            <div className="w-full relative">
                {/* FAB Container - Centered and floating above */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-5 pointer-events-auto z-20">
                    <button
                        onClick={() => navigate('/student/input')}
                        className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(59,130,246,0.4)] border-[3px] border-white active:scale-95 transition-transform"
                    >
                        <MdAdd className="text-2xl" />
                    </button>
                </div>

                {/* Navigation Bar */}
                <div className="bg-white px-6 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-1.5 rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-slate-50 pointer-events-auto relative z-10">
                    <div className="grid grid-cols-5 items-center h-[50px]">

                        <NavItem
                            item={navItems[0]}
                            isActive={isActive(navItems[0].path)}
                            onClick={() => navigate(navItems[0].path)}
                        />
                        <NavItem
                            item={navItems[1]}
                            isActive={isActive(navItems[1].path)}
                            onClick={() => navigate(navItems[1].path)}
                        />

                        {/* Spacer for FAB */}
                        <div className="pointer-events-none w-full h-full"></div>

                        <NavItem
                            item={navItems[2]}
                            isActive={isActive(navItems[2].path)}
                            onClick={() => navigate(navItems[2].path)}
                        />
                        <NavItem
                            item={navItems[3]}
                            isActive={isActive(navItems[3].path)}
                            onClick={() => navigate(navItems[3].path)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ item, isActive, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-0 w-full h-full transition-all duration-300 group"
    >
        <div className={`relative p-1 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'
            }`}>
            <span className={`text-[20px] transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}>
                {item.icon}
            </span>
        </div>
        <span className={`text-[9px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400'
            }`}>
            {item.label}
        </span>
    </button>
);

export default MenuButtonNav;
