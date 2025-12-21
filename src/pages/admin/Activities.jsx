import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import Pagination from '../../components/ui/Pagination';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const Activities = () => {
    const toast = useToast();
    const [activities, setActivities] = useState([
        { id: 1, name: 'Sholat Subuh Berjamaah', category: 'Wajib', points: 20 },
        { id: 2, name: 'Sholat Dhuha', category: 'Sunnah', points: 10 },
        { id: 3, name: "Tadarus Al-Qur'an (1 Juz)", category: 'Sunnah', points: 15 },
        { id: 4, name: 'Infaq / Sedekah', category: 'Sunnah', points: 5 },
        { id: 5, name: 'Membantu Orang Tua', category: 'Sunnah', points: 5 },
        { id: 6, name: 'Sholat Dzuhur Berjamaah', category: 'Wajib', points: 20 },
        { id: 7, name: 'Sholat Ashar Berjamaah', category: 'Wajib', points: 20 },
        { id: 8, name: 'Sholat Maghrib Berjamaah', category: 'Wajib', points: 20 },
        { id: 9, name: 'Sholat Isya Berjamaah', category: 'Wajib', points: 20 },
        { id: 10, name: 'Hafalan Surat Pendek', category: 'Sunnah', points: 15 },
        { id: 11, name: 'Puasa Senin Kamis', category: 'Sunnah', points: 25 },
        { id: 12, name: 'Sholat Tahajud', category: 'Sunnah', points: 15 },
        { id: 13, name: 'Dzikir Pagi', category: 'Sunnah', points: 5 },
        { id: 14, name: 'Dzikir Petang', category: 'Sunnah', points: 5 },
        { id: 15, name: 'Membaca Buku Islami', category: 'Sunnah', points: 10 },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Form state
    const [formData, setFormData] = useState({ name: '', category: 'Wajib', points: 0 });
    const [editingId, setEditingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);

    // Stats
    const totalActivities = activities.length;
    const totalDailyPoints = activities.reduce((sum, a) => sum + a.points, 0);
    const wajibCount = activities.filter(a => a.category === 'Wajib').length;

    // Filter and paginate
    const filteredActivities = activities.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedActivities = filteredActivities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || formData.points <= 0) {
            alert('Mohon isi nama kegiatan dan poin dengan benar!');
            return;
        }

        if (editingId) {
            setActivities(activities.map(a =>
                a.id === editingId ? { ...a, ...formData } : a
            ));
            setEditingId(null);
            toast.success('Kegiatan berhasil diperbarui!');
        } else {
            const newId = Math.max(...activities.map(a => a.id), 0) + 1;
            setActivities([...activities, { id: newId, ...formData }]);
            toast.success('Kegiatan baru berhasil ditambahkan!');
        }
        handleReset();
    };

    const handleEdit = (activity) => {
        setFormData({ name: activity.name, category: activity.category, points: activity.points });
        setEditingId(activity.id);
    };

    const handleDelete = (id) => {
        const activity = activities.find(a => a.id === id);
        setActivityToDelete(activity);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (activityToDelete) {
            setActivities(activities.filter(a => a.id !== activityToDelete.id));
            setShowDeleteModal(false);
            setActivityToDelete(null);
            toast.error('Kegiatan berhasil dihapus!');
        }
    };

    const handleReset = () => {
        setFormData({ name: '', category: 'Wajib', points: 0 });
        setEditingId(null);
    };

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <p className="text-xs text-text-secondary-light mb-2">Dashboard / Kegiatan Ibadah</p>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary-light mb-2">Kegiatan Ibadah</h1>
                    <p className="text-sm text-text-secondary-light">Atur jenis ibadah dan poin penghargaan untuk siswa</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-text-secondary-light font-medium">Total Jenis Kegiatan</p>
                            <h3 className="text-3xl font-bold text-text-primary-light mt-1">{totalActivities}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <span className="material-symbols-outlined text-2xl">checklist</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-text-secondary-light font-medium">Total Poin Harian</p>
                            <h3 className="text-3xl font-bold text-text-primary-light mt-1">{totalDailyPoints}</h3>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <span className="material-symbols-outlined text-2xl">stars</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between h-32">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-text-secondary-light font-medium">Kegiatan Wajib</p>
                            <h3 className="text-3xl font-bold text-text-primary-light mt-1">{wajibCount}</h3>
                        </div>
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <span className="material-symbols-outlined text-2xl">priority_high</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-gray-400 text-xl pointer-events-none">search</span>
                        <input
                            type="text"
                            placeholder="Cari nama kegiatan ibadah..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border-none text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-700"
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-surface-light rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-text-secondary-light font-medium">
                                <tr>
                                    <th className="px-6 py-4 text-left">NAMA KEGIATAN</th>
                                    <th className="px-6 py-4 text-left">KATEGORI</th>
                                    <th className="px-6 py-4 text-left">POIN</th>
                                    <th className="px-6 py-4 text-left">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedActivities.map((activity) => (
                                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary-light">{activity.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${activity.category === 'Wajib'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-teal-100 text-teal-700'
                                                }`}>
                                                {activity.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-primary-light font-medium">{activity.points} Poin</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(activity)}
                                                    className="p-1.5 rounded-lg border-none cursor-pointer transition-all duration-200 bg-gray-100 text-gray-500 hover:bg-[#1dc956] hover:text-white shadow-sm hover:shadow-md hover:shadow-green-500/20"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(activity.id)}
                                                    className="p-1.5 rounded-lg border-none cursor-pointer transition-all duration-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 shadow-sm hover:shadow-md hover:shadow-red-500/20"
                                                    title="Hapus"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={filteredActivities.length}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                </div>

                {/* Add/Edit Form Sidebar */}
                <div className="bg-surface-light rounded-xl shadow-sm p-6 h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-text-primary-light">
                            {editingId ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                        </h2>
                        <div className="p-1.5 bg-primary/10 rounded-full">
                            <span className="material-symbols-outlined text-primary text-xl">add</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary-light mb-2">Nama Kegiatan</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Contoh: Puasa Senin Kamis"
                                className="w-full px-3 py-2.5 bg-background-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm border-none shadow-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary-light mb-2">Kategori</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: 'Wajib' })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${formData.category === 'Wajib'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Wajib
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: 'Sunnah' })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${formData.category === 'Sunnah'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Sunnah
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary-light mb-2">Jumlah Poin</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={formData.points}
                                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                                    min="0"
                                    className="w-full px-3 py-2.5 bg-background-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm pr-12 border-none shadow-none"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">pts</span>
                            </div>
                            <p className="text-xs text-text-secondary-light mt-1">Masukkan angka positif saja.</p>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 px-6 bg-[#1dc956] text-white rounded-xl font-bold text-sm border-none cursor-pointer shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">save</span>
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        <Trash2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">Hapus Kegiatan</h3>
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
                                Tindakan ini tidak dapat dibatalkan. Kegiatan <strong>{activityToDelete?.name}</strong> akan dihapus secara permanen dari daftar.
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
        </div>
    );
};

export default Activities;
