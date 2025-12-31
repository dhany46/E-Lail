import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaTrophy, FaCrown, FaMedal } from "react-icons/fa";

const LeaderboardMobile = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState('monthly');

    // Mock Data
    const leaderboardData = [
        { rank: 1, name: "Budi", points: 1500, avatar: "https://ui-avatars.com/api/?name=Budi&background=FFD700&color=fff" },
        { rank: 2, name: "Siti", points: 1450, avatar: "https://ui-avatars.com/api/?name=Siti&background=C0C0C0&color=fff" },
        { rank: 3, name: "Ahmad", points: 1400, avatar: "https://ui-avatars.com/api/?name=Ahmad&background=CD7F32&color=fff" },
        { rank: 4, name: "Sarah", points: 1300, avatar: "https://ui-avatars.com/api/?name=Sarah&background=random" },
        { rank: 5, name: "Rizky", points: 1250, avatar: "https://ui-avatars.com/api/?name=Rizky&background=random" },
        { rank: 6, name: "Dewi", points: 1200, avatar: "https://ui-avatars.com/api/?name=Dewi&background=random" },
        { rank: 7, name: "Putra", points: 1150, avatar: "https://ui-avatars.com/api/?name=Putra&background=random" },
        { rank: 8, name: "Linda", points: 1100, avatar: "https://ui-avatars.com/api/?name=Linda&background=random" },
        { rank: 9, name: "Umar", points: 1050, avatar: "https://ui-avatars.com/api/?name=Umar&background=random" },
        { rank: 10, name: "Fatimah", points: 1000, avatar: "https://ui-avatars.com/api/?name=Fatimah&background=random" },
        { rank: 11, name: "Joko", points: 950, avatar: "https://ui-avatars.com/api/?name=Joko&background=random" },
        { rank: 12, name: "Kamu (Fikri)", points: 800, avatar: "https://ui-avatars.com/api/?name=Fikri&background=F97316&color=fff" },
    ];

    const currentUser = leaderboardData[11];

    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth overscroll-y-auto bg-[#EEF7FF] font-sans relative pb-32">
            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>
            {/* Header */}
            <div className="px-6 py-4 sticky top-0 bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-40 border-b border-slate-200 animate-fade-in">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="size-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                             Panggung Juara <FaTrophy className="text-yellow-500 text-2xl drop-shadow-sm" />
                        </h1>
                        <p className="text-xs text-blue-500 font-medium">Siapa yang paling rajin? Yuk, balapan poin! 🚀</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-6 relative z-10 px-4 pt-6 mt-6">
                    
                    {/* Main Card Container */}
                <div className="bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    {/* Toggle */}
                    <div className="bg-gray-50 p-1.5 rounded-full flex text-sm font-bold shadow-inner mb-16 border border-gray-100">
                        <button
                            onClick={() => setPeriod('monthly')}
                            className={`flex-1 py-3 rounded-full transition-all duration-300 ${period === 'monthly' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        >
                            Bulanan
                        </button>
                        <button
                            onClick={() => setPeriod('semester')}
                            className={`flex-1 py-3 rounded-full transition-all duration-300 ${period === 'semester' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                        >
                            Semester
                        </button>
                    </div>

                    {/* Podium */}
                    <div className="flex items-end justify-center gap-3 mb-10 relative">
                        {/* Rank 2 */}
                        <div className="flex flex-col items-center w-1/3 z-10">
                            <div className="relative mb-2">
                                <div className="size-16 rounded-full border-4 border-slate-300 shadow-md overflow-hidden bg-slate-100">
                                    <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -top-2 -left-1">
                                    <FaMedal className="text-2xl text-slate-400 drop-shadow-sm rotate-[-15deg]" />
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-slate-300 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">#2</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm mt-2">{leaderboardData[1].name}</h3>
                            <p className="text-xs font-bold text-blue-500 mt-1">{leaderboardData[1].points} Pt</p>
                        </div>

                        {/* Rank 1 */}
                        <div className="flex flex-col items-center w-1/3 -mt-6 z-20">
                            <div className="relative mb-2">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                                    <FaCrown className="text-4xl text-yellow-500 drop-shadow-md" />
                                </div>
                                <div className="absolute inset-0 bg-yellow-200 blur-xl opacity-40 rounded-full"></div>
                                <div className="size-24 rounded-full border-4 border-yellow-400 shadow-xl shadow-yellow-100 overflow-hidden bg-yellow-50 relative z-10">
                                    <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-yellow-400 text-white text-sm font-black px-3.5 py-0.5 rounded-full shadow-md shadow-yellow-200 border border-yellow-300">#1</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mt-3">{leaderboardData[0].name}</h3>
                            <div className="bg-blue-50 px-3 py-1 rounded-full mt-1 border border-blue-100">
                                <p className="text-xs font-bold text-blue-700">{leaderboardData[0].points} Poin</p>
                            </div>
                        </div>

                        {/* Rank 3 */}
                        <div className="flex flex-col items-center w-1/3 z-10">
                            <div className="relative mb-2">
                                <div className="size-16 rounded-full border-4 border-orange-300 shadow-md overflow-hidden bg-orange-50">
                                    <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -top-2 -right-1">
                                    <FaMedal className="text-2xl text-orange-400 drop-shadow-sm rotate-[15deg]" />
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-orange-400 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">#3</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm mt-2">{leaderboardData[2].name}</h3>
                            <p className="text-xs font-bold text-blue-500 mt-1">{leaderboardData[2].points} Pt</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-300 text-xs font-bold tracking-widest uppercase">Top 10</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    {/* List */}
                    <div className="space-y-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        {leaderboardData.slice(3, 10).map((student, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 flex items-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 transition-all active:scale-[0.98]">
                                <div className="w-8 text-center font-black text-slate-300 text-lg italic">
                                    {student.rank}
                                </div>
                                <div className="size-10 rounded-full overflow-hidden mx-3 border border-slate-100 shadow-sm">
                                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-blue-600 font-bold text-sm block">{student.points}</span>
                                    <span className="text-slate-400 text-[10px] block">Poin</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-24 left-4 right-4 z-50 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', animationDuration: '0.6s' }}>
                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl py-2 px-4 flex items-center shadow-2xl shadow-blue-500/30 text-white relative overflow-hidden border-[3px] border-white ring-1 ring-slate-100">
                    
                    {/* Background Decoration */}
                    <FaStar className="absolute -right-4 -bottom-2 text-white/10 text-[5rem] rotate-12 pointer-events-none" />

                    {/* Left: Position */}
                    <div className="flex flex-col items-center justify-center pr-4 border-r border-white/60 mr-3 py-1">
                        <span className="text-[9px] font-bold leading-tight">Posisi</span>
                        <span className="text-xl font-black leading-none mt-0.5">{currentUser.rank}</span>
                    </div>

                    {/* Avatar */}
                    <div className="size-9 rounded-full border-2 border-white overflow-hidden flex-shrink-0 mr-3 bg-blue-300">
                        <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
                    </div>

                    {/* Middle: Info */}
                    <div className="flex-1 min-w-0 z-10">
                        <h4 className="font-bold text-sm leading-tight truncate">Kamu ({currentUser.name.split(' ')[0]})</h4>
                        <p className="text-[10px] font-medium opacity-90 truncate mt-0.5">Ayo kejar 50 poin lagi!</p>
                    </div>

                    {/* Right: Points */}
                    <div className="flex flex-col items-end z-10 pl-2">
                        <span className="text-xl font-black leading-none">{currentUser.points}</span>
                        <span className="text-[9px] font-medium">Poin</span>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default LeaderboardMobile;
