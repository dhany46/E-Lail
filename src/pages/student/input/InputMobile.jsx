import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../../context/StudentContext';
import { useToast } from '../../../context/ToastContext';

// Custom Time Picker Component (Reused inside Modal)
const CustomTimePicker = ({ value, onChange }) => {
    const [selectedHour, setSelectedHour] = useState(value ? value.split(':')[0] : '05');
    const [selectedMinute, setSelectedMinute] = useState(value ? value.split(':')[1] : '00');

    // Refs for scrolling
    const hourRef = useRef(null);
    const minuteRef = useRef(null);

    // Sync with external value changes
    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            if (h !== selectedHour) setSelectedHour(h);
            if (m !== selectedMinute) setSelectedMinute(m);
        }
    }, [value]);

    useEffect(() => {
        if (hourRef.current) {
            const el = document.getElementById(`hour-${selectedHour}`);
            if (el) el.scrollIntoView({ block: 'center' });
        }
        if (minuteRef.current) {
            const el = document.getElementById(`minute-${selectedMinute}`);
            if (el) el.scrollIntoView({ block: 'center' });
        }
    }, [selectedHour, selectedMinute]);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleHourClick = (h) => {
        setSelectedHour(h);
        onChange(`${h}:${selectedMinute}`);
    };

    const handleMinuteClick = (m) => {
        setSelectedMinute(m);
        onChange(`${selectedHour}:${m}`);
    };

    return (
        <div className="flex gap-4 h-48 mt-4">
            {/* Hours Column */}
            <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden flex flex-col items-center relative border border-gray-100">
                <div className="absolute top-0 left-0 right-0 bg-gray-50 z-10 p-2 text-center border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Jam</span>
                </div>
                <div className="overflow-y-auto no-scrollbar w-full pt-10 pb-20 px-1 scroll-smooth" ref={hourRef}>
                    {hours.map(h => (
                        <div
                            key={h}
                            id={`hour-${h}`}
                            onClick={() => handleHourClick(h)}
                            className={`text-center py-2 mb-1 rounded-lg cursor-pointer text-sm font-bold transition-all ${selectedHour === h
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-100'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 scale-95'
                                }`}
                        >
                            {h}
                        </div>
                    ))}
                </div>
            </div>

            {/* Minutes Column */}
            <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden flex flex-col items-center relative border border-gray-100">
                <div className="absolute top-0 left-0 right-0 bg-gray-50 z-10 p-2 text-center border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Menit</span>
                </div>
                <div className="overflow-y-auto no-scrollbar w-full pt-10 pb-20 px-1 scroll-smooth" ref={minuteRef}>
                    {minutes.map(m => (
                        <div
                            key={m}
                            id={`minute-${m}`}
                            onClick={() => handleMinuteClick(m)}
                            className={`text-center py-2 mb-1 rounded-lg cursor-pointer text-sm font-bold transition-all ${selectedMinute === m
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-100'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 scale-95'
                                }`}
                        >
                            {m}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Simplified Prayer Card Mobile
const PrayerCardMobile = ({ id, label, icon, isChecked, onClick, onRemove, data, isSubmitted }) => {
    if (isSubmitted) {
        return (
            <div className="relative rounded-2xl border border-gray-100 bg-gray-50 p-3 flex flex-col items-center gap-2 select-none opacity-60">
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined text-xl">{icon}</span>
                </div>
                <span className="text-xs font-bold text-gray-400">{label}</span>
                <div className="absolute top-1 right-1 text-emerald-500">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                relative rounded-2xl border transition-all duration-300 p-3 flex flex-col items-center gap-2 group select-none active:scale-95
                ${isChecked
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-gray-100 bg-white shadow-sm'
                }
            `}
            onClick={() => onClick(id)}
        >
            {isChecked && (
                <div
                    className="absolute top-1 right-1 text-emerald-500 cursor-pointer p-1 z-10"
                    onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </div>
            )}

            <div className={`
                size-10 rounded-full flex items-center justify-center transition-colors
                ${isChecked ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400'}
            `}>
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>

            <div className="text-center w-full">
                <span className={`block text-xs font-bold ${isChecked ? 'text-emerald-700' : 'text-gray-600'}`}>
                    {label}
                </span>

                {isChecked ? (
                    <div className="mt-1 animate-pop-in">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-block ${data?.isCongregation ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                            {data?.time}
                        </span>
                    </div>
                ) : (
                    <span className="text-[9px] font-bold text-amber-500 block mt-0.5">
                        +20 Poin
                    </span>
                )}
            </div>
        </div>
    );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-xl animate-pop-up">
                <div className="text-center">
                    <div className="size-14 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl">warning</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Disimpan!</h3>
                    <p className="text-sm text-gray-500 mb-6">Yakin mau keluar? Datamu akan hilang lho.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={onClose} className="py-3 rounded-xl font-bold text-gray-600 bg-gray-100">Batal</button>
                        <button onClick={onConfirm} className="py-3 rounded-xl font-bold text-white bg-amber-500 shadow-lg shadow-amber-200">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SuccessModal = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[2rem] w-full max-w-sm p-8 shadow-xl animate-pop-up text-center">
                <div className="size-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-5xl animate-bounce">check</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Terikirim! 🚀</h3>
                <p className="text-sm text-gray-500">Laporanmu sudah masuk. Barakallah!</p>
            </div>
        </div>
    );
}

const InputMobile = () => {
    const navigate = useNavigate();
    const { setNavigationBlocker } = useStudentContext();
    const toast = useToast();

    // State (Same as Desktop)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPrayers, setSelectedPrayers] = useState([]);
    const [prayerData, setPrayerData] = useState({});
    const [activeModal, setActiveModal] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const [selectedAdditionalWorships, setSelectedAdditionalWorships] = useState({});
    const [additionalNotes, setAdditionalNotes] = useState({});

    const [alreadySubmitted, setAlreadySubmitted] = useState({
        prayers: [],
        tadarus: null,
        additional: []
    });

    const [form, setForm] = useState({
        surah: '',
        ayatStart: '',
        ayatEnd: '',
        notes: ''
    });

    // Load Data Hook
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const savedData = localStorage.getItem(`daily_report_${today}`);

        if (savedData) {
            const parsed = JSON.parse(savedData);
            const prayerDefaults = { 'Subuh': '04:45', 'Dzuhur': '12:15', 'Ashar': '15:30', 'Maghrib': '18:10', 'Isya': '19:25' };
            const migratedPrayers = (parsed.prayers || []).map(prayer => {
                if (typeof prayer === 'string') {
                    return { id: prayer, time: prayerDefaults[prayer] || '12:00', isCongregation: false };
                }
                return prayer;
            });
            setAlreadySubmitted({
                prayers: migratedPrayers,
                tadarus: parsed.tadarus || null,
                additional: parsed.additional || [],
                notes: parsed.notes || ''
            });
            if (parsed.notes) setForm(prev => ({ ...prev, notes: parsed.notes }));
        }
    }, []);

    const prayers = [
        { id: 'Subuh', icon: 'wb_twilight', label: 'Subuh', defaultTime: '04:45' },
        { id: 'Dzuhur', icon: 'light_mode', label: 'Dzuhur', defaultTime: '12:15' },
        { id: 'Ashar', icon: 'sunny', label: 'Ashar', defaultTime: '15:30' },
        { id: 'Maghrib', icon: 'nights_stay', label: 'Maghrib', defaultTime: '18:10' },
        { id: 'Isya', icon: 'bedtime', label: 'Isya', defaultTime: '19:25' },
    ];

    const additionalWorships = [
        { id: 'dhuha', label: 'Sholat Dhuha', points: 15 },
        { id: 'infaq', label: 'Infaq / Sedekah', points: 10 },
        { id: 'help', label: 'Bantu Orang Tua', points: 25 },
    ];

    // Handlers
    const handlePrayerClick = (id) => {
        if (alreadySubmitted.prayers.some(p => p.id === id)) return;
        setActiveModal(id);
    };

    const handleRemovePrayer = (id) => {
        setSelectedPrayers(prev => prev.filter(p => p !== id));
    };

    const handleSaveModal = (id, time, isCongregation) => {
        setPrayerData(prev => ({ ...prev, [id]: { time, isCongregation } }));
        if (!selectedPrayers.includes(id)) setSelectedPrayers(prev => [...prev, id]);
        setActiveModal(null);
    };

    const toggleAdditionalWorship = (id) => {
        setSelectedAdditionalWorships(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Dirty Logic
    const hasNewPrayers = selectedPrayers.length > 0;
    const hasNewTadarus = !!(form.surah && form.ayatStart && form.ayatEnd);
    const hasNewAdditional = Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]).length > 0;
    const isDirty = hasNewPrayers || hasNewTadarus || hasNewAdditional || form.notes.length > 0;

    useEffect(() => {
        if (isDirty) {
            setNavigationBlocker(() => (nextPath) => {
                setPendingPath(nextPath);
                setShowConfirmModal(true);
            });
        } else {
            setNavigationBlocker(null);
        }
        return () => setNavigationBlocker(null);
    }, [isDirty, setNavigationBlocker]);

    const confirmNavigation = () => {
        setShowConfirmModal(false);
        setNavigationBlocker(null);
        if (pendingPath) navigate(pendingPath);
    };


    const handleSendReport = () => {
        if (isSubmitting) return;
        if (!isDirty) {
            toast.error("Isi minimal 1 ibadah dulu ya!");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            const newPrayers = selectedPrayers.map(id => ({
                id,
                time: prayerData[id]?.time || prayers.find(p => p.id === id).defaultTime,
                isCongregation: prayerData[id]?.isCongregation !== false,
                submittedAt: currentTime
            }));
            const newTadarus = (form.surah && form.ayatStart && form.ayatEnd)
                ? { surah: form.surah, ayatStart: form.ayatStart, ayatEnd: form.ayatEnd, submittedAt: currentTime } : null;

            const today = new Date().toISOString().split('T')[0];
            const existingPrayers = alreadySubmitted.prayers.map(prayer => (typeof prayer === 'string' ? { id: prayer, time: '12:00', isCongregation: false } : prayer));
            const newAdditional = Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]).map(id => ({ id, submittedAt: currentTime, note: additionalNotes[id] || '' }));

            const newData = {
                prayers: [...existingPrayers, ...newPrayers],
                tadarus: alreadySubmitted.tadarus || newTadarus,
                additional: [...alreadySubmitted.additional, ...newAdditional],
                notes: form.notes || alreadySubmitted.notes,
                submittedAt: currentTime
            };
            localStorage.setItem(`daily_report_${today}`, JSON.stringify(newData));

            setIsSubmitting(false);
            setShowSuccessModal(true);
            setNavigationBlocker(null);
            setTimeout(() => navigate('/student/history'), 1500);
        }, 1500);
    };

    // Modal Wrapper (Using same modal logic but verifying styling)
    const PrayerModalMobile = ({ isOpen, onClose, onSave, prayerData }) => {
        const [time, setTime] = useState(prayerData?.time || '04:30');
        const [isCongregation, setIsCongregation] = useState(prayerData?.isCongregation !== false);

        useEffect(() => {
            if (isOpen && prayerData) {
                setTime(prayerData.time || prayerData.defaultTime || '12:00');
                setIsCongregation(prayerData.isCongregation !== false);
            }
        }, [isOpen, prayerData]);

        if (!isOpen || !prayerData) return null;

        return (
            <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                {/* Bottom Sheet for Mobile */}
                <div className="bg-white w-full sm:max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl animate-slide-up sm:animate-pop-up pb-10 sm:pb-6">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <span className="material-symbols-outlined text-xl">{prayerData.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Input {prayerData.label}</h3>
                            <p className="text-xs text-gray-500">Kapan kamu sholat?</p>
                        </div>
                    </div>

                    <CustomTimePicker value={time} onChange={setTime} />

                    <div className="mt-6 flex gap-3">
                        <button
                            className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-1 ${isCongregation ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-400'}`}
                            onClick={() => setIsCongregation(true)}
                        >
                            <span className="material-symbols-outlined">groups</span>
                            Berjamaah
                        </button>
                        <button
                            className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all flex flex-col items-center gap-1 ${!isCongregation ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-gray-200 text-gray-400'}`}
                            onClick={() => setIsCongregation(false)}
                        >
                            <span className="material-symbols-outlined">person</span>
                            Sendiri
                        </button>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100">Batal</button>
                        <button onClick={() => onSave(prayerData.id, time, isCongregation)} className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-500">Simpan</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen pb-32 font-sans bg-gray-50/30">
            <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={confirmNavigation} />
            <SuccessModal isOpen={showSuccessModal} />
            <PrayerModalMobile
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                onSave={handleSaveModal}
                prayerData={activeModal ? { ...prayerData[activeModal], ...prayers.find(p => p.id === activeModal) } : null}
            />

            {/* Sticky Header */}
            <div className="px-5 pt-8 pb-4 bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
                <h1 className="text-xl font-extrabold text-gray-800">Lapor Ibadah 📝</h1>
                <p className="text-xs text-gray-500 mt-1">Isi kegiatanmu hari ini yuk!</p>
            </div>

            <div className="p-5 space-y-6">

                {/* Prayer Grid - 3 cols mobile looks okay or 2? Let's do 3 for icons */}
                <section>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-lg">🕌</span> Sholat Wajib
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {prayers.map((prayer) => (
                            <PrayerCardMobile
                                key={prayer.id}
                                id={prayer.id}
                                label={prayer.label}
                                icon={prayer.icon}
                                isChecked={selectedPrayers.includes(prayer.id)}
                                isSubmitted={alreadySubmitted.prayers.some(p => p.id === prayer.id)}
                                onClick={handlePrayerClick}
                                onRemove={handleRemovePrayer}
                                data={prayerData[prayer.id]}
                            />
                        ))}
                    </div>
                </section>

                {/* Tadarus Card */}
                <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">📖</span>
                        <h3 className="text-sm font-bold text-gray-800">Tadarus (+50 Poin)</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Surat</label>
                            <input
                                type="text"
                                placeholder="Al-Mulk"
                                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all"
                                value={form.surah}
                                onChange={(e) => setForm({ ...form, surah: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Ayat Mulai</label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all"
                                    value={form.ayatStart}
                                    onChange={(e) => setForm({ ...form, ayatStart: e.target.value })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Ayat Akhir</label>
                                <input
                                    type="number"
                                    placeholder="10"
                                    className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 ring-emerald-100 focus:border-emerald-400 transition-all"
                                    value={form.ayatEnd}
                                    onChange={(e) => setForm({ ...form, ayatEnd: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional */}
                <section>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-lg">💝</span> Ibadah Lainnya
                    </h3>
                    <div className="space-y-2">
                        {additionalWorships.map((item) => (
                            <div key={item.id} className={`bg-white rounded-xl border p-3 transition-all ${selectedAdditionalWorships[item.id] ? 'border-emerald-300 bg-emerald-50/20' : 'border-gray-100'}`}>
                                <div className="flex items-center justify-between" onClick={() => toggleAdditionalWorship(item.id)}>
                                    <div className="flex items-center gap-3">
                                        <div className={`size-5 rounded border flex items-center justify-center ${selectedAdditionalWorships[item.id] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                                            {selectedAdditionalWorships[item.id] && <span className="material-symbols-outlined text-white text-sm">check</span>}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{item.label}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">+{item.points}</span>
                                </div>
                                {selectedAdditionalWorships[item.id] && (
                                    <div className="mt-3 pl-8 animate-fade-in">
                                        <input
                                            type="text"
                                            placeholder="Catatan..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:border-emerald-400 transition-all"
                                            value={additionalNotes[item.id] || ''}
                                            onChange={(e) => setAdditionalNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Submit Action Fixed Bottom or Inline? Fixed is better for mobile */}
                <div className="fixed bottom-20 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
                    <button
                        onClick={handleSendReport}
                        disabled={isSubmitting}
                        className={`pointer-events-auto w-full py-3.5 rounded-2xl font-bold text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                    >
                        {isSubmitting ? 'Mengirim...' : '🚀 Kirim Laporan'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InputMobile;
