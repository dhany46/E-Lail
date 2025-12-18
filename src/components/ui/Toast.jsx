import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Robust animation trigger
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const styles = {
        success: {
            bg: 'bg-white',
            border: 'border-green-100',
            icon: <CheckCircle2 size={20} className="text-green-500" />,
            titleColor: 'text-gray-800',
            shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
            accent: 'bg-green-500'
        },
        error: {
            bg: 'bg-white',
            border: 'border-red-100',
            icon: <XCircle size={20} className="text-red-500" />,
            titleColor: 'text-gray-800',
            shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
            accent: 'bg-red-500'
        },
        info: {
            bg: 'bg-white',
            border: 'border-blue-100',
            icon: <Info size={20} className="text-blue-500" />,
            titleColor: 'text-gray-800',
            shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
            accent: 'bg-blue-500'
        },
        warning: {
            bg: 'bg-white',
            border: 'border-amber-100',
            icon: <AlertTriangle size={20} className="text-amber-500" />,
            titleColor: 'text-gray-800',
            shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
            accent: 'bg-amber-500'
        }
    };

    const style = styles[type] || styles.success;

    return (
        <div
            className={`
                pointer-events-auto
                relative overflow-hidden
                flex items-center gap-3 p-4 pr-10
                min-w-[18.75rem] max-w-md
                rounded-xl border ${style.border}
                ${style.bg} ${style.shadow}
                transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
            role="alert"
        >
            {/* Left Accent Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`} />

            <div className={`p-1.5 rounded-full ${type === 'success' ? 'bg-green-50' : type === 'error' ? 'bg-red-50' : 'bg-gray-50'}`}>
                {style.icon}
            </div>

            <div className="flex-1">
                <p className={`text-sm font-semibold ${style.titleColor}`}>
                    {message}
                </p>
            </div>

            <button
                onClick={handleClose}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Close"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
