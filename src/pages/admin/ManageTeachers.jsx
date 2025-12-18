import React, { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight, Mail, Phone, GraduationCap, User, Hash, School, ChevronDown, Check, Save } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';

const ManageTeachers = () => {
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

    const [teachers, setTeachers] = useState([
        { id: 1, niy: '19850112', name: 'Ust. Ahmad Fauzi', email: 'ahmad.fauzi@almuhajirin.sch.id', phone: '081234567890', classCode: '1A', initials: 'AF', color: '#1dc956' },
        { id: 2, niy: '19900315', name: 'Usth. Siti Aminah', email: 'siti.aminah@almuhajirin.sch.id', phone: '081234567891', classCode: '1B', initials: 'SA', color: '#f59e0b' },
        { id: 3, niy: '19880520', name: 'Ust. Budi Santoso', email: 'budi.santoso@almuhajirin.sch.id', phone: '081234567892', classCode: '2A', initials: 'BS', color: '#8b5cf6' },
        { id: 4, niy: '19920708', name: 'Usth. Dewi Sartika', email: 'dewi.sartika@almuhajirin.sch.id', phone: '081234567893', classCode: '2B', initials: 'DS', color: '#3b82f6' },
        { id: 5, niy: '19870225', name: 'Ust. Candra Wijaya', email: 'candra.wijaya@almuhajirin.sch.id', phone: '081234567894', classCode: '3A', initials: 'CW', color: '#ef4444' },
        { id: 6, niy: '19950410', name: 'Usth. Rina Maryana', email: 'rina.maryana@almuhajirin.sch.id', phone: '081234567895', classCode: '3B', initials: 'RM', color: '#06b6d4' },
        { id: 7, niy: '19830615', name: 'Ust. Hasan Basri', email: 'hasan.basri@almuhajirin.sch.id', phone: '081234567896', classCode: '4A', initials: 'HB', color: '#1dc956' },
        { id: 8, niy: '19910820', name: 'Usth. Fatimah Azzahra', email: 'fatimah.azzahra@almuhajirin.sch.id', phone: '081234567897', classCode: '4B', initials: 'FA', color: '#f59e0b' },
        { id: 9, niy: '19890105', name: 'Ust. Ridwan Kamil', email: 'ridwan.kamil@almuhajirin.sch.id', phone: '081234567898', classCode: '5A', initials: 'RK', color: '#8b5cf6' },
        { id: 10, niy: '19940318', name: 'Usth. Maryam Jamilah', email: 'maryam.jamilah@almuhajirin.sch.id', phone: '081234567899', classCode: '5B', initials: 'MJ', color: '#3b82f6' },
        { id: 11, niy: '19860722', name: 'Ust. Umar Faruq', email: 'umar.faruq@almuhajirin.sch.id', phone: '081234567800', classCode: '6A', initials: 'UF', color: '#ef4444' },
        { id: 12, niy: '19930901', name: 'Usth. Aisyah Putri', email: 'aisyah.putri@almuhajirin.sch.id', phone: '081234567801', classCode: '6B', initials: 'AP', color: '#06b6d4' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'assigned', 'unassigned'
    const [sortBy, setSortBy] = useState('name');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ niy: '', name: '', email: '', phone: '', classCode: '' });
    const [hoveredRow, setHoveredRow] = useState(null);

    const itemsPerPage = 5;

    const getClassName = (code) => {
        const cls = availableClasses.find(c => c.code === code);
        return cls ? cls.name : '-';
    };

    const getClassColor = (code) => {
        if (!code) return '#6b7280';
        const grade = code.charAt(0);
        const colors = { '1': '#1dc956', '2': '#3b82f6', '3': '#f59e0b', '4': '#8b5cf6', '5': '#ef4444', '6': '#06b6d4' };
        return colors[grade] || '#6b7280';
    };

    const filteredTeachers = teachers.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.niy.includes(searchQuery) ||
            t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.phone.includes(searchQuery) ||
            getClassName(t.classCode).toLowerCase().includes(searchQuery.toLowerCase());

        const matchFilter = filterStatus === 'all' ||
            (filterStatus === 'assigned' && t.classCode) ||
            (filterStatus === 'unassigned' && !t.classCode);

        return matchSearch && matchFilter;
    }).sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'niy') return a.niy.localeCompare(b.niy);
        if (sortBy === 'class') return (a.classCode || '').localeCompare(b.classCode || '');
        return 0;
    });

    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const paginatedTeachers = filteredTeachers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenAdd = () => {
        setEditingTeacher(null);
        setFormData({ niy: '', name: '', email: '', phone: '', classCode: '' });
        setShowAddModal(true);
    };

    const handleOpenEdit = (teacher) => {
        setEditingTeacher(teacher);
        setFormData({ niy: teacher.niy, name: teacher.name, email: teacher.email, phone: teacher.phone, classCode: teacher.classCode });
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const initials = formData.name.split(' ').filter(n => n).slice(0, 2).map(n => n[0]).join('').toUpperCase();
        const colors = ['#1dc956', '#f59e0b', '#8b5cf6', '#3b82f6', '#ef4444', '#06b6d4'];

        if (editingTeacher) {
            setTeachers(teachers.map(t =>
                t.id === editingTeacher.id ? { ...t, ...formData, initials } : t
            ));
            toast.success('Data guru berhasil diperbarui!');
        } else {
            const newId = Math.max(...teachers.map(t => t.id), 0) + 1;
            setTeachers([...teachers, {
                id: newId,
                ...formData,
                initials,
                color: colors[newId % colors.length]
            }]);
            toast.success('Guru baru berhasil ditambahkan!');
        }
        setShowAddModal(false);
        setIsSubmitting(false);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);

    const handleDelete = (teacher) => {
        setTeacherToDelete(teacher);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (teacherToDelete) {
            setTeachers(teachers.filter(t => t.id !== teacherToDelete.id));
            setShowDeleteModal(false);
            setTeacherToDelete(null);
            toast.success('Data guru berhasil dihapus!');
        }
    };

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <p className="text-xs text-text-secondary-light mb-2">Dashboard / Data Guru</p>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-[28px] font-bold text-text-primary-light mb-2">Manajemen Data Guru</h1>
                    <p className="text-sm text-text-secondary-light">Kelola data guru dan staff pengajar SD Plus 3 Al-Muhajirin.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm border-none cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 self-start md:self-auto"
                >
                    <span className="text-lg">+</span> Tambah Guru
                </button>
            </div>

            {/* Stats Cards - Dashboard Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Total Guru</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{teachers.length}</h2>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-primary">groups</span>
                        </div>
                    </div>
                    <p className="text-xs text-primary font-medium">Guru aktif</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Wali Kelas Aktif</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{teachers.filter(t => t.classCode).length}</h2>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-blue-500">school</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Sudah ditugaskan</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Belum Ditugaskan</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{teachers.filter(t => !t.classCode).length}</h2>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <span className="material-symbols-outlined text-[24px] text-amber-500">pending</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Menunggu penugasan</p>
                </div>
            </div>

            {/* Search Bar with Filter & Sort */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama guru, NIY, atau kelas..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <div className="relative shrink-0">
                        <button
                            onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer border transition-all duration-200 shadow-sm ${filterStatus !== 'all'
                                ? 'bg-green-100 text-primary border-primary'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            Filter {filterStatus !== 'all' && `(${filterStatus === 'assigned' ? 'Wali' : 'Belum'})`}
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden border border-gray-100">
                                {[{ value: 'all', label: 'Semua Guru' }, { value: 'assigned', label: 'Wali Kelas' }, { value: 'unassigned', label: 'Belum Ditugaskan' }].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setFilterStatus(opt.value); setShowFilterDropdown(false); }}
                                        className={`w-full px-4 py-2.5 text-left border-none cursor-pointer text-sm flex items-center justify-between transition-colors ${filterStatus === opt.value
                                            ? 'bg-green-50 text-primary font-medium'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.label}
                                        {filterStatus === opt.value && <span className="material-symbols-outlined text-sm text-primary">check</span>}
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
                                {[{ value: 'name', label: 'Nama' }, { value: 'niy', label: 'NIY' }, { value: 'class', label: 'Kelas' }].map(opt => (
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

            {/* Card-based Table */}
            <div className="flex flex-col gap-3">
                {paginatedTeachers.map((teacher, index) => (
                    <div
                        key={teacher.id}
                        onMouseEnter={() => setHoveredRow(teacher.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`bg-white rounded-xl p-4 border transition-all duration-200 flex flex-col xl:flex-row items-start xl:items-center gap-4 ${hoveredRow === teacher.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent shadow-sm'
                            }`}
                    >
                        {/* Left Group: NIY + Name + Contact */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full xl:w-auto overflow-hidden">
                            {/* NIY */}
                            <div className="w-full md:w-auto md:min-w-[70px] shrink-0">
                                <p className="text-[11px] text-gray-400 mb-0.5 uppercase tracking-wider">NIY</p>
                                <p className="text-sm font-bold text-gray-900 font-mono">{teacher.niy}</p>
                            </div>

                            {/* Name with Avatar */}
                            <div className="flex items-center gap-3 w-full md:w-[250px] shrink-0">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-[15px] shrink-0"
                                    style={{ backgroundColor: teacher.color }}
                                >
                                    {teacher.initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-gray-900 text-sm truncate">{teacher.name}</p>
                                    <p className="text-xs text-gray-500">Guru Pengajar</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="flex flex-col gap-1 w-full md:w-[200px] shrink-0 md:pl-6 border-l-0 md:border-l border-gray-100 xl:border-none">
                                <div className="flex items-center gap-1.5">
                                    <Mail size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-500 truncate">{teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone size={12} className="text-gray-400" />
                                    <span className="text-xs text-gray-900 font-medium">{teacher.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Spacer on Desktop */}
                        <div className="hidden xl:block flex-1"></div>

                        {/* Right Group: Class + Status + Actions */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full xl:w-auto">
                            {/* Class Badge */}
                            <div className="w-full md:w-[220px] shrink-0">
                                <div
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border w-full"
                                    style={{
                                        backgroundColor: `${getClassColor(teacher.classCode)}15`,
                                        borderColor: `${getClassColor(teacher.classCode)}25`
                                    }}
                                >
                                    <GraduationCap size={14} color={getClassColor(teacher.classCode)} className="shrink-0" />
                                    <span
                                        className="text-xs font-semibold truncate"
                                        style={{ color: getClassColor(teacher.classCode) }}
                                    >
                                        {teacher.classCode ? getClassName(teacher.classCode) : 'Belum Ditugaskan'}
                                    </span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="w-auto shrink-0">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${teacher.classCode ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${teacher.classCode ? 'bg-green-600' : 'bg-amber-600'}`}></span>
                                    {teacher.classCode ? 'Aktif' : 'Pending'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 w-full md:w-auto justify-end">
                                <button
                                    onClick={() => handleOpenEdit(teacher)}
                                    className="p-2 rounded-lg border-none cursor-pointer transition-all duration-200 bg-gray-100 text-gray-500 hover:bg-[#1dc956] hover:text-white shadow-sm hover:shadow-md hover:shadow-green-500/20"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(teacher)}
                                    className="p-2 rounded-lg border-none cursor-pointer transition-all duration-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 shadow-sm hover:shadow-md hover:shadow-red-500/20"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredTeachers.length}
                itemsPerPage={itemsPerPage}
            />

            {/* Add/Edit Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={editingTeacher ? 'Edit Data Guru' : 'Tambah Guru Baru'}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-4">
                        {/* Nama Guru */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Nama Guru</label>
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
                                    placeholder="Masukkan nama lengkap guru"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* NIY */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">NIY (Nomor Induk Yayasan)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <Hash size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.niy}
                                    onChange={(e) => setFormData({ ...formData, niy: e.target.value })}
                                    placeholder="Contoh: 19850112"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <Mail size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Contoh: nama@almuhajirin.sch.id"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Nomor HP */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Nomor HP</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="p-1 bg-green-100 rounded-lg">
                                        <Phone size={14} className="text-primary" />
                                    </div>
                                </div>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Contoh: 081234567890"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Kelas yang Dipegang */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Kelas yang Dipegang</label>
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
                                        <span className={`${!formData.classCode ? 'text-gray-400' : 'text-gray-900'}`}>
                                            {formData.classCode
                                                ? availableClasses.find(c => c.code === formData.classCode)?.name
                                                    ? `${formData.classCode} - ${availableClasses.find(c => c.code === formData.classCode).name}`
                                                    : formData.classCode
                                                : "Pilih Kelas (Opsional)"}
                                        </span>
                                    </div>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showClassDropdown ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Custom Dropdown Menu */}
                                {showClassDropdown && (
                                    <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 max-h-60 overflow-y-auto py-2">
                                        <div
                                            onClick={() => {
                                                setFormData({ ...formData, classCode: '' });
                                                setShowClassDropdown(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 text-gray-500"
                                        >
                                            Tidak Ada
                                        </div>
                                        {availableClasses.map(cls => (
                                            <div
                                                key={cls.code}
                                                onClick={() => {
                                                    setFormData({ ...formData, classCode: cls.code });
                                                    setShowClassDropdown(false);
                                                }}
                                                className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                                            >
                                                <div className={`p-2 rounded-full flex-shrink-0 ${formData.classCode === cls.code ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                    <GraduationCap size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold ${formData.classCode === cls.code ? 'text-green-700' : 'text-gray-900'}`}>
                                                        {cls.code}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-medium">{cls.name}</p>
                                                </div>
                                                {formData.classCode === cls.code && (
                                                    <Check size={18} className="text-green-600" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                    Simpan Guru
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
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">Hapus Data Guru</h3>
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
                                Tindakan ini tidak dapat dibatalkan. Data guru <strong>{teacherToDelete?.name}</strong> akan dihapus secara permanen dari sistem.
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
        </div>
    );
};

export default ManageTeachers;
