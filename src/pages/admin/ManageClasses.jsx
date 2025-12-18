import React, { useState } from 'react';
import { Pencil, Trash2, Search, Plus, Filter, ChevronLeft, ChevronRight, School, Users, User, Hash, GraduationCap, ChevronDown, Check, Save, UserCheck } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';

const ManageClasses = () => {
    const toast = useToast();
    const [classes, setClasses] = useState([
        { id: 1, code: '1A', name: 'Kelas 1 Abu Bakar', waliKelas: 'Ust. Ahmad Junaedi', guruKelas: 'Usth. Maryam Jamilah', students: 28, color: '#1dc956' },
        { id: 2, code: '1B', name: 'Kelas 1 Umar bin Khattab', waliKelas: 'Usth. Siti Aminah', guruKelas: 'Ust. Umar Faruq', students: 30, color: '#f59e0b' },
        { id: 3, code: '2A', name: 'Kelas 2 Utsman bin Affan', waliKelas: 'Ust. Budi Santoso', guruKelas: 'Usth. Aisyah Putri', students: 29, color: '#f59e0b' },
        { id: 4, code: '2B', name: 'Kelas 2 Ali bin Abi Thalib', waliKelas: 'Usth. Dewi Sartika', guruKelas: 'Ust. Ridwan Kamil', students: 31, color: '#1dc956' },
        { id: 5, code: '3A', name: 'Kelas 3 Al-Farabi', waliKelas: 'Ust. Candra', guruKelas: 'Usth. Rina Maryana', students: 27, color: '#1dc956' },
    ]);

    const teachers = [
        'Ust. Ahmad Junaedi', 'Usth. Siti Aminah', 'Ust. Budi Santoso', 'Usth. Dewi Sartika',
        'Ust. Candra', 'Usth. Rina Maryana', 'Ust. Hasan Basri', 'Usth. Fatimah Azzahra',
        'Usth. Maryam Jamilah', 'Ust. Umar Faruq', 'Usth. Aisyah Putri', 'Ust. Ridwan Kamil'
    ];

    // Warna berdasarkan tingkat kelas
    const gradeColors = {
        '1': '#1dc956',  // Hijau - Kelas 1
        '2': '#3b82f6',  // Biru - Kelas 2
        '3': '#f59e0b',  // Kuning/Orange - Kelas 3
        '4': '#8b5cf6',  // Ungu - Kelas 4
        '5': '#ef4444',  // Merah - Kelas 5
        '6': '#06b6d4',  // Cyan - Kelas 6
    };

    const getGradeColor = (code) => {
        const grade = code.charAt(0);
        return gradeColors[grade] || '#6b7280';
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formData, setFormData] = useState({ code: '', name: '', waliKelas: '', guruKelas: '', students: 0 });
    const [filterGrade, setFilterGrade] = useState('all');
    const [sortBy, setSortBy] = useState('code');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showWaliDropdown, setShowWaliDropdown] = useState(false);
    const [showGuruDropdown, setShowGuruDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filter and sort classes
    const filteredClasses = classes
        .filter(c => {
            const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.waliKelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.guruKelas.toLowerCase().includes(searchQuery.toLowerCase());
            const matchGrade = filterGrade === 'all' || c.code.startsWith(filterGrade);
            return matchSearch && matchGrade;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name': return a.name.localeCompare(b.name);
                case 'students': return b.students - a.students;
                case 'wali': return a.waliKelas.localeCompare(b.waliKelas);
                default: return a.code.localeCompare(b.code);
            }
        });

    // Pagination
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
    const paginatedClasses = filteredClasses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenAdd = () => {
        setEditingClass(null);
        setFormData({ code: '', name: '', waliKelas: '', guruKelas: '', students: 0 });
        setShowAddModal(true);
    };

    const handleOpenEdit = (cls) => {
        setEditingClass(cls);
        setFormData({ code: cls.code, name: cls.name, waliKelas: cls.waliKelas, guruKelas: cls.guruKelas, students: cls.students });
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (editingClass) {
            setClasses(classes.map(c =>
                c.id === editingClass.id ? { ...c, ...formData } : c
            ));
            toast.success('Informasi kelas berhasil diperbarui!');
        } else {
            const newId = Math.max(...classes.map(c => c.id), 0) + 1;
            const colors = ['#1dc956', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'];
            setClasses([...classes, {
                id: newId,
                ...formData,
                color: colors[newId % colors.length]
            }]);
            toast.success('Kelas baru berhasil ditambahkan!');
        }
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);

    const handleDelete = (cls) => {
        setClassToDelete(cls);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (classToDelete) {
            setClasses(classes.filter(c => c.id !== classToDelete.id));
            setShowDeleteModal(false);
            setClassToDelete(null);
            toast.success('Data kelas berhasil dihapus!');
        }
    };



    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <p className="text-xs text-text-secondary-light mb-2">Dashboard / Manajemen Kelas</p>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-bold text-text-primary-light mb-2">Manajemen Kelas</h1>
                    <p className="text-sm text-text-secondary-light">Kelola daftar kelas, wali kelas, dan guru kelas untuk tahun ajaran aktif</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm border-none cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 self-start md:self-auto"
                >
                    <span className="text-lg">+</span> Tambah Kelas
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama kelas, wali kelas, atau guru kelas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                    />
                </div>
                {/* Filter & Sort Container */}
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {/* Filter Button */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer border transition-all duration-200 shadow-sm ${filterGrade !== 'all'
                                ? 'bg-green-100 text-primary border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            Filter {filterGrade !== 'all' && `(${filterGrade})`}
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[160px] overflow-hidden border border-gray-100">
                                {[{ value: 'all', label: 'Semua Kelas' }, { value: '1', label: 'Kelas 1' }, { value: '2', label: 'Kelas 2' }, { value: '3', label: 'Kelas 3' }, { value: '4', label: 'Kelas 4' }, { value: '5', label: 'Kelas 5' }, { value: '6', label: 'Kelas 6' }].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setFilterGrade(opt.value); setShowFilterDropdown(false); }}
                                        className={`w-full px-4 py-2.5 text-left border-none cursor-pointer text-sm transition-colors ${filterGrade === opt.value
                                            ? 'bg-green-50 text-primary font-medium'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Sort Button */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
                            className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl text-sm font-semibold cursor-pointer text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                            Urutkan
                        </button>
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 md:left-auto md:right-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden border border-gray-100">
                                {[{ value: 'code', label: 'Kode Kelas' }, { value: 'name', label: 'Nama Kelas' }, { value: 'students', label: 'Jumlah Siswa' }, { value: 'wali', label: 'Wali Kelas' }].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                        className={`w-full px-4 py-2.5 text-left border-none cursor-pointer text-sm flex items-center justify-between transition-colors ${sortBy === opt.value
                                            ? 'bg-green-50 text-primary font-medium'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.label}
                                        {sortBy === opt.value && <span className="material-symbols-outlined text-sm text-primary">check</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                {paginatedClasses.map((cls) => (
                    <div key={cls.id}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-200 cursor-default group hover:-translate-y-1 hover:shadow-lg"
                        style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        }}
                    >
                        {/* Card Header with Color Accent */}
                        <div
                            className="p-5 border-b border-gray-100 flex justify-between items-start"
                            style={{
                                background: `linear-gradient(to right, ${getGradeColor(cls.code)}15, white)`,
                            }}
                        >
                            <div className="flex gap-4 items-center">
                                <div
                                    className="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-extrabold text-xl shadow-lg shadow-current/20"
                                    style={{
                                        backgroundColor: getGradeColor(cls.code),
                                        boxShadow: `0 4px 12px ${getGradeColor(cls.code)}40`
                                    }}
                                >
                                    {cls.code}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 m-0 leading-tight">{cls.name}</h3>
                                    <span
                                        className="text-[13px] font-semibold px-2 py-0.5 rounded-md mt-1 inline-block border bg-white"
                                        style={{
                                            color: getGradeColor(cls.code),
                                            borderColor: `${getGradeColor(cls.code)}30`
                                        }}
                                    >
                                        Tingkat {cls.code.charAt(0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1">
                            <div className="flex flex-col gap-3">
                                {/* Wali Kelas */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-50 flex-shrink-0">
                                        <GraduationCap size={18} className="text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 mb-0.5">Wali Kelas</p>
                                        <p className="text-sm text-gray-800 font-semibold truncate">{cls.waliKelas}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-100"></div>
                                {/* Guru Kelas */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50 flex-shrink-0">
                                        <User size={18} className="text-blue-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 mb-0.5">Guru Kelas</p>
                                        <p className="text-sm text-gray-800 font-semibold truncate">{cls.guruKelas || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                                <Users size={14} className="text-gray-500" />
                                <span className="text-[13px] font-semibold text-gray-600">{cls.students} Siswa</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenEdit(cls)}
                                    title="Edit Kelas"
                                    className="p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:text-gray-700 text-gray-500 transition-all shadow-sm cursor-pointer"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cls)}
                                    title="Hapus Kelas"
                                    className="p-2 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 text-red-500 transition-all shadow-sm cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mb-8 rounded-xl overflow-hidden">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredClasses.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>


            {/* Add/Edit Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={editingClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-4">
                        {/* Kode Kelas */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Kode Kelas</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <Hash size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    placeholder="Contoh: 1A"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Nama Kelas */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Nama Kelas</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <GraduationCap size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Contoh: Kelas 1 Abu Bakar"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Wali Kelas */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Wali Kelas</label>
                            <div className={`relative ${showWaliDropdown ? 'z-50' : ''}`}>
                                <div
                                    onClick={() => {
                                        setShowWaliDropdown(!showWaliDropdown);
                                        setShowGuruDropdown(false);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border hover:border-green-200 border-transparent transition-all cursor-pointer text-gray-900 font-medium flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <div className="p-1 bg-green-100 rounded-full">
                                                <User size={14} className="text-primary" />
                                            </div>
                                        </div>
                                        <span className={`${!formData.waliKelas ? 'text-gray-400' : 'text-gray-900'}`}>
                                            {formData.waliKelas || "Pilih Wali Kelas"}
                                        </span>
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showWaliDropdown ? 'rotate-180' : ''}`} />
                                </div>
                                {showWaliDropdown && (
                                    <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 max-h-60 overflow-y-auto py-2">
                                        {teachers.map((t, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setFormData({ ...formData, waliKelas: t });
                                                    setShowWaliDropdown(false);
                                                }}
                                                className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                                            >
                                                <div className={`p-2 rounded-full flex-shrink-0 ${formData.waliKelas === t ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    <User size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold ${formData.waliKelas === t ? 'text-green-700' : 'text-gray-900'}`}>{t}</p>
                                                </div>
                                                {formData.waliKelas === t && <Check size={18} className="text-green-600" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Guru Kelas */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Guru Kelas</label>
                            <div className={`relative ${showGuruDropdown ? 'z-50' : ''}`}>
                                <div
                                    onClick={() => {
                                        setShowGuruDropdown(!showGuruDropdown);
                                        setShowWaliDropdown(false);
                                    }}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border hover:border-green-200 border-transparent transition-all cursor-pointer text-gray-900 font-medium flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <div className="p-1 bg-green-100 rounded-full">
                                                <UserCheck size={14} className="text-primary" />
                                            </div>
                                        </div>
                                        <span className={`${!formData.guruKelas ? 'text-gray-400' : 'text-gray-900'}`}>
                                            {formData.guruKelas || "Pilih Guru Kelas"}
                                        </span>
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showGuruDropdown ? 'rotate-180' : ''}`} />
                                </div>
                                {showGuruDropdown && (
                                    <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 max-h-60 overflow-y-auto py-2">
                                        <div
                                            onClick={() => {
                                                setFormData({ ...formData, guruKelas: '' });
                                                setShowGuruDropdown(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 text-gray-500"
                                        >
                                            Tidak Ada
                                        </div>
                                        {teachers.map((t, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setFormData({ ...formData, guruKelas: t });
                                                    setShowGuruDropdown(false);
                                                }}
                                                className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                                            >
                                                <div className={`p-2 rounded-full flex-shrink-0 ${formData.guruKelas === t ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    <UserCheck size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold ${formData.guruKelas === t ? 'text-green-700' : 'text-gray-900'}`}>{t}</p>
                                                </div>
                                                {formData.guruKelas === t && <Check size={18} className="text-green-600" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Jumlah Siswa */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Jumlah Siswa</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <Users size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={formData.students}
                                    onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
                                    min="0"
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-2"></div>

                    {/* Footer Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3 px-4 border-none rounded-xl text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Simpan Kelas
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        <Trash2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">Hapus Kelas</h3>
                    </div>
                </div>
            }>
                <div className="space-y-6">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-4">
                        <div className="p-2 bg-white rounded-full shrink-0">
                            <span className="material-symbols-outlined text-red-600">warning</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-red-900 mb-1">Peringatan Penting!</h4>
                            <p className="text-sm text-red-700 leading-relaxed">
                                Tindakan ini tidak dapat dibatalkan. Kelas <strong>{classToDelete?.name}</strong> akan dihapus secara permanen dari sistem.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Batal
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Hapus Data
                        </button>
                    </div>
                </div>
            </Modal>
        </div >
    );
};

export default ManageClasses;
