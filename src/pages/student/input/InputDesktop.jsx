import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../../context/StudentContext';
import { useToast } from '../../../context/ToastContext';


// Custom Time Picker Component (Reused inside Modal)
const CustomTimePicker = ({ value, onChange }) => {
    const [selectedHour, setSelectedHour] = useState(value ? value.split(':')[0] : '05'); // Default to reasonable prayer time
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

// Modal Component for Prayer Input
// Custom Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-pop-in text-center">
                <div className="size-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">warning</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Laporan Belum Dikirim!</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Kamu memiliki laporan yang belum dikirim. Yakin ingin meninggalkan halaman ini? Data yang sudah kamu isi mungkin akan hilang.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all"
                    >
                        Ya, Tinggalkan
                    </button>
                </div>
            </div>
        </div>
    );
};

// Custom Success Modal
const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
            <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative z-10 animate-pop-in text-center">
                <div className="size-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl animate-bounce">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Alhamdulillah! 🤲</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Laporan kegiatanmu berhasil dikirim. Terus semangat beribadah ya!
                </p>
                <div className="animate-pulse">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                        Mengalihkan ke Riwayat...
                    </span>
                </div>
            </div>
        </div>
    );
};

// Modal Component for Prayer Input
const PrayerEntryModal = ({ isOpen, onClose, onSave, prayerData }) => {
    const [time, setTime] = useState(prayerData?.time || '04:30');
    const [isCongregation, setIsCongregation] = useState(prayerData?.isCongregation !== false); // Default to true

    useEffect(() => {
        if (isOpen && prayerData) {
            setTime(prayerData.time || prayerData.defaultTime || '12:00');
            setIsCongregation(prayerData.isCongregation !== false);
        }
    }, [isOpen, prayerData]);

    if (!isOpen || !prayerData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-pop-in">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined text-2xl">{prayerData.icon}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Input Sholat {prayerData.label}</h3>
                        <p className="text-xs text-gray-500">Lengkapi data ibadahmu</p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Time Picker Section */}
                    <div>
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Jam berapa kamu sholat {prayerData.label}?</h3>
                            <button
                                onClick={() => setTime(prayerData.defaultTime)}
                                className="text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors inline-block"
                            >
                                Awal Waktu ({prayerData.defaultTime})
                            </button>
                        </div>
                        <CustomTimePicker value={time} onChange={setTime} />
                    </div>

                    {/* Status Toggle */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Keterangan</label>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${isCongregation ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                onClick={() => setIsCongregation(true)}
                            >
                                <span className="material-symbols-outlined text-lg">groups</span>
                                Berjamaah
                            </button>
                            <button
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${!isCongregation ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                onClick={() => setIsCongregation(false)}
                            >
                                <span className="material-symbols-outlined text-lg">person</span>
                                Sendiri
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => onSave(prayerData.id, time, isCongregation)}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simplified Prayer Card
const PrayerCard = ({ id, label, icon, isChecked, onClick, onRemove, data, isSubmitted }) => {
    if (isSubmitted) {
        return (
            <div className="relative rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 flex flex-col items-center gap-3 select-none opacity-70 cursor-not-allowed">
                <div className="absolute top-2 right-2 text-emerald-500">
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <div className="size-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <div className="text-center w-full">
                    <span className="block text-sm font-bold text-gray-500">{label}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                        Sudah Lapor
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                relative rounded-2xl border-2 transition-all duration-300 p-4 flex flex-col items-center gap-3 group select-none
                ${isChecked
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-100 bg-white hover:border-emerald-200 hover:shadow-md cursor-pointer'
                }
            `}
            onClick={() => onClick(id)}
        >
            {isChecked && (
                <div
                    className="absolute top-2 right-2 text-emerald-500 cursor-pointer hover:bg-emerald-100 rounded-full p-1 transition-colors z-10"
                    onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </div>
            )}

            <div className={`
                size-12 rounded-full flex items-center justify-center transition-colors
                ${isChecked ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}
            `}>
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>

            <div className="text-center w-full">
                <span className={`block text-sm font-bold ${isChecked ? 'text-emerald-700' : 'text-gray-600'}`}>
                    {label}
                </span>

                {isChecked ? (
                    <div className="mt-2 animate-pop-in">
                        <div className="text-xl font-bold text-emerald-800">{data?.time || '--:--'}</div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${data?.isCongregation ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                            {data?.isCongregation ? '🤝 Berjamaah' : '🧍 Munfarid'}
                        </span>
                    </div>
                ) : (
                    <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                        ⭐ +20 Poin
                    </span>
                )}
            </div>
        </div>
    );
};

const InputDesktop = () => {
    const navigate = useNavigate();
    const { setNavigationBlocker } = useStudentContext();
    const toast = useToast();

    // State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPrayers, setSelectedPrayers] = useState([]);
    const [prayerData, setPrayerData] = useState({}); // { [id]: { time, isCongregation } }
    const [activeModal, setActiveModal] = useState(null); // 'Subuh', 'Dzuhur', ...
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [pendingPath, setPendingPath] = useState(null);
    const [selectedAdditionalWorships, setSelectedAdditionalWorships] = useState({});
    const [additionalNotes, setAdditionalNotes] = useState({});

    // Daily Persistence State
    // Daily Persistence State
    const [alreadySubmitted, setAlreadySubmitted] = useState({
        prayers: [], // Array of objects
        tadarus: null, // Object or null
        additional: [] // Array of IDs/objects
    });

    const [form, setForm] = useState({
        surah: '',
        ayatStart: '',
        ayatEnd: '',
        notes: ''
    });

    // Load data from LocalStorage on mount (with migration for old format)
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const savedData = localStorage.getItem(`daily_report_${today}`);

        if (savedData) {
            const parsed = JSON.parse(savedData);

            // Migrate old string format prayers to object format
            const prayerDefaults = {
                'Subuh': '04:45',
                'Dzuhur': '12:15',
                'Ashar': '15:30',
                'Maghrib': '18:10',
                'Isya': '19:25'
            };

            const migratedPrayers = (parsed.prayers || []).map(prayer => {
                if (typeof prayer === 'string') {
                    return {
                        id: prayer,
                        time: prayerDefaults[prayer] || '12:00',
                        isCongregation: false
                    };
                }
                return prayer;
            });

            // If migration happened, save the migrated data back
            if (migratedPrayers.some((p, i) => typeof (parsed.prayers || [])[i] === 'string')) {
                const migratedData = { ...parsed, prayers: migratedPrayers };
                localStorage.setItem(`daily_report_${today}`, JSON.stringify(migratedData));
            }

            setAlreadySubmitted({
                prayers: migratedPrayers,
                tadarus: parsed.tadarus || null,
                additional: parsed.additional || [],
                notes: parsed.notes || ''
            });
            // Pre-fill form notes if exists
            if (parsed.notes) {
                setForm(prev => ({ ...prev, notes: parsed.notes }));
            }
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
        { id: 'help', label: 'Membantu Orang Tua', points: 25 },
    ];

    // Progress Calculation
    const completedTadarus = (form.surah && form.ayatStart && form.ayatEnd);
    const completedPrayersCount = selectedPrayers.length;
    const completedAdditionalCount = Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]).length;

    const submittedCount =
        alreadySubmitted.prayers.length +
        (alreadySubmitted.tadarus ? 1 : 0) +
        alreadySubmitted.additional.length;

    const currentProgress = completedPrayersCount + (completedTadarus ? 1 : 0) + completedAdditionalCount + submittedCount;
    const totalTarget = 8;
    const progressPercentage = Math.min((currentProgress / totalTarget) * 100, 100);

    // Handlers
    const handlePrayerClick = (id) => {
        if (alreadySubmitted.prayers.some(p => p.id === id)) return; // Prevent if already submitted
        setActiveModal(id);
    };

    const handleRemovePrayer = (id) => {
        setSelectedPrayers(prev => prev.filter(p => p !== id));
        // Optional: Remove data from prayerData as well? 
        // setPrayerData(prev => { const next = {...prev}; delete next[id]; return next; })
    };

    const handleSaveModal = (id, time, isCongregation) => {
        // Update Data
        setPrayerData(prev => ({
            ...prev,
            [id]: { time, isCongregation }
        }));
        // Mark as Selected
        if (!selectedPrayers.includes(id)) {
            setSelectedPrayers(prev => [...prev, id]);
        }
        // Close Modal
        setActiveModal(null);
    };

    const toggleAdditionalWorship = (id) => {
        setSelectedAdditionalWorships(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };



    // Navigation Guard for Dirty State - only NEW selections count
    const hasNewPrayers = selectedPrayers.length > 0;
    const hasNewTadarus = !!(form.surah && form.ayatStart && form.ayatEnd);
    const hasNewAdditional = Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]).length > 0;
    const isDirty = hasNewPrayers || hasNewTadarus || hasNewAdditional || form.notes.length > 0;

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    // Context blocker for Sidebar Navigation
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

    const handleNavigateHistory = () => {
        if (isDirty) {
            setPendingPath('/student/history');
            setShowConfirmModal(true);
        } else {
            navigate('/student/history');
        }
    };

    const confirmNavigation = () => {
        setShowConfirmModal(false);
        setNavigationBlocker(null); // Clear blocker to allow nav
        if (pendingPath) {
            navigate(pendingPath);
        }
    };

    const handleSendReport = () => {
        if (isSubmitting) return;

        if (!isDirty) {
            toast.error("Lengkapi minimal 1 data ibadah sebelum mengirim laporan");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call and Save to LocalStorage
        setTimeout(() => {
            // Prepare timestamps
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            // Prepare new prayer objects
            const newPrayers = selectedPrayers.map(id => ({
                id,
                time: prayerData[id]?.time || prayers.find(p => p.id === id).defaultTime,
                isCongregation: prayerData[id]?.isCongregation !== false,
                submittedAt: currentTime // Using the shared currentTime with seconds
            }));

            // Prepare tadarus object
            const newTadarus = (form.surah && form.ayatStart && form.ayatEnd)
                ? { surah: form.surah, ayatStart: form.ayatStart, ayatEnd: form.ayatEnd, submittedAt: currentTime }
                : null;

            // Save to LocalStorage
            const today = new Date().toISOString().split('T')[0];

            // Convert any old string format prayers to object format
            const existingPrayers = alreadySubmitted.prayers.map(prayer => {
                if (typeof prayer === 'string') {
                    const prayerDef = prayers.find(p => p.id === prayer);
                    return {
                        id: prayer,
                        time: prayerDef?.defaultTime || '12:00',
                        isCongregation: false
                    };
                }
                return prayer;
            });
            // Prepare new additional worship objects with time
            const newAdditional = Object.keys(selectedAdditionalWorships)
                .filter(k => selectedAdditionalWorships[k])
                .map(id => ({
                    id,
                    submittedAt: currentTime,
                    note: additionalNotes[id] || ''
                }));

            const newData = {
                prayers: [...existingPrayers, ...newPrayers],
                tadarus: alreadySubmitted.tadarus || newTadarus,
                additional: [...alreadySubmitted.additional, ...newAdditional],
                notes: form.notes || alreadySubmitted.notes, // Save general notes
                submittedAt: currentTime // Save submission time for the note/report
            };
            localStorage.setItem(`daily_report_${today}`, JSON.stringify(newData));

            setIsSubmitting(false);
            setShowSuccessModal(true);

            // Clear navigation blocker
            setNavigationBlocker(null);

            // Wait for 2 seconds then redirect
            setTimeout(() => {
                navigate('/student/history');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmNavigation}
            />
            <SuccessModal isOpen={showSuccessModal} />
            <PrayerEntryModal
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                onSave={handleSaveModal}
                prayerData={activeModal ? { ...prayerData[activeModal], ...prayers.find(p => p.id === activeModal) } : null}
            />

            {/* Page Header - Fun for Kids */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-primary/5 to-emerald-50 p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-3xl">👋</span>
                        Hai Ahmad! Siap Beribadah?
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Catat semua kebaikanmu hari ini! ✨ Allah Maha Melihat setiap amalmu.</p>
                </div>
                <button
                    onClick={handleNavigateHistory}
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md flex items-center gap-2 shrink-0"
                >
                    <span className="material-symbols-outlined text-lg">history</span>
                    📜 Lihat Riwayat
                </button>
            </div>

            <div>



                {/* Main Form Column */}
                <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

                        {/* Form Header & Progress */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-6 gap-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Misi Kebaikan Hari Ini 🚀</h2>
                                <p className="text-gray-500 text-sm mt-1">Selasa, 24 Oktober 2023</p>
                            </div>

                            {/* Integrated Progress Bar */}
                            <div className="bg-gray-50 rounded-xl p-4 w-full md:w-1/2 lg:w-1/3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-600">🎯 Pencapaian Misi</span>
                                    <div className={`px-2 py-0.5 rounded-lg text-xs font-bold ${currentProgress >= totalTarget ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {currentProgress >= totalTarget ? '🎉' : '💪'} {currentProgress}/{totalTarget} Selesai
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-500 relative"
                                        style={{ width: `${progressPercentage}%` }}
                                    >
                                        {/* Particle effect hint */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 size-2 bg-white rounded-full shadow-sm animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sholat Wajib Section */}
                        <div className="mb-10">
                            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="text-xl">🕌</span>
                                Sholat Wajib - Yuk Lengkapi!
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {prayers.map((prayer) => (
                                    <PrayerCard
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {/* Tadarus Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">📖</span>
                                    <h3 className="font-bold text-gray-800">Tadarus Al-Qur'an</h3>
                                    <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full ml-auto">
                                        ⭐ +50 Poin
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Surat</label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Al-Mulk"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                                            value={form.surah}
                                            onChange={(e) => setForm({ ...form, surah: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ayat Mulai</label>
                                        <input
                                            type="number"
                                            placeholder="1"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                                            value={form.ayatStart}
                                            onChange={(e) => setForm({ ...form, ayatStart: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ayat Akhir</label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                                            value={form.ayatEnd}
                                            onChange={(e) => setForm({ ...form, ayatEnd: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Worship */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">💝</span>
                                    <h3 className="font-bold text-gray-800">Ibadah Sunnah</h3>
                                </div>

                                <div className="space-y-3">
                                    {additionalWorships.map((item) => (
                                        <div key={item.id} className={`bg-gray-50 rounded-xl border transition-all ${selectedAdditionalWorships[item.id] ? 'border-emerald-200 bg-emerald-50/30' : 'border-transparent'}`}>
                                            <label className="flex items-center justify-between p-4 cursor-pointer group">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="peer appearance-none size-5 border-2 border-gray-300 rounded checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                                                            checked={selectedAdditionalWorships[item.id] || false}
                                                            onChange={() => toggleAdditionalWorship(item.id)}
                                                        />
                                                        <span className="material-symbols-outlined text-white text-sm absolute opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700">{item.label}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                                                    ⭐ +{item.points} Poin
                                                </span>
                                            </label>

                                            {/* Note Input for specific activities */}
                                            {selectedAdditionalWorships[item.id] && (
                                                <div className="px-4 pb-4 animate-fade-in pl-11">
                                                    <input
                                                        type="text"
                                                        placeholder={item.id === 'help' ? "Contoh: Nyapu / Cuci Piring" : (item.id === 'infaq' ? "Nominal / Keperluan" : "Tambahkan catatan...")}
                                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 placeholder:text-gray-300 transition-all"
                                                        value={additionalNotes[item.id] || ''}
                                                        onChange={(e) => setAdditionalNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-100">

                            <button
                                onClick={handleSendReport}
                                disabled={isSubmitting}
                                className={`flex-1 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2 shrink-0 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">send</span>
                                        🚀 Kirim Laporan!
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputDesktop;
