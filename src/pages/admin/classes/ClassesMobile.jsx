import React, { useState, useEffect } from 'react';
import { Search, Plus, Users, X, School, ChevronDown, ChevronUp, Pencil, Trash2, UserCheck, GraduationCap, AlertTriangle, BookOpen } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

const ClassesMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [expandedLevels, setExpandedLevels] = useState({}); // For level collapse
    const [editingClass, setEditingClass] = useState(null);
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);

    // Delete confirmation modal state
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, classId: null, className: '', studentCount: 0 });

    // Form State
    const [newClass, setNewClass] = useState({ name: '', level: '', teacher: '', teacherId: null, guruKelas: '', guruKelasId: null });
    const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
    const [isGuruKelasDropdownOpen, setIsGuruKelasDropdownOpen] = useState(false);

    // Level options
    const levelOptions = [
        { id: '1', label: 'Kelas 1' },
        { id: '2', label: 'Kelas 2' },
        { id: '3', label: 'Kelas 3' },
        { id: '4', label: 'Kelas 4' },
        { id: '5', label: 'Kelas 5' },
        { id: '6', label: 'Kelas 6' },
    ];

    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        // Load classes
        const savedClasses = localStorage.getItem('classes_data');
        if (savedClasses) {
            try {
                const parsed = JSON.parse(savedClasses);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setClasses(parsed);
                }
            } catch (e) {
                console.error('Failed to load classes:', e);
            }
        }

        // Load teachers for dropdown
        const savedTeachers = localStorage.getItem('teachers_data');
        if (savedTeachers) {
            try {
                const parsed = JSON.parse(savedTeachers);
                if (Array.isArray(parsed)) {
                    setTeachers(parsed);
                }
            } catch (e) {
                console.error('Failed to load teachers:', e);
            }
        }

        setIsInitialLoad(false);
    }, []);

    // Save classes to localStorage on changes
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('classes_data', JSON.stringify(classes));
    }, [classes, isInitialLoad]);

    const filteredClasses = classes.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group classes by level
    const groupedClasses = filteredClasses.reduce((acc, cls) => {
        const level = cls.level || 'other';
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(cls);
        return acc;
    }, {});

    // Sort levels and get sorted keys
    const sortedLevels = Object.keys(groupedClasses).sort((a, b) => {
        if (a === 'other') return 1;
        if (b === 'other') return -1;
        return parseInt(a) - parseInt(b);
    });

    const getLevelLabel = (level) => {
        if (level === 'other') return 'Belum Dikategorikan';
        return `Kelas ${level}`;
    };

    const getLevelColor = (level) => {
        const colors = {
            '1': { badge: 'bg-gradient-to-br from-blue-500 to-blue-600', header: 'bg-blue-50 border-blue-100', text: 'text-blue-600' },
            '2': { badge: 'bg-gradient-to-br from-emerald-500 to-emerald-600', header: 'bg-emerald-50 border-emerald-100', text: 'text-emerald-600' },
            '3': { badge: 'bg-gradient-to-br from-amber-500 to-orange-500', header: 'bg-amber-50 border-amber-100', text: 'text-amber-600' },
            '4': { badge: 'bg-gradient-to-br from-rose-500 to-pink-500', header: 'bg-rose-50 border-rose-100', text: 'text-rose-600' },
            '5': { badge: 'bg-gradient-to-br from-violet-500 to-purple-600', header: 'bg-violet-50 border-violet-100', text: 'text-violet-600' },
            '6': { badge: 'bg-gradient-to-br from-cyan-500 to-teal-500', header: 'bg-cyan-50 border-cyan-100', text: 'text-cyan-600' },
            'other': { badge: 'bg-slate-400', header: 'bg-slate-50 border-slate-100', text: 'text-slate-500' }
        };
        return colors[level] || colors['other'];
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const toggleLevel = (level) => {
        setExpandedLevels(prev => ({
            ...prev,
            [level]: !prev[level]
        }));
    };

    // Check if level is expanded (default to collapsed)
    const isLevelExpanded = (level) => {
        return expandedLevels[level] === true; // Default false (collapsed)
    };

    const handleEditClass = (cls) => {
        setEditingClass(cls);
        setNewClass({
            name: cls.name,
            level: cls.level || '',
            teacher: cls.teacher,
            teacherId: cls.teacherId,
            guruKelas: cls.guruKelas || '',
            guruKelasId: cls.guruKelasId || null
        });
        setIsModalOpen(true);
    };

    const handleDeleteClass = (cls) => {
        // Check if class has students assigned
        try {
            const savedStudents = localStorage.getItem('students_data');
            let studentCount = 0;
            if (savedStudents) {
                const students = JSON.parse(savedStudents);
                studentCount = students.filter(s => s.class === cls.name).length;
            }
            setDeleteModal({ isOpen: true, classId: cls.id, className: cls.name, studentCount });
        } catch (e) {
            setDeleteModal({ isOpen: true, classId: cls.id, className: cls.name, studentCount: 0 });
        }
    };

    const confirmDelete = () => {
        const className = deleteModal.className;

        // Reset student class assignments if any
        try {
            const savedStudents = localStorage.getItem('students_data');
            if (savedStudents) {
                const students = JSON.parse(savedStudents);
                const updatedStudents = students.map(s =>
                    s.class === className ? { ...s, class: '' } : s
                );
                localStorage.setItem('students_data', JSON.stringify(updatedStudents));
            }
        } catch (e) {
            console.error('Failed to reset student class assignments:', e);
        }

        setClasses(prev => prev.filter(c => c.id !== deleteModal.classId));
        setExpandedId(null);
        setDeleteModal({ isOpen: false, classId: null, className: '', studentCount: 0 });
    };

    const handleAddClass = (e) => {
        e.preventDefault();
        if (!newClass.name) {
            alert('Mohon masukkan nama kelas');
            return;
        }

        if (editingClass) {
            // Edit mode
            setClasses(prev => prev.map(c =>
                c.id === editingClass.id
                    ? {
                        ...c,
                        name: newClass.name,
                        level: newClass.level,
                        teacher: newClass.teacher || 'Belum ada wali',
                        teacherId: newClass.teacherId,
                        guruKelas: newClass.guruKelas || '',
                        guruKelasId: newClass.guruKelasId
                    }
                    : c
            ));
            setEditingClass(null);
        } else {
            // Add mode
            const newId = Date.now();
            const colors = ['from-blue-500 to-indigo-600', 'from-violet-500 to-purple-600', 'from-cyan-500 to-blue-600', 'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setClasses([
                {
                    id: newId,
                    name: newClass.name,
                    level: newClass.level,
                    students: 0,
                    teacher: newClass.teacher || 'Belum ada wali',
                    teacherId: newClass.teacherId,
                    guruKelas: newClass.guruKelas || '',
                    guruKelasId: newClass.guruKelasId,
                    color: randomColor
                },
                ...classes
            ]);
        }

        setNewClass({ name: '', level: '', teacher: '', teacherId: null, guruKelas: '', guruKelasId: null });
        setIsModalOpen(false);
    };

    const handleSelectTeacher = (teacher) => {
        setNewClass({
            ...newClass,
            teacher: teacher ? teacher.name : '',
            teacherId: teacher ? teacher.id : null
        });
        setIsTeacherDropdownOpen(false);
    };

    const handleSelectGuruKelas = (teacher) => {
        setNewClass({
            ...newClass,
            guruKelas: teacher ? teacher.name : '',
            guruKelasId: teacher ? teacher.id : null
        });
        setIsGuruKelasDropdownOpen(false);
    };

    // Get available teachers (Wali Kelas role, not assigned to other classes)
    const availableWaliKelas = teachers.filter(t => {
        const isWaliKelas = t.role === 'Wali Kelas';
        const isAssigned = classes.some(c => c.teacherId === t.id && c.id !== editingClass?.id);
        return isWaliKelas && !isAssigned;
    });

    // Get available Guru Kelas (not assigned to other classes as guru kelas)
    const availableGuruKelas = teachers.filter(t => {
        const isGuruKelas = t.role === 'Guru Kelas';
        const isAssigned = classes.some(c => c.guruKelasId === t.id && c.id !== editingClass?.id);
        return isGuruKelas && !isAssigned;
    });

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/50 pb-32 scrollbar-hide font-sans">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1">
                <AdminHeader
                    title="Manajemen Kelas"
                    subtitle={`Total ${classes.length} Kelas Aktif`}
                />
            </div>

            <div className="p-5 max-w-lg mx-auto">

                {/* Single Card Container with Integrated Header */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">

                    {/* Gradient Header */}
                    <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Data Kelas</h3>
                                    <p className="text-indigo-200 text-[11px] font-normal">Kelola kelas dan wali kelas</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="size-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center active:scale-95 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <div className="mt-3 relative group">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Cari kelas atau wali..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-9 pl-9 pr-3 bg-white rounded-lg text-[12px] font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal focus:ring-2 focus:ring-indigo-400/30 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Class List - Grouped by Level */}
                    {sortedLevels.map((level, levelIdx) => {
                        const levelColor = getLevelColor(level);
                        const levelExpanded = isLevelExpanded(level);
                        const isLastLevel = levelIdx === sortedLevels.length - 1;
                        return (
                            <div key={level}>
                                {/* Level Header - Clickable */}
                                <div
                                    onClick={() => toggleLevel(level)}
                                    className={`px-6 py-3 flex items-center gap-3 ${levelColor.header} ${!isLastLevel || levelExpanded ? 'border-b' : 'rounded-b-2xl'} ${levelIdx > 0 ? 'border-t' : ''} cursor-pointer hover:opacity-90 transition-opacity`}
                                >
                                    <div className={`size-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm ${levelColor.badge}`}>
                                        {level === 'other' ? '?' : level}
                                    </div>
                                    <span className={`text-sm font-bold ${levelColor.text}`}>{getLevelLabel(level)}</span>
                                    <div className="flex-1"></div>
                                    <span className={`text-[11px] font-medium ${levelColor.text} opacity-70 mr-2`}>
                                        {groupedClasses[level].length} kelas
                                    </span>
                                    {levelExpanded ? (
                                        <ChevronUp size={18} className={`${levelColor.text} shrink-0`} />
                                    ) : (
                                        <ChevronDown size={18} className={`${levelColor.text} shrink-0`} />
                                    )}
                                </div>

                                {/* Classes in this level - Collapsible */}
                                <div className={`grid transition-all duration-300 ease-in-out ${levelExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className="overflow-hidden">
                                        {groupedClasses[level].map((cls, index) => {
                                            const isExpanded = expandedId === cls.id;
                                            const isLastInLevel = index === groupedClasses[level].length - 1;
                                            const isLastLevel = levelIdx === sortedLevels.length - 1;
                                            const showBorder = !isLastInLevel || (levelExpanded && !isLastLevel);

                                            return (
                                                <div key={cls.id} className={`group transition-all duration-300 ${showBorder ? 'border-b border-slate-100' : ''}`}>

                                                    {/* Main Row - Clickable */}
                                                    <div
                                                        onClick={() => toggleExpand(cls.id)}
                                                        className={`px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors duration-200 ${isExpanded ? 'bg-indigo-50/50' : 'bg-white'}`}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-[14px] font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="flex items-center gap-1">
                                                                    <Users size={12} className="text-indigo-500" />
                                                                    <span className="text-[12px] font-bold tracking-tight text-slate-600">
                                                                        {cls.students} siswa
                                                                    </span>
                                                                </div>
                                                                <span className="text-slate-300">•</span>
                                                                <div className="flex items-center gap-1 min-w-0">
                                                                    <GraduationCap size={12} className="text-violet-500 shrink-0" />
                                                                    <span className={`text-[11px] font-semibold tracking-tight truncate max-w-[85px] ${cls.teacher !== 'Belum ada wali' ? 'text-slate-600' : 'text-slate-400 italic'}`}>
                                                                        {cls.teacher !== 'Belum ada wali' ? cls.teacher : 'Belum ada wali'}
                                                                    </span>
                                                                </div>
                                                                {cls.guruKelas && (
                                                                    <>
                                                                        <span className="text-slate-300">•</span>
                                                                        <div className="flex items-center gap-1 min-w-0">
                                                                            <BookOpen size={12} className="text-orange-500 shrink-0" />
                                                                            <span className="text-[11px] font-semibold tracking-tight truncate max-w-[85px] text-slate-600">
                                                                                {cls.guruKelas}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {isExpanded ? <ChevronUp size={18} className="text-indigo-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-300 shrink-0" />}
                                                    </div>

                                                    {/* Expanded Details */}
                                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                        <div className="overflow-hidden bg-white">
                                                            <div className="px-6 pb-3 pt-0 space-y-2.5">
                                                                <div className="h-px w-full bg-slate-100"></div>

                                                                {/* Details */}
                                                                <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <Users size={14} className="text-indigo-500" />
                                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Jumlah Siswa</span>
                                                                        </div>
                                                                        <span className="text-[12px] font-bold text-slate-700">{cls.students} Siswa</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <GraduationCap size={14} className="text-violet-500" />
                                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Wali Kelas</span>
                                                                        </div>
                                                                        <span className={`text-[12px] font-bold ${cls.teacher !== 'Belum ada wali' ? 'text-slate-700' : 'text-amber-500'}`}>
                                                                            {cls.teacher}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <BookOpen size={14} className="text-teal-500" />
                                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Guru Kelas</span>
                                                                        </div>
                                                                        <span className={`text-[12px] font-bold ${cls.guruKelas ? 'text-slate-700' : 'text-amber-500'}`}>
                                                                            {cls.guruKelas || 'Belum ada'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleEditClass(cls)}
                                                                        className="flex-1 h-8 rounded-lg bg-indigo-500 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-600 active:scale-95 transition-all"
                                                                    >
                                                                        <Pencil size={12} />
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteClass(cls)}
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}



                    {filteredClasses.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center justify-center opacity-60">
                            <div className="size-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                                <School size={40} />
                            </div>
                            <p className="text-slate-500 font-bold text-sm">Tidak ada kelas</p>
                            <p className="text-slate-400 text-xs mt-1">Tambah kelas baru untuk memulai</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Add/Edit Class */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => { setIsModalOpen(false); setEditingClass(null); setNewClass({ name: '', level: '', teacher: '', teacherId: null, guruKelas: '', guruKelasId: null }); setIsLevelDropdownOpen(false); setIsTeacherDropdownOpen(false); setIsGuruKelasDropdownOpen(false); }}></div>
                    <div className="relative w-full max-w-[320px] bg-white rounded-[1.5rem] shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-300 scale-100 max-h-[90vh] overflow-y-auto" onClick={() => { setIsLevelDropdownOpen(false); setIsTeacherDropdownOpen(false); setIsGuruKelasDropdownOpen(false); }}>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">{editingClass ? 'Edit Kelas' : 'Tambah Kelas'}</h3>
                                <p className="text-xs text-slate-400 font-medium leading-none mt-1">{editingClass ? 'Perbarui data kelas.' : 'Buat kelas baru.'}</p>
                            </div>
                            <button onClick={() => { setIsModalOpen(false); setEditingClass(null); setNewClass({ name: '', level: '', teacher: '', teacherId: null, guruKelas: '', guruKelasId: null }); setIsLevelDropdownOpen(false); setIsTeacherDropdownOpen(false); setIsGuruKelasDropdownOpen(false); }} className="size-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shadow-sm border border-slate-100">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleAddClass} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Kelas</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Abu Bakar"
                                        value={newClass.name}
                                        onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-0 rounded-xl text-slate-800 font-bold text-sm placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-inner"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Level</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => { setIsLevelDropdownOpen(!isLevelDropdownOpen); setIsTeacherDropdownOpen(false); setIsGuruKelasDropdownOpen(false); }}
                                            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 border-0 rounded-xl text-slate-800 font-bold text-sm transition-all shadow-inner flex items-center justify-between group focus:ring-2 focus:ring-indigo-500/10 text-left"
                                        >
                                            <span className={newClass.level ? 'text-slate-800' : 'text-slate-300 font-medium'}>
                                                {newClass.level ? `Kelas ${newClass.level}` : 'Pilih'}
                                            </span>
                                            <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isLevelDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                                        </button>

                                        {isLevelDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 z-30 animate-in fade-in slide-in-from-top-2 duration-200 max-h-32 overflow-y-auto">
                                                {levelOptions.map((level) => (
                                                    <button
                                                        key={level.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setNewClass({ ...newClass, level: level.id });
                                                            setIsLevelDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${newClass.level === level.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        {level.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Wali Kelas</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setIsTeacherDropdownOpen(!isTeacherDropdownOpen); setIsLevelDropdownOpen(false); setIsGuruKelasDropdownOpen(false); }}
                                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 border-0 rounded-xl text-slate-800 font-bold text-sm transition-all shadow-inner flex items-center justify-between group focus:ring-2 focus:ring-indigo-500/10 text-left"
                                    >
                                        <span className={newClass.teacher ? 'text-slate-800' : 'text-slate-300 font-medium'}>
                                            {newClass.teacher || 'Pilih Wali Kelas'}
                                        </span>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isTeacherDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                                    </button>

                                    {isTeacherDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200 max-h-48 overflow-y-auto">
                                            <button
                                                type="button"
                                                onClick={() => handleSelectTeacher(null)}
                                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${!newClass.teacher ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                                            >
                                                Belum ada wali
                                            </button>
                                            {availableWaliKelas.length > 0 ? (
                                                availableWaliKelas.map((teacher) => (
                                                    <button
                                                        key={teacher.id}
                                                        type="button"
                                                        onClick={() => handleSelectTeacher(teacher)}
                                                        className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${newClass.teacherId === teacher.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`size-8 rounded-full ${teacher.color || 'bg-indigo-500'} flex items-center justify-center overflow-hidden`}>
                                                                {teacher.avatar ? (
                                                                    <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <UserCheck size={14} className="text-white" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{teacher.name}</p>
                                                                <p className="text-[10px] text-slate-400">{teacher.nip}</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-center text-xs text-slate-400">
                                                    Tidak ada wali kelas tersedia
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Guru Kelas</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setIsGuruKelasDropdownOpen(!isGuruKelasDropdownOpen); setIsLevelDropdownOpen(false); setIsTeacherDropdownOpen(false); }}
                                        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-50/80 border-0 rounded-xl text-slate-800 font-bold text-sm transition-all shadow-inner flex items-center justify-between group focus:ring-2 focus:ring-indigo-500/10 text-left"
                                    >
                                        <span className={newClass.guruKelas ? 'text-slate-800' : 'text-slate-300 font-medium'}>
                                            {newClass.guruKelas || 'Pilih Guru Kelas'}
                                        </span>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isGuruKelasDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                                    </button>

                                    {isGuruKelasDropdownOpen && (
                                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200 max-h-48 overflow-y-auto">
                                            <button
                                                type="button"
                                                onClick={() => handleSelectGuruKelas(null)}
                                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${!newClass.guruKelas ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                                            >
                                                Tidak ada
                                            </button>
                                            {availableGuruKelas.length > 0 ? (
                                                availableGuruKelas.map((teacher) => (
                                                    <button
                                                        key={teacher.id}
                                                        type="button"
                                                        onClick={() => handleSelectGuruKelas(teacher)}
                                                        className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${newClass.guruKelasId === teacher.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`size-8 rounded-full ${teacher.color || 'bg-teal-500'} flex items-center justify-center overflow-hidden`}>
                                                                {teacher.avatar ? (
                                                                    <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <UserCheck size={14} className="text-white" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{teacher.name}</p>
                                                                <p className="text-[10px] text-slate-400">{teacher.nip}</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-center text-xs text-slate-400">
                                                    Tidak ada guru kelas tersedia
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <Plus size={18} strokeWidth={3} className="text-indigo-200" />
                                    <span className="text-sm">{editingClass ? 'Simpan Perubahan' : 'Tambah Kelas'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeleteModal({ isOpen: false, classId: null, className: '', studentCount: 0 })}></div>
                    <div className="relative w-full max-w-[300px] bg-white rounded-[1.5rem] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex flex-col items-center text-center">
                            {/* Warning Icon */}
                            <div className="size-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <AlertTriangle size={32} className="text-red-500" />
                            </div>

                            <h3 className="text-lg font-black text-slate-800 mb-2">Hapus Kelas?</h3>
                            <p className="text-sm text-slate-500 mb-1">Kelas yang akan dihapus:</p>
                            <p className="text-base font-bold text-slate-700 mb-4 px-4 py-2 bg-slate-100 rounded-lg">
                                {deleteModal.className}
                            </p>
                            <p className="text-xs text-slate-400 mb-2">
                                Tindakan ini tidak dapat dibatalkan. Semua data kelas akan hilang.
                            </p>
                            {deleteModal.studentCount > 0 && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                                    <p className="text-xs text-amber-700 font-semibold">
                                        ⚠️ Ada {deleteModal.studentCount} siswa di kelas ini. Data kelas mereka akan direset.
                                    </p>
                                </div>
                            )}
                            {deleteModal.studentCount === 0 && <div className="mb-4"></div>}

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setDeleteModal({ isOpen: false, classId: null, className: '', studentCount: 0 })}
                                    className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 active:scale-95 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 h-11 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesMobile;
