import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Save, RotateCcw, Plus, X, ChevronDown, Check, Trash2, Star, AlertTriangle, Edit2, EyeOff, Target } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { useToast } from '../../../context/ToastContext';
import { getAppConfig, saveAppConfig } from '../../../utils/constants';
import {
    DEFAULT_CATEGORIES,
    getActivityConfig,
    CATEGORY_ICONS,
    AVAILABLE_ICONS,
    ALL_ICONS,
    AVAILABLE_COLORS,
    getNextAvailableColor,
    saveCustomActivityConfig,
    getIconById,
    formatToEYD
} from '../../../utils/worshipConfig';

// Confirmation Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'warning' }) => {
    if (!isOpen) return null;

    const colors = {
        warning: { bg: 'bg-amber-100', icon: 'text-amber-500', btn: 'bg-amber-500 hover:bg-amber-600' },
        danger: { bg: 'bg-red-100', icon: 'text-red-500', btn: 'bg-red-500 hover:bg-red-600' },
        info: { bg: 'bg-blue-100', icon: 'text-blue-500', btn: 'bg-blue-500 hover:bg-blue-600' }
    };

    const color = colors[type];

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl animate-pop-up">
                <div className={`size-14 ${color.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {type === 'danger' ? (
                        <Trash2 size={28} className={color.icon} />
                    ) : (
                        <AlertTriangle size={28} className={color.icon} />
                    )}
                </div>
                <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{title}</h3>
                <p className="text-sm text-slate-500 text-center mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-11 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium active:scale-95 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`flex-1 h-11 ${color.btn} text-white rounded-xl text-sm font-medium active:scale-95 transition-all`}
                    >
                        Ya, Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
};



const WorshipPointsMobile = ({ onBack }) => {
    const toast = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [newActivity, setNewActivity] = useState({
        label: '',
        points: '',
        category: 'wajib',
        iconId: 'star',
        colorId: 'blue',
        inputType: 'checkbox',
        placeholder: ''
    });
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('blue');
    const [newCategoryIconId, setNewCategoryIconId] = useState('star');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    // State declarations fixed
    const [showCatIconPicker, setShowCatIconPicker] = useState(false);
    const [showCatColorPicker, setShowCatColorPicker] = useState(false);

    // Edit Mode States
    const [editingActivityId, setEditingActivityId] = useState(null);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [editingCategoryData, setEditingCategoryData] = useState({
        id: '',
        title: '',
        color: '', // bg-class
        colorId: 'blue',
        iconId: 'star'
    });

    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [originalCategories, setOriginalCategories] = useState(DEFAULT_CATEGORIES);
    const [hasChanges, setHasChanges] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Daily Target State
    const [dailyTarget, setDailyTarget] = useState(getAppConfig().dailyTarget);

    // Check for changes whenever categories change
    useEffect(() => {
        const currentData = JSON.stringify(categories.map(c => ({ id: c.id, items: c.items })));
        const originalData = JSON.stringify(originalCategories.map(c => ({ id: c.id, items: c.items })));
        setHasChanges(currentData !== originalData);
    }, [categories, originalCategories]);

    // Auto-save to localStorage whenever categories change (after initial load)
    useEffect(() => {
        if (isInitialLoad) return;

        try {
            const dataToSave = categories.map(cat => ({
                id: cat.id,
                title: cat.title,
                iconId: cat.iconId,
                colorId: cat.colorId,
                color: cat.color,
                isArchived: cat.isArchived, // Explicitly save archived status
                items: cat.items
            }));
            localStorage.setItem('worship_points_settings', JSON.stringify(dataToSave));
        } catch (e) {
            console.error("Failed to auto-save settings", e);
        }
    }, [categories, isInitialLoad]);

    // Confirmation modal state
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'warning',
        onConfirm: () => { }
    });

    const showConfirm = (title, message, onConfirm, type = 'warning') => {
        setConfirmModal({ isOpen: true, title, message, type, onConfirm });
    };

    const closeConfirm = () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
    };

    // Load data from LocalStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('worship_points_settings');
        if (savedData) {
            try {
                // Merge saved items with default structure to preserve icons/colors
                // because functions/components (icons) are not serializable in JSON
                const parsedData = JSON.parse(savedData);
                const mergedCategories = DEFAULT_CATEGORIES.map(defCat => {
                    const savedCat = parsedData.find(c => c.id === defCat.id);
                    if (savedCat) {
                        return {
                            ...defCat,
                            title: savedCat.title,
                            color: savedCat.color,
                            colorId: savedCat.colorId,
                            iconId: savedCat.iconId,
                            isArchived: savedCat.isArchived, // Restore archived status
                            items: savedCat.items
                        };
                    }
                    return defCat;
                });

                // Add custom categories created by admin
                parsedData.forEach(savedCat => {
                    if (!mergedCategories.find(c => c.id === savedCat.id)) {
                        mergedCategories.push({
                            ...savedCat,
                            icon: savedCat.iconId ? getIconById(savedCat.iconId) : FaStar,
                        });
                    }
                });

                setCategories(mergedCategories);
                setOriginalCategories(mergedCategories);
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        }
        // Mark initial load complete
        setIsInitialLoad(false);
    }, []);



    const filteredCategories = categories.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            !item.isArchived && item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => !cat.isArchived && cat.items.length > 0);

    const handleOpenAddModal = () => {
        const nextColor = getNextAvailableColor();
        setNewActivity(prev => ({
            ...prev,
            colorId: nextColor.id,
            category: 'wajib', // Default category
            label: '',
            points: '',
            iconId: 'star',
            inputType: 'checkbox',
            placeholder: ''
        }));
        setEditingActivityId(null);
        setIsAddModalOpen(true);
    };

    const handleAddActivity = () => {
        if (!newActivity.label || !newActivity.points) {
            toast.error('Mohon lengkapi nama dan poin kegiatan');
            return;
        }

        if (isNewCategory && !newCategoryName.trim()) {
            toast.error('Mohon masukkan nama kategori baru');
            return;
        }

        const activityId = `custom_${Date.now()}`;
        const colorConfig = AVAILABLE_COLORS.find(c => c.id === newActivity.colorId) || AVAILABLE_COLORS[0];

        // Format labels to proper EYD
        const formattedActivityLabel = formatToEYD(newActivity.label);
        const formattedCategoryName = formatToEYD(newCategoryName);

        // Save custom activity config for icon and color (only for new activities)
        if (!editingActivityId) {
            saveCustomActivityConfig(activityId, newActivity.iconId, newActivity.colorId);
        }

        if (editingActivityId) {
            // Save config with editing ID
            saveCustomActivityConfig(editingActivityId, newActivity.iconId, newActivity.colorId);
            // Update Existing Activity
            setCategories(prev => prev.map(cat => {
                if (cat.id === newActivity.category) {
                    return {
                        ...cat,
                        items: cat.items.map(item => {
                            if (item.id === editingActivityId) {
                                return {
                                    id: item.id,
                                    label: formattedActivityLabel,
                                    points: parseInt(newActivity.points) || 0,
                                    type: newActivity.inputType,
                                    placeholder: newActivity.inputType === 'text' ? newActivity.placeholder : undefined
                                };
                            }
                            return item;
                        })
                    };
                }
                return cat;
            }));
            toast.success('Kegiatan berhasil diperbarui!');
        } else if (isNewCategory) {
            // Add new category with the activity
            const newCatId = `custom_cat_${Date.now()}`;
            const catColorConfig = AVAILABLE_COLORS.find(c => c.id === newCategoryColor) || AVAILABLE_COLORS[0];
            const newCategory = {
                id: newCatId,
                title: formattedCategoryName,
                icon: getIconById(newCategoryIconId),
                iconId: newCategoryIconId,
                color: catColorConfig.bg,
                colorId: newCategoryColor,
                items: [{
                    id: activityId,
                    label: formattedActivityLabel,
                    points: parseInt(newActivity.points) || 0,
                    type: newActivity.inputType,
                    placeholder: newActivity.inputType === 'text' ? newActivity.placeholder : undefined
                }]
            };
            setCategories(prev => [...prev, newCategory]);
            toast.success('Kategori dan kegiatan berhasil ditambahkan!');
        } else {
            // Add to existing category
            setCategories(prev => prev.map(cat => {
                if (cat.id === newActivity.category) {
                    return {
                        ...cat,
                        items: [...cat.items, {
                            id: activityId,
                            label: formattedActivityLabel,
                            points: parseInt(newActivity.points) || 0,
                            type: newActivity.inputType,
                            placeholder: newActivity.inputType === 'text' ? newActivity.placeholder : undefined
                        }]
                    };
                }
                return cat;
            }));
            toast.success('Kegiatan berhasil ditambahkan!');
        }

        // Log data ke console (simulasi penyimpanan database)
        console.log('📦 Data Kegiatan Baru:', {
            id: activityId,
            label: formattedActivityLabel,
            points: parseInt(newActivity.points) || 0,
            inputType: newActivity.inputType,
            category: isNewCategory ? formattedCategoryName : newActivity.category,
            iconId: newActivity.iconId,
            colorId: newActivity.colorId
        });

        // Reset form with next available color
        const nextColor = getNextAvailableColor();
        setIsAddModalOpen(false);
        setNewActivity({ label: '', points: '', category: 'wajib', iconId: 'star', colorId: nextColor.id, inputType: 'checkbox', placeholder: '' });
        setIsNewCategory(false);
        setNewCategoryName('');
        setNewCategoryColor(nextColor.id);
        setNewCategoryIconId('star');
        setShowIconPicker(false);
        setShowColorPicker(false);
        setShowCatIconPicker(false);
        setShowCatColorPicker(false);
        setEditingActivityId(null);
    };

    const handleEditActivity = (catId, activity) => {
        const config = getActivityConfig(activity.id);
        setNewActivity({
            label: activity.label,
            points: activity.points,
            category: catId,
            iconId: config.iconId || 'star',
            colorId: config.colorName || 'blue',
            inputType: activity.type || 'checkbox',
            placeholder: activity.placeholder || ''
        });
        setEditingActivityId(activity.id);
        setIsNewCategory(false);
        setIsAddModalOpen(true);
    };

    const handleEditCategory = (catId) => {
        const category = categories.find(c => c.id === catId);
        if (!category) return;
        setEditingCategoryData({
            id: category.id,
            title: category.title,
            color: category.color,
            colorId: category.colorId || 'blue',
            iconId: category.iconId || 'star'
        });
        setIsEditCategoryModalOpen(true);
    };

    const handleUpdateCategory = () => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === editingCategoryData.id) {
                const colorConfig = AVAILABLE_COLORS.find(c => c.id === editingCategoryData.colorId) || AVAILABLE_COLORS[0];
                return {
                    ...cat,
                    title: editingCategoryData.title,
                    color: colorConfig.bg,
                    colorId: editingCategoryData.colorId,
                    iconId: editingCategoryData.iconId,
                    icon: getIconById(editingCategoryData.iconId)
                };
            }
            return cat;
        }));
        setIsEditCategoryModalOpen(false);
        toast.success('Kategori berhasil diperbarui!');
    };

    const toggleCollapse = (catId) => {
        setExpandedCategories(prev => ({
            [catId]: !prev[catId]
        }));
    };

    const handleDeleteCategory = (catId) => {
        const category = categories.find(c => c.id === catId);
        showConfirm(
            'Nonaktifkan Kategori?',
            `Kategori "${category?.title}" akan disembunyikan dari input siswa, namun riwayat lama tetap tersimpan.`,
            () => {
                // Soft Delete (Disable) for ALL Categories (Default & Custom)
                setCategories(prev => prev.map(cat => {
                    if (cat.id === catId) {
                        return { ...cat, isArchived: true };
                    }
                    return cat;
                }));
                toast.success('Kategori dinonaktifkan');
            },
            'warning'
        );
    };

    const handleDeleteActivity = (catId, itemId) => {
        const category = categories.find(c => c.id === catId);
        const item = category?.items.find(i => i.id === itemId);

        showConfirm(
            'Nonaktifkan Kegiatan?',
            `Kegiatan "${item?.label}" akan disembunyikan dari input siswa, namun riwayat lama tetap tersimpan.`,
            () => {
                // Soft Delete (Disable) for ALL Activities (Default & Custom)
                setCategories(prev => prev.map(cat => {
                    if (cat.id === catId) {
                        return {
                            ...cat,
                            items: cat.items.map(item => {
                                if (item.id === itemId) {
                                    return { ...item, isArchived: true };
                                }
                                return item;
                            })
                        };
                    }
                    return cat;
                }));
                toast.success('Kegiatan dinonaktifkan');
            },
            'warning'
        );
    };

    const handleRestoreCategory = (catId) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === catId) {
                return { ...cat, isArchived: false };
            }
            return cat;
        }));
        toast.success('Kategori diaktifkan kembali');
    };

    const handleRestoreActivity = (catId, itemId) => {
        setCategories(prev => prev.map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    items: cat.items.map(item => {
                        if (item.id === itemId) {
                            return { ...item, isArchived: false };
                        }
                        return item;
                    })
                };
            }
            return cat;
        }));
        toast.success('Kegiatan diaktifkan kembali');
    };

    // Filter disabled items for the management card
    const disabledCategories = categories.filter(cat => cat.isArchived);
    const activeCategoriesWithDisabledItems = categories.filter(cat => !cat.isArchived && cat.items.some(i => i.isArchived));
    const hasDisabledItems = disabledCategories.length > 0 || activeCategoriesWithDisabledItems.length > 0;

    const handleSave = () => {
        // Data sudah auto-save, cukup tampilkan toast dan kembali
        setOriginalCategories(categories);
        setHasChanges(false);
        toast.success('Pengaturan tersimpan!');
        if (onBack) {
            setTimeout(onBack, 800);
        }
    };

    const handleReset = () => {
        showConfirm(
            'Reset Pengaturan?',
            'Semua perubahan akan hilang dan dikembalikan ke pengaturan awal.',
            () => {
                setCategories(DEFAULT_CATEGORIES);
                localStorage.removeItem('worship_points_settings');
                toast.info('Poin dikembalikan ke pengaturan awal');
            },
            'warning'
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans scrollbar-hide">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 border-b border-slate-200 px-5 pt-4 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="size-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform"
                        >
                            <Star size={20} />
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Poin Ibadah</h2>
                            <p className="text-xs text-slate-500 font-medium">Atur bobot poin tiap kegiatan</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Daily Target Setting - Modern Minimal */}
                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                                <Target size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800">Target Harian</h3>
                                <p className="text-[11px] text-slate-400">Min. ibadah per hari</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                            <button
                                onClick={() => {
                                    const newTarget = Math.max(1, dailyTarget - 1);
                                    setDailyTarget(newTarget);
                                    saveAppConfig({ dailyTarget: newTarget });
                                }}
                                className="size-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 font-bold text-lg active:scale-95 transition-all hover:text-slate-700"
                            >
                                −
                            </button>
                            <span className="w-10 text-center text-lg font-black text-slate-800">{dailyTarget}</span>
                            <button
                                onClick={() => {
                                    const newTarget = Math.min(20, dailyTarget + 1);
                                    setDailyTarget(newTarget);
                                    saveAppConfig({ dailyTarget: newTarget });
                                }}
                                className="size-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 font-bold text-lg active:scale-95 transition-all hover:text-slate-700"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[1.5rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    {/* Card Header with Title & Search */}
                    <div className="px-5 pt-5 pb-5 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-white">Atur Poin Ibadah</h3>
                                <button
                                    onClick={handleOpenAddModal}
                                    className="size-10 rounded-xl bg-white text-blue-600 flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl"
                                >
                                    <Plus size={22} strokeWidth={2.5} />
                                </button>
                            </div>
                            <p className="text-[11px] text-blue-100 mb-4">Kelola bobot poin setiap kegiatan</p>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari kegiatan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 pl-10 pr-4 bg-white rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-white/30 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="divide-y divide-slate-100">
                        {filteredCategories.map((cat) => (
                            <div key={cat.id} className="animate-fade-in-up">
                                <div
                                    className="flex items-center justify-between px-4 py-4 cursor-pointer bg-white active:bg-slate-50 transition-colors"
                                >
                                    <div
                                        className="flex items-center gap-3.5 flex-1"
                                        onClick={() => toggleCollapse(cat.id)}
                                    >
                                        <div className={`size-9 rounded-xl ${cat.color} flex items-center justify-center text-white shadow-sm ring-4 ring-white`}>
                                            <cat.icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-[14px] font-semibold text-slate-700 leading-none">{cat.title}</h4>
                                            <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-none">{cat.items.length} kegiatan</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCategory(cat.id);
                                            }}
                                            className="size-7 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCategory(cat.id);
                                            }}
                                            className="size-7 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                            title="Nonaktifkan Kategori"
                                        >
                                            <EyeOff size={14} />
                                        </button>
                                        <div
                                            onClick={() => toggleCollapse(cat.id)}
                                            className={`size-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-transform duration-300 ${expandedCategories[cat.id] ? 'rotate-0' : '-rotate-90'}`}
                                        >
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategories[cat.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-4 pb-4 space-y-2 bg-white">
                                        {cat.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="py-3 px-4 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between group transition-all"
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {(() => {
                                                        const config = getActivityConfig(item.id);
                                                        const IconComp = config.icon;
                                                        return (
                                                            <div className={`size-8 rounded-xl ${config.color} flex items-center justify-center text-white shrink-0`}>
                                                                <IconComp size={14} />
                                                            </div>
                                                        );
                                                    })()}
                                                    <h4 className="text-[13px] font-medium text-slate-600 group-hover:text-blue-600 transition-colors">{item.label}</h4>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                                                        <span className="text-xs font-black text-slate-600">{item.points} Pts</span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleEditActivity(cat.id, item)}
                                                            className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteActivity(cat.id, item.id)}
                                                            className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                                            title="Nonaktifkan Kegiatan"
                                                        >
                                                            <EyeOff size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>




            {/* Disabled Activities Management Card */}
            {hasDisabledItems && (
                <div className="px-5 pb-8">
                    <div className="bg-slate-100 rounded-[1.5rem] border border-slate-200 overflow-hidden animate-fade-in-up">
                        <div className="px-5 py-4 bg-slate-200 border-b border-slate-300 flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-slate-400 text-white flex items-center justify-center">
                                <EyeOff size={16} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-700">Kegiatan Nonaktif</h3>
                                <p className="text-[10px] text-slate-500 font-medium">Data disembunyikan dari input siswa</p>
                            </div>
                        </div>

                        <div className="p-3 space-y-2">
                            {/* Disabled Categories */}
                            {disabledCategories.map(cat => (
                                <div key={cat.id} className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                            <cat.icon size={14} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-600 line-through decoration-slate-400">{cat.title}</h4>
                                            <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Kategori Nonaktif</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRestoreCategory(cat.id)}
                                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center gap-1.5 hover:bg-blue-100 active:scale-95 transition-all"
                                    >
                                        <RotateCcw size={12} />
                                        Aktifkan
                                    </button>
                                </div>
                            ))}

                            {/* Disabled Activities in Active Categories */}
                            {activeCategoriesWithDisabledItems.map(cat => (
                                <React.Fragment key={`disabled-group-${cat.id}`}>
                                    {cat.items.filter(i => i.isArchived).map(item => (
                                        <div key={item.id} className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                                    {(() => {
                                                        const config = getActivityConfig(item.id);
                                                        const IconComp = config.icon;
                                                        return <IconComp size={14} />;
                                                    })()}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-600 line-through decoration-slate-400">{item.label}</h4>
                                                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">dalam {cat.title}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRestoreActivity(cat.id, item.id)}
                                                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold flex items-center gap-1.5 hover:bg-blue-100 active:scale-95 transition-all"
                                            >
                                                <RotateCcw size={12} />
                                                Aktifkan
                                            </button>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah Kegiatan */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl animate-pop-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-slate-800">{editingActivityId ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">KATEGORI</label>

                                {/* Toggle between existing and new category (Only show if NOT editing) */}
                                {!editingActivityId && (
                                    <div className="flex gap-2 mb-3">
                                        <button
                                            onClick={() => setIsNewCategory(false)}
                                            className={`flex-1 h-10 rounded-xl text-xs font-semibold transition-all ${!isNewCategory
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}
                                        >
                                            Pilih Kategori
                                        </button>
                                        <button
                                            onClick={() => setIsNewCategory(true)}
                                            className={`flex-1 h-10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 ${isNewCategory
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}
                                        >
                                            <Plus size={14} />
                                            Buat Baru
                                        </button>
                                    </div>
                                )}

                                {!isNewCategory ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                            className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-700 outline-none flex items-center justify-between transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`size-6 rounded-lg ${categories.find(c => c.id === newActivity.category)?.color} flex items-center justify-center`}>
                                                    {(() => {
                                                        const IconComp = categories.find(c => c.id === newActivity.category)?.icon;
                                                        return IconComp ? <IconComp size={12} className="text-white" /> : null;
                                                    })()}
                                                </div>
                                                <span>{categories.find(c => c.id === newActivity.category)?.title}</span>
                                            </div>
                                            <ChevronDown size={18} className={`text-slate-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isCategoryDropdownOpen && (
                                            <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10 animate-fade-in">
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => {
                                                            setNewActivity({ ...newActivity, category: cat.id });
                                                            setIsCategoryDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${newActivity.category === cat.id ? 'bg-blue-50' : ''
                                                            }`}
                                                    >
                                                        <div className={`size-8 rounded-xl ${cat.color} flex items-center justify-center`}>
                                                            <cat.icon size={14} className="text-white" />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700 flex-1 text-left">{cat.title}</span>
                                                        {newActivity.category === cat.id && (
                                                            <Check size={16} className="text-blue-500" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Nama kategori baru"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                        />
                                        <div className="flex gap-3">
                                            {/* Category Icon Picker */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowCatIconPicker(!showCatIconPicker)}
                                                    className={`size-12 rounded-xl ${AVAILABLE_COLORS.find(c => c.id === newCategoryColor)?.bg || 'bg-blue-500'} flex items-center justify-center text-white transition-all`}
                                                >
                                                    {(() => {
                                                        const IconComp = getIconById(newCategoryIconId);
                                                        return <IconComp size={20} />;
                                                    })()}
                                                </button>
                                                {showCatIconPicker && (
                                                    <div className="absolute top-14 left-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-20 w-64 max-h-48 overflow-y-auto animate-fade-in">
                                                        <p className="text-[10px] font-bold text-slate-400 mb-2">PILIH IKON</p>
                                                        <div className="grid grid-cols-6 gap-1">
                                                            {ALL_ICONS.map(iconItem => (
                                                                <button
                                                                    key={iconItem.id}
                                                                    onClick={() => {
                                                                        setNewCategoryIconId(iconItem.id);
                                                                        setShowCatIconPicker(false);
                                                                    }}
                                                                    className={`size-9 rounded-lg flex items-center justify-center transition-all ${newCategoryIconId === iconItem.id
                                                                        ? 'bg-blue-100 text-blue-600 scale-110'
                                                                        : 'hover:bg-slate-100 text-slate-500'
                                                                        }`}
                                                                >
                                                                    <iconItem.icon size={16} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Category Color Picker */}
                                            <div className="flex-1 flex flex-wrap gap-1.5">
                                                {AVAILABLE_COLORS.slice(0, 8).map(color => (
                                                    <button
                                                        key={color.id}
                                                        onClick={() => setNewCategoryColor(color.id)}
                                                        className={`size-8 rounded-lg ${color.bg} flex items-center justify-center transition-all ${newCategoryColor === color.id
                                                            ? 'ring-2 ring-offset-1 ring-blue-500 scale-110'
                                                            : 'opacity-60 hover:opacity-100'
                                                            }`}
                                                    >
                                                        {newCategoryColor === color.id && <Check size={12} className="text-white" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">NAMA KEGIATAN</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Puasa Arafah"
                                    value={newActivity.label}
                                    onChange={(e) => setNewActivity({ ...newActivity, label: e.target.value })}
                                    className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">IKON & WARNA</label>
                                <div className="flex gap-3">
                                    {/* Activity Icon Picker */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowIconPicker(!showIconPicker)}
                                            className={`size-12 rounded-xl ${AVAILABLE_COLORS.find(c => c.id === newActivity.colorId)?.bg || 'bg-blue-500'} flex items-center justify-center text-white transition-all shadow-md`}
                                        >
                                            {(() => {
                                                const IconComp = getIconById(newActivity.iconId);
                                                return <IconComp size={20} />;
                                            })()}
                                        </button>
                                        {showIconPicker && (
                                            <div className="absolute top-14 left-0 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-20 w-72 max-h-56 overflow-y-auto animate-fade-in">
                                                <p className="text-[10px] font-bold text-slate-400 mb-2">PILIH IKON</p>
                                                {Object.entries(AVAILABLE_ICONS).map(([groupName, icons]) => (
                                                    <div key={groupName} className="mb-2">
                                                        <p className="text-[9px] font-semibold text-slate-300 uppercase mb-1">{groupName}</p>
                                                        <div className="grid grid-cols-6 gap-1">
                                                            {icons.map(iconItem => (
                                                                <button
                                                                    key={iconItem.id}
                                                                    onClick={() => {
                                                                        setNewActivity({ ...newActivity, iconId: iconItem.id });
                                                                        setShowIconPicker(false);
                                                                    }}
                                                                    title={iconItem.label}
                                                                    className={`size-9 rounded-lg flex items-center justify-center transition-all ${newActivity.iconId === iconItem.id
                                                                        ? 'bg-blue-100 text-blue-600 scale-110'
                                                                        : 'hover:bg-slate-100 text-slate-500'
                                                                        }`}
                                                                >
                                                                    <iconItem.icon size={16} />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {/* Activity Color Picker (Read Only) */}
                                    <div className="flex-1">
                                        <div className="w-full h-12 px-3 bg-slate-50 rounded-2xl flex items-center gap-3">
                                            <div className={`size-6 rounded-lg ${AVAILABLE_COLORS.find(c => c.id === newActivity.colorId)?.bg || 'bg-slate-300'} flex items-center justify-center shadow-sm`}></div>
                                            <span className="text-xs font-bold text-slate-500">
                                                {AVAILABLE_COLORS.find(c => c.id === newActivity.colorId)?.name || 'Warna'}
                                                <span className="ml-1 text-[10px] font-normal text-slate-400">(Auto)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">TIPE INPUT</label>
                                <select
                                    value={newActivity.inputType}
                                    onChange={(e) => setNewActivity({ ...newActivity, inputType: e.target.value })}
                                    className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                                >
                                    <option value="checkbox">Checkbox (Centang)</option>
                                    <option value="text">Form Input (Isian)</option>
                                </select>
                            </div>

                            {newActivity.inputType === 'text' && (
                                <div className="animate-fade-in">
                                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">LABEL FORM</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Baca buku apa hari ini?"
                                        value={newActivity.placeholder}
                                        onChange={(e) => setNewActivity({ ...newActivity, placeholder: e.target.value })}
                                        className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1.5 ml-1">
                                        Teks ini akan muncul sebagai pertanyaan di halaman input siswa.
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">BOBOT POIN</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={newActivity.points}
                                        onChange={(e) => setNewActivity({ ...newActivity, points: e.target.value })}
                                        className="w-full h-12 pl-4 pr-12 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded">PTS</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddActivity}
                                className="w-full h-14 mt-4 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-2 text-sm font-black active:scale-95 transition-all"
                            >
                                <Check size={18} />
                                <span>SIMPAN KEGIATAN</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Edit Kategori */}
            {
                isEditCategoryModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl animate-pop-up">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black text-slate-800">Edit Kategori</h3>
                                <button
                                    onClick={() => setIsEditCategoryModalOpen(false)}
                                    className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">NAMA KATEGORI</label>
                                    <input
                                        type="text"
                                        value={editingCategoryData.title}
                                        onChange={(e) => setEditingCategoryData({ ...editingCategoryData, title: e.target.value })}
                                        className="w-full h-12 px-4 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                                        placeholder="Nama kategori"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">WARNA</label>
                                        <div className="w-full h-12 px-3 bg-slate-50 rounded-2xl flex items-center gap-3">
                                            <div className={`size-6 rounded-lg ${AVAILABLE_COLORS.find(c => c.id === editingCategoryData.colorId)?.bg || 'bg-slate-300'} flex items-center justify-center shadow-sm`}></div>
                                            <span className="text-xs font-bold text-slate-600">
                                                {AVAILABLE_COLORS.find(c => c.id === editingCategoryData.colorId)?.name}
                                                <span className="ml-1 text-[10px] font-normal text-slate-400">(Auto)</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">IKON</label>
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowCatIconPicker(!showCatIconPicker)}
                                                className="w-full h-12 px-3 bg-slate-50 rounded-2xl flex items-center gap-3 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-blue-100"
                                            >
                                                <div className="size-6 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
                                                    {(() => {
                                                        const Icon = getIconById(editingCategoryData.iconId);
                                                        return Icon ? <Icon size={14} /> : <Star size={14} />;
                                                    })()}
                                                </div>
                                                <span className="text-xs font-bold text-slate-600">Ikon</span>
                                            </button>

                                            {showCatIconPicker && (
                                                <div className="absolute top-14 right-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-20 h-48 overflow-y-auto custom-scrollbar animate-fade-in grid grid-cols-5 gap-2">
                                                    {ALL_ICONS.map(icon => (
                                                        <button
                                                            key={icon.id}
                                                            onClick={() => {
                                                                setEditingCategoryData({ ...editingCategoryData, iconId: icon.id });
                                                                setShowCatIconPicker(false);
                                                            }}
                                                            className={`size-9 rounded-xl flex items-center justify-center transition-all ${editingCategoryData.iconId === icon.id ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                                        >
                                                            <icon.icon size={16} />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpdateCategory}
                                    className="w-full h-14 mt-4 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-2 text-sm font-black active:scale-95 transition-all"
                                >
                                    <Check size={18} />
                                    <span>SIMPAN PERUBAHAN</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={closeConfirm}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
            />
        </div >
    );
};

export default WorshipPointsMobile;
