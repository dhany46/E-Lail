import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const TeacherLayout = () => {
    const navigate = useNavigate();

    const SidebarItem = ({ icon, label, to, active }) => (
        <NavLink
            to={to}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${active
                    ? 'bg-emerald-50 text-emerald-600 font-bold shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }
            `}
        >
            <span className={`material-symbols-outlined text-2xl transition-transform group-hover:scale-110 ${active ? 'fill-1' : ''}`}>
                {icon}
            </span>
            <span className="text-sm">{label}</span>
        </NavLink>
    );

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-emerald-200 shadow-lg">
                            <span className="material-symbols-outlined text-2xl">menu_book</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-gray-800 leading-tight tracking-tight">Buku Lail Online</h1>
                            <p className="text-[10px] text-gray-400 font-bold tracking-wide">SD Plus 3 Al-Muhajirin</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <SidebarItem to="/teacher/dashboard" icon="dashboard" label="Dashboard" active={location.pathname === '/teacher/dashboard'} />
                    <SidebarItem to="/teacher/reports" icon="checklist" label="Manajemen Laporan" active={location.pathname.startsWith('/teacher/reports')} />
                    <SidebarItem to="/teacher/students" icon="groups" label="Detail Siswa" active={location.pathname.startsWith('/teacher/students')} />
                    <SidebarItem to="/teacher/settings" icon="settings" label="Pengaturan" active={location.pathname === '/teacher/settings'} />
                </div>

                <div className="p-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <img
                                src="https://ui-avatars.com/api/?name=Ust+Ahmad&background=10b981&color=fff"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 truncate">Ust. Ahmad</h4>
                            <p className="text-xs text-gray-400 font-medium truncate">Wali Kelas 4B</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-white p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 group-hover:border-gray-200"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8 lg:p-10 relative">
                {/* Decorative background blur */}
                <div className="fixed top-0 left-72 right-0 h-64 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none -z-10"></div>

                <Outlet />
            </main>
        </div>
    );
};

export default TeacherLayout;
