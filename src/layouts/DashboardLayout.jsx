import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Background from '../components/ui/Background';
import { useAuth } from '../context/AuthContext';
import AdminMenuButtonNav from '../components/admin/AdminMenuButtonNav';

const NavItems = [
    { icon: 'dashboard', label: 'Dashboard', to: '/admin/dashboard' },
    { icon: 'group', label: 'Siswa', to: '/admin/students' },
    { icon: 'supervisor_account', label: 'Guru', to: '/admin/teachers' },
    { icon: 'school', label: 'Kelas', to: '/admin/classes' },
    { icon: 'settings', label: 'Pengaturan', to: '/admin/settings' },
];

const SidebarItem = ({ icon, label, to, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${active
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>{icon}</span>
            <span className="text-sm font-bold">{label}</span>
        </Link>
    );
};

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-slate-50 h-[100dvh] flex overflow-hidden font-sans">
            <Background />

            {/* Desktop Sidebar */}
            {!isMobile && (
                <aside className="w-72 h-full bg-white border-r border-slate-100 flex flex-col shrink-0 z-50">
                    <div className="p-8 pb-4 flex items-center gap-3">
                        <div
                            className="bg-center bg-no-repeat bg-cover bg-white rounded-2xl size-12 shrink-0 shadow-sm border border-slate-100"
                            style={{ backgroundImage: `url(${logo})` }}
                        ></div>
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="text-slate-800 text-lg font-black leading-tight truncate tracking-tight">Lail Online</h1>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Admin Panel</p>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                        {NavItems.map((item) => (
                            <SidebarItem
                                key={item.to}
                                icon={item.icon}
                                label={item.label}
                                to={item.to}
                                active={location.pathname === item.to}
                            />
                        ))}
                    </nav>

                    {/* Admin Profile & Logout */}
                    <div className="p-6 border-t border-slate-50">
                        <div className="bg-slate-50 rounded-3xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                                    AS
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-bold text-slate-800 truncate">Admin Sekolah</span>
                                    <span className="text-[10px] font-medium text-slate-500">Super Admin</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="size-8 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-red-500 transition-all border border-slate-100 shadow-sm active:scale-90"
                            >
                                <span className="material-symbols-outlined text-lg">logout</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                {/* Desktop Header - Only on Desktop */}
                {!isMobile && (
                    <header className="h-20 flex items-center justify-between px-10 gap-4 shrink-0 transition-all">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span>Admin</span>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-slate-800">
                                {NavItems.find(item => item.to === location.pathname)?.label || 'Dashboard'}
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">search</span>
                                <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">notifications</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-800 leading-none">Admin Sekolah</p>
                                    <p className="text-[10px] font-bold text-blue-500 mt-1 uppercase tracking-widest">Online</p>
                                </div>
                                <div
                                    className="size-10 rounded-2xl bg-slate-200 border-2 border-white shadow-sm overflow-hidden"
                                    style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=Admin+Sekolah&background=0f172a&color=fff)` }}
                                ></div>
                            </div>
                        </div>
                    </header>
                )}

                {/* Content Outlet */}
                <div className={`flex-1 overflow-y-auto ${isMobile ? 'pb-24' : 'p-10'}`}>
                    <div className="w-full max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <AdminMenuButtonNav />
            </main>
        </div>
    );
};

export default DashboardLayout;
