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
            <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-emerald-100 flex flex-col lg:flex-row overflow-hidden w-full max-w-[850px] xl:max-w-[1100px] 2xl:max-w-[1400px] min-h-[480px] xl:min-h-[600px] 2xl:min-h-[750px] relative z-10 border border-white/50">

                {/* Left Side - Vibrant Brand Gradient */}
                <div className="w-full lg:w-[45%] flex flex-col items-center justify-center relative p-6 text-white overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 shrink-0">

                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 2px, transparent 0)', backgroundSize: '32px 32px' }}>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Bouncing Logo - Rounded Full to hide black corners */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3 lg:mb-4 shadow-2xl flex items-center justify-center animate-float ring-4 ring-white/30">
                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-inner bg-black">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain scale-110" />
                            </div>
                        </div>

                        {/* Bold Typography (No Serif!) */}
                        <div className="relative mb-4 lg:mb-6 group cursor-default z-20">
                            <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-amber-400 transform transition-transform group-hover:scale-105 duration-300">
                                Buku Lail Online
                            </h1>
                            <div className="absolute -top-6 -right-6 text-3xl animate-bounce delay-700 hidden lg:block">✨</div>
                        </div>

                        {/* School Name - Solid Pill */}
                        <div className="flex items-center gap-2 px-6 py-2 xl:px-8 xl:py-3 bg-white/90 rounded-full mb-6 lg:mb-8 shadow-lg shadow-emerald-900/20 transform hover:-translate-y-1 transition-all duration-300">
                            <span className="text-emerald-600">🏫</span>
                            <p className="text-emerald-800 font-bold tracking-widest text-[10px] lg:text-xs xl:text-sm 2xl:text-base uppercase">
                                SD Plus 3 Al-Muhajirin
                            </p>
                        </div>

                        {/* Modern Glass Quote */}
                        <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 xl:p-8 border border-white/20 shadow-xl relative group transition-all hover:bg-white/20 cursor-default hover:scale-[1.02] duration-300 hidden lg:block">
                            <div className="absolute -top-3 -left-2 text-3xl">🌟</div>
                            <p className="text-sm xl:text-base 2xl:text-lg font-bold leading-relaxed text-emerald-50 drop-shadow-md">
                                "Yuk jadi anak hebat! 🚀 Catat amal baikmu, raih bintang, dan buat bangga Ayah Bunda!"
                            </p>
                            <div className="absolute -bottom-3 -right-2 text-3xl">🚀</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Chunky UI */}
                <div className="w-full lg:w-[55%] bg-white/60 flex flex-col justify-center items-center p-6 lg:p-8 relative flex-1">
                    <div className="w-full max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px]">

                        {/* Friendly Heading */}
                        <div className="mb-6 lg:mb-8 text-center lg:text-left">
                            <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extrabold text-slate-800 mb-1 flex items-center justify-center lg:justify-start gap-2">
                                Assalamu’alaikum! <span className="animate-bounce inline-block">👋</span>
                            </h2>
                            <p className="text-slate-500 text-xs lg:text-sm xl:text-base 2xl:text-lg font-medium">
                                Siap mengejar prestasi dan pahala hari ini?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Chunky Role Selector */}
                            <div className="space-y-2">
                                <label className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-400 uppercase tracking-wider ml-1">Login Sebagai</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={toggleRole}
                                        className={`w-full h-14 xl:h-16 2xl:h-20 px-4 rounded-xl border-[3px] text-left flex items-center justify-between transition-all duration-200 group active:scale-[0.98]
                                            ${showRoleMenu ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                                ${role === 'Admin' ? 'bg-amber-100 text-amber-600' : role === 'Guru' ? 'bg-emerald-100 text-emerald-600' : 'bg-cyan-100 text-cyan-600'}`}>
                                                {role === 'Admin' ? <School size={18} /> : role === 'Guru' ? <GraduationCap size={18} /> : <User size={18} />}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="font-extrabold text-slate-700 text-base xl:text-lg 2xl:text-xl leading-tight">{role}</span>
                                                <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-slate-400 uppercase tracking-wide leading-none mt-0.5">
                                                    {role === 'Siswa' ? 'Murid Hebat' : role === 'Guru' ? 'Guru Teladan' : 'Admin Sekolah'}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronDown size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showRoleMenu && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-slate-100 rounded-2xl shadow-xl z-50 p-2 animate-pop-in">
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
                                <label className="text-xs xl:text-sm 2xl:text-base font-bold text-slate-400 uppercase tracking-wider ml-1">
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
                                        className={`w-full h-12 xl:h-14 2xl:h-16 pl-12 pr-4 bg-white border-[3px] rounded-xl focus:outline-none focus:ring-0 transition-all font-bold text-slate-700 placeholder:text-slate-300 text-sm xl:text-base 2xl:text-lg
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
                                className={`w-full h-12 xl:h-14 2xl:h-16 text-white font-extrabold rounded-xl shadow-lg transition-all text-base xl:text-lg 2xl:text-xl mt-2 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2
                                    ${role === 'Admin' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' :
                                        role === 'Guru' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' :
                                            'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-200'}`} WITHOUT role='Siswa'
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
                                <div className="p-1 rounded-full bg-slate-100 group-hover:bg-emerald-100 transition-colors">
                                    <Info size={12} className="text-slate-500 group-hover:text-emerald-600" />
                                </div>
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
                        // Close if clicking the backdrop directly
                        if (e.target === e.currentTarget) setShowAboutModal(false);
                    }}
                >
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] overflow-hidden relative animate-pop-in border border-white/50 ring-1 ring-slate-100">

                        {/* Elegant Header */}
                        <div className="bg-emerald-600 p-4 text-center relative overflow-hidden">
                            {/* Abstract Shapes */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="absolute top-3 right-3 text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all z-50 cursor-pointer"
                                type="button"
                                aria-label="Close modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
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

                        {/* Content Body */}
                        <div className="p-4 space-y-4">

                            {/* Technology Stack Grid */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-slate-200"></span>
                                    Teknologi Utama
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        {
                                            name: 'React JS',
                                            icon: (
                                                <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#61DAFB]">
                                                    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                                                    <g stroke="currentColor" strokeWidth="1" fill="none">
                                                        <ellipse rx="10" ry="4.5"></ellipse>
                                                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                                                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                                                    </g>
                                                </svg>
                                            )
                                        },
                                        {
                                            name: 'Vite',
                                            icon: (
                                                <svg viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                                                    <path d="M399.641 45.4265L392.215 28.5284C389.962 23.4005 383.692 21.0924 378.508 23.4697L213.921 98.98L209.61 98.2435L205.3 98.98L40.7136 23.4697C35.5286 21.0924 29.259 23.4005 27.0055 28.5284L19.5794 45.4265C17.7573 49.5721 18.2721 54.4328 20.9439 58.0701L200.72 302.77C203.957 307.177 209.117 308.894 213.88 306.904L398.277 58.0701C400.948 54.4328 401.463 49.5721 399.641 45.4265Z" fill="#646CFF" stroke="#646CFF" strokeWidth="10" />
                                                    <path d="M209.61 247.936L27.0867 22.8465C23.978 19.0125 18.5772 18.3371 14.6547 21.3197L8.93279 25.6738C4.54516 29.0118 4.29541 35.4801 8.38426 39.1417L197.644 208.736L209.61 247.936Z" fill="#41D1FF" />
                                                    <path d="M209.61 247.936L392.134 22.8465C395.242 19.0125 400.643 18.3371 404.566 21.3197L410.288 25.6738C414.675 29.0118 414.925 35.4801 410.836 39.1417L221.577 208.736L209.61 247.936Z" fill="#BD34FE" />
                                                    <path d="M386.68 18.1565L209.61 364L32.5404 18.1565H386.68Z" fill="#FFC926" stroke="#FFC926" strokeWidth="10" />
                                                </svg>
                                            )
                                        },
                                        {
                                            name: 'Tailwind CSS',
                                            icon: (
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#38BDF8]">
                                                    <path d="M12.0002 6.5C12.1819 5.37898 12.8354 4.39169 13.8122 3.76632C15.3409 2.78775 17.3486 2.68652 18.963 3.50493C20.5774 4.32333 21.5186 5.9189 21.3813 7.63351C21.244 9.34812 20.0526 10.875 18.3188 11.5649C16.892 12.1325 15.2891 12.0831 13.9213 11.4393C13.7397 12.5599 13.0865 13.5467 12.11 14.1718C10.5815 15.1501 8.57424 15.2514 6.95995 14.4332C5.34567 13.6151 4.40428 12.0197 4.54133 10.3053C4.67838 8.59088 5.86944 7.06424 7.60281 6.37435C9.02868 5.80669 10.6307 5.85592 11.9982 6.49962L12.0002 6.5Z" fill="currentColor" />
                                                </svg>
                                            )
                                        },
                                        {
                                            name: 'Lucide Icons',
                                            icon: (
                                                <Sparkles size={16} className="text-[#F56565]" />
                                            )
                                        }
                                    ].map((item) => (
                                        <div key={item.name} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors">
                                            <span className="flex items-center justify-center w-5 h-5">{item.icon}</span>
                                            <span className="text-slate-700 font-bold text-[10px]">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Developer Professional Card */}
                            <div>
                                <h4 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-slate-200"></span>
                                    Kontak Developer
                                </h4>
                                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform"></div>

                                    <div className="flex items-start gap-3 reltive z-10">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 text-emerald-600">
                                            <User size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-slate-800 font-black text-sm leading-tight mb-0.5">Dani Ramdani, S.Kom</h5>
                                            <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-wide mb-2">Full Stack Developer</p>

                                            <div className="space-y-1.5">
                                                <a href="mailto:dhany46@gmail.com" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-[10px] font-medium group/link">
                                                    <div className="p-1 bg-white rounded-md border border-slate-200 group-hover/link:border-emerald-200 transition-colors">
                                                        <Mail size={12} />
                                                    </div>
                                                    dhany46@gmail.com
                                                </a>
                                                <div className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-[10px] font-medium group/link cursor-default">
                                                    <div className="p-1 bg-white rounded-md border border-slate-200 group-hover/link:border-emerald-200 transition-colors">
                                                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                    </div>
                                                    083820374734
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Elegant Footer */}
                        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
