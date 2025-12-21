import React, { useState } from 'react';
import { Plus, Filter, Pencil, Trash2, Hash, User, School, UserPlus, Mars, Venus, CheckCircle2, ChevronDown, Check, GraduationCap } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Pagination from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';

const ManageTeachers = () => {
    const toast = useToast();
    const [teachers, setTeachers] = useState([
        { id: 1, nip: '198501012010011001', name: 'Ust. Ahmad Dahlan', classAssigned: '5A', subject: 'PAI', initials: 'AD', color: '#1dc956', gender: 'Laki-laki', status: 'PNS' },
        { id: 2, nip: '199002022015012002', name: 'Usth. Siti Khadijah', classAssigned: '4A', subject: 'Matematika', initials: 'SK', color: '#f59e0b', gender: 'Perempuan', status: 'GTY' },
        { id: 3, nip: '198803032012011003', name: 'Ust. Ali Imran', classAssigned: '6B', subject: 'Bahasa Arab', initials: 'AI', color: '#8b5cf6', gender: 'Laki-laki', status: 'PNS' },
        { id: 4, nip: '199204042018012004', name: 'Usth. Fatimah Az-Zahra', classAssigned: '1A', subject: 'Tematik', initials: 'FA', color: '#3b82f6', gender: 'Perempuan', status: 'GTY' },
        { id: 5, nip: '198705052011011005', name: 'Ust. Umar bin Khattab', classAssigned: '3B', subject: 'PJOK', initials: 'UK', color: '#ef4444', gender: 'Laki-laki', status: 'PNS' },
        { id: 6, nip: '199506062020012006', name: 'Usth. Aisyah R.A', classAssigned: '2A', subject: 'Bahasa Inggris', initials: 'AR', color: '#06b6d4', gender: 'Perempuan', status: 'Honorer' },
        { id: 7, nip: '198307072008011007', name: 'Ust. Khalid Basalamah', classAssigned: '5B', subject: 'Tahfidz', initials: 'KB', color: '#1dc956', gender: 'Laki-laki', status: 'GTY' },
        { id: 8, nip: '199108082016012008', name: 'Usth. Hafshah', classAssigned: '4B', subject: 'Tematik', initials: 'HF', color: '#f59e0b', gender: 'Perempuan', status: 'PNS' },
    ]);

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
    const availableSubjects = ['PAI', 'Matematika', 'Bahasa Indonesia', 'Bahasa Arab', 'Bahasa Inggris', 'IPA', 'IPS', 'PJOK', 'Seni Budaya', 'Tematik', 'Tahfidz', 'Komputer'];
    const availableStatus = ['PNS', 'GTY', 'GTT', 'Honorer'];

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua Status');
    const [sortBy, setSortBy] = useState('name');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ nip: '', name: '', classAssigned: '', subject: '', gender: 'Laki-laki', status: 'GTY' });
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

    const filteredTeachers = teachers
        .filter(t => {
            const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.nip.includes(searchQuery) ||
                t.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchStatus = filterStatus === 'Semua Status' || t.status === filterStatus;
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'nip') return a.nip.localeCompare(b.nip);
            if (sortBy === 'subject') return a.subject.localeCompare(b.subject);
            return 0;
        });

    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const paginatedTeachers = filteredTeachers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleOpenAdd = () => {
        setEditingTeacher(null);
        setFormData({ nip: '', name: '', classAssigned: '', subject: '', gender: 'Laki-laki', status: 'GTY' });
        setShowAddModal(true);
    };

    const handleOpenEdit = (teacher) => {
        setEditingTeacher(teacher);
        setFormData({
            nip: teacher.nip,
            name: teacher.name,
            classAssigned: teacher.classAssigned,
            subject: teacher.subject,
            gender: teacher.gender || 'Laki-laki',
            status: teacher.status || 'GTY'
        });
        setShowAddModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

    const handleDeleteClick = (teacher) => {
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

    // Custom Header for Modal
    const ModalHeader = (
        <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-primary">
                <UserPlus size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {editingTeacher ? 'Edit Data Guru' : 'Tambah Data Guru'}
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-normal">
                    {editingTeacher ? 'Perbarui informasi data guru.' : 'Input data guru baru ke dalam sistem.'}
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <p className="text-xs text-text-secondary-light mb-2">Dashboard / Data Guru</p>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary-light mb-2">Manajemen Data Guru</h1>
                    <p className="text-sm text-text-secondary-light">Kelola data guru dan staf pengajar.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm border-none cursor-pointer shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 self-start md:self-auto"
                >
                    <span className="text-lg">+</span> Tambah Guru
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Total Guru</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{teachers.length}</h2>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                            <span className="material-symbols-outlined text-2xl text-primary">supervisor_account</span>
                        </div>
                    </div>
                    <p className="text-xs text-primary font-medium">Aktif mengajar</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary-light mb-1">Wali Kelas</p>
                            <h2 className="text-2xl font-bold text-text-primary-light">{teachers.filter(t => t.classAssigned).length}</h2>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <span className="material-symbols-outlined text-2xl text-blue-500">class</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Memegang kelas</p>
                </div>

            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-gray-400 text-xl">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama guru atau NIP..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">

                    <div className="relative shrink-0">
                        <button
                            onClick={() => { setShowSortDropdown(!showSortDropdown); }}
                            className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl text-sm font-semibold cursor-pointer text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-xl">swap_vert</span>
                            Urutkan
                        </button>
                        {showSortDropdown && (
                            <div className="absolute top-full right-0 md:left-auto md:right-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[11.25rem] overflow-hidden border border-gray-100">
                                {[{ value: 'name', label: 'Nama Guru' }, { value: 'nip', label: 'NIP' }].map(opt => (
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

            {/* Teachers List */}
            <div className="flex flex-col gap-3">
                {paginatedTeachers.map((teacher) => (
                    <div
                        key={teacher.id}
                        onMouseEnter={() => setHoveredRow(teacher.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`bg-white rounded-xl p-4 border transition-all duration-200 flex flex-col md:flex-row items-start md:items-center gap-4 ${hoveredRow === teacher.id ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent shadow-sm'
                            }`}
                    >
                        {/* 1. NIP */}
                        <div className="w-full md:w-auto md:min-w-[7.5rem] shrink-0">
                            <p className="text-[0.6875rem] text-gray-400 mb-0.5 uppercase tracking-wider">NIP</p>
                            <p className="text-sm font-bold text-gray-900 font-mono tracking-tight">{teacher.nip}</p>
                        </div>

                        {/* 2. Name + Avatar + Status */}
                        <div className="flex items-center gap-3 w-full md:w-[17.5rem] shrink-0">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-[0.9375rem] shrink-0"
                                style={{ backgroundColor: teacher.color }}
                            >
                                {teacher.initials}
                            </div>
                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">{teacher.name}</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1 text-[0.6875rem] px-1.5 py-0.5 rounded-md font-medium text-gray-500 bg-gray-50`}>
                                        {teacher.gender}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Class/Subject Info */}
                        <div className="w-full md:w-[15.625rem] shrink-0 flex flex-col gap-1">
                            {teacher.classAssigned && (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-green-50 rounded text-primary">
                                        <GraduationCap size={14} />
                                    </div>
                                    <span className="text-[0.8125rem] font-semibold text-gray-700 truncate">
                                        Wali Kelas {getClassName(teacher.classAssigned)}
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Spacer */}
                        <div className="hidden md:block flex-1"></div>

                        {/* 4. Actions */}
                        <div className="flex gap-2 w-full md:w-auto justify-end">
                            <button
                                onClick={() => handleOpenEdit(teacher)}
                                className="p-2 rounded-lg border-none cursor-pointer transition-all duration-200 bg-gray-100 text-gray-500 hover:bg-[#1dc956] hover:text-white shadow-sm hover:shadow-md hover:shadow-green-500/20"
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(teacher)}
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
                    totalItems={filteredTeachers.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>

            {/* Add/Edit Modal */}
            <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={ModalHeader}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Form Fields */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h4 className="text-sm font-bold text-gray-500 tracking-wider uppercase flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">badge</span>
                                Informasi Guru
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
                                        placeholder="Contoh: Ust. Ahmad Dahlan"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* NIP */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">NIP</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <div className="p-1 bg-green-100 rounded-lg">
                                                <Hash size={14} className="text-primary" />
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.nip}
                                            onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                                            placeholder="Contoh: 1985..."
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border hover:border-green-200 border-transparent transition-all placeholder-gray-400 text-gray-900 font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Wali Kelas (Optional) */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Wali Kelas (Opsional)</label>
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
                                                <span className={`${!formData.classAssigned ? 'text-gray-400' : 'text-gray-900'}`}>
                                                    {formData.classAssigned || "Bukan Wali Kelas"}
                                                </span>
                                            </div>
                                            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showClassDropdown ? 'rotate-180' : ''}`} />
                                        </div>
                                        {showClassDropdown && (
                                            <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto py-2">
                                                <div
                                                    onClick={() => { setFormData({ ...formData, classAssigned: '' }); setShowClassDropdown(false); }}
                                                    className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50"
                                                >
                                                    <span className="text-sm font-medium text-gray-500 italic">Tidak menjabat wali kelas</span>
                                                </div>
                                                {availableClasses.map(cls => (
                                                    <div
                                                        key={cls.code}
                                                        onClick={() => { setFormData({ ...formData, classAssigned: cls.code }); setShowClassDropdown(false); }}
                                                        className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors"
                                                    >
                                                        <span className="text-sm font-medium text-gray-900">{cls.code} - {cls.name}</span>
                                                        {formData.classAssigned === cls.code && <Check size={16} className="text-green-600" />}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Gender */}
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

export default ManageTeachers;
