// ... imports


const MenuMobile = () => {
    // ... hooks

    // ... menuItems

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="h-screen bg-[#EEF7FF] font-sans relative overflow-hidden">
            {/* Main Scrollable Content */}
            <div className="h-full overflow-y-auto scrollbar-hide scroll-smooth overscroll-none animate-fade-in pb-6">
                <div className="pt-4 px-4">
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className="size-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg">
                            <img
                                src={`https://ui-avatars.com/api/?name=${student?.name || 'Student'}&background=dcfce7&color=16a34a`}
                                alt="Profile"
                                className="w-full h-full rounded-full border-2 border-white object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">{student?.name || 'Siswa Lail'}</h1>
                            <p className="text-sm text-gray-500 font-medium">Kelas {student?.class || '4B'}</p>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {menuItems.map((item, index) => (
                            <Link
                                to={item.path}
                                key={index}
                                style={{ animationDelay: `${index * 0.05}s` }}
                                className="animate-fade-in-up opacity-0 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all active:bg-gray-50 aspect-[4/3] hover:shadow-md group relative overflow-hidden"
                            >
                                <div className={`size-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center shadow-sm group-active:scale-90 transition-transform duration-200`}>
                                    <span className="material-symbols-outlined notranslate text-3xl">{item.icon}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-700 text-center leading-tight group-active:opacity-70 transition-opacity">{item.title}</span>
                            </Link>
                        ))}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            style={{ animationDelay: `${menuItems.length * 0.05}s` }}
                            className="animate-fade-in-up opacity-0 bg-red-50 rounded-2xl p-5 shadow-sm border border-red-100 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all active:bg-red-100 aspect-[4/3] col-span-2 mt-2 group"
                        >
                            <div className="size-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center shadow-sm group-active:scale-90 transition-transform">
                                <span className="material-symbols-outlined notranslate text-3xl">logout</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-sm font-bold text-red-600">Keluar Aplikasi</span>
                                <span className="text-xs text-red-400">Sampai jumpa lagi! 👋</span>
                            </div>
                        </button>
                    </div>

                    {/* App Info */}
                    <div className="mt-8 text-center pb-8">
                        <p className="text-xs text-gray-300 font-bold tracking-widest uppercase">Buku Lail v2.0</p>
                        <p className="text-xs text-gray-300 mt-1">Dibuat dengan ❤️ untuk Santri</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MenuMobile;
