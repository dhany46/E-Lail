import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, MoreVertical, Star, ChevronDown, ChevronUp, X, Mail, ShieldCheck, Pencil, Trash2, Save, User, Users, School, MapPin, Calendar, Phone, ChevronLeft, ChevronRight, Check, Camera, ImagePlus, ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import AdminHeader from '../components/AdminHeader';

// --- Custom Date Picker Component ---
const CustomDatePicker = ({ isOpen, onClose, onSelect, initialDate }) => {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : null);
    const [viewMode, setViewMode] = useState('days'); // 'days', 'months', 'years'

    useEffect(() => {
        if (isOpen) {
            if (initialDate) {
                const date = new Date(initialDate);
                setViewDate(date);
                setSelectedDate(date);
            } else {
                const now = new Date();
                // Default to standard student birth year approx 7-12 years ago if empty
                now.setFullYear(now.getFullYear() - 10);
                setViewDate(now);
            }
            setViewMode('days');
        }
    }, [isOpen, initialDate]);

    if (!isOpen) return null;

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const startDay = (year, month) => new Date(year, month, 1).getDay();

    const handlePrev = () => {
        const newDate = new Date(viewDate);
        if (viewMode === 'days') newDate.setMonth(newDate.getMonth() - 1);
        else if (viewMode === 'years') newDate.setFullYear(newDate.getFullYear() - 12);
        setViewDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(viewDate);
        if (viewMode === 'days') newDate.setMonth(newDate.getMonth() + 1);
        else if (viewMode === 'years') newDate.setFullYear(newDate.getFullYear() + 12);
        setViewDate(newDate);
    };

    const handleDateClick = (day) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        // Adjust for timezone offset to ensure string format is correct yyyy-mm-dd
        // Actually best to just return ISO string date part
        const offset = newDate.getTimezoneOffset();
        const adjustedDate = new Date(newDate.getTime() - (offset * 60 * 1000));
        onSelect(adjustedDate.toISOString().split('T')[0]);
        onClose();
    };

    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const renderDays = () => {
        const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
        const start = startDay(viewDate.getFullYear(), viewDate.getMonth());
        const days = [];

        // Empty slots
        for (let i = 0; i < start; i++) {
            days.push(<div key={`empty-${i}`} className="h-9"></div>);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const isSelected = selectedDate &&
                selectedDate.getDate() === i &&
                selectedDate.getMonth() === viewDate.getMonth() &&
                selectedDate.getFullYear() === viewDate.getFullYear();

            days.push(
                <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); handleDateClick(i); }}
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    const renderYears = () => {
        const currentYear = viewDate.getFullYear();
        const startYear = currentYear - 6;
        const years = [];
        for (let i = 0; i < 12; i++) {
            const y = startYear + i;
            years.push(
                <button
                    key={y}
                    onClick={(e) => {
                        e.preventDefault();
                        const newDate = new Date(viewDate);
                        newDate.setFullYear(y);
                        setViewDate(newDate);
                        setViewMode('days');
                    }}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${y === currentYear ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    {y}
                </button>
            );
        }
        return years;
    };

    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-[320px] bg-white rounded-[2rem] shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative">
                    <button onClick={(e) => { e.preventDefault(); handlePrev(); }} className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); setViewMode(viewMode === 'days' ? 'years' : 'days'); }}
                        className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                        {viewMode === 'days' ? `${months[viewDate.getMonth()]} ${viewDate.getFullYear()}` : 'Pilih Tahun'}
                        <ChevronDown size={14} className={`transition-transform ${viewMode === 'years' ? 'rotate-180' : ''}`} />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); handleNext(); }} className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>

                {viewMode === 'days' ? (
                    <>
                        <div className="grid grid-cols-7 mb-2 text-center">
                            {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
                                <span key={i} className={`text-[10px] font-bold ${d === 'M' ? 'text-red-400' : 'text-slate-400'}`}>{d}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                            {renderDays()}
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-3 gap-3">
                        {renderYears()}
                    </div>
                )}

                <button onClick={onClose} className="w-full mt-6 py-3 bg-slate-100 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors">
                    Batal
                </button>
            </div>
        </div>
    );
};

