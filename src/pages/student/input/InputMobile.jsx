import React, { useState, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMosque, FaBookOpen, FaHeart, FaStar, FaCloudSun, FaSmileWink, FaMagic, FaHandHoldingHeart, FaCommentSlash, FaBook, FaChevronDown } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { MdVerified, MdOutlineWbTwilight, MdLightMode, MdSunny, MdNightsStay, MdBedtime, MdNoFood } from "react-icons/md";
import { useStudentContext } from '../../../context/StudentContext';
import { useToast } from '../../../context/ToastContext';
import { getPrayers, getSunnahWorships, getAdditionalWorships, getCustomCategories, getAllWorshipCategories } from '../../../utils/worshipConfig';
import { INPUT_TYPES } from '../../../utils/constants';
import StudentHeader from '../../../components/student/StudentHeader';
import { useAuth } from '../../../context/AuthContext';
import ActivityRenderer from '../../../components/activities/ActivityRenderer';

// Komponen Pemilih Waktu Kustom (Berdasarkan Implementasi Desktop)
const CustomTimePicker = ({ value, onChange }) => {
    const [selectedHour, setSelectedHour] = useState(value ? value.split(':')[0] : '05');
    const [selectedMinute, setSelectedMinute] = useState(value ? value.split(':')[1] : '00');
    const [isMounted, setIsMounted] = useState(false);

    // Refs untuk scrolling
    const hourRef = useRef(null);
    const minuteRef = useRef(null);

    // Mengatur state mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Sinkronisasi dengan perubahan value eksternal
    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            if (h && h !== selectedHour) setSelectedHour(h);
            if (m && m !== selectedMinute) setSelectedMinute(m);
        }
    }, [value, selectedHour, selectedMinute]);

    // Scroll ke item yang dipilih saat mount dan saat pilihan berubah
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
            {/* Kolom Jam */}
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
                                        ? 'bg-blue-500 text-white scale-105 relative !z-50 shadow-md shadow-blue-200'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 relative !z-10'
                                        }`}
                                >
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pemisah */}
            <div className="flex items-center justify-center text-slate-300 font-black text-2xl pt-6">:</div>

            {/* Kolom Menit */}
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
                                        ? 'bg-blue-500 text-white scale-105 relative !z-50 shadow-md shadow-blue-200'
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 relative !z-10'
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

// Kartu Ibadah Mobile yang Disederhanakan
const PrayerCardMobile = ({ id, label, Icon, isChecked, onClick, onRemove, data, isSubmitted }) => {
    if (isSubmitted) {
        return (
            <div className="relative rounded-2xl border border-slate-100 bg-slate-50 p-3 flex flex-col items-center gap-2 select-none opacity-50">
                <div className="size-11 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 text-xl">
                    {Icon && <Icon />}
                </div>
                <span className="text-[11px] font-bold text-slate-400">{label}</span>
                <div className="absolute top-1.5 right-1.5 text-emerald-500 text-base">
                    <MdVerified />
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                relative rounded-2xl border transition-all duration-200 p-3 flex flex-col items-center gap-2 select-none cursor-pointer active:scale-95
                ${isChecked
                    ? 'bg-blue-50/80 border-blue-200 shadow-md'
                    : 'bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                }
            `}
            onClick={() => onClick(id)}
        >
            {isChecked && (
                <div
                    className="absolute top-1.5 right-1.5 text-blue-400 cursor-pointer p-0.5 z-10 hover:bg-blue-100 rounded-lg transition-colors"
                    onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                >
                    <span className="material-symbols-outlined text-sm font-bold notranslate">close</span>
                </div>
            )}

            {/* Icon */}
            <div className={`
                size-11 rounded-xl flex items-center justify-center transition-all text-xl
                ${isChecked ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-400'}
            `}>
                {Icon && <Icon />}
            </div>

            {/* Label & Badge */}
            <div className="text-center w-full">
                <span className={`block text-[11px] font-bold ${isChecked ? 'text-blue-700' : 'text-slate-600'}`}>
                    {label}
                </span>

                {isChecked ? (
                    <div className="mt-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg inline-block ${data?.isCongregation ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {data?.time}
                        </span>
                    </div>
                ) : (
                    <div className="mt-1.5">
                        <span className="flex items-center justify-center gap-0.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-blue-100 inline-flex">
                            <span>⭐</span>
                            <span>+{data?.points || 20}</span>
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
                        <span className="material-symbols-outlined text-3xl notranslate">warning</span>
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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    // Confetti pieces
    const confettiColors = ['bg-amber-400', 'bg-rose-400', 'bg-emerald-400', 'bg-blue-400', 'bg-purple-400'];
    const confettiPieces = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        color: confettiColors[i % confettiColors.length],
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${1.5 + Math.random() * 1.5}s`
    }));

    return createPortal(
        <div className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'bg-black/40 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
            <div className={`bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl relative text-center overflow-hidden transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-20'}`}>

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 size-32 bg-emerald-100/50 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 size-24 bg-blue-100/50 rounded-full blur-2xl animate-pulse delay-700"></div>

                {/* Confetti */}
                {confettiPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className={`absolute top-0 size-1.5 rounded-full ${piece.color} animate-confetti`}
                        style={{
                            left: piece.left,
                            animationDelay: piece.animationDelay,
                            animationDuration: piece.animationDuration
                        }}
                    ></div>
                ))}

                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                    <div className="size-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50 shadow-inner">
                        <span className="material-symbols-outlined text-5xl animate-bounce drop-shadow-sm notranslate">check_circle</span>
                    </div>
                    {/* Floating elements */}
                    <div className="absolute top-0 right-1/3 text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🚀</div>
                    <div className="absolute bottom-0 left-1/3 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
                </div>

                {/* Text */}
                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Terkirim! 🎉</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                        Laporan ibadahmu sudah berhasil disimpan. <br />
                        <span className="text-emerald-600 font-bold">Barakallah fiikum!</span> 🤲
                    </p>
                </div>

                {/* Button-like visual at bottom */}
                <div className="mt-8">
                    <div className="h-1.5 w-20 bg-slate-100 rounded-full mx-auto"></div>
                </div>
            </div>
        </div>,
        document.body
    );
}

