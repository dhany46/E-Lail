import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, ChevronDown, Info, School, GraduationCap, Star, Book, Pencil, Rocket, Cloud, Sparkles } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('Admin'); // 'Admin', 'Guru', or 'Siswa'
    const [formData, setFormData] = useState({
        email: '',
        nis: ''
    });
    const [showRoleMenu, setShowRoleMenu] = useState(false);

    // Custom CSS for floating animation
    const floatAnimation = `
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
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite 2s; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50"
            style={{ fontFamily: "'Lexend', sans-serif" }}>

            <style>{floatAnimation}</style>

            {/* Vibrant Modern Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Modern Gradient Blobs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000"></div>

                {/* Floating 3D-ish Icons */}
                <div className="absolute top-[10%] left-[10%] text-emerald-400 animate-float">
                    <Cloud size={100} fill="currentColor" className="opacity-40" />
                </div>
                <div className="absolute top-[20%] right-[10%] text-yellow-400 animate-float-delayed">
                    <Star size={80} fill="currentColor" className="opacity-80 drop-shadow-md" />
                </div>
                <div className="absolute bottom-[10%] left-[5%] text-cyan-400 animate-float-slow">
                    <Rocket size={80} fill="currentColor" className="opacity-60" />
                </div>
                <div className="absolute top-[50%] right-[5%] text-pink-300 animate-float">
                    <Sparkles size={60} fill="currentColor" className="opacity-50" />
                </div>
            </div>

            {/* Main Card - Big Radius, Soft Shadow */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-emerald-100 flex overflow-hidden w-full max-w-[1100px] min-h-[600px] relative z-10 border border-white/50">

                {/* Left Side - Vibrant Brand Gradient */}
                <div className="hidden lg:flex w-[45%] flex-col items-center justify-center relative p-10 text-white overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700">

                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 2px, transparent 0)', backgroundSize: '32px 32px' }}>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Bouncing Logo - Rounded Full to hide black corners */}
                        <div className="w-48 h-48 bg-white/20 backdrop-blur-sm rounded-full p-4 mb-6 shadow-2xl flex items-center justify-center animate-float ring-4 ring-white/30">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-inner bg-black">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain scale-110" />
                            </div>
                        </div>

                        {/* Bold Typography (No Serif!) */}
                        <div className="relative mb-6 group cursor-default z-20">
                            <h1 className="text-4xl font-black tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-amber-400 transform transition-transform group-hover:scale-105 duration-300">
                                Buku Lail Online
                            </h1>
                            <div className="absolute -top-6 -right-6 text-3xl animate-bounce delay-700">✨</div>
                        </div>

                        {/* School Name - Solid Pill */}
                        <div className="flex items-center gap-2 px-6 py-2 bg-white/90 rounded-full mb-8 shadow-lg shadow-emerald-900/20 transform hover:-translate-y-1 transition-all duration-300">
                            <span className="text-emerald-600">🏫</span>
                            <p className="text-emerald-800 font-extrabold tracking-widest text-sm uppercase">
                                SD Plus 3 Al-Muhajirin
                            </p>
                        </div>

                        {/* Modern Glass Quote */}
                        <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl relative group transition-all hover:bg-white/20 cursor-default hover:scale-[1.02] duration-300">
                            <div className="absolute -top-3 -left-2 text-3xl">🌟</div>
                            <p className="text-base font-bold leading-relaxed text-emerald-50 drop-shadow-md">
                                "Yuk jadi anak hebat! 🚀 Catat amal baikmu, raih bintang, dan buat bangga Ayah Bunda!"
                            </p>
                            <div className="absolute -bottom-3 -right-2 text-3xl">🚀</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Chunky UI */}
                <div className="w-full lg:w-[55%] bg-white/60 flex flex-col justify-center items-center p-8 lg:p-12 relative">
                    <div className="w-full max-w-[400px]">

                        {/* Friendly Heading */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-3">
                                Assalamu’alaikum, Juara! <span className="animate-bounce inline-block">👋</span>
                            </h2>
                            <p className="text-slate-500 text-base font-medium">
                                Siap mengejar prestasi dan pahala hari ini?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Chunky Role Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Login Sebagai</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={toggleRole}
                                        className={`w-full h-16 px-4 rounded-2xl border-4 text-left flex items-center justify-between transition-all duration-200 group active:scale-[0.98]
                                            ${showRoleMenu ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                                ${role === 'Admin' ? 'bg-amber-100 text-amber-600' : role === 'Guru' ? 'bg-emerald-100 text-emerald-600' : 'bg-cyan-100 text-cyan-600'}`}>
                                                {role === 'Admin' ? <School size={24} /> : role === 'Guru' ? <GraduationCap size={24} /> : <User size={24} />}
                                            </div>
                                            <div>
                                                <span className="block font-black text-slate-700 text-lg">{role}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                                    {role === 'Siswa' ? 'Murid Hebat' : role === 'Guru' ? 'Guru Teladan' : 'Admin Sekolah'}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronDown size={24} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showRoleMenu && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-slate-100 rounded-2xl shadow-xl z-50 p-2 animate-fade-in-up">
                                            {['Admin', 'Guru', 'Siswa'].map((r) => (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => selectRole(r)}
                                                    className={`w-full px-3 py-2 text-left rounded-xl hover:bg-slate-50 flex items-center gap-3 transition-colors mb-1 last:mb-0 group
                                                        ${role === r ? 'bg-slate-50 ring-2 ring-emerald-100' : ''}`}
                                                >
                                                    <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${r === 'Admin' ? 'bg-amber-100 text-amber-600' :
                                                            r === 'Guru' ? 'bg-emerald-100 text-emerald-600' :
                                                                'bg-cyan-100 text-cyan-600'
                                                        }`}>
                                                        {r === 'Admin' ? <School size={18} /> : r === 'Guru' ? <GraduationCap size={18} /> : <User size={18} />}
                                                    </div>
                                                    <span className="font-bold text-slate-700 text-sm">{r}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Chunky Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                                    {role === 'Siswa' ? 'Nomor Induk Siswa' : `Email ${role}`}
                                </label>
                                <div className="relative group">
                                    <div className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors
                                        ${currentColor === 'amber' ? 'text-amber-500' : currentColor === 'emerald' ? 'text-emerald-500' : 'text-cyan-500'}`}>
                                        {role === 'Siswa' ? <User size={20} /> : <Mail size={20} />}
                                    </div>
                                    <input
                                        type={role === 'Siswa' ? 'text' : 'email'}
                                        name={role === 'Siswa' ? 'nis' : 'email'}
                                        className={`w-full h-14 pl-14 pr-4 bg-white border-4 rounded-2xl focus:outline-none focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 text-base
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

                            {/* Big Action Button */}
                            <button
                                type="submit"
                                className={`w-full h-14 text-white font-black rounded-2xl shadow-lg transition-all text-lg mt-2 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2
                                    ${role === 'Admin' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' :
                                        role === 'Guru' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' :
                                            'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-200'}`}
                            >
                                <span>Masuk Sekarang</span>
                                <Rocket size={20} className="animate-pulse" />
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors">
                                Butuh bantuan? Hubungi Guru Kelas
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
