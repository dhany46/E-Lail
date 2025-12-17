import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        schoolName: 'SD Plus 3 Al-Muhajirin',
        academicYear: '2023/2024',
        semester: '1',

    });
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        alert('Pengaturan berhasil disimpan!');
        setIsSubmitting(false);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <p style={{ fontSize: '12px', color: '#509567', marginBottom: '8px' }}>Dashboard / Pengaturan</p>

            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0e1b12', marginBottom: '8px' }}>Pengaturan</h1>
                <p style={{ fontSize: '14px', color: '#509567' }}>Konfigurasi aplikasi Buku Lail Online.</p>
            </div>

            {/* School Info Section */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px' }}>
                    <h2 className="text-lg font-bold text-text-primary-light">Informasi Sekolah</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary-light mb-1">Nama Sekolah</label>
                        <input
                            type="text"
                            value={settings.schoolName}
                            onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                            className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary-light mb-1">Tahun Ajaran</label>
                        <div className={`relative ${showYearDropdown ? 'z-50' : ''}`}>
                            <div
                                onClick={() => {
                                    setShowYearDropdown(!showYearDropdown);
                                    setShowSemesterDropdown(false);
                                }}
                                className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer text-sm"
                            >
                                <span>{settings.academicYear}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showYearDropdown ? 'rotate-180' : ''}`} />
                            </div>
                            {showYearDropdown && (
                                <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2">
                                    {['2023/2024', '2024/2025'].map(year => (
                                        <div
                                            key={year}
                                            onClick={() => {
                                                setSettings({ ...settings, academicYear: year });
                                                setShowYearDropdown(false);
                                            }}
                                            className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center justify-between transition-colors border-b border-gray-50 last:border-none"
                                        >
                                            <span className={`text-sm font-medium ${settings.academicYear === year ? 'text-green-700' : 'text-gray-900'}`}>{year}</span>
                                            {settings.academicYear === year && <Check size={16} className="text-green-600" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-secondary-light mb-1">Semester</label>
                        <div className={`relative ${showSemesterDropdown ? 'z-50' : ''}`}>
                            <div
                                onClick={() => {
                                    setShowSemesterDropdown(!showSemesterDropdown);
                                    setShowYearDropdown(false);
                                }}
                                className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg flex items-center justify-between cursor-pointer text-sm"
                            >
                                <span>{settings.semester === '1' ? 'Semester 1 (Ganjil)' : 'Semester 2 (Genap)'}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showSemesterDropdown ? 'rotate-180' : ''}`} />
                            </div>
                            {showSemesterDropdown && (
                                <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2">
                                    {[
                                        { value: '1', label: 'Semester 1 (Ganjil)' },
                                        { value: '2', label: 'Semester 2 (Genap)' }
                                    ].map(sem => (
                                        <div
                                            key={sem.value}
                                            onClick={() => {
                                                setSettings({ ...settings, semester: sem.value });
                                                setShowSemesterDropdown(false);
                                            }}
                                            className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-center justify-between transition-colors border-b border-gray-50 last:border-none"
                                        >
                                            <span className={`text-sm font-medium ${settings.semester === sem.value ? 'text-green-700' : 'text-gray-900'}`}>{sem.label}</span>
                                            {settings.semester === sem.value && <Check size={16} className="text-green-600" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Alamat Sekolah</label>
                        <textarea
                            defaultValue="Jl. Pendidikan No. 123, Kota Belajar"
                            rows={3}
                            className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-y"
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Nomor Telepon</label>
                            <input
                                type="text"
                                defaultValue="(021) 555-0123"
                                className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email</label>
                            <input
                                type="email"
                                defaultValue="admin@sekolah.sch.id"
                                className="w-full px-3 py-2 bg-background-light border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>



            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSubmitting}
                    style={{ padding: '12px 24px', backgroundColor: isSubmitting ? '#9ca3af' : '#1dc956', color: 'white', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(29, 201, 86, 0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan...
                        </>
                    ) : (
                        'Simpan Pengaturan'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Settings;