// Wrapper Modal (Dipindahkan keluar komponen untuk mencegah pembuatan ulang)
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
            {/* Kartu Tengah untuk Mobile - Gaya Native */}
            <div className="bg-white w-[88%] max-w-[340px] rounded-[2rem] p-6 shadow-2xl animate-pop-up relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex flex-col items-center gap-2 mb-2 text-center">
                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-3xl mb-1 shadow-sm border border-blue-100">
                        {prayerData.Icon && <prayerData.Icon />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{prayerData.label}</h3>
                        <p className="text-sm font-medium text-gray-500 px-4">Jam berapa kamu salat?</p>
                    </div>
                </div>

                <CustomTimePicker value={time} onChange={setTime} />

                <div className="mt-4">
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1.5 border border-slate-100">
                        <button
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-0 ring-0 focus:outline-none focus:ring-0 relative min-h-[48px] ${isCongregation ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white'}`}
                            onClick={() => setIsCongregation(true)}
                        >
                            <span className="material-symbols-outlined text-lg notranslate">groups</span>
                            <span>Berjamaah</span>
                        </button>
                        <button
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-0 ring-0 focus:outline-none focus:ring-0 relative min-h-[48px] ${!isCongregation ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white'}`}
                            onClick={() => setIsCongregation(false)}
                        >
                            <span className="material-symbols-outlined text-lg notranslate">person</span>
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

const InputMobile = () => {
    const navigate = useNavigate();
    const { setNavigationBlocker } = useStudentContext();
    const { user } = useAuth();
    const toast = useToast();

    // State (Sama seperti Desktop)
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
        page: '',
        jilid: '',
        literacyTitle: '',
        literacyPage: '',
        notes: ''
    });

    // State Bagian yang Dapat Dilipat
    const [expandedSections, setExpandedSections] = useState({
        prayers: true,
        tadarus: false,
        sunnah: false,
        literacy: false,
        additional: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // State Waktu
    const [currentTime, setCurrentTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    });


    // State Error Validasi
    const [errors, setErrors] = useState({});

    // Hook Memuat Data
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
                tadarus: Array.isArray(parsed.tadarus) ? parsed.tadarus : (parsed.tadarus ? [parsed.tadarus] : []),
                additional: parsed.additional || [],
                notes: parsed.notes || ''
            });
            if (parsed.notes) setForm(prev => ({ ...prev, notes: parsed.notes }));
            // Note: tadarus dan literacy yang sudah terkirim tidak perlu dimuat ke form
            // Form akan kosong dan user bisa input baru jika diperlukan
        }
    }, []);



    // Get worship data from worshipConfig (reads from localStorage + defaults)
    const prayers = getPrayers();
    const sunnahWorships = getSunnahWorships();
    const additionalWorships = getAdditionalWorships();
    const customCategories = getCustomCategories();
    const allCategories = getAllWorshipCategories();

    // Penanganan Event
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

    // Logika Perubahan Data
    const hasNewPrayers = selectedPrayers.length > 0;
    const hasNewTadarus = !!((form.surah && form.ayatStart && form.ayatEnd) || form.page || form.jilid);
    const hasNewLiteracy = !!(form.literacyTitle && form.literacyPage);
    const hasNewAdditional = Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]).length > 0;

    // Fix: Check if any form fields (in additionalNotes) have content
    const hasFilledForms = Object.values(additionalNotes).some(note => note && note.trim().length > 0);

    const isDirty = hasNewPrayers || hasNewTadarus || hasNewLiteracy || hasNewAdditional || hasFilledForms || form.notes.length > 0;

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

        // Validasi untuk Tadarus
        // Jika salah satu field diisi, semua harus diisi
        const isPartiallyFilled = form.surah || form.ayatStart || form.ayatEnd;
        const newErrors = {};

        if (isPartiallyFilled) {
            if (!form.surah) newErrors.surah = "Ups, nama suratnya belum diisi nih! 📝";
            if (!form.ayatStart) newErrors.ayatStart = "Ayat mulainya dari berapa ya? 🤔";
            if (!form.ayatEnd) newErrors.ayatEnd = "Sampai ayat berapa bacanya? 📖";
        }

        // Validasi untuk Hijrati
        // Cek jika salah satu field Hijrati diisi
        const isHijratiPartiallyFilled = form.page || form.jilid;

        if (isHijratiPartiallyFilled) {
            if (!form.page) newErrors.page = "Halaman berapa bacanya? 📄";
            if (!form.jilid) newErrors.jilid = "Jilid berapa nih? 📚";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Lengkapi data tadarus dulu ya! 🙏");

            // Scroll ke error
            const firstError = document.getElementById('tadarus-form');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Hapus error jika valid
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
            // Al-Qur'an: surah + ayatStart + ayatEnd harus lengkap
            // Hijrati: page atau jilid harus ada
            // Al-Qur'an: Cukup cek surah (validasi lengkap ada di atas)
            // Hijrati: Cukup cek page ATAU jilid (TAPI karena validasi di atas, user dipaksa isi keduanya)
            const hasAlQuran = !!form.surah;
            const hasHijrati = !!(form.page && form.jilid); // Strict check untuk saving

            const newTadarus = (hasAlQuran || hasHijrati)
                ? {
                    // Al-Qur'an fields (hanya disimpan jika lengkap)
                    surah: hasAlQuran ? form.surah : null,
                    ayatStart: hasAlQuran ? form.ayatStart : null,
                    ayatEnd: hasAlQuran ? form.ayatEnd : null,
                    // Hijrati fields (disimpan jika ada)
                    page: hasHijrati ? form.page : null,
                    jilid: hasHijrati ? form.jilid : null,
                    submittedAt: currentTime
                } : null;

            const newLiteracy = (form.literacyTitle && form.literacyPage)
                ? {
                    title: form.literacyTitle,
                    page: form.literacyPage,
                    submittedAt: currentTime
                } : null;

            // Gunakan tanggal lokal (bukan UTC dari toISOString) untuk mencocokkan HistoryMobile
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const today = `${year}-${month}-${day}`;
            const existingPrayers = alreadySubmitted.prayers.map(prayer => (typeof prayer === 'string' ? { id: prayer, time: '12:00', isCongregation: false } : prayer));
            // Fix: Include form/text activities that have notes content, even if not "selected" (checked)
            const allCustomItems = [
                ...additionalWorships,
                ...customCategories.flatMap(c => c.items || [])
            ];

            const formActivityIds = allCustomItems
                .filter(item => (item.type === 'form' || item.type === 'text') && additionalNotes[item.id]?.trim())
                .map(item => item.id);

            // Combine checked items and filled forms (using Set to avoid duplicates)
            const idsToSave = new Set([
                ...Object.keys(selectedAdditionalWorships).filter(k => selectedAdditionalWorships[k]),
                ...formActivityIds
            ]);

            const newAdditional = Array.from(idsToSave).map(id => ({
                id,
                submittedAt: currentTime,
                note: additionalNotes[id] || ''
            }));

            // Read latest data from LocalStorage to ensure no race conditions/stale state
            const currentSavedData = localStorage.getItem(`daily_report_${today}`);
            const parsedCurrentData = currentSavedData ? JSON.parse(currentSavedData) : alreadySubmitted;

            const existingTadarusArray = Array.isArray(parsedCurrentData.tadarus)
                ? parsedCurrentData.tadarus
                : (parsedCurrentData.tadarus ? [parsedCurrentData.tadarus] : []);

            // Only add if there is a new valid entry (newTadarus is not null)
            const updatedTadarusArray = (newTadarus
                ? [...existingTadarusArray, newTadarus]
                : existingTadarusArray).filter(Boolean);

            const newData = {
                prayers: [...(parsedCurrentData.prayers || existingPrayers), ...newPrayers],
                tadarus: updatedTadarusArray,
                literacy: newLiteracy || parsedCurrentData.literacy || alreadySubmitted.literacy,
                additional: [...(parsedCurrentData.additional || alreadySubmitted.additional), ...newAdditional],
                notes: form.notes || parsedCurrentData.notes || alreadySubmitted.notes,
                submittedAt: currentTime
            };

            localStorage.setItem(`daily_report_${today}`, JSON.stringify(newData));

            // Reset form and states after successful submission
            setForm({
                surah: '',
                ayatStart: '',
                ayatEnd: '',
                page: '',
                jilid: '',
                literacyTitle: '',
                literacyPage: '',
                notes: ''
            });
            setSelectedPrayers([]);
            setSelectedAdditionalWorships({});
            setAdditionalNotes({});

            // Update state to match new data
            setAlreadySubmitted({
                prayers: newData.prayers,
                tadarus: newData.tadarus,
                additional: newData.additional,
                notes: newData.notes
            });

            setIsSubmitting(false);
            setShowSuccessModal(true);
            setNavigationBlocker(null);
            setTimeout(() => navigate('/student/history'), 3000);
        }, 1500);
    };




    return (
        <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth bg-[#EEF7FF] font-sans relative pb-32 notranslate" translate="no">
            {/* Dekorasi Latar Belakang Gradien Halus */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-0"></div>
            <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={confirmNavigation} />

            {/* Header - Sticky dengan Glassmorphism agar cocok dengan Dashboard */}
            <div className="animate-fade-in-up opacity-0 sticky top-0 z-[60]" style={{ animationDuration: '0.6s', animationFillMode: 'forwards' }}>
                <StudentHeader
                    user={user}
                    variant="simple"
                    title="Catat Ibadah 📝"
                    subtitle="Catat semua kebaikanmu hari ini! ✨"
                />
            </div>

            {/* Kontainer Konten */}
            <div className="space-y-3 relative z-10 px-6 mt-6 mb-24">
                {/* Main Prayer Grid */}
                {prayers.length > 0 && (
                    <section className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        <div
                            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections.prayers ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                            onClick={() => toggleSection('prayers')}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                                    <FaMosque className="text-lg" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-[15px]">Salat Wajib</h3>
                            </div>
                            <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections.prayers ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                <FaChevronDown className="text-xs" />
                            </div>
                        </div>

                        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections.prayers ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-3 gap-3 animate-fade-in p-5 pt-2">
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
                            </div>
                        </div>
                    </section>
                )}

                {/* Sunnah Worships */}
                {sunnahWorships.length > 0 && (
                    <section className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        <div
                            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections.sunnah ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                            onClick={() => toggleSection('sunnah')}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                                    <FaStar className="text-lg" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-[15px]">Ibadah Sunah</h3>
                            </div>
                            <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections.sunnah ? 'bg-amber-100 text-amber-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                <FaChevronDown className="text-xs" />
                            </div>
                        </div>

                        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections.sunnah ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="space-y-2 animate-fade-in p-5 pt-2">
                                    {sunnahWorships.map((item) => (
                                        <ActivityRenderer
                                            key={item.id}
                                            activity={item}
                                            value={selectedAdditionalWorships[item.id] ? { note: additionalNotes[item.id] } : null}
                                            onToggle={toggleAdditionalWorship}
                                            onNoteChange={(id, value) => setAdditionalNotes(prev => ({ ...prev, [id]: value }))}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Bagian Tadarus - Gaya Kartu Native */}
                {allCategories.find(c => c.id === 'tadarus')?.items.filter(i => i.id !== 'literasi' && !i.isArchived).length > 0 && (
                    <section className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        <div
                            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections.tadarus ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                            onClick={() => toggleSection('tadarus')}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                                    <FaBookOpen className="text-lg" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-[15px]">Tadarus Al-Qur'an / Hijrati</h3>
                            </div>
                            <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections.tadarus ? 'bg-emerald-100 text-emerald-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                <FaChevronDown className="text-xs" />
                            </div>
                        </div>

                        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections.tadarus ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-5 pt-2 space-y-8 animate-fade-in">
                                    {allCategories.find(c => c.id === 'tadarus')?.items.filter(i => i.id !== 'literasi' && !i.isArchived).map((item) => (
                                        <ActivityRenderer
                                            key={item.id}
                                            activity={item}
                                            error={item.id === 'alquran' ? (errors.surah || errors.ayatStart || errors.ayatEnd) : (errors.page || errors.jilid)}
                                        >
                                            {item.id === 'alquran' ? (
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-600 tracking-wide ml-1 mb-2 block">Nama Surat</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: Al-Mulk"
                                                            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all placeholder:font-medium placeholder:text-slate-300 ${errors.surah ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-white border-slate-200 focus:border-blue-400 shadow-sm'}`}
                                                            value={form.surah}
                                                            onChange={(e) => setForm({ ...form, surah: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="flex-1">
                                                            <label className="text-xs font-bold text-slate-600 tracking-wide ml-1 mb-2 block">Ayat Mulai</label>
                                                            <input
                                                                type="number"
                                                                placeholder="1"
                                                                className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all text-center ${errors.ayatStart ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-white border-slate-200 focus:border-blue-400 shadow-sm'}`}
                                                                value={form.ayatStart}
                                                                onChange={(e) => setForm({ ...form, ayatStart: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="flex items-center pt-8 text-slate-300">
                                                            <span className="material-symbols-outlined notranslate">arrow_right_alt</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="text-xs font-bold text-slate-600 tracking-wide ml-1 mb-2 block">Ayat Selesai</label>
                                                            <input
                                                                type="number"
                                                                placeholder="10"
                                                                className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all text-center ${errors.ayatEnd ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-white border-slate-200 focus:border-blue-400 shadow-sm'}`}
                                                                value={form.ayatEnd}
                                                                onChange={(e) => setForm({ ...form, ayatEnd: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <label className="text-xs font-bold text-slate-600 tracking-wide ml-1 mb-2 block">Halaman</label>
                                                        <input
                                                            type="number"
                                                            placeholder="1"
                                                            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all text-center ${errors.page ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-white border-slate-200 focus:border-amber-400 shadow-sm'}`}
                                                            value={form.page || ''}
                                                            onChange={(e) => setForm({ ...form, page: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-xs font-bold text-slate-600 tracking-wide ml-1 mb-2 block">Jilid</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: 1"
                                                            className={`w-full border rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all text-center ${errors.jilid ? 'bg-red-50 border-red-200 focus:border-red-400' : 'bg-white border-slate-200 focus:border-amber-400 shadow-sm'}`}
                                                            value={form.jilid || ''}
                                                            onChange={(e) => setForm({ ...form, jilid: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </ActivityRenderer>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {/* Bagian Literasi */}
                {allCategories.find(c => c.id === 'tadarus')?.items.filter(i => i.id === 'literasi' && !i.isArchived).length > 0 && (
                    <section className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        <div
                            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections.literacy ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                            onClick={() => toggleSection('literacy')}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                                    <FaBook className="text-lg" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-[15px]">Literasi</h3>
                            </div>
                            <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections.literacy ? 'bg-indigo-100 text-indigo-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                <FaChevronDown className="text-xs" />
                            </div>
                        </div>

                        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections.literacy ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-5 pt-2 space-y-8 animate-fade-in">
                                    {allCategories.find(c => c.id === 'tadarus')?.items.filter(i => i.id === 'literasi' && !i.isArchived).map((item) => (
                                        <ActivityRenderer
                                            key={item.id}
                                            activity={{ ...item, label: 'Baca Buku Yuk! 📖' }}
                                        >
                                            <div className="space-y-4 pl-2">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 tracking-wide mb-2 block">📚 Baca buku apa hari ini?</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Tulis judul bukunya ya..."
                                                        className="w-full border bg-white border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] transition-all placeholder:font-medium placeholder:text-slate-300 shadow-sm"
                                                        value={form.literacyTitle}
                                                        onChange={(e) => setForm({ ...form, literacyTitle: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 tracking-wide mb-2 block">📖 Sampai halaman berapa?</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Contoh: 10"
                                                        className="w-full border bg-white border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] transition-all placeholder:font-medium placeholder:text-slate-300 shadow-sm"
                                                        value={form.literacyPage}
                                                        onChange={(e) => setForm({ ...form, literacyPage: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </ActivityRenderer>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </section>
                )}





                {/* Ibadah Lainnya */}
                {additionalWorships.length > 0 && (
                    <section className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0 relative z-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                        <div
                            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections.additional ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                            onClick={() => toggleSection('additional')}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-sm">
                                    <FaHeart className="text-lg" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-[15px]">Ibadah Lainnya</h3>
                            </div>
                            <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections.additional ? 'bg-pink-100 text-pink-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                <FaChevronDown className="text-xs" />
                            </div>
                        </div>

                        <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections.additional ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="space-y-2 animate-fade-in p-5 pt-2">
                                    {additionalWorships.map((item) => (
                                        <ActivityRenderer
                                            key={item.id}
                                            activity={item}
                                            value={selectedAdditionalWorships[item.id] ? { note: additionalNotes[item.id] } : null}
                                            onToggle={toggleAdditionalWorship}
                                            onNoteChange={(id, value) => setAdditionalNotes(prev => ({ ...prev, [id]: value }))}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Custom Categories from Admin */}
                {
                    customCategories.map((category, catIndex) => {
                        // Safety check: Filter out archived items
                        const activeItems = category.items ? category.items.filter(item => !item.isArchived) : [];
                        if (activeItems.length === 0) return null;

                        return (
                            <section key={category.id} className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden animate-fade-in-up opacity-0 relative z-0" style={{ animationDelay: `${0.6 + catIndex * 0.1}s`, animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                                <div
                                    className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${expandedSections[category.id] ? 'bg-slate-50/80' : 'bg-white hover:bg-slate-50/50'}`}
                                    onClick={() => toggleSection(category.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-2xl ${category.color || 'bg-purple-500'} text-white flex items-center justify-center shadow-sm`}>
                                            {category.Icon && <category.Icon className="text-lg" />}
                                        </div>
                                        <h3 className="font-bold text-slate-800 text-[15px]">{category.title}</h3>
                                    </div>
                                    <div className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSections[category.id] ? 'bg-purple-100 text-purple-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                                        <FaChevronDown className="text-xs" />
                                    </div>
                                </div>

                                <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedSections[category.id] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="space-y-2 animate-fade-in p-5 pt-2">
                                            {category.items.map((item) => (
                                                <ActivityRenderer
                                                    key={item.id}
                                                    activity={{ ...item, color: item.color || category.themeColor }}
                                                    value={selectedAdditionalWorships[item.id] ? { note: additionalNotes[item.id] } : null}
                                                    onToggle={toggleAdditionalWorship}
                                                    onNoteChange={(id, value) => setAdditionalNotes(prev => ({ ...prev, [id]: value }))}
                                                >
                                                    {(item.type === 'form' || item.type === 'text') && (
                                                        <div>
                                                            <label className="text-xs font-bold text-slate-500 tracking-wide mb-2 block">📝 {item.placeholder || 'Catatan'}</label>
                                                            <textarea
                                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:font-medium placeholder:text-slate-300 shadow-sm resize-none"
                                                                rows="3"
                                                                placeholder={item.placeholder || "Tulis catatanmu di sini..."}
                                                                value={additionalNotes[item.id] || ''}
                                                                onChange={(e) => setAdditionalNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                                                            />
                                                        </div>
                                                    )}
                                                </ActivityRenderer>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    })
                }

                {/* Aksi Kirim - Gradien Native Besar */}
                <div className="mt-8 pointer-events-auto flex justify-center animate-fade-in-up opacity-0" style={{ animationDelay: `${0.6 + customCategories.length * 0.1}s`, animationFillMode: 'forwards', animationDuration: '0.8s' }}>
                    <button
                        onClick={handleSendReport}
                        disabled={isSubmitting}
                        className={`w-[240px] px-8 py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.95] active:shadow-md text-sm tracking-wide relative overflow-hidden group ${isSubmitting ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-500' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/50'}`}
                    >
                        {/* Efek Kilau */}
                        {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animation: 'shimmer 2.5s infinite' }}></div>}

                        {isSubmitting ? (
                            <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Mengirim...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-lg filter drop-shadow-md">🚀</span>
                                <span className="drop-shadow-sm">Kirim Laporan</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <SuccessModal isOpen={showSuccessModal} />

            {/* Modal Salat */}
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
