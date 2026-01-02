import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaTrophy, FaCrown, FaMedal } from "react-icons/fa";



const LeaderboardMobile = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState('monthly');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [lastUpdate, setLastUpdate] = useState('');

    // Raw data with monthly and semester points
    const rawData = [
        { id: 1, name: "Budi", monthlyPoints: 1500, semesterPoints: 8500, avatar: "/avatars/dani.png" },
        { id: 2, name: "Siti", monthlyPoints: 1450, semesterPoints: 8200, avatar: "/avatars/dani.png" },
        { id: 3, name: "Ahmad", monthlyPoints: 1400, semesterPoints: 7800, avatar: "/avatars/dani.png" },
        { id: 4, name: "Sarah", monthlyPoints: 1300, semesterPoints: 9000, avatar: "/avatars/dani.png" },
        { id: 5, name: "Rizky", monthlyPoints: 1250, semesterPoints: 7200, avatar: "/avatars/dani.png" },
        { id: 6, name: "Dewi", monthlyPoints: 1200, semesterPoints: 7100, avatar: "/avatars/dani.png" },
        { id: 7, name: "Putra", monthlyPoints: 1150, semesterPoints: 6800, avatar: "/avatars/dani.png" },
        { id: 8, name: "Linda", monthlyPoints: 1100, semesterPoints: 6500, avatar: "/avatars/dani.png" },
        { id: 9, name: "Umar", monthlyPoints: 1050, semesterPoints: 6000, avatar: "/avatars/dani.png" },
        { id: 10, name: "Fatimah", monthlyPoints: 1000, semesterPoints: 5800, avatar: "/avatars/dani.png" },
        { id: 11, name: "Joko", monthlyPoints: 950, semesterPoints: 5500, avatar: "/avatars/dani.png" },
        { id: 12, name: "Kamu (Dani)", monthlyPoints: 800, semesterPoints: 4500, avatar: "/avatars/dani.png" },
    ];

    // Helper function to process leaderboard data
    const processData = (periodType) => {
        const data = rawData.map(student => ({
            ...student,
            points: periodType === 'monthly' ? student.monthlyPoints : student.semesterPoints
        }));
        data.sort((a, b) => b.points - a.points);
        return data.map((student, index) => ({
            ...student,
            rank: index + 1
        }));
    };

    // Helper function to get the next 3 PM update timestamp
    const getNext3PMTimestamp = () => {
        const now = new Date();
        const target = new Date(now);
        target.setHours(15, 0, 0, 0); // Set to 3 PM

        // If it's already past 3 PM today, set to 3 PM tomorrow
        if (now >= target) {
            target.setDate(target.getDate() + 1);
        }
        return target.getTime();
    };

    // Helper function to get the last 3 PM timestamp
    const getLast3PMTimestamp = () => {
        const now = new Date();
        const target = new Date(now);
        target.setHours(15, 0, 0, 0); // Set to 3 PM

        // If it's before 3 PM today, use yesterday's 3 PM
        if (now < target) {
            target.setDate(target.getDate() - 1);
        }
        return target.getTime();
    };

    // Helper to format date friendly
    const formatLastUpdate = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date).replace('.', ':') + ' WIB';
    };

    // Effect for daily cached update at 3 PM
    useEffect(() => {
        const loadLeaderboard = () => {
            const cacheKey = `leaderboard_cache_${period}`;
            const cachedData = localStorage.getItem(cacheKey);
            const last3PM = getLast3PMTimestamp();

            let needsRefresh = true;

            if (cachedData) {
                try {
                    const parsed = JSON.parse(cachedData);
                    // Check if cache is still valid (created at or after last 3 PM)
                    if (parsed.timestamp && parsed.timestamp >= last3PM) {
                        setLeaderboardData(parsed.data);
                        setCurrentUser(parsed.data.find(s => s.name.includes("Kamu")) || parsed.data[parsed.data.length - 1]);
                        setLastUpdate(formatLastUpdate(parsed.timestamp));
                        needsRefresh = false;
                    }
                } catch (e) {
                    console.error('Failed to parse cached leaderboard data:', e);
                }
            }

            if (needsRefresh) {
                // Simulate fetching new data (in real app, this would be an API call)
                const processed = processData(period);
                const now = Date.now();

                // Save to cache
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: processed,
                    timestamp: now
                }));

                setLeaderboardData(processed);
                setCurrentUser(processed.find(s => s.name.includes("Kamu")) || processed[processed.length - 1]);
                setLastUpdate(formatLastUpdate(now));
            }
        };

        loadLeaderboard();
    }, [period]);

    // Don't render until data is loaded
    if (leaderboardData.length === 0) {
        return (
            <div className="h-screen bg-[#EEF7FF] flex items-center justify-center">
                <div className="text-center">
                    <div className="size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Memuat leaderboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#EEF7FF] font-sans relative overflow-hidden notranslate" translate="no">
            <div className="h-full overflow-y-auto scrollbar-hide scroll-smooth overscroll-none pb-48 animate-fade-in">
                {/* Smooth Background Gradient Decoration */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>
                {/* Header */}
                <div className="px-6 py-3 relative bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-[60] border-b border-slate-200 animate-fade-in">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="size-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center active:scale-95 transition-transform"
                        >
                            <FaArrowLeft className="text-lg" />
                        </button>
                        <div>
                            <h1 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                                Panggung Juara <FaTrophy className="text-yellow-500 text-xl drop-shadow-sm" />
                            </h1>
                            <div className="flex flex-col">
                                <p className="text-[10px] text-blue-500 font-bold">
                                    Update otomatis pukul 15:00 WIB 🕒
                                </p>
                                {lastUpdate && <p className="text-[9px] text-slate-400 font-medium mt-0.5">Data per: {lastUpdate}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="space-y-6 relative z-10 px-4 pt-6 mt-0">

                    {/* Main Card Container */}
                    <div className="bg-white rounded-[1.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        {/* Toggle */}
                        <div className="bg-gray-50 p-1 rounded-full flex text-xs font-bold shadow-inner mb-16 border border-gray-100">
                            <button
                                onClick={() => setPeriod('monthly')}
                                className={`flex-1 py-2.5 rounded-full transition-all duration-300 ${period === 'monthly' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            >
                                Bulanan
                            </button>
                            <button
                                onClick={() => setPeriod('semester')}
                                className={`flex-1 py-2.5 rounded-full transition-all duration-300 ${period === 'semester' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            >
                                Semester
                            </button>
                        </div>

                        {/* Podium Container */}
                        <div className="relative mb-0">
                            {/* Podium */}
                            <div className="flex items-end justify-center gap-3">
                                {/* Rank 2 */}
                                <div className="flex flex-col items-center w-1/3 z-10">
                                    <div className="relative mb-2">
                                        <div className="size-14 rounded-full border-[3px] border-slate-300 shadow-md overflow-hidden bg-slate-100">
                                            <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', imageRendering: '-webkit-optimize-contrast' }} />
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
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                                            <FaCrown className="text-4xl text-yellow-500 drop-shadow-md" />
                                        </div>
                                        <div className="absolute inset-0 bg-yellow-200 blur-xl opacity-40 rounded-full"></div>
                                        <div className="size-20 rounded-full border-[3px] border-yellow-400 shadow-xl shadow-yellow-100 overflow-hidden bg-yellow-50 relative z-10">
                                            <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', imageRendering: '-webkit-optimize-contrast' }} />
                                        </div>
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                                            <span className="bg-yellow-400 text-white text-sm font-black px-3.5 py-0.5 rounded-full shadow-md shadow-yellow-200 border border-yellow-300">#1</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base mt-2">{leaderboardData[0].name}</h3>
                                    <div className="bg-blue-50 px-3 py-1 rounded-full mt-1 border border-blue-100">
                                        <p className="text-xs font-bold text-blue-700">{leaderboardData[0].points} Poin</p>
                                    </div>
                                </div>

                                {/* Rank 3 */}
                                <div className="flex flex-col items-center w-1/3 z-10">
                                    <div className="relative mb-2">
                                        <div className="size-14 rounded-full border-[3px] border-orange-300 shadow-md overflow-hidden bg-orange-50">
                                            <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', imageRendering: '-webkit-optimize-contrast' }} />
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
                        </div>

                        {/* Divider */}
                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-300 text-xs font-bold tracking-widest uppercase">Top 10</span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        {/* List - Minimalist Design */}
                        <div className="space-y-2 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                            {leaderboardData.slice(3, 10).map((student, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-3 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 active:scale-[0.98] transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Rank Number */}
                                        <span className="font-bold text-base text-slate-400 w-5 text-center">{student.rank}</span>

                                        {/* Avatar */}
                                        <div className="size-10 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
                                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', imageRendering: '-webkit-optimize-contrast' }} />
                                        </div>

                                        {/* Name */}
                                        <h4 className="font-semibold text-slate-800 text-[13px]">{student.name}</h4>
                                    </div>

                                    {/* Points */}
                                    <div className="text-right">
                                        <span className="text-blue-600 font-bold text-sm block leading-none">{student.points}</span>
                                        <span className="text-slate-400 text-[10px] font-medium">Poin</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/* End of Inner Scrollable Container */}

            {/* Sticky Footer - Outside animated container */}
            <div className="fixed bottom-32 left-0 right-0 px-4 z-50 flex justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', animationDuration: '0.6s' }}>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl py-2.5 px-3 flex items-center shadow-lg shadow-blue-400/30 text-white relative overflow-hidden border-2 border-white ring-1 ring-slate-100 w-full max-w-[400px]">

                    {/* Background Decoration */}
                    <FaStar className="absolute -right-4 -bottom-2 text-white/10 text-[3rem] rotate-12 pointer-events-none" />

                    {/* Left: Position */}
                    <div className="flex flex-col items-center justify-center pr-4 border-r border-white/60 mr-3 py-1">
                        <span className="text-[9px] font-bold leading-tight">Posisi</span>
                        <span className="text-xl font-black leading-none mt-0.5">{currentUser.rank}</span>
                    </div>

                    {/* Avatar */}
                    <div className="size-9 rounded-full border-2 border-white overflow-hidden flex-shrink-0 mr-3 bg-blue-300">
                        <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', imageRendering: '-webkit-optimize-contrast' }} />
                    </div>

                    {/* Middle: Info */}
                    <div className="flex-1 min-w-0 z-10">
                        <h4 className="font-bold text-sm leading-tight truncate">Kamu ({currentUser.name.split(' ')[0]})</h4>
                        <p className="text-[10px] font-medium opacity-90 truncate mt-0.5">Kamu hebat! ⭐</p>
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
