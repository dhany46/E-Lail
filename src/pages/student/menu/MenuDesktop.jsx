import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../../context/StudentContext';

const MenuDesktop = () => {
    const navigate = useNavigate();
    const { student } = useStudentContext();

    const menuItems = [
        {
            title: "Dashboard",
            icon: "home",
            path: "/student/dashboard",
            color: "text-blue-500",
            bg: "bg-blue-50",
            description: "Ringkasan aktivitas hari ini"
        },
        {
            title: "Catat Ibadah",
            icon: "edit_calendar",
            path: "/student/input",
            color: "text-amber-500",
            bg: "bg-amber-50",
            description: "Laporkan kegiatan ibadahmu"
        },
        {
            title: "Riwayat",
            icon: "history",
            path: "/student/history",
            color: "text-purple-500",
            bg: "bg-purple-50",
            description: "Lihat catatan masa lalu"
        },
        {
            title: "Peringkat",
            icon: "leaderboard",
            path: "/student/leaderboard",
            color: "text-orange-500",
            bg: "bg-orange-50",
            description: "Cek posisimu di klasemen"
        },
        {
            title: "Profil Saya",
            icon: "person",
            path: "/student/profile",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            description: "Pengaturan akun dan badge"
        },
        {
            title: "Pengaturan",
            icon: "settings",
            path: "/student/settings",
            color: "text-gray-500",
            bg: "bg-gray-50",
            description: "Ubah preferensi aplikasi"
        }
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="material-symbols-outlined text-9xl">grid_view</span>
                </div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="size-24 rounded-full bg-white/20 p-1 backdrop-blur-sm">
                        <img
                            src={`https://ui-avatars.com/api/?name=${student?.name || 'Student'}&background=dcfce7&color=16a34a`}
                            alt="Profile"
                            className="w-full h-full rounded-full border-2 border-white object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Menu Utama</h1>
                        <p className="text-emerald-50 mt-1 text-lg">Akses cepat ke semua fitur Buku Lail</p>
                    </div>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1 group"
                    >
                        <div className={`size-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                    </Link>
                ))}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-100 flex flex-col gap-4 hover:shadow-lg transition-all hover:-translate-y-1 group text-left"
                >
                    <div className="size-14 rounded-xl bg-red-100 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-3xl">logout</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-600">Keluar Aplikasi</h3>
                        <p className="text-sm text-red-400 mt-1">Sampai jumpa lagi!</p>
                    </div>
                </button>
            </div>

            <div className="mt-12 text-center text-gray-400">
                <p className="text-sm font-bold tracking-widest uppercase">Buku Lail v2.0</p>
                <p className="text-xs mt-1">Platform Monitoring Ibadah Santri</p>
            </div>
        </div>
    );
};

export default MenuDesktop;
