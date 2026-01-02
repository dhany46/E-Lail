import React, { useState } from 'react';
import { Settings, Shield, Award, Target, Bell, Info, LogOut, ChevronRight, Star, BookOpen, Trash2, Book, Mail, Phone, Sparkles, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AdminHeader from '../components/AdminHeader';

const SettingsMobile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [showAboutModal, setShowAboutModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const SettingGroup = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="px-6 mb-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
            <div className="bg-white mx-5 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {children}
            </div>
        </div>
    );

    const SettingItem = ({ icon: Icon, label, sublabel, color, onClick }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50/80 active:bg-slate-100 transition-colors border-b border-slate-100/80 last:border-0"
        >
            <div className="flex items-center gap-3.5 text-left">
                <div className={`size-9 rounded-xl ${color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="text-[13px] font-semibold text-slate-700">{label}</p>
                    {sublabel && <p className="text-[10px] font-medium text-slate-400 mt-0.5">{sublabel}</p>}
                </div>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
        </button>
    );

    return (
        <div className="min-h-[100dvh] bg-[#F8FAFC] pb-32 scrollbar-hide">
            {/* Header Section */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1 mb-4">
                <AdminHeader
                    title="Pengaturan"
                    subtitle="Konfigurasi Sistem & Akun"
                    showBell={true}
                />
            </div>

            <SettingGroup title="Gamifikasi & Aktivitas">
                <SettingItem
                    icon={Star}
                    label="Poin Ibadah"
                    sublabel="Atur bobot poin tiap kegiatan"
                    color="bg-amber-500"
                    onClick={() => navigate('/admin/worship-points')}
                />
                <SettingItem
                    icon={Target}
                    label="Target Harian"
                    sublabel="Standar pencapaian siswa"
                    color="bg-emerald-500"
                />
                <SettingItem
                    icon={Award}
                    label="Master Badge"
                    sublabel="Kelola syarat naik level"
                    color="bg-indigo-500"
                />
            </SettingGroup>

            <SettingGroup title="Sistem & Preferensi">
                <SettingItem
                    icon={Bell}
                    label="Notifikasi"
                    sublabel="Atur pengingat & broadcast"
                    color="bg-blue-500"
                />
                <SettingItem
                    icon={Shield}
                    label="Keamanan"
                    sublabel="Ganti password admin"
                    color="bg-slate-800"
                />
                <SettingItem
                    icon={BookOpen}
                    label="Tahun Ajaran"
                    sublabel="2025/2026 Ganjil"
                    color="bg-rose-500"
                />
            </SettingGroup>

            <SettingGroup title="Lainnya">
                <SettingItem
                    icon={Info}
                    label="Tentang Aplikasi"
                    sublabel="Versi 2.0.0 Stable"
                    color="bg-slate-400"
                    onClick={() => setShowAboutModal(true)}
                />
                <SettingItem
                    icon={Trash2}
                    label="Reset Data Aplikasi"
                    sublabel="Hapus semua data lokal"
                    color="bg-red-500"
                    onClick={() => {
                        if (confirm('PERINGATAN: Semua data tersimpan (Siswa, Guru, Laporan, Pengaturan) akan dihapus permanen. Akun Admin TIDAK akan terhapus. Lanjutkan?')) {
                            // Backup admin session
                            const adminSession = localStorage.getItem('user');

                            // Wipe everything
                            localStorage.clear();

                            // Restore admin session if exists
                            if (adminSession) {
                                localStorage.setItem('user', adminSession);
                            }

                            // Force reload to reset all states
                            window.location.reload();
                        }
                    }}
                />
                <SettingItem
                    icon={LogOut}
                    label="Keluar Akun"
                    color="bg-gradient-to-r from-rose-500 to-red-500"
                    onClick={handleLogout}
                />
            </SettingGroup>

            {/* About App Modal */}
            {showAboutModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowAboutModal(false);
                    }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative border border-white/50 ring-1 ring-slate-100" style={{ animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                        {/* Header */}
                        <div className="bg-emerald-600 p-4 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="absolute top-4 right-4 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50 cursor-pointer"
                                type="button"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl mb-2 shadow-lg ring-1 ring-white/30">
                                    <Book size={22} className="text-white" />
                                </div>
                                <h3 className="text-white text-lg font-black tracking-tight mb-1.5">
                                    Buku Lail Online
                                </h3>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-700/50 rounded-full border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                                    <span className="text-emerald-50 text-[10px] font-bold uppercase tracking-wider">Versi 2.0.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Technology Stack */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-slate-200"></span>
                                    Teknologi
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { name: 'React JS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-4 h-4" /> },
                                        { name: 'Vite', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" className="w-4 h-4" /> },
                                        { name: 'Tailwind', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="w-4 h-4" /> },
                                        { name: 'Lucide', icon: <Sparkles size={16} className="text-orange-500" /> }
                                    ].map((item) => (
                                        <div key={item.name} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                                            <div className="shrink-0 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <span className="text-slate-700 font-bold text-[11px]">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-slate-200"></span>
                                    Developer
                                </h4>
                                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-slate-800 font-bold text-[12px]">Dani Ramdani, S.Kom</p>
                                            <p className="text-emerald-600 text-[10px] font-bold uppercase">Full Stack Developer</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2 border-t border-slate-200/60">
                                        <a href="mailto:dhany46@gmail.com" className="flex items-center gap-2.5 text-slate-600 group p-1 rounded-lg">
                                            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                                <Mail size={12} className="text-slate-400" />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-700">dhany46@gmail.com</span>
                                        </a>
                                        <a href="https://wa.me/6283820374734" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-600 group p-1 rounded-lg">
                                            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                                <Phone size={12} className="text-slate-400" />
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-700">0838-2037-4734</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Dedication */}
                            <div>
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-100/50 text-center relative overflow-hidden">
                                    <p className="text-emerald-800 text-[10px] font-medium italic leading-relaxed relative z-10">
                                        "Didedikasikan untuk kemajuan pendidikan Islam."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-[12px] transition-all shadow-lg shadow-slate-200 transform active:scale-[0.98]"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsMobile;

