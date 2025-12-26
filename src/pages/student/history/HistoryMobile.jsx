import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryMobile = () => {
    const [activities, setActivities] = useState([]);
    const [filter, setFilter] = useState("Semua");

    // Load activities from localStorage (Same logic as Desktop for now)
    useEffect(() => {
        const loadActivities = () => {
            const allActivities = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('daily_report_')) {
                    const dateStr = key.replace('daily_report_', '');
                    const data = JSON.parse(localStorage.getItem(key));

                    const dateObj = new Date(dateStr);
                    const formattedDate = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });

                    // Prayers
                    if (data.prayers && Array.isArray(data.prayers)) {
                        data.prayers.forEach((prayer, idx) => {
                            const isObject = typeof prayer === 'object' && prayer !== null;
                            const prayerId = isObject ? prayer.id : prayer;
                            const prayerTime = isObject && prayer.time ? prayer.time : null;
                            const isCongregation = isObject ? prayer.isCongregation : false;
                            const submittedAt = isObject && prayer.submittedAt ? prayer.submittedAt : null;
                            const displayTime = submittedAt ? submittedAt.substring(0, 5) : (prayerTime || '-');

                            allActivities.push({
                                id: `${dateStr}-prayer-${idx}`,
                                date: formattedDate,
                                rawDate: dateStr,
                                rawTime: submittedAt || prayerTime || '00:00',
                                time: `${displayTime} WIB`,
                                title: `Shalat ${prayerId || 'Wajib'}`,
                                subtitle: isCongregation ? 'Berjamaah' : 'Munfarid',
                                category: "Shalat Wajib",
                                status: "Menunggu",
                                points: isCongregation ? 25 : 10,
                                icon: 'mosque',
                                color: 'text-teal-600',
                                bg: 'bg-teal-50'
                            });
                        });
                    }

                    // Tadarus
                    if (data.tadarus && typeof data.tadarus === 'object') {
                        allActivities.push({
                            id: `${dateStr}-tadarus`,
                            date: formattedDate,
                            rawDate: dateStr,
                            rawTime: data.tadarus.submittedAt || '23:59:59',
                            time: data.tadarus.submittedAt ? `${data.tadarus.submittedAt.substring(0, 5)} WIB` : '-',
                            title: `Tadarus ${data.tadarus.surah}`,
                            subtitle: `Ayat ${data.tadarus.ayatStart}-${data.tadarus.ayatEnd}`,
                            category: "Tadarus",
                            status: "Menunggu",
                            points: 50,
                            icon: 'menu_book',
                            color: 'text-amber-600',
                            bg: 'bg-amber-50'
                        });
                    }

                    // Additional
                    if (data.additional && Array.isArray(data.additional)) {
                        const additionalLabels = {
                            'dhuha': { label: 'Sholat Dhuha', points: 15, category: 'Shalat Sunnah', icon: 'wb_sunny' },
                            'infaq': { label: 'Infaq', points: 10, category: 'Ibadah Lainnya', icon: 'volunteer_activism' },
                            'help': { label: 'Bantu Ortu', points: 25, category: 'Ibadah Lainnya', icon: 'favorite' }
                        };
                        data.additional.forEach((item, idx) => {
                            const isObject = typeof item === 'object' && item !== null;
                            const itemId = isObject ? item.id : item;
                            const itemTime = isObject && item.submittedAt ? item.submittedAt : null;

                            const info = additionalLabels[itemId] || { label: itemId, points: 10, category: 'Lainnya', icon: 'star' };

                            allActivities.push({
                                id: `${dateStr}-additional-${idx}`,
                                date: formattedDate,
                                rawDate: dateStr,
                                rawTime: itemTime || '23:59:59',
                                time: itemTime ? `${itemTime.substring(0, 5)} WIB` : '-',
                                title: info.label,
                                subtitle: (isObject && item.note) ? item.note : 'Ibadah Sunnah',
                                category: info.category,
                                status: "Menunggu",
                                points: info.points,
                                icon: info.icon,
                                color: itemId === 'dhuha' ? 'text-purple-600' : 'text-pink-600',
                                bg: itemId === 'dhuha' ? 'bg-purple-50' : 'bg-pink-50'
                            });
                        });
                    }
                }
            }

            allActivities.sort((a, b) => {
                const dateCompare = new Date(b.rawDate) - new Date(a.rawDate);
                if (dateCompare !== 0) return dateCompare;
                return b.rawTime.localeCompare(a.rawTime);
            });
            setActivities(allActivities);
        };
        loadActivities();
    }, []);

    const filteredActivities = filter === "Semua" ? activities : activities.filter(a => a.category === filter);

    return (
        <div className="min-h-screen pb-28 font-sans bg-white">
            {/* Header */}
            <div className="px-5 pt-8 pb-4 bg-white sticky top-0 z-10 border-b border-gray-50/50 backdrop-blur-sm bg-white/90">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-gray-800">Riwayat Ibadah 📜</h1>
                        <p className="text-xs text-gray-500 mt-1 font-medium">Catatan kebaikanmu setiap hari</p>
                    </div>
                </div>

                {/* Filter Chips - Horizontal Scroll */}
                <div className="overflow-x-auto no-scrollbar flex gap-2 pb-1">
                    {[
                        { id: "Semua", label: "Semua" },
                        { id: "Shalat Wajib", label: "Wajib" },
                        { id: "Shalat Sunnah", label: "Sunnah" },
                        { id: "Tadarus", label: "Tadarus" },
                        { id: "Ibadah Lainnya", label: "Lainnya" }
                    ].map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => setFilter(tag.id)}
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${filter === tag.id ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-100'
                                }`}
                        >
                            {tag.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content List */}
            <div className="px-5 pt-2 flex flex-col gap-3">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-10">
                        <span className="text-4xl block mb-2">📭</span>
                        <p className="text-sm font-bold text-gray-600">Belum ada riwayat</p>
                        <p className="text-xs text-gray-400 mt-1">Ayo mulai isi catatan ibadahmu!</p>
                    </div>
                ) : (
                    filteredActivities.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-3 p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                            {/* Icon Box */}
                            <div className={`size-11 rounded-xl ${item.bg || 'bg-gray-50'} ${item.color || 'text-gray-500'} flex items-center justify-center shrink-0`}>
                                <span className="material-symbols-outlined text-xl">{item.icon || 'star'}</span>
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded">{item.date}</span>
                                    <span className="text-[10px] text-gray-400">• {item.time}</span>
                                </div>
                                {/* <p className="text-[10px] text-gray-400 mt-0.5">{item.subtitle}</p> */}
                            </div>

                            {/* Right Side: Points & Status */}
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">+{item.points}</span>
                                {item.status === 'Disetujui' ? (
                                    <span className="material-symbols-outlined text-sm text-emerald-500">check_circle</span>
                                ) : (
                                    <span className="material-symbols-outlined text-sm text-amber-400">schedule</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistoryMobile;
