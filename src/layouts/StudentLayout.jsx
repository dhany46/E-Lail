import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/logo.jpg';
import Background from '../components/ui/Background';
import MenuButtonNav from '../components/student/MenuButtonNav';
import PWAInstallPrompt from '../components/ui/PWAInstallPrompt';
import PullToRefresh from '../components/ui/PullToRefresh';
import { StudentProvider, useStudentContext } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import StudentHeader from '../components/student/StudentHeader';

const SidebarItem = ({ icon, label, to, active }) => {
    const { navigationBlocker } = useStudentContext();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (navigationBlocker) {
            e.preventDefault();
            navigationBlocker(to);
        }
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active
                ? 'bg-primary/10 text-primary-dark group'
                : 'text-text-primary-light hover:bg-gray-100'
                }`}
        >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

const BottomNavItem = ({ icon, label, to, active }) => {
    return (
        <Link
            to={to}
            className={`flex flex-col items-center justify-center p-2 transition-colors ${active
                ? 'text-primary'
                : 'text-gray-400 hover:text-gray-600'
                }`}
        >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>{icon}</span>
            <span className="text-[10px] font-medium mt-1">{label}</span>
        </Link>
    );
};

const StudentLayoutContent = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Scroll to top when location changes
    React.useEffect(() => {
        const scrollContainer = document.querySelector('.scroll-smooth');
        if (scrollContainer) {
            scrollContainer.scrollTo(0, 0);
        }
    }, [location.pathname]);

    // Check if we're on mobile dashboard or history (full-container pages)
    const isFullContainerPage = ['/student/dashboard', '/student/history', '/student/input', '/student/leaderboard', '/student/profile'].includes(location.pathname);

    return (
        <div className="text-text-primary-light font-display antialiased overflow-hidden h-[100dvh] flex relative bg-transparent">
            {/* Hide background on mobile dashboard */}
            {!isFullContainerPage && <Background />}
            <div className="md:contents">{isFullContainerPage && <Background />}</div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar (Hidden on Mobile) */}
            <aside className={`w-60 h-full bg-white/70 backdrop-blur-md border-r border-white/20 flex flex-col flex-shrink-0 transition-transform duration-300 z-50 fixed inset-y-0 left-0 md:relative md:translate-x-0 -translate-x-full hidden md:flex`}>
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

                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                    <Link
                        to="/student/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/student/dashboard'
                            ? 'bg-gradient-to-r from-primary/10 to-emerald-50 text-primary shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-xl">🏠</span>
                        <span className="text-sm font-bold">Dashboard</span>
                    </Link>
                    <Link
                        to="/student/input"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/student/input'
                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-xl">✏️</span>
                        <span className="text-sm font-bold">Catat Ibadah</span>
                    </Link>
                    <Link
                        to="/student/history"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/student/history'
                            ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-xl">📜</span>
                        <span className="text-sm font-bold">Riwayat</span>
                    </Link>
                    <Link
                        to="/student/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === '/student/profile'
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-xl">👤</span>
                        <span className="text-sm font-bold">Profil Saya</span>
                    </Link>
                </nav>

                <div className="px-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                        <div className="size-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden">
                            {user?.photo ? (
                                <img src={user.photo} alt="Avatar" className="size-full rounded-full object-cover" />
                            ) : (
                                <span>{user?.initials || user?.name?.substring(0, 2).toUpperCase() || 'SIS'}</span>
                            )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-bold text-gray-800 truncate">{user?.name || 'Siswa'}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{user?.class ? `Kelas ${user.class}` : '-'}</span>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="size-8 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                            title="Keluar"
                        >
                            <span className="material-symbols-outlined text-base">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Bottom Navigation for Mobile (Global) */}
            <MenuButtonNav />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden z-10 relative bg-transparent">
                {/* Header for Mobile (Optional, or just keep content) */}
                {!['/student/dashboard', '/student/menu', '/student/history', '/student/input', '/student/leaderboard', '/student/profile'].includes(location.pathname) && (
                    <div className="md:hidden">
                        <StudentHeader user={user} variant="simple" />
                    </div>
                )}

                {/* Content Outlet */}
                {/* Modified: Remove generic scrolling for full container pages to let them handle their own scrolling (and P2R) */}
                <div className={`flex-1 ${isFullContainerPage ? 'overflow-hidden p-0 md:p-6 lg:p-8' : 'overflow-y-auto scrollbar-hide scroll-smooth overscroll-y-auto p-4 md:p-6 lg:p-8 pb-24'} md:pb-6`}>
                    <div className="w-full max-w-full md:max-w-screen-xl mx-auto h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="h-full"
                            >
                                <PullToRefresh onRefresh={() => window.location.reload()}>
                                    <Outlet />
                                </PullToRefresh>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StudentLayout = () => {
    return (
        <StudentProvider>
            <StudentLayoutContent />
            <PWAInstallPrompt />
        </StudentProvider>
    );
};

export default StudentLayout;
