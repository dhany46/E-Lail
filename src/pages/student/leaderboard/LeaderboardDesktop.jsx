import React, { useState } from 'react';

const LeaderboardDesktop = () => {
    const [period, setPeriod] = useState('weekly');

    // Mock Data
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
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-8 rounded-2xl shadow-lg relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <span className="material-symbols-outlined text-9xl">leaderboard</span>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="text-4xl">🏆</span> Papan Peringkat
                    </h1>
                    <p className="text-orange-50 mt-2 text-lg">Lihat siapa yang paling rajin beribadah minggu ini!</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Top 3 Podium (Left Column) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <h3 className="font-bold text-gray-800 mb-6 text-lg">3 Terbaik Kelas 4</h3>

                        <div className="flex flex-col gap-6 items-center">
                            {/* Rank 1 */}
                            <div className="relative order-1 scale-110">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                    <span className="text-4xl">👑</span>
                                </div>
                                <div className="size-24 rounded-full p-1 bg-yellow-400 shadow-lg shadow-yellow-200 mx-auto">
                                    <img src={leaderboardData[0].avatar} alt="" className="w-full h-full rounded-full border-4 border-white object-cover" />
                                </div>
                                <div className="mt-3">
                                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full border border-yellow-200">Peringkat 1</span>
                                    <h4 className="font-bold text-gray-900 mt-1">{leaderboardData[0].name}</h4>
                                    <p className="text-sm text-gray-500">{leaderboardData[0].points} Poin</p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 w-full order-2">
                                {/* Rank 2 */}
                                <div className="flex-1">
                                    <div className="size-16 rounded-full p-1 bg-gray-300 shadow-lg shadow-gray-200 mx-auto">
                                        <img src={leaderboardData[1].avatar} alt="" className="w-full h-full rounded-full border-2 border-white object-cover" />
                                    </div>
                                    <div className="mt-2">
                                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">#2</span>
                                        <h4 className="font-bold text-gray-900 text-xs mt-1">{leaderboardData[1].name}</h4>
                                        <p className="text-xs text-gray-500">{leaderboardData[1].points}</p>
                                    </div>
                                </div>

                                {/* Rank 3 */}
                                <div className="flex-1">
                                    <div className="size-16 rounded-full p-1 bg-orange-300 shadow-lg shadow-orange-200 mx-auto">
                                        <img src={leaderboardData[2].avatar} alt="" className="w-full h-full rounded-full border-2 border-white object-cover" />
                                    </div>
                                    <div className="mt-2">
                                        <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-100">#3</span>
                                        <h4 className="font-bold text-gray-900 text-xs mt-1">{leaderboardData[2].name}</h4>
                                        <p className="text-xs text-gray-500">{leaderboardData[2].points}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List (Right Column) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Semua Siswa</h3>
                            <div className="flex bg-gray-200 rounded-lg p-1 text-xs font-bold">
                                <button
                                    onClick={() => setPeriod('weekly')}
                                    className={`px-3 py-1 rounded-md transition-all ${period === 'weekly' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Mingguan
                                </button>
                                <button
                                    onClick={() => setPeriod('monthly')}
                                    className={`px-3 py-1 rounded-md transition-all ${period === 'monthly' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Bulanan
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {leaderboardData.slice(3).map((student, index) => (
                                <div key={index} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                                    <span className="w-10 text-center font-bold text-gray-400 text-lg">#{student.rank}</span>

                                    <div className="flex items-center gap-3 flex-1 ml-4">
                                        <div className="size-10 rounded-full bg-gray-100 overflow-hidden">
                                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">{student.name}</h4>
                                            <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-md">{student.class}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <span className="block font-bold text-gray-800 text-sm">{student.points}</span>
                                            <span className="text-[10px] text-gray-400">Poin</span>
                                        </div>
                                        <span className="material-symbols-outlined text-amber-400">star</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 text-center border-t border-gray-100">
                            <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                                Muat Lebih Banyak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardDesktop;
