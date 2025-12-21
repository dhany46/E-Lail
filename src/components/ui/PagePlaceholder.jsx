import React from 'react';

const PagePlaceholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <span className="material-symbols-outlined text-4xl text-gray-400">construction</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 max-w-md">
                Halaman ini sedang dalam tahap pengembangan. Silakan kembali lagi nanti untuk fitur yang lebih lengkap.
            </p>
        </div>
    );
};

export default PagePlaceholder;
