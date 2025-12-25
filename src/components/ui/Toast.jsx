import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, X, Info, Sparkles } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setIsVisible(false);
        setTimeout(onClose, 400);
    };

    const styles = {
        success: {
            bg: 'bg-white',
            border: 'border-emerald-200',
            iconBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
            icon: <CheckCircle2 size={20} className="text-white" />,
            textColor: 'text-gray-800',
            shadow: 'shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)]',
            ring: 'ring-emerald-100',
        },
        error: {
            bg: 'bg-white',
            border: 'border-red-200',
            iconBg: 'bg-gradient-to-br from-red-400 to-rose-500',
            icon: <XCircle size={20} className="text-white" />,
            textColor: 'text-gray-800',
            shadow: 'shadow-[0_20px_60px_-15px_rgba(239,68,68,0.4)]',
            ring: 'ring-red-100',
        },
        info: {
            bg: 'bg-white',
            border: 'border-blue-200',
            iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
            icon: <Info size={20} className="text-white" />,
            textColor: 'text-gray-800',
            shadow: 'shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]',
            ring: 'ring-blue-100',
        },
        warning: {
            bg: 'bg-white',
            border: 'border-amber-200',
            iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
            icon: <AlertTriangle size={20} className="text-white" />,
            textColor: 'text-gray-800',
            shadow: 'shadow-[0_20px_60px_-15px_rgba(245,158,11,0.4)]',
            ring: 'ring-amber-100',
        }
    };

    const style = styles[type] || styles.success;

    return (
        <div className={`fixed inset-0 z-[9999] flex items-start justify-center pt-8 pointer-events-none`}>
            <div
                className={`
                    pointer-events-auto
                    relative overflow-hidden
                    flex items-center gap-4 px-5 py-4
                    min-w-[22rem] max-w-md
                    rounded-2xl border-2 ${style.border}
                    ${style.bg} ${style.shadow}
                    ring-4 ${style.ring}
                    transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isVisible && !isExiting
                        ? 'translate-y-0 opacity-100 scale-100'
                        : '-translate-y-8 opacity-0 scale-95'}
                `}
                role="alert"
            >
                {/* Decorative Sparkle */}
                <div className="absolute -top-1 -right-1 opacity-60">
                    <Sparkles size={16} className="text-amber-400" />
                </div>

                {/* Icon */}
                <div className={`p-2.5 rounded-xl ${style.iconBg} shadow-lg shrink-0`}>
                    {style.icon}
                </div>

                {/* Message */}
                <p className={`font-bold text-sm flex-1 leading-relaxed ${style.textColor}`}>
                    {message}
                </p>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all shrink-0"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
