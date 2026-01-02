import React, { useState, useEffect } from 'react';
import { X, User, Hash, GraduationCap, Phone, CheckCircle2, Save } from 'lucide-react';

const StudentForm = ({ isOpen, onClose, studentData, onSave }) => {
    const [formData, setFormData] = useState({
        nis: '',
        name: '',
        class: '',
        gender: 'Laki-laki',
        parentPhone: '',
    });

    useEffect(() => {
        if (studentData) {
            setFormData(studentData);
        } else {
            setFormData({
                nis: '',
                name: '',
                class: '',
                gender: 'Laki-laki',
                parentPhone: '',
            });
        }
    }, [studentData, isOpen]);

    if (!isOpen) return null;

    const availableClasses = [
        '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end lg:justify-center lg:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Form Container */}
            <div className="relative bg-white rounded-t-[2.5rem] lg:rounded-[2.5rem] p-8 w-full lg:max-w-md shadow-2xl animate-fade-in-up">
                {/* Drag Handle for Mobile */}
                <div className="bg-slate-200 h-1.5 w-12 rounded-full mx-auto mb-6 lg:hidden"></div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            {studentData ? 'Edit Data Siswa' : 'Siswa Baru'}
                        </h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Lengkapi informasi berikut</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center active:scale-95 transition-transform border border-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
                    {/* NIS Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nomor Induk Siswa (NIS)</label>
                        <div className="relative group">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                required
                                type="text"
                                value={formData.nis}
                                onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                                placeholder="Contoh: 10293"
                                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Masukkan nama lengkap..."
                                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Class & Gender Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Kelas</label>
                            <div className="relative group">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <select
                                    required
                                    value={formData.class}
                                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 appearance-none focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                >
                                    <option value="">Pilih</option>
                                    {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: 'Laki-laki' })}
                                    className={`flex-1 h-11 rounded-xl text-[10px] font-black transition-all ${formData.gender === 'Laki-laki' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
                                >
                                    LAKI
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: 'Perempuan' })}
                                    className={`flex-1 h-11 rounded-xl text-[10px] font-black transition-all ${formData.gender === 'Perempuan' ? 'bg-white shadow-sm text-pink-600' : 'text-slate-400'}`}
                                >
                                    PERE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Parent Phone (Added as per v2 master plan) */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">No HP Orang Tua (WA)</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="tel"
                                value={formData.parentPhone}
                                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                                placeholder="08xxxxxxxxx"
                                className="w-full h-14 pl-12 pr-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-800 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-14 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-500 active:bg-slate-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] h-14 rounded-2xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-200"
                        >
                            <Save size={18} />
                            {studentData ? 'Simpan Perubahan' : 'Tambah Siswa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
