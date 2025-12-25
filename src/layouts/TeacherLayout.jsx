import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Background from '../components/ui/Background';
import logo from '../assets/logo.jpg';

const TeacherLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="bg-transparent text-gray-800 font-sans antialiased overflow-hidden h-screen flex relative">
            <Background />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-60 h-full bg-white/70 backdrop-blur-md border-r border-white/20 flex flex-col flex-shrink-0 transition-transform duration-300 z-50 fixed inset-y-0 left-0 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header - Synced with Student Layout */}
                <div className="p-5 flex items-center gap-3 border-b-2 border-gray-200 mb-2">
                    <div className="p-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200/60 shrink-0">
                        <img
                            src={logo}
                            alt="Logo"
                            className="size-11 min-w-11 rounded-full ring-2 ring-white object-cover"
                        />
                    </div>
                    <div className="flex flex-col overflow-hidden min-w-0">
                        <h1 className="text-gray-800 text-sm font-bold leading-tight flex items-center gap-1">
                            <span>📚</span> Buku Lail
                        </h1>
                        <p className="text-gray-400 text-[10px] font-medium truncate">SD Plus 3 Al-Muhajirin</p>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden ml-auto p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Navigation - Colorful Items */}
                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
                    <NavLink
                        to="/teacher/dashboard"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 font-bold shadow-sm'
                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 font-medium'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                                    {isActive ? '🏠' : '🏡'}
                                </span>
                                <span className="text-sm">Dashboard</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/teacher/reports"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 font-bold shadow-sm'
                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 font-medium'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                                    {isActive ? '📋' : '📝'}
                                </span>
                                <span className="text-sm">Manajemen Laporan</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/teacher/students"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-bold shadow-sm'
                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 font-medium'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                                    {isActive ? '👥' : '👤'}
                                </span>
                                <span className="text-sm">Detail Siswa</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/teacher/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-600 font-bold shadow-sm'
                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 font-medium'
                            }`}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                                    {isActive ? '⚙️' : '🔧'}
                                </span>
                                <span className="text-sm">Pengaturan</span>
                            </>
                        )}
                    </NavLink>
                </nav>

                {/* User Profile - Synced with Student Layout */}
                <div className="px-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100/50 shadow-sm">
                        <div className="size-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                            <img
                                src="https://ui-avatars.com/api/?name=Ust+Ahmad&background=10b981&color=fff"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-bold text-gray-800 truncate">Ust. Ahmad</span>
                            <span className="text-[10px] text-gray-400 font-medium truncate">Wali Kelas 4B</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="size-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                            title="Keluar"
                        >
                            <span className="material-symbols-outlined text-base">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10 relative">
                {/* Mobile Toggle Button */}
                <div className="md:hidden p-4 pb-0">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-white/80 backdrop-blur-sm shadow-sm border border-white/20 rounded-lg text-gray-600 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="w-full max-w-7xl mx-auto pb-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherLayout;
