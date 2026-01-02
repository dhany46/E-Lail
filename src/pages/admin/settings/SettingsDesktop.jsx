import React from 'react';

const SettingsDesktop = () => {
    return (
        <div className="p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm mx-8">
            <div className="size-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">settings</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800">Pengaturan Sistem (Desktop)</h2>
            <p className="text-slate-400 mt-2 max-w-sm mx-auto">Menu konfigurasi sistem lengkap dalam tampilan dashboard sedang disiapkan.</p>
        </div>
    );
};

export default SettingsDesktop;