// --- Custom Select Component ---
const CustomSelect = ({ label, value, options, onChange, icon: Icon, placeholder = 'Pilih' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="text-[13px] font-semibold text-slate-700 mb-1.5 block">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-10 bg-white border border-slate-200 text-[12px] font-bold rounded-xl ${Icon ? 'pl-9' : 'pl-3.5'} pr-8 text-left transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm flex items-center ${value ? 'text-slate-800' : 'text-slate-400 font-normal'}`}
                >
                    <div className="flex items-center gap-2 w-full min-w-0">
                        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />}
                        <span className="truncate whitespace-nowrap">{value || placeholder}</span>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 max-h-36 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between ${value === option ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {option}
                                {value === option && <Check size={16} className="text-blue-600" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---
const StudentsMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ nis: '', name: '', class: '', gender: 'Laki-laki', birthPlace: '', birthDate: '', parentPhone: '', photo: '' });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);

    // Cropper State
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const [cropScale, setCropScale] = useState(1);
    const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const fileInputRef = useRef(null);

    // Compress image using Canvas API
    const compressImage = (file, maxSize = 200, quality = 0.7) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (square crop)
                    let size = Math.min(img.width, img.height);
                    let sx = (img.width - size) / 2;
                    let sy = (img.height - size) / 2;

                    canvas.width = maxSize;
                    canvas.height = maxSize;

                    // Draw cropped & resized image
                    ctx.drawImage(img, sx, sy, size, size, 0, 0, maxSize, maxSize);

                    // Convert to JPEG with compression
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle photo upload - Intercept for cropping
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCropImageSrc(reader.result);
                setIsCropModalOpen(true);
                setCropScale(1);
                setCropPosition({ x: 0, y: 0 });
            };
            reader.readAsDataURL(file);
            // Reset input
            e.target.value = null;
        }
    };

    const handleCropComplete = async () => {
        if (!cropImageSrc) return;

        setIsCompressing(true);
        const img = new Image();
        img.src = cropImageSrc;

        await new Promise(resolve => { img.onload = resolve; });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 300; // Final size

        canvas.width = size;
        canvas.height = size;

        // Fill white background (optional, for safety)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Calculate source rectangle based on crop view
        const scale = cropScale;
        const x = cropPosition.x;
        const y = cropPosition.y;

        // The crop view is circular, centered. 
        // We need to map the view's center crop to the image.
        // Viewport is 280px, Canvas is 300px.
        const ratio = size / 280;

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.translate(x * ratio, y * ratio);
        ctx.scale(scale, scale);

        // Draw image centered at origin
        // We need to maintain aspect ratio relative to the square canvas
        const aspect = img.width / img.height;
        let drawWidth, drawHeight;

        if (aspect > 1) {
            drawHeight = size;
            drawWidth = size * aspect;
        } else {
            drawWidth = size;
            drawHeight = size / aspect;
        }

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        const finalBase64 = canvas.toDataURL('image/jpeg', 0.8);

        // Debug compression size
        const originalSize = Math.round((cropImageSrc.length * 3) / 4 / 1024);
        const compressedSize = Math.round((finalBase64.length * 3) / 4 / 1024);
        console.log(`📸 Compression Result: ${originalSize}KB -> ${compressedSize}KB`);

        setNewStudent(prev => ({ ...prev, photo: finalBase64 }));
        setIsCropModalOpen(false);
        setIsCompressing(false);
    };

    // Pan Handlers
    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX - cropPosition.x, y: clientY - cropPosition.y });
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent page scroll
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setCropPosition({
            x: clientX - dragStart.x,
            y: clientY - dragStart.y
        });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Initial Data - Empty by default
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load from localStorage
    React.useEffect(() => {
        const saved = localStorage.getItem('students_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) setStudents(parsed);
            } catch (e) { console.error(e); }
        }

        // Load classes data
        const savedClasses = localStorage.getItem('classes_data');
        if (savedClasses) {
            try {
                const parsedClasses = JSON.parse(savedClasses);
                if (Array.isArray(parsedClasses)) setClasses(parsedClasses);
            } catch (e) { console.error(e); }
        }

        setIsInitialLoad(false);
    }, []);

    // Save to localStorage
    React.useEffect(() => {
        if (!isInitialLoad) localStorage.setItem('students_data', JSON.stringify(students));
    }, [students, isInitialLoad]);

    // Sync class student counts whenever students change
    React.useEffect(() => {
        if (isInitialLoad) return;

        const savedClasses = localStorage.getItem('classes_data');
        if (savedClasses) {
            try {
                const parsedClasses = JSON.parse(savedClasses);
                const updatedClasses = parsedClasses.map(cls => {
                    const count = students.filter(s => s.class === cls.name).length;
                    return { ...cls, students: count };
                });
                localStorage.setItem('classes_data', JSON.stringify(updatedClasses));
                setClasses(updatedClasses);
            } catch (e) {
                console.error('Failed to sync class student counts:', e);
            }
        }
    }, [students, isInitialLoad]);

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.nis || !newStudent.class) {
            alert('Mohon lengkapi data siswa');
            return;
        }

        // Check for duplicate NIS
        const isDuplicateNIS = students.some(s =>
            s.nis === newStudent.nis && (!editingStudent || s.id !== editingStudent.id)
        );
        if (isDuplicateNIS) {
            alert('NIS sudah digunakan oleh siswa lain. Mohon gunakan NIS yang berbeda.');
            return;
        }

        if (editingStudent) {
            setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
                ...s,
                nis: newStudent.nis,
                name: newStudent.name,
                class: newStudent.class,
                gender: newStudent.gender || 'Laki-laki',
                birthPlace: newStudent.birthPlace,
                birthDate: newStudent.birthDate,
                parentPhone: newStudent.parentPhone,
                photo: newStudent.photo || s.photo,
                initials: newStudent.name.substring(0, 2).toUpperCase()
            } : s));
            setEditingStudent(null);
        } else {
            const colors = ['from-emerald-400 to-emerald-600', 'from-rose-400 to-rose-600', 'from-blue-400 to-blue-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600', 'from-purple-400 to-purple-600', 'from-cyan-400 to-cyan-600'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setStudents([{
                id: Date.now(),
                ...newStudent,
                points: 0,
                initials: newStudent.name.substring(0, 2).toUpperCase(),
                color: randomColor
            }, ...students]);
        }
        setIsModalOpen(false);
        setNewStudent({ nis: '', name: '', class: '', gender: 'Laki-laki', birthPlace: '', birthDate: '', parentPhone: '', photo: '' });
    };

    const openEditModal = (student) => {
        setEditingStudent(student);
        setNewStudent({
            nis: student.nis,
            name: student.name,
            class: student.class,
            gender: student.gender || 'Laki-laki',
            birthPlace: student.birthPlace || '',
            birthDate: student.birthDate || '',
            parentPhone: student.parentPhone || '',
            photo: student.photo || ''
        });
        setIsModalOpen(true);
    };

    const [expandedId, setExpandedId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
    const [deleteConfig, setDeleteConfig] = useState({ type: null, id: null, title: '', message: '' });

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const openDeleteModal = (type, id = null, name = '') => {
        if (type === 'all') {
            setDeleteConfig({
                type: 'all',
                title: 'Hapus Semua Data?',
                message: 'Semua data siswa akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.'
            });
        } else {
            setDeleteConfig({
                type: 'single',
                id,
                title: 'Hapus Siswa?',
                message: `Yakin ingin menghapus data ${name}?`
            });
        }
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (deleteConfig.type === 'all') {
            setStudents([]);
            localStorage.removeItem('students_data');
        } else if (deleteConfig.type === 'single') {
            setStudents(prev => prev.filter(s => s.id !== deleteConfig.id));
            setExpandedId(null);
        }
        setShowConfirmModal(false);
    };

    const grades = ['Semua', '1', '2', '3', '4', '5', '6'];

    // Generate class options from classes data, sorted by level then name
    const classOptions = classes.length > 0
        ? classes
            .sort((a, b) => {
                const levelA = parseInt(a.level) || 99;
                const levelB = parseInt(b.level) || 99;
                if (levelA !== levelB) return levelA - levelB;
                return a.name.localeCompare(b.name);
            })
            .map(c => c.name)
        : ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B']; // Fallback

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nis.includes(searchQuery);
        const matchesGrade = selectedGrade === 'Semua' || s.class.startsWith(selectedGrade);
        return matchesSearch && matchesGrade;
    });

    // Helper to format date for display
    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Helper to format phone number
    const formatPhoneNumber = (number) => {
        if (!number) return '-';
        const cleaned = number.toString().replace(/\D/g, '');
        // Format as 08xx-xxxx-xxxx
        const match = cleaned.match(/^(\d{3,4})(\d{3,4})(\d{2,6})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        // Fallback: add dashes every 4 digits for any length
        if (cleaned.length >= 4) {
            return cleaned.replace(/(\d{4})(?=\d)/g, '$1-');
        }
        return number;
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/50 pb-32 scrollbar-hide font-sans">
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1">
                <AdminHeader
                    title="Data Siswa"
                    subtitle={`Total: ${students.length} Siswa`}
                />
            </div>

            <div className="px-5 pt-5 pb-32 max-w-lg mx-auto">

                {/* Single Card Container with Integrated Header */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative z-10 pb-4 overflow-hidden">

                    {/* Gradient Header */}
                    <div className="relative z-20">
                        {/* Decorative Background - Isolated for Overflow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-t-[2rem] overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        </div>

                        {/* Content */}
                        <div className="relative px-5 pt-5 pb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Data Siswa</h3>
                                    <p className="text-blue-200 text-[11px] font-normal">Kelola data peserta didik</p>
                                </div>
                                <div className="flex gap-2">
                                    {students.length > 0 && (
                                        <button
                                            onClick={() => openDeleteModal('all')}
                                            className="size-9 rounded-xl bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all shadow-lg hover:bg-white/30 backdrop-blur-sm"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setEditingStudent(null);
                                            setNewStudent({ nis: '', name: '', class: '', gender: 'Laki-laki', birthPlace: '', birthDate: '', parentPhone: '', photo: '' });
                                            setIsModalOpen(true);
                                        }}
                                        className="size-9 rounded-xl bg-white text-blue-600 flex items-center justify-center active:scale-95 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <Plus size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="relative group flex-1">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-9 pl-9 pr-3 bg-white rounded-lg text-[12px] font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal focus:ring-2 focus:ring-blue-400/30 transition-all outline-none"
                                    />
                                </div>
                                <div className="relative z-50">
                                    <button
                                        onClick={() => setIsGradeDropdownOpen(!isGradeDropdownOpen)}
                                        className={`h-9 px-3 rounded-lg text-[11px] font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg border ${isGradeDropdownOpen
                                            ? 'bg-blue-600 text-white border-blue-500 ring-2 ring-amber-400'
                                            : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700 ring-2 ring-amber-400'
                                            }`}
                                    >
                                        <span>{selectedGrade === 'Semua' ? 'Semua' : `Kls ${selectedGrade}`}</span>
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${isGradeDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isGradeDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setIsGradeDropdownOpen(false)}></div>
                                            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-xl shadow-blue-900/20 border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                                                {grades.map((grade) => (
                                                    <button
                                                        key={grade}
                                                        onClick={() => {
                                                            setSelectedGrade(grade);
                                                            setIsGradeDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 text-[11px] font-bold transition-colors ${selectedGrade === grade ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        {grade === 'Semua' ? 'Semua Kelas' : `Kelas ${grade}`}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {filteredStudents.map((student, index) => {
                        const isExpanded = expandedId === student.id;
                        return (
                            <div key={student.id} className={`group transition-all duration-300 ${index !== filteredStudents.length - 1 ? 'border-b border-slate-100' : ''}`}>

                                {/* Main Row - Clickable */}
                                <div
                                    onClick={() => toggleExpand(student.id)}
                                    className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors duration-200 ${isExpanded ? 'bg-blue-50/30' : 'bg-white'}`}
                                >
                                    {/* Avatar */}
                                    <div className={`size-11 rounded-full bg-gradient-to-br ${student.color} flex items-center justify-center text-white shadow-sm shadow-slate-200 shrink-0 ring-2 ring-white group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                                        {student.photo ? (
                                            <img src={student.photo} alt={student.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User size={20} strokeWidth={2.5} />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-[14px] font-medium text-slate-600 leading-snug group-hover:text-blue-600 transition-colors truncate pr-2">{student.name}</h3>
                                            {isExpanded ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-300 stroke-[3]" />}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[11px] font-semibold tracking-tight px-2.5 py-1 rounded-full ${(() => {
                                                const foundClass = classes.find(c => c.name === student.class);
                                                const level = foundClass ? foundClass.level : 'other';
                                                const colors = {
                                                    '1': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-200',
                                                    '2': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-200',
                                                    '3': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-200',
                                                    '4': 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-200',
                                                    '5': 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm shadow-violet-200',
                                                    '6': 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-sm shadow-cyan-200',
                                                    'other': 'bg-slate-100 text-slate-600'
                                                };
                                                return colors[level] || colors['other'];
                                            })()}`}>
                                                Kelas {student.class}
                                            </span>
                                            <span className="text-[11px] font-semibold tracking-tight px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                NIS : {student.nis}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden bg-slate-50/50">
                                        <div className="p-4 pt-0 space-y-3">
                                            <div className="h-px w-full bg-slate-100 mb-3"></div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <Users size={14} className="text-blue-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Gender</span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-slate-700">{student.gender || '-'}</p>
                                                </div>
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <School size={14} className="text-indigo-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Kelas</span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-slate-700">{student.class}</p>
                                                </div>
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm col-span-2">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <Calendar size={14} className="text-rose-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Tempat, Tanggal Lahir</span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-slate-700">
                                                        {student.birthPlace ? `${student.birthPlace}, ` : ''}
                                                        {student.birthDate ? formatDateDisplay(student.birthDate) : '-'}
                                                    </p>
                                                </div>
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm col-span-2">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <FaWhatsapp size={14} className="text-emerald-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">WhatsApp Wali</span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-slate-700">{formatPhoneNumber(student.parentPhone)}</p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="size-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                        <Star size={14} className="fill-current" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total Poin</p>
                                                        <p className="text-[12px] font-black text-slate-700">{student.points} Poin</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3.5">
                                                    <div className="size-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <ShieldCheck size={14} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Nomor Induk</p>
                                                        <p className="text-[12px] font-mono font-bold text-slate-700">{student.nis}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2.5 pt-2">
                                                <button
                                                    onClick={() => openEditModal(student)}
                                                    className="flex-1 h-8 rounded-lg bg-indigo-500 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-600 active:scale-95 transition-all"
                                                >
                                                    <Pencil size={12} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal('single', student.id, student.name)}
                                                    className="flex-1 h-8 rounded-lg bg-slate-100 text-red-500 text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-red-50 active:scale-95 transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredStudents.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center justify-center opacity-60">
                            <div className="size-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                                <Search size={40} />
                            </div>
                            <p className="text-slate-500 font-bold text-sm">Tidak ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Add/Edit Student */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative w-full max-w-[320px] bg-white rounded-[1.5rem] shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-300 scale-100 max-h-[90vh] overflow-y-auto scrollbar-hide">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">{editingStudent ? 'Edit Siswa' : 'Input Siswa'}</h3>
                                <p className="text-xs text-slate-400 font-medium leading-none mt-1">Kelola data peserta didik.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="size-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shadow-sm border border-slate-100">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleAddStudent} className="space-y-4">
                            {/* Photo Upload */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div
                                        onClick={() => !isCompressing && fileInputRef.current?.click()}
                                        className={`size-20 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 overflow-hidden ${newStudent.photo ? 'ring-4 ring-blue-100' : 'bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 hover:border-blue-400'} ${isCompressing ? 'opacity-50 cursor-wait' : ''}`}
                                    >
                                        {isCompressing ? (
                                            <div className="animate-spin size-8 border-3 border-blue-500 border-t-transparent rounded-full"></div>
                                        ) : newStudent.photo ? (
                                            <img src={newStudent.photo} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-slate-400" />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => !isCompressing && fileInputRef.current?.click()}
                                        disabled={isCompressing}
                                        className="absolute -bottom-1 -right-1 size-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        <Camera size={14} />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <p className="text-center text-[10px] text-slate-400 -mt-2">
                                {isCompressing ? 'Mengkompresi...' : '200x200px • Auto compress'}
                            </p>

                            <div>
                                <label className="text-[11px] font-bold text-slate-700 mb-1 block">NIS / Nomor Induk</label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input
                                        type="number"
                                        required
                                        placeholder="Contoh: 10293"
                                        value={newStudent.nis}
                                        onChange={e => setNewStudent({ ...newStudent, nis: e.target.value })}
                                        className="w-full h-9 bg-slate-50 border border-slate-200 text-slate-800 text-[12px] font-semibold rounded-xl pl-9 pr-3 placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-700 mb-1 block">Nama Lengkap</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama lengkap siswa"
                                        value={newStudent.name}
                                        onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                                        className="w-full h-9 bg-slate-50 border border-slate-200 text-slate-800 text-[12px] font-semibold rounded-xl pl-9 pr-3 placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <CustomSelect
                                        label="Kelas"
                                        value={newStudent.class}
                                        options={classOptions}
                                        onChange={(val) => setNewStudent({ ...newStudent, class: val })}
                                        placeholder="Pilih Kelas"
                                    />
                                </div>
                                <div>
                                    <CustomSelect
                                        label="Gender"
                                        value={newStudent.gender}
                                        options={['Laki-laki', 'Perempuan']}
                                        onChange={(val) => setNewStudent({ ...newStudent, gender: val })}
                                        placeholder="Pilih Gender"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-slate-700 mb-1 block">Tempat Lahir</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Kota"
                                            value={newStudent.birthPlace}
                                            onChange={e => setNewStudent({ ...newStudent, birthPlace: e.target.value })}
                                            className="w-full h-10 bg-white border border-slate-200 text-slate-800 text-[12px] font-semibold rounded-xl pl-9 pr-3 placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-slate-700 mb-1 block">Tanggal Lahir</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                        <button
                                            type="button"
                                            onClick={() => setIsDatePickerOpen(true)}
                                            className={`w-full h-10 bg-white border border-slate-200 text-[12px] rounded-xl pl-9 pr-3 text-left transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm flex items-center ${newStudent.birthDate ? 'text-slate-800' : 'text-slate-400 font-normal'
                                                }`}
                                        >
                                            {newStudent.birthDate ? (
                                                <div className="flex flex-col leading-none">
                                                    <span className="font-bold text-[11px] mb-0.5">
                                                        {new Date(newStudent.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-500">
                                                        {new Date(newStudent.birthDate).getFullYear()}
                                                    </span>
                                                </div>
                                            ) : 'Pilih Tanggal'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-700 mb-1 block">WhatsApp Wali</label>
                                <div className="relative group">
                                    <Phone className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input
                                        type="tel"
                                        placeholder="0812xxxx"
                                        value={newStudent.parentPhone}
                                        onChange={e => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                                        className="w-full h-9 bg-slate-50 border border-slate-200 text-slate-800 text-[12px] font-semibold rounded-xl pl-9 pr-3 placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 text-[14px]"
                            >
                                <Save size={18} />
                                Simpan Data
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="size-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{deleteConfig.title}</h3>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{deleteConfig.message}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Date Picker Modal */}
            <CustomDatePicker
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelect={(date) => setNewStudent({ ...newStudent, birthDate: date })}
                initialDate={newStudent.birthDate}
            />

            {/* Crop Modal */}
            {isCropModalOpen && cropImageSrc && (
                <div className="fixed inset-0 z-[120] bg-black/90 flex flex-col pt-10 pb-5 px-5 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-6 text-white">
                        <h3 className="text-lg font-bold">Sesuaikan Foto</h3>
                        <button onClick={() => setIsCropModalOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Circular Mask Viewport */}
                        <div
                            className="relative size-[280px] rounded-full border-[4px] border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] z-10 overflow-hidden cursor-move touch-none"
                            onMouseDown={handlePointerDown}
                            onMouseMove={handlePointerMove}
                            onMouseUp={handlePointerUp}
                            onMouseLeave={handlePointerUp}
                            onTouchStart={handlePointerDown}
                            onTouchMove={handlePointerMove}
                            onTouchEnd={handlePointerUp}
                        >
                            <img
                                src={cropImageSrc}
                                alt="Crop Target"
                                draggable={false}
                                className="absolute max-w-none origin-center transition-transform duration-75 ease-out select-none"
                                style={{
                                    transform: `translate(-50%, -50%) translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${cropScale})`,
                                    left: '50%',
                                    top: '50%',
                                    // Use auto dimensions to respect aspect ratio
                                    height: 'auto',
                                    width: '100%',
                                    minWidth: '280px', // Ensure it covers the circle initially
                                    minHeight: '280px'
                                }}
                            />
                        </div>
                        <p className="absolute bottom-5 text-white/50 text-xs font-medium z-20 pointer-events-none">
                            Geser & Cubit untuk atur posisi
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="w-full max-w-[320px] mx-auto space-y-6 pt-5">
                        <div className="flex items-center gap-4 px-2">
                            <ZoomOut size={20} className="text-white/60" />
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={cropScale}
                                onChange={(e) => setCropScale(parseFloat(e.target.value))}
                                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                            <ZoomIn size={20} className="text-white/60" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setIsCropModalOpen(false)}
                                className="h-12 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-600 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCropComplete}
                                className="h-12 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Check size={18} />
                                Gunakan Foto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsMobile;
