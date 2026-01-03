import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

/**
 * ActivityInputForm Component - Modern Fun Style
 * Consistent sizing with ActivityCheckbox: icon 8px, label 13px, rounded-2xl
 */
const ActivityInputForm = ({
    id,
    title,
    Icon,
    themeColor = 'blue',
    points,
    children,
    error
}) => {
    const IconComponent = Icon || FaBookOpen;

    const themes = {
        blue: { iconBg: 'bg-blue-500' },
        emerald: { iconBg: 'bg-emerald-500' },
        purple: { iconBg: 'bg-purple-500' },
        amber: { iconBg: 'bg-amber-500' },
        indigo: { iconBg: 'bg-indigo-500' },
    };

    const theme = themes[themeColor] || themes.blue;

    return (
        <div id={id} className="animate-fade-in bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className={`size-9 rounded-xl ${theme.iconBg} flex items-center justify-center shadow-sm`}>
                        <IconComponent className="text-base text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-[13px]">{title}</h4>
                        {error && <p className="text-[10px] font-bold text-rose-500 mt-0.5">{error}</p>}
                    </div>
                </div>

                {/* Points Badge - Same as ActivityCheckbox */}
                {points && (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 text-[11px] font-bold">
                        <span>⭐</span>
                        <span>+{points}</span>
                    </div>
                )}
            </div>

            {/* Form Content */}
            <div className="space-y-3 ml-1">
                {children}
            </div>
        </div>
    );
};

export default ActivityInputForm;
