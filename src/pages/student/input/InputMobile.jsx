import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMosque, FaBookOpen, FaHeart, FaStar, FaCloudSun } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdVerified, MdOutlineWbTwilight, MdLightMode, MdSunny, MdNightsStay, MdBedtime } from "react-icons/md";
import { useStudentContext } from '../../../context/StudentContext';
import { useToast } from '../../../context/ToastContext';

// Custom Time Picker Component (Based on Desktop Implementation)
const CustomTimePicker = ({ value, onChange }) => {
    const [selectedHour, setSelectedHour] = useState(value ? value.split(':')[0] : '05');
    const [selectedMinute, setSelectedMinute] = useState(value ? value.split(':')[1] : '00');
    const [isMounted, setIsMounted] = useState(false);

    // Refs for scrolling
    const hourRef = useRef(null);
    const minuteRef = useRef(null);

    // Set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sync with external value changes
    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            if (h && h !== selectedHour) setSelectedHour(h);
            if (m && m !== selectedMinute) setSelectedMinute(m);
        }
    }, [value, selectedHour, selectedMinute]);

    // Scroll to selected items on mount and when selection changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const scrollToElement = (element, container) => {
                if (!element || !container) return;

                const elementOffset = element.offsetTop;
                const containerHeight = container.clientHeight;
                const elementHeight = element.clientHeight;
                const scrollPosition = elementOffset - (containerHeight / 2) + (elementHeight / 2);

                container.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            };

            const hourEl = document.getElementById(`mobile-hour-${selectedHour}`);
            const minuteEl = document.getElementById(`mobile-minute-${selectedMinute}`);

            scrollToElement(hourEl, hourRef.current);
            scrollToElement(minuteEl, minuteRef.current);
        }, 200);
        return () => clearTimeout(timer);
    }, [selectedHour, selectedMinute, isMounted]);

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
        <div className="flex gap-3 mt-6 mb-4 px-2">
            {/* Hours Column */}
            <div className="flex-1">
                <p className="text-center text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">Jam</p>
                <div className="bg-white rounded-2xl h-44 overflow-hidden relative border border-slate-100 shadow-sm">
                    <div
                        className="overflow-y-auto no-scrollbar w-full h-full touch-manipulation"
                        ref={hourRef}
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        <div className="pt-16 pb-16">
                            {hours.map(h => (
                                <div
                                    key={h}
                                    id={`mobile-hour-${h}`}
                                    onClick={() => handleHourClick(h)}
                                    className={`text-center py-2 my-1 mx-2 rounded-xl cursor-pointer text-base font-bold transition-all select-none ${selectedHour === h
                                        ? 'bg-emerald-500 text-white scale-105 relative !z-50'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 relative !z-10'
                                        }`}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center text-slate-300 font-black text-2xl pt-6">:</div>

            {/* Minutes Column */}
            <div className="flex-1">
                <p className="text-center text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">Menit</p>
                <div className="bg-white rounded-2xl h-44 overflow-hidden relative border border-slate-100 shadow-sm">
                    <div
                        className="overflow-y-auto no-scrollbar w-full h-full touch-manipulation"
                        ref={minuteRef}
                        style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        <div className="pt-16 pb-16">
                            {minutes.map(m => (
                                <div
                                    key={m}
                                    id={`mobile-minute-${m}`}
                                    onClick={() => handleMinuteClick(m)}
                                    className={`text-center py-2 my-1 mx-2 rounded-xl cursor-pointer text-base font-bold transition-all select-none ${selectedMinute === m
                                        ? 'bg-blue-500 text-white scale-105 relative !z-50'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 relative !z-10'
                                        }`}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    </div>
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
                <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
                    {icon}
                </div>
                <span className="text-xs font-bold text-gray-400">{label}</span>
                <div className="absolute top-1 right-1 text-emerald-500 text-lg">
                    <MdVerified />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                relative rounded-2xl border transition-all duration-300 p-3 flex flex-col items-center gap-2 group select-none active:scale-[0.98]
                animate-fade-in
                ${isChecked
                    ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-md shadow-blue-100/50'
                    : 'bg-white border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md hover:border-blue-200'
                }
            `}
            onClick={() => onClick(id)}
        >
            {isChecked && (
                <div
                    className="absolute top-1 right-1 text-blue-500 cursor-pointer p-1 z-10 hover:bg-blue-100 rounded-full transition-colors"
                    onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                >
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                </div>
            )}

            <div className={`
                size-10 rounded-full flex items-center justify-center transition-colors text-xl
                ${isChecked ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400'}
            `}>
                {icon}
            </div>

            <div className="text-center w-full">
                <span className={`block text-xs font-bold ${isChecked ? 'text-blue-700' : 'text-gray-600'}`}>
                    {label}
                </span>

                {isChecked ? (
                    <div className="mt-1 animate-pop-in">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-block ${data?.isCongregation ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {data?.time}
                        </span>
                    </div>
                ) : (
                    <div className="mt-1">
                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md text-[9px] font-bold border border-blue-200 inline-block">
                            +20 Poin
                        </span>
                    </div>
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

    // Time State
    const [currentTime, setCurrentTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    });


    // Validation Errors State
    const [errors, setErrors] = useState({});

    // Load Data Hook
    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
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

    const studentInfo = {
        name: "Ahmad",
        // Add other info if available in context, otherwise fallback
    };

    const prayers = [
        { id: 'Subuh', icon: <MdOutlineWbTwilight />, label: 'Subuh', defaultTime: '04:45' },
        { id: 'Dzuhur', icon: <MdLightMode />, label: 'Dzuhur', defaultTime: '12:15' },
        { id: 'Ashar', icon: <MdSunny />, label: 'Ashar', defaultTime: '15:30' },
        { id: 'Maghrib', icon: <MdNightsStay />, label: 'Maghrib', defaultTime: '18:10' },
        { id: 'Isya', icon: <MdBedtime />, label: 'Isya', defaultTime: '19:25' },
    ];

    const additionalWorships = [
        { id: 'dhuha', label: 'Sholat Dhuha', points: 15, icon: <FaCloudSun />, color: 'purple' },
        { id: 'infaq', label: 'Infaq / Sedekah', points: 10, icon: <BiSolidDonateHeart />, color: 'emerald' },
        { id: 'help', label: 'Bantu Orang Tua', points: 25, icon: <FaHeart />, color: 'rose' },
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

        // Validation for Tadarus
        // If any field is filled, all must be filled
        const isPartiallyFilled = form.surah || form.ayatStart || form.ayatEnd;
        const newErrors = {};

        if (isPartiallyFilled) {
            if (!form.surah) newErrors.surah = "Ups, nama suratnya belum diisi nih! 📝";
            if (!form.ayatStart) newErrors.ayatStart = "Ayat mulainya dari berapa ya? 🤔";
            if (!form.ayatEnd) newErrors.ayatEnd = "Sampai ayat berapa bacanya? 📖";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Lengkapi data tadarus dulu ya! 🙏");

            // Scroll to error
            const firstError = document.getElementById('tadarus-form');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Clear errors if valid
        setErrors({});

        if (!isDirty && !isPartiallyFilled) {
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

            // Use local date (not UTC from toISOString) to match HistoryMobile
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const today = `${year}-${month}-${day}`;
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
        const [time, setTime] = useState('');
        const [isCongregation, setIsCongregation] = useState(true);

        useEffect(() => {
            if (isOpen && prayerData) {
                // Use existing time if set, otherwise use defaultTime from prayer definition
                const initialTime = prayerData.time || prayerData.defaultTime || '12:00';
                setTime(initialTime);
                setIsCongregation(prayerData.isCongregation !== false);
            }
        }, [isOpen, prayerData]);

        if (!isOpen || !prayerData) return null;

        return createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                {/* Centered Card for Mobile - Native Style */}
                <div className="bg-white w-[88%] max-w-[340px] rounded-[2rem] p-6 shadow-2xl animate-pop-up relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                    <div className="flex flex-col items-center gap-2 mb-2 text-center">
                        <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl mb-1 shadow-sm border border-blue-100">
                            {prayerData.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{prayerData.label}</h3>
                            <p className="text-sm font-medium text-gray-500">Jam berapa kamu sholat?</p>
                        </div>
                    </div>

                    <CustomTimePicker value={time} onChange={setTime} />

                    <div className="mt-2">
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1.5">
                            <button
                                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-0 ring-0 focus:outline-none focus:ring-0 relative min-h-[52px] ${isCongregation ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-300/50 hover:shadow-emerald-300/70' : 'bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'}`}
                                onClick={() => setIsCongregation(true)}
                            >
                                <span className="material-symbols-outlined text-lg">groups</span>
                                <span>Berjamaah!</span>
                            </button>
                            <button
                                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-0 ring-0 focus:outline-none focus:ring-0 relative min-h-[52px] ${!isCongregation ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-300/50 hover:shadow-blue-300/70' : 'bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'}`}
                                onClick={() => setIsCongregation(false)}
                            >
                                <span className="material-symbols-outlined text-lg">person</span>
                                <span>Sendiri</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button onClick={onClose} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Batal</button>
                        <button onClick={() => onSave(prayerData.id, time, isCongregation)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">Simpan</button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }


    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth overscroll-none bg-[#EEF7FF] font-sans relative pb-32">
            {/* Smooth Background Gradient Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>
            <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={confirmNavigation} />

            {/* Header - Sticky with Glassmorphism to match Dashboard */}
            <div className="px-6 py-4 sticky top-0 bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-[60] border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="size-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                            Catat Ibadah 📝
                        </h1>
                        <p className="text-xs text-blue-500 font-medium">Catat semua kebaikanmu hari ini! ✨</p>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="space-y-6 relative z-10 px-6 mt-6 mb-24">
                {/* Main Prayer Grid */}
                <section className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="size-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FaMosque />
                        </div>
                        <h3 className="font-bold text-gray-800">Sholat Wajib</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {prayers.map((prayer) => {
                            const isSubmitted = alreadySubmitted.prayers.some(p => p.id === prayer.id);
                            return (
                                <PrayerCardMobile
                                    key={prayer.id}
                                    {...prayer}
                                    isChecked={selectedPrayers.includes(prayer.id)}
                                    isSubmitted={isSubmitted}
                                    data={prayerData[prayer.id]}
                                    onClick={handlePrayerClick}
                                    onRemove={handleRemovePrayer}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* Tadarus Section - Native Card Style */}
                <section className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="size-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                            <FaBookOpen />
                        </div>
                        <h3 className="font-bold text-gray-800">Tadarus Al-Qur'an</h3>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-slate-200/60 relative overflow-hidden group active:scale-[0.99] transition-all" id="tadarus-form">
                        {/* Header inside card with Score */}
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">Bacaan Hari Ini</h4>
                                <p className="text-[10px] text-slate-500 font-medium">Jangan lupa catat suratnya ya!</p>
                            </div>
                            <div className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm border border-blue-200">
                                +50 Poin
                            </div>
                        </div>

                        {/* Decorative Background Icon */}
                        <FaBookOpen className="absolute -bottom-6 -right-6 text-amber-500/5 text-[10rem] pointer-events-none rotate-12" />

                        <div className="space-y-5 relative z-10">
                            <div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide ml-1 mb-2 block">Nama Surat</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Al-Mulk"
                                    className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all placeholder:font-medium placeholder:text-slate-300 ${errors.surah ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-amber-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)]'}`}
                                    value={form.surah}
                                    onChange={(e) => {
                                        setForm({ ...form, surah: e.target.value });
                                        if (errors.surah) setErrors({ ...errors, surah: null });
                                    }}
                                />
                                {errors.surah && <p className="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse flex items-center gap-1"><span className="text-xs">⚠️</span> {errors.surah}</p>}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide ml-1 mb-2 block">Ayat Mulai</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="1"
                                            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all placeholder:font-medium placeholder:text-slate-300 text-center ${errors.ayatStart ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-amber-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)]'}`}
                                            value={form.ayatStart}
                                            onChange={(e) => {
                                                setForm({ ...form, ayatStart: e.target.value });
                                                if (errors.ayatStart) setErrors({ ...errors, ayatStart: null });
                                            }}
                                        />
                                    </div>
                                    {errors.ayatStart && <p className="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse text-center">{errors.ayatStart}</p>}
                                </div>
                                <div className="flex items-center pt-8 text-slate-300">
                                    <span className="material-symbols-outlined">arrow_right_alt</span>
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide ml-1 mb-2 block">Ayat Akhir</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all placeholder:font-medium placeholder:text-slate-300 text-center ${errors.ayatEnd ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-amber-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.1)]'}`}
                                            value={form.ayatEnd}
                                            onChange={(e) => {
                                                setForm({ ...form, ayatEnd: e.target.value });
                                                if (errors.ayatEnd) setErrors({ ...errors, ayatEnd: null });
                                            }}
                                        />
                                    </div>
                                    {errors.ayatEnd && <p className="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse text-center">{errors.ayatEnd}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional */}
                <section className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="size-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                            <FaHeart />
                        </div>
                        <h3 className="font-bold text-gray-800">Ibadah Lainnya</h3>
                    </div>

                    <div className="space-y-3">
                        {additionalWorships.map((item) => {
                            // Color mapping
                            const colorClasses = {
                                purple: { border: 'border-purple-300', bg: 'bg-purple-50/50', checkBg: 'bg-purple-500 border-purple-500', iconColor: 'text-purple-600', ring: 'focus:ring-purple-200 focus:border-purple-400' },
                                emerald: { border: 'border-emerald-300', bg: 'bg-emerald-50/50', checkBg: 'bg-emerald-500 border-emerald-500', iconColor: 'text-emerald-600', ring: 'focus:ring-emerald-200 focus:border-emerald-400' },
                                rose: { border: 'border-rose-300', bg: 'bg-rose-50/50', checkBg: 'bg-rose-500 border-rose-500', iconColor: 'text-rose-600', ring: 'focus:ring-rose-200 focus:border-rose-400' },
                            }[item.color || 'emerald'];

                            return (
                                <div key={item.id} className={`bg-white rounded-2xl border p-4 transition-all duration-300 ${selectedAdditionalWorships[item.id] ? `${colorClasses.border} ${colorClasses.bg} shadow-md` : 'border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md'}`}>
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleAdditionalWorship(item.id)}>
                                        <div className="flex items-center gap-3.5">
                                            <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedAdditionalWorships[item.id] ? colorClasses.checkBg : 'border-gray-200 bg-gray-50'}`}>
                                                {selectedAdditionalWorships[item.id] && <span className="text-white text-xs font-bold">✓</span>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-lg ${selectedAdditionalWorships[item.id] ? colorClasses.iconColor : 'text-gray-400'}`}>{item.icon}</span>
                                                <span className={`text-sm font-bold ${selectedAdditionalWorships[item.id] ? 'text-gray-800' : 'text-gray-600'}`}>{item.label}</span>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${selectedAdditionalWorships[item.id] ? 'bg-white shadow-sm text-gray-800' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>+{item.points} Poin</span>
                                    </div>
                                    {selectedAdditionalWorships[item.id] && (
                                        <div className="mt-4 pl-10 animate-fade-in">
                                            <input
                                                type="text"
                                                placeholder="Tambahkan catatan..."
                                                className={`w-full bg-white border border-transparent rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:ring-2 transition-all shadow-sm ${colorClasses.ring}`}
                                                value={additionalNotes[item.id] || ''}
                                                onChange={(e) => setAdditionalNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Submit Action - Large Native Gradient */}
                <div className="mt-8 pointer-events-auto flex justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <button
                        onClick={handleSendReport}
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] active:shadow-md text-base tracking-wide relative overflow-hidden group ${isSubmitting ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-500' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/50'}`}
                    >
                        {/* Shine Effect */}
                        {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animation: 'shimmer 2.5s infinite' }}></div>}

                        {isSubmitting ? (
                            <>
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Mengirim Laporan...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xl filter drop-shadow-md">🚀</span>
                                <span className="drop-shadow-sm">Kirim Laporan</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <SuccessModal isOpen={showSuccessModal} />

            {/* Prayer Modal */}
            <PrayerModalMobile
                isOpen={!!activeModal}
                onClose={() => setActiveModal(null)}
                onSave={handleSaveModal}
                prayerData={activeModal ? { ...prayerData[activeModal], ...prayers.find(p => p.id === activeModal) } : null}
            />
        </div>
    );
};

export default InputMobile;
