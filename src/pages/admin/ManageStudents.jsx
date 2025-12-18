import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronLeft, ChevronRight, GraduationCap, Pencil, Trash2, Hash, User, School, UserPlus, Mars, Venus, Calendar, FileText, Save, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';

const ManageStudents = () => {
    const toast = useToast();
    // Daftar kelas dari manajemen kelas
    const availableClasses = [
        { code: '1A', name: 'Kelas 1 Abu Bakar' },
        { code: '1B', name: 'Kelas 1 Umar bin Khattab' },
        { code: '2A', name: 'Kelas 2 Utsman bin Affan' },
        { code: '2B', name: 'Kelas 2 Ali bin Abi Thalib' },
        { code: '3A', name: 'Kelas 3 Al-Farabi' },
        { code: '3B', name: 'Kelas 3 Ibnu Sina' },
        { code: '4A', name: 'Kelas 4 Al-Khawarizmi' },
        { code: '4B', name: 'Kelas 4 Ibnu Rusyd' },
        { code: '5A', name: 'Kelas 5 Al-Ghazali' },
        { code: '5B', name: 'Kelas 5 Ibnu Khaldun' },
        { code: '6A', name: 'Kelas 6 Ar-Razi' },
        { code: '6B', name: 'Kelas 6 Al-Biruni' },
    ];

    const [students, setStudents] = useState([
        { id: 1, nis: '10293', name: 'Ahmad Fulan', class: '5A', initials: 'AF', color: '#1dc956', gender: 'Laki-laki' },
        { id: 2, nis: '10294', name: 'Siti Aminah', class: '4A', initials: 'SA', color: '#f59e0b', gender: 'Perempuan' },
        { id: 3, nis: '10295', name: 'Muhammad Umar', class: '5A', initials: 'MU', color: '#8b5cf6', gender: 'Laki-laki' },
        { id: 4, nis: '10296', name: 'Zahra Rahma', class: '6A', initials: 'ZR', color: '#3b82f6', gender: 'Perempuan' },
        { id: 5, nis: '10297', name: 'Ibrahim Khalil', class: '4B', initials: 'IB', color: '#ef4444', gender: 'Laki-laki' },
        { id: 6, nis: '10298', name: 'Fatimah Azzahra', class: '3A', initials: 'FA', color: '#06b6d4', gender: 'Perempuan' },
        { id: 7, nis: '10299', name: 'Hasan Basri', class: '2A', initials: 'HB', color: '#1dc956', gender: 'Laki-laki' },
        { id: 8, nis: '10300', name: 'Aisyah Putri', class: '1A', initials: 'AP', color: '#f59e0b', gender: 'Perempuan' },
        { id: 9, nis: '10301', name: 'Ridwan Kamil', class: '6B', initials: 'RK', color: '#8b5cf6', gender: 'Laki-laki' },
        { id: 10, nis: '10302', name: 'Dewi Sartika', class: '3B', initials: 'DS', color: '#3b82f6', gender: 'Perempuan' },
        { id: 11, nis: '10303', name: 'Umar Faruq', class: '5B', initials: 'UF', color: '#ef4444', gender: 'Laki-laki' },
        { id: 12, nis: '10304', name: 'Maryam Jamilah', class: '4A', initials: 'MJ', color: '#06b6d4', gender: 'Perempuan' },
        { id: 13, nis: '10305', name: 'Bilal Habibi', class: '2B', initials: 'BH', color: '#1dc956', gender: 'Laki-laki' },
        { id: 14, nis: '10306', name: 'Salma Azzahra', class: '1B', initials: 'SZ', color: '#f59e0b', gender: 'Perempuan' },
        { id: 15, nis: '10307', name: 'Abdullah Rahman', class: '6A', initials: 'AR', color: '#8b5cf6', gender: 'Laki-laki' },
    ]);

    const classList = ['Semua Kelas', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];

    const [searchQuery, setSearchQuery] = useState('');
    const [filterClass, setFilterClass] = useState('Semua Kelas');
    const [sortBy, setSortBy] = useState('name'); // Added sort state
    const [showSortDropdown, setShowSortDropdown] = useState(false); // Added dropdown state
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state
    const [formData, setFormData] = useState({ nis: '', name: '', class: '', gender: 'Laki-laki' });
    const [hoveredRow, setHoveredRow] = useState(null);

    const itemsPerPage = 5;

    const getClassName = (code) => {
        const cls = availableClasses.find(c => c.code === code);
        return cls ? cls.name : code;
    };

    const getClassColor = (code) => {
        if (!code) return '#6b7280';
        const grade = code.charAt(0);
        const colors = { '1': '#1dc956', '2': '#3b82f6', '3': '#f59e0b', '4': '#8b5cf6', '5': '#ef4444', '6': '#06b6d4' };
        return colors[grade] || '#6b7280';
    };

    const filteredStudents = students
        .filter(s => {
            const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.nis.includes(searchQuery) ||
                getClassName(s.class).toLowerCase().includes(searchQuery.toLowerCase());
            const matchClass = filterClass === 'Semua Kelas' || s.class.startsWith(filterClass.replace('Kelas ', ''));
            return matchSearch && matchClass;
        })
        .sort((a, b) => { // Added sort logic
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'nis') return a.nis.localeCompare(b.nis);
            if (sortBy === 'class') return a.class.localeCompare(b.class);
            return 0;
        });

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenAdd = () => {
        setEditingStudent(null);
        setFormData({ nis: '', name: '', class: '', gender: 'Laki-laki' });
        setShowAddModal(true);
    };

    const handleOpenEdit = (student) => {
        setEditingStudent(student);
        setFormData({
            nis: student.nis,
            name: student.name,
            class: student.class,
            gender: student.gender || 'Laki-laki'
        });
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent double submit

        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const colors = ['#1dc956', '#f59e0b', '#8b5cf6', '#3b82f6', '#ef4444', '#06b6d4'];

        if (editingStudent) {
            setStudents(students.map(s =>
                s.id === editingStudent.id ? { ...s, ...formData, initials } : s
            ));
            toast.success('Data siswa berhasil diperbarui!');
        } else {
            const newId = Math.max(...students.map(s => s.id), 0) + 1;
            setStudents([...students, {
                id: newId,
                ...formData,
                initials,
                color: colors[newId % colors.length]
            }]);
            toast.success('Siswa baru berhasil ditambahkan!');
        }
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            setStudents(students.filter(s => s.id !== studentToDelete.id));
            setShowDeleteModal(false);
            setStudentToDelete(null);
            toast.success('Data siswa berhasil dihapus!');
        }
    };

    // Count students per grade
    const countByGrade = (grade) => students.filter(s => s.class.startsWith(grade)).length;

    // Custom Header for Modal
    const ModalHeader = (
        <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-primary">
                <UserPlus size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {editingStudent ? 'Edit Data Siswa' : 'Tambah Data Siswa'}
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-normal">
                    {editingStudent ? 'Perbarui informasi data siswa.' : 'Input data siswa baru ke dalam sistem.'}
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <p className="text-xs text-text-secondary-light mb-2">Dashboard / Data Siswa</p>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-bold text-text-primary-light mb-2">Manajemen Data Siswa</h1>
                    <p className="text-sm text-text-secondary-light">Kelola data siswa SD Plus 3 Al-Muhajirin.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm border-none cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 self-start md:self-auto"
                >
                    <span className="text-lg">+</span> Tambah Siswa
                </button>
            </div>

            {/* Stats Cards - Dashboard Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Total Siswa</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{students.length}</h2>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-primary">groups</span>
                        </div>
                    </div>
                    <p className="text-xs text-primary font-medium">Siswa aktif</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Kelas 1-2</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{countByGrade('1') + countByGrade('2')}</h2>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-blue-500">child_care</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Tingkat awal</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Kelas 3-4</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{countByGrade('3') + countByGrade('4')}</h2>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-amber-500">face</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Tingkat menengah</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Kelas 5-6</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{countByGrade('5') + countByGrade('6')}</h2>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-purple-500">person</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Tingkat akhir</p>
                </div>
            </div>

            {/* Search Bar with Filter & Sort */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama siswa, NIS, atau kelas..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                    />
                </div>
                {/* Filter & Sort Container */}
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <div className="relative shrink-0">
                        <button
                            onClick={() => {
                                const nextIndex = (classList.indexOf(filterClass) + 1) % classList.length;
                                setFilterClass(classList[nextIndex]);
                                setCurrentPage(1);
                            }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer border transition-all duration-200 shadow-sm ${filterClass !== 'Semua Kelas'
                                ? 'bg-green-100 text-primary border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            {filterClass === 'Semua Kelas' ? 'Filter Kelas' : filterClass}
                        </button>
                    </div>
                    {/* Sort Button */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => { setShowSortDropdown(!showSortDropdown); }}
                            className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl text-sm font-semibold cursor-pointer text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                            Urutkan
                        </button>
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 md:left-auto md:right-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden border border-gray-100">
                                {[{ value: 'name', label: 'Nama Siswa' }, { value: 'nis', label: 'NIS' }, { value: 'class', label: 'Kelas' }].map(opt => (
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

            {/* Card-based List */}
            <div className="flex flex-col gap-3">
                {paginatedStudents.map((student) => (
                    <div
                        key={student.id}
                        onMouseEnter={() => setHoveredRow(student.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`bg-white rounded-xl p-4 border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center gap-4 ${hoveredRow === student.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent shadow-sm'
                            }`}
                    >
                        {/* 1. NIS */}
                        <div className="w-full md:w-auto md:min-w-[70px] shrink-0">
                            <p className="text-[11px] text-gray-400 mb-0.5 uppercase tracking-wider">NIS</p>
                            <p className="text-sm font-bold text-gray-900 font-mono">{student.nis}</p>
                        </div>

                        {/* 2. Name + Avatar + Gender */}
                        <div className="flex items-center gap-3 w-full md:w-[250px] shrink-0">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-[15px] shrink-0"
                                style={{ backgroundColor: student.color }}
                            >
                                {student.initials}
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">{student.name}</p>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium ${student.gender === 'Laki-laki' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                                        }`}>
                                        {student.gender === 'Laki-laki' ? <Mars size={12} /> : <Venus size={12} />}
                                        {student.gender || 'Laki-laki'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Class Badge */}
                        <div className="w-full md:w-[220px] shrink-0 flex items-center gap-2 p-1.5 pr-4 bg-white rounded-full border border-gray-200 shadow-sm">
                            <div
                                className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${getClassColor(student.class)}15` }}
                            >
                                <GraduationCap size={15} color={getClassColor(student.class)} />
                            </div>
                            <span className="text-[13px] font-semibold text-gray-700 truncate">
                                {getClassName(student.class)}
                            </span>
                        </div>

                        {/* Spacer to push actions to right */}
                        <div className="hidden md:block flex-1"></div>

                        {/* 4. Actions (Far Right) */}
                        <div className="flex gap-2 w-full md:w-auto justify-end">
                            <button
                                onClick={() => handleOpenEdit(student)}
                                className="p-2 rounded-lg border-none cursor-pointer transition-all duration-200 bg-gray-100 text-gray-500 hover:bg-[#1dc956] hover:text-white shadow-sm hover:shadow-md hover:shadow-green-500/20"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(student)}
                                className="p-2 rounded-lg border-none cursor-pointer transition-all duration-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 shadow-sm hover:shadow-md hover:shadow-red-500/20"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Component */}
            <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden' }}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredStudents.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={ModalHeader}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Section 1: Informasi Pribadi */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h4 className="text-sm font-bold text-gray-500 tracking-wider uppercase flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">badge</span>
                                Informasi Pribadi
                            </h4>
                        </div>
                        <div className="space-y-4">
                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Nama Lengkap</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <div className="p-1 bg-green-100 rounded-full">
                                            <User size={14} className="text-primary" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: Ahmad Fauzi"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* NIS */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">NIS</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <div className="p-1 bg-green-100 rounded-lg">
                                                <Hash size={14} className="text-primary" />
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.nis}
                                            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                                            placeholder="Contoh: 2023001"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Kelas */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Kelas</label>
                                    <div className={`relative ${showClassDropdown ? 'z-50' : ''}`}>
                                        <div
                                            onClick={() => setShowClassDropdown(!showClassDropdown)}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm border hover:border-green-200 border-transparent transition-all cursor-pointer text-gray-900 font-medium flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <div className="p-1 bg-green-100 rounded-lg">
                                                        <GraduationCap size={14} className="text-primary" />
                                                    </div>
                                                </div>
                                                <span className={`${!formData.class ? 'text-gray-400' : 'text-gray-900'}`}>
                                                    {formData.class
                                                        ? availableClasses.find(c => c.code === formData.class)?.name
                                                            ? `${formData.class}`
                                                            : formData.class
                                                        : "Pilih Kelas"}
                                                </span>
                                            </div>
                                            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showClassDropdown ? 'rotate-180' : ''}`} />
                                        </div>

                                        {/* Custom Dropdown Menu */}
                                        {showClassDropdown && (
                                            <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 max-h-60 overflow-y-auto py-2">
                                                {availableClasses.map(cls => (
                                                    <div
                                                        key={cls.code}
                                                        onClick={() => {
                                                            setFormData({ ...formData, class: cls.code });
                                                            setShowClassDropdown(false);
                                                        }}
                                                        className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                                                    >
                                                        <div className={`p-2 rounded-full flex-shrink-0 ${formData.class === cls.code ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                            <GraduationCap size={16} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-bold ${formData.class === cls.code ? 'text-green-700' : 'text-gray-900'}`}>
                                                                {cls.code}
                                                            </p>
                                                            <p className="text-xs text-gray-500 font-medium">{cls.name}</p>
                                                        </div>
                                                        {formData.class === cls.code && (
                                                            <Check size={18} className="text-green-600" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Jenis Kelamin</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: 'Laki-laki' })}
                                        className={`flex items-center justify-center gap-3 p-3 rounded-xl border transition-all ${formData.gender === 'Laki-laki'
                                            ? 'bg-green-50 border-primary text-primary ring-1 ring-primary'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Mars size={18} />
                                        <span className="font-semibold text-sm">Laki-laki</span>
                                        {formData.gender === 'Laki-laki' && <div className="ml-auto bg-primary text-white rounded-full p-0.5"><CheckCircle2 size={12} /></div>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: 'Perempuan' })}
                                        className={`flex items-center justify-center gap-3 p-3 rounded-xl border transition-all ${formData.gender === 'Perempuan'
                                            ? 'bg-green-50 border-primary text-primary ring-1 ring-primary'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Venus size={18} />
                                        <span className="font-semibold text-sm">Perempuan</span>
                                        {formData.gender === 'Perempuan' && <div className="ml-auto bg-primary text-white rounded-full p-0.5"><CheckCircle2 size={12} /></div>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4">
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
                            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
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
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">Hapus Data Siswa</h3>
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
                                Tindakan ini tidak dapat dibatalkan. Data siswa <strong>{studentToDelete?.name}</strong> akan dihapus secara permanen dari sistem.
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
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all cursor-pointer flex items-center gap-2"
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

export default ManageStudents;
