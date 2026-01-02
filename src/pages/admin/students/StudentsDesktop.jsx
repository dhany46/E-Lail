import React from 'react';

const StudentsDesktop = () => {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">Manajemen Siswa</h1>
                        <p className="text-slate-500 mt-1 font-medium">Versi Desktop akan dikembangkan lengkap pada Fase 4.</p>
                    </div>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-slate-200">
                        <span className="text-xl">+</span> Tambah Siswa Baru
                    </button>
                </header>

                <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center shadow-sm">
                    <div className="size-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-slate-300">desktop_windows</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Tampilan Desktop Masih Dalam Tahapan Rencana</h2>
                    <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                        Kami mengutamakan pengalaman mobile saat ini. Silakan perkecil ukuran browser Anda untuk mencoba pengalaman Admin Mobile yang baru.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentsDesktop;
