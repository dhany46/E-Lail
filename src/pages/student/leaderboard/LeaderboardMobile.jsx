import React, { useState } from 'react';

const LeaderboardMobile = () => {
    const [period, setPeriod] = useState('weekly');

    // Mock Data (matches desktop)
    const leaderboardData = [
        { rank: 1, name: "Ahmad Zaki", class: "4B", points: 1250, avatar: "https://ui-avatars.com/api/?name=Ahmad+Zaki&background=FFD700&color=fff" },
        { rank: 2, name: "Siti Aminah", class: "4A", points: 1180, avatar: "https://ui-avatars.com/api/?name=Siti+Aminah&background=C0C0C0&color=fff" },
        { rank: 3, name: "Budi Santoso", class: "4B", points: 1150, avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=CD7F32&color=fff" },
        { rank: 4, name: "Dewi Puspita", class: "4C", points: 980, avatar: "https://ui-avatars.com/api/?name=Dewi+Puspita&background=dcfce7&color=16a34a" },
        { rank: 5, name: "Fajar Nugraha", class: "4A", points: 950, avatar: "https://ui-avatars.com/api/?name=Fajar+Nugraha&background=dcfce7&color=16a34a" },
        { rank: 6, name: "Rina Kartika", class: "4C", points: 920, avatar: "https://ui-avatars.com/api/?name=Rina+Kartika&background=dcfce7&color=16a34a" },
        { rank: 7, name: "Dimas Anggara", class: "4B", points: 890, avatar: "https://ui-avatars.com/api/?name=Dimas+Anggara&background=dcfce7&color=16a34a" },
        { rank: 8, name: "Nisa Sabyan", class: "4A", points: 850, avatar: "https://ui-avatars.com/api/?name=Nisa+Sabyan&background=dcfce7&color=16a34a" },
        { rank: 9, name: "Umar Bakri", class: "4C", points: 820, avatar: "https://ui-avatars.com/api/?name=Umar+Bakri&background=dcfce7&color=16a34a" },
        { rank: 10, name: "Fatimah Azzahra", class: "4B", points: 800, avatar: "https://ui-avatars.com/api/?name=Fatimah+Azzahra&background=dcfce7&color=16a34a" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans pb-24">
            {/* Header & Filter */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-5 pt-6 pb-2 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-extrabold text-gray-800">Papan Peringkat 🏆</h1>
                </div>

                <div className="bg-gray-100 p-1 rounded-xl flex text-xs font-bold mb-2">
                    <button
                        onClick={() => setPeriod('weekly')}
                        className={`flex-1 py-2 rounded-lg transition-all ${period === 'weekly' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                    >
                        Mingguan
                    </button>
                    <button
                        onClick={() => setPeriod('monthly')}
                        className={`flex-1 py-2 rounded-lg transition-all ${period === 'monthly' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                    >
                        Bulanan
                    </button>
                </div>
            </div>

            {/* Podium Section */}
            <div className="bg-gradient-to-b from-white to-gray-50 pt-8 pb-8 px-5 rounded-b-3xl mb-4 border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none"></div>

                <div className="flex items-end justify-center gap-4 relative z-10">
                    {/* Rank 2 */}
                    <div className="flex flex-col items-center gap-2 -mb-4 order-1">
                        <div className="relative">
                            <div className="size-16 rounded-full border-4 border-gray-200 shadow-md">
                                <img src={leaderboardData[1].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">#2</span>
                            </div>
                        </div>
                        <div className="text-center pb-6">
                            <div className="text-xs font-bold text-gray-900 line-clamp-1 w-16">{leaderboardData[1].name.split(' ')[0]}</div>
                            <div className="text-[10px] text-gray-500 font-bold">{leaderboardData[1].points}</div>
                        </div>
                    </div>

                    {/* Rank 1 */}
                    <div className="flex flex-col items-center gap-2 order-2 z-10 scale-110 -translate-y-2">
                        <div className="relative">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl drop-shadow-sm">👑</span>
                            <div className="size-20 rounded-full border-4 border-yellow-300 shadow-xl shadow-yellow-100 ring-2 ring-white">
                                <img src={leaderboardData[0].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-0.5 rounded-full ring-2 ring-white">#1</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-gray-900">{leaderboardData[0].name.split(' ')[0]}</div>
                            <div className="text-[10px] text-yellow-600 font-bold bg-yellow-50 px-2 py-0.5 rounded-full mt-1 border border-yellow-100">{leaderboardData[0].points} Poin</div>
                        </div>
                    </div>

                    {/* Rank 3 */}
                    <div className="flex flex-col items-center gap-2 -mb-4 order-3">
                        <div className="relative">
                            <div className="size-16 rounded-full border-4 border-orange-200 shadow-md">
                                <img src={leaderboardData[2].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                <span className="bg-orange-200 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full ring-2 ring-white">#3</span>
                            </div>
                        </div>
                        <div className="text-center pb-6">
                            <div className="text-xs font-bold text-gray-900 line-clamp-1 w-16">{leaderboardData[2].name.split(' ')[0]}</div>
                            <div className="text-[10px] text-gray-500 font-bold">{leaderboardData[2].points}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="px-5 space-y-3">
                {leaderboardData.slice(3).map((student, index) => (
                    <div key={index} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-400 w-6 text-center">{student.rank}</span>

                        <div className="flex-1 flex items-center gap-3">
                            <div className="size-10 rounded-full bg-gray-50">
                                <img src={student.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{student.name}</h4>
                                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md">{student.class}</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end font-bold text-gray-800 text-sm">
                                {student.points} <span className="text-amber-400 text-xs">★</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-6 text-xs text-gray-400 font-medium">
                Terus tingkatkan ibadahmu! 🚀
            </div>
        </div>
    );
};

export default LeaderboardMobile;
