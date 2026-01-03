import React from 'react';

/**
 * ActivityCheckbox Component - Modern Fun Style
 * Consistent sizing: icon 8px, label 13px, padding 16px, rounded-2xl
 */
const ActivityCheckbox = ({
    id,
    label,
    Icon,
    points,
    isChecked,
    onToggle,
    note,
    onNoteChange,
    placeholder,
    color = 'emerald'
}) => {
    const colorClasses = {
        amber: { border: 'border-amber-200', bg: 'bg-amber-50/60', checkBg: 'bg-amber-500', iconColor: 'text-amber-500' },
        purple: { border: 'border-purple-200', bg: 'bg-purple-50/60', checkBg: 'bg-purple-500', iconColor: 'text-purple-500' },
        emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50/60', checkBg: 'bg-emerald-500', iconColor: 'text-emerald-500' },
        rose: { border: 'border-rose-200', bg: 'bg-rose-50/60', checkBg: 'bg-rose-500', iconColor: 'text-rose-500' },
        blue: { border: 'border-blue-200', bg: 'bg-blue-50/60', checkBg: 'bg-blue-500', iconColor: 'text-blue-500' },
        teal: { border: 'border-teal-200', bg: 'bg-teal-50/60', checkBg: 'bg-teal-500', iconColor: 'text-teal-500' },
        indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50/60', checkBg: 'bg-indigo-500', iconColor: 'text-indigo-500' },
        cyan: { border: 'border-cyan-200', bg: 'bg-cyan-50/60', checkBg: 'bg-cyan-500', iconColor: 'text-cyan-500' },
        orange: { border: 'border-orange-200', bg: 'bg-orange-50/60', checkBg: 'bg-orange-500', iconColor: 'text-orange-500' },
        pink: { border: 'border-pink-200', bg: 'bg-pink-50/60', checkBg: 'bg-pink-500', iconColor: 'text-pink-500' },
        slate: { border: 'border-slate-200', bg: 'bg-slate-50/60', checkBg: 'bg-slate-500', iconColor: 'text-slate-500' },
    }[color] || { border: 'border-slate-200', bg: 'bg-slate-50/60', checkBg: 'bg-slate-500', iconColor: 'text-slate-500' };

    return (
        <div
            className={`
                bg-white rounded-2xl border p-4 transition-all duration-200 cursor-pointer
                ${isChecked
                    ? `${colorClasses.border} ${colorClasses.bg} shadow-md`
                    : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                }
            `}
            onClick={() => onToggle(id)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Checkbox */}
                    <div className={`size-7 rounded-xl flex items-center justify-center transition-all ${isChecked ? `${colorClasses.checkBg} shadow-sm` : 'bg-slate-100 border-2 border-slate-200'}`}>
                        {isChecked && <span className="text-white text-sm font-bold">✓</span>}
                    </div>

                    {/* Icon + Label */}
                    <div className="flex items-center gap-2.5">
                        <span className={`text-xl transition-colors ${isChecked ? colorClasses.iconColor : 'text-slate-400'}`}>
                            {Icon && <Icon />}
                        </span>
                        <span className={`text-[13px] font-bold transition-colors ${isChecked ? 'text-slate-800' : 'text-slate-600'}`}>
                            {label}
                        </span>
                    </div>
                </div>

                {/* Points Badge */}
                {points && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold ${isChecked ? 'bg-white shadow-sm text-slate-600 border border-slate-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                        <span>⭐</span>
                        <span>+{points}</span>
                    </div>
                )}
            </div>

            {/* Note Input - Appears when checked */}
            {isChecked && onNoteChange && (
                <div className="mt-3 ml-10 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="text"
                        placeholder={placeholder || "Tulis catatanmu di sini... ✏️"}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-[12px] font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                        value={note || ''}
                        onChange={(e) => onNoteChange(id, e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default ActivityCheckbox;
