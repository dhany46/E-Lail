import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminMenuButtonNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: 'group', label: 'Siswa', path: '/admin/students' },
        { icon: 'supervisor_account', label: 'Guru', path: '/admin/teachers' },
        { icon: 'grid_view', label: 'Dasbor', path: '/admin/dashboard' },
        { icon: 'school', label: 'Kelas', path: '/admin/classes' },
        { icon: 'settings', label: 'Atur', path: '/admin/settings' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none flex justify-center lg:hidden">
            <div className="w-full relative">
                {/* FAB Container (Dashboard) - Centered and floating above */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-5 pointer-events-auto z-20">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className={`size-12 rounded-full flex items-center justify-center text-white border-[3px] border-white active:scale-95 transition-all duration-300 ${isActive('/admin/dashboard')
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_4px_16px_rgba(59,130,246,0.4)]'
                                : 'bg-slate-700 shadow-lg shadow-slate-200'
                            }`}
                    >
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                            grid_view
                        </span>
                    </button>
                </div>

                {/* Navigation Bar */}
                <div className="bg-white px-4 pb-[calc(0.8rem+env(safe-area-inset-bottom))] pt-1.5 rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-slate-50 pointer-events-auto relative z-10">
                    <div className="grid grid-cols-5 items-center h-[52px]">

                        <NavItem
                            item={navItems[0]}
                            active={isActive(navItems[0].path)}
                            onClick={() => navigate(navItems[0].path)}
                        />
                        <NavItem
                            item={navItems[1]}
                            active={isActive(navItems[1].path)}
                            onClick={() => navigate(navItems[1].path)}
                        />

                        {/* Spacer for FAB */}
                        <div className="flex flex-col items-center justify-center pt-5">
                            <span className={`text-[9px] font-bold tracking-tight transition-colors duration-300 ${isActive('/admin/dashboard') ? 'text-blue-600' : 'text-slate-400'
                                }`}>Dasbor</span>
                        </div>

                        <NavItem
                            item={navItems[3]}
                            active={isActive(navItems[3].path)}
                            onClick={() => navigate(navItems[3].path)}
                        />
                        <NavItem
                            item={navItems[4]}
                            active={isActive(navItems[4].path)}
                            onClick={() => navigate(navItems[4].path)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ item, active, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-0 w-full h-full transition-all duration-300 group"
    >
        <div className={`relative p-1 transition-all duration-300 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'
            }`}>
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>
                {item.icon}
            </span>
        </div>
        <span className={`text-[9px] font-bold tracking-tight transition-colors duration-300 ${active ? 'text-blue-600' : 'text-slate-400'
            }`}>
            {item.label}
        </span>
    </button>
);

export default AdminMenuButtonNav;
