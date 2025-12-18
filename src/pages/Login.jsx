import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ChevronDown, Info, School, GraduationCap, Star, Book, Rocket, Cloud, Sparkles } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('Admin'); // 'Admin', 'Guru', or 'Siswa'
    const [formData, setFormData] = useState({
        email: '',
        nis: ''
    });
    const [showRoleMenu, setShowRoleMenu] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);

    // Custom CSS for animations
    const customStyles = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite 2s; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    `;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt', { role, ...formData });
        if (role === 'Admin') {
            navigate('/admin/dashboard');
        } else if (role === 'Guru') {
            navigate('/teacher/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleRole = () => setShowRoleMenu(!showRoleMenu);
    const selectRole = (r) => {
        setRole(r);
        setShowRoleMenu(false);
        setFormData({ email: '', nis: '' });
    };

    // Helper for Role Colors
    const getRoleColor = (r) => {
        if (r === 'Admin') return 'amber';
        if (r === 'Guru') return 'emerald';
        return 'sky'; // Siswa
    };

    const currentColor = getRoleColor(role);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-y-auto bg-slate-50"
            style={{ fontFamily: "'Nunito', sans-serif" }}>

            <style>{customStyles}</style>

            {/* Vibrant Modern Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Modern Gradient Blobs */}
                <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[96px] md:blur-[128px] opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-[96px] md:blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[96px] md:blur-[128px] opacity-70 animate-blob animation-delay-4000"></div>

                {/* Floating 3D-ish Icons */}
                <div className="absolute top-[10%] left-[10%] text-emerald-400 animate-float hidden md:block">
                    <Cloud size={100} fill="currentColor" className="opacity-40" />
                </div>
                <div className="absolute top-[20%] right-[10%] text-yellow-400 animate-float-delayed hidden md:block">
                    <Star size={80} fill="currentColor" className="opacity-80 drop-shadow-md" />
                </div>
                <div className="absolute bottom-[10%] left-[5%] text-cyan-400 animate-float-slow hidden md:block">
                    <Rocket size={80} fill="currentColor" className="opacity-60" />
                </div>
            </div>

            {/* Main Card - Mobile First: Stacked, Desktop: Row */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-[32px] shadow-2xl shadow-emerald-100 flex flex-col lg:flex-row overflow-hidden w-full max-w-md lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl min-h-0 lg:min-h-[600px] relative z-10 border border-white/50">

                {/* Left Side (Top on Mobile) - Branding */}
                <div className="w-full lg:w-[45%] flex flex-col items-center justify-center relative p-6 md:p-10 text-white overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 shrink-0">

                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 2px, transparent 0)', backgroundSize: '24px 24px' }}>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Logo */}
                        <div className="w-20 h-20 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full p-2.5 md:p-3 mb-3 md:mb-4 shadow-xl flex items-center justify-center animate-float ring-4 ring-white/30">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-inner bg-black">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain scale-110" />
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="relative mb-3 md:mb-6 group cursor-default z-20">
                            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-amber-400">
                                Buku Lail Online
                            </h1>
                            <div className="absolute -top-6 -right-6 text-3xl animate-bounce delay-700 hidden lg:block">✨</div>
                        </div>

                        {/* School Name */}
                        <div className="flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-white/90 rounded-full mb-2 md:mb-8 shadow-lg shadow-emerald-900/20">
                            <span className="text-emerald-600 text-xs md:text-base">🏫</span>
                            <p className="text-emerald-800 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                                SD Plus 3 Al-Muhajirin
                            </p>
                        </div>

                        {/* Quote - Hidden on small mobile, visible on larger screens */}
                        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 shadow-xl relative mt-4 md:mt-0 hidden sm:block">
                            <p className="text-sm md:text-base font-bold leading-relaxed text-emerald-50 drop-shadow-md">
                                "Yuk jadi anak hebat! 🚀 Catat amal baikmu, raih bintang, dan buat bangga Ayah Bunda!"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side (Bottom on Mobile) - Form */}
                <div className="w-full lg:w-[55%] bg-white/60 flex flex-col justify-center items-center p-6 md:p-10 relative flex-1">
                    <div className="w-full max-w-sm md:max-w-md">

                        {/* Heading */}
                        <div className="mb-6 text-center lg:text-left">
                            <h2 className="text-xl md:text-3xl font-extrabold text-slate-800 mb-1 flex items-center justify-center lg:justify-start gap-2">
                                Assalamu’alaikum! <span className="animate-bounce inline-block">👋</span>
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base font-medium">
                                Siap mengejar prestasi dan pahala hari ini?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

                            {/* Role Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Login Sebagai</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={toggleRole}
                                        className={`w-full h-12 md:h-16 px-4 rounded-xl border-[3px] text-left flex items-center justify-between transition-all duration-200 group active:scale-[0.98]
                                            ${showRoleMenu ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                                ${role === 'Admin' ? 'bg-amber-100 text-amber-600' : role === 'Guru' ? 'bg-emerald-100 text-emerald-600' : 'bg-cyan-100 text-cyan-600'}`}>
                                                {role === 'Admin' ? <School size={18} /> : role === 'Guru' ? <GraduationCap size={18} /> : <User size={18} />}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="font-extrabold text-slate-700 text-sm md:text-lg leading-tight">{role}</span>
                                            </div>
                                        </div>
                                        <ChevronDown size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showRoleMenu && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-100 rounded-xl shadow-xl z-50 p-1 animate-pop-in">
                                            {['Admin', 'Guru', 'Siswa'].map((r) => (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => selectRole(r)}
                                                    className={`w-full px-3 py-2 text-left rounded-lg hover:bg-slate-50 flex items-center gap-3 transition-colors mb-1 last:mb-0
                                                        ${role === r ? 'bg-slate-50 ring-1 ring-emerald-100' : ''}`}
                                                >
                                                    <div className={`p-1.5 rounded-md ${r === 'Admin' ? 'bg-amber-100 text-amber-600' :
                                                        r === 'Guru' ? 'bg-emerald-100 text-emerald-600' :
                                                            'bg-cyan-100 text-cyan-600'
                                                        }`}>
                                                        {r === 'Admin' ? <School size={16} /> : r === 'Guru' ? <GraduationCap size={16} /> : <User size={16} />}
                                                    </div>
                                                    <span className="font-bold text-slate-700 text-sm">{r}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Input Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                                    {role === 'Siswa' ? 'Nomor Induk Siswa' : `Email ${role}`}
                                </label>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors
                                        ${currentColor === 'amber' ? 'text-amber-500' : currentColor === 'emerald' ? 'text-emerald-500' : 'text-cyan-500'}`}>
                                        {role === 'Siswa' ? <User size={20} /> : <Mail size={20} />}
                                    </div>
                                    <input
                                        type={role === 'Siswa' ? 'text' : 'email'}
                                        name={role === 'Siswa' ? 'nis' : 'email'}
                                        className={`w-full h-12 md:h-14 pl-11 pr-4 bg-white border-[3px] rounded-xl focus:outline-none focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 text-sm md:text-base
                                            ${currentColor === 'amber' ? 'border-slate-100 focus:border-amber-400' :
                                                currentColor === 'emerald' ? 'border-slate-100 focus:border-emerald-400' :
                                                    'border-slate-100 focus:border-cyan-400'}`}
                                        placeholder={role === 'Siswa' ? 'Contoh: 12345' : 'nama@sekolah.sch.id'}
                                        value={role === 'Siswa' ? formData.nis : formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full h-12 md:h-14 text-white font-extrabold rounded-xl shadow-lg transition-all text-sm md:text-lg mt-2 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2
                                    ${role === 'Admin' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' :
                                        role === 'Guru' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' :
                                            'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-200'}`}
                            >
                                <span>Masuk Sekarang</span>
                                <Rocket size={20} className="animate-pulse" />
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setShowAboutModal(true)}
                                type="button"
                                className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2 mx-auto group"
                            >
                                <Info size={14} className="text-slate-400 group-hover:text-emerald-600" />
                                <span className="group-hover:underline decoration-2 underline-offset-2">Tentang Aplikasi</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Elegant About App Modal */}
            {showAboutModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowAboutModal(false);
                    }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] overflow-hidden relative animate-pop-in border border-white/50 ring-1 ring-slate-100">
                        {/* Header */}
                        <div className="bg-emerald-600 p-4 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="absolute top-3 right-3 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all z-50 cursor-pointer"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl mb-2 shadow-lg ring-1 ring-white/30">
                                    <Book size={20} className="text-white" />
                                </div>
                                <h3 className="text-white text-lg font-black tracking-tight mb-1">
                                    Buku Lail Online
                                </h3>
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-700/50 rounded-full border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                                    <span className="text-emerald-100 text-[10px] font-bold uppercase tracking-wider">Versi 1.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Technology Stack */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-slate-200"></span>
                                    Teknologi Utama
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {['React JS', 'Vite', 'Tailwind CSS', 'Lucide Icons'].map((item) => (
                                        <div key={item} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                                            <span className="text-slate-700 font-bold text-[10px]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-slate-200"></span>
                                    Kontak Developer
                                </h4>
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                                    <p className="text-slate-800 font-bold text-xs">Dani Ramdani, S.Kom</p>
                                    <p className="text-emerald-600 text-[10px] font-bold uppercase">Full Stack Developer</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-all"
                            >
                                Tutup Panel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
