import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import Background from '../components/ui/Background';

const SidebarItem = ({ icon, label, to, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active
                ? 'bg-primary/10 text-primary-dark group'
                : 'text-text-primary-light hover:bg-gray-100'
                }`}
        >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="bg-transparent text-text-primary-light font-display antialiased overflow-hidden h-screen flex relative">
            <Background />
            {/* Sidebar */}
            {/* Sidebar */}
            <aside className="w-64 h-full bg-white/70 backdrop-blur-md border-r border-white/20 flex flex-col flex-shrink-0 transition-colors duration-200 z-10">
                <div className="p-6 flex items-center gap-3">
                    <div
                        className="bg-center bg-no-repeat bg-cover bg-white rounded-full size-12 shrink-0 shadow-sm border border-gray-100"
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-text-primary-light text-base font-bold leading-tight truncate">Buku Lail Online</h1>
                        <p className="text-text-secondary-light text-xs font-medium truncate">SD Plus 3 Al-Muhajirin</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                    <SidebarItem
                        icon="dashboard"
                        label="Dashboard"
                        to="/admin/dashboard"
                        active={location.pathname === '/admin/dashboard'}
                    />
                    <SidebarItem
                        icon="group"
                        label="Data Siswa"
                        to="/admin/students"
                        active={location.pathname === '/admin/students'}
                    />
                    <SidebarItem
                        icon="supervisor_account"
                        label="Data Guru"
                        to="/admin/teachers"
                        active={location.pathname === '/admin/teachers'}
                    />
                    <SidebarItem
                        icon="school"
                        label="Manajemen Kelas"
                        to="/admin/classes"
                        active={location.pathname === '/admin/classes'}
                    />
                    <SidebarItem
                        icon="mosque"
                        label="Kegiatan Ibadah"
                        to="/admin/activities"
                        active={location.pathname === '/admin/activities'}
                    />
                    <SidebarItem
                        icon="settings"
                        label="Pengaturan"
                        to="/admin/settings"
                        active={location.pathname === '/admin/settings'}
                    />
                </nav>

                <div className="p-4">
                    <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold leading-normal tracking-wide transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span className="truncate">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent z-10">
                {/* Top Header */}
                <header className="bg-white/70 backdrop-blur-md border-b border-white/20 h-16 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-2 text-sm">
                        <a className="text-text-secondary-light hover:text-primary transition-colors" href="#">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-text-primary-light font-medium">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="relative hidden sm:block">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </span>
                            <input
                                className="w-64 bg-background-light border-none rounded-full py-2 pl-10 pr-4 text-sm text-text-primary-light placeholder-gray-400 focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="Cari siswa atau kelas..."
                                type="text"
                            />
                        </label>
                        <div className="flex items-center gap-3 pl-6">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-text-primary-light leading-none">Admin Sekolah</p>
                                <p className="text-xs text-text-secondary-light mt-1">Super Admin</p>
                            </div>
                            <div
                                className="size-9 rounded-full bg-gray-200 overflow-hidden"
                                style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=Admin+Sekolah&background=1dc956&color=fff)` }}
                            ></div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
