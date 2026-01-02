import React, { useState, useEffect } from 'react';
import { Search, Plus, UserCheck, ShieldCheck, X, Users, BadgeCheck, ChevronDown, ChevronUp, MapPin, Phone, Calendar, School, Camera, Pencil, Trash2, ZoomIn, ZoomOut, Move, RotateCcw, Check } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';

const TeachersMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [editingTeacher, setEditingTeacher] = useState(null); // For edit mode

    // Form State
    const [newTeacher, setNewTeacher] = useState({ niy: '', name: '', email: '', whatsapp: '', role: 'Guru Kelas' });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isCompressing, setIsCompressing] = useState(false);

    // Cropper State
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [cropImageSrc, setCropImageSrc] = useState(null);
    const [cropScale, setCropScale] = useState(1);
    const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Compress image using Canvas API
    const compressImage = (file, maxSize = 300, quality = 0.7) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (square crop)
                    let size = Math.min(img.width, img.height);
                    let sx = (img.width - size) / 2;
                    let sy = (img.height - size) / 2;

                    canvas.width = maxSize;
                    canvas.height = maxSize;

                    // Draw cropped & resized image
                    ctx.drawImage(img, sx, sy, size, size, 0, 0, maxSize, maxSize);

                    // Convert to WebP/JPEG with compression
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle photo upload - Intercept for cropping
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCropImageSrc(reader.result);
                setIsCropModalOpen(true);
                setCropScale(1);
                setCropPosition({ x: 0, y: 0 });
            };
            reader.readAsDataURL(file);
            // Reset input
            e.target.value = null;
        }
    };

    const handleCropComplete = async () => {
        if (!cropImageSrc) return;

        setIsCompressing(true);
        const img = new Image();
        img.src = cropImageSrc;

        await new Promise(resolve => { img.onload = resolve; });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 300; // Final size

        canvas.width = size;
        canvas.height = size;

        // Fill white background (optional, for safety)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // Calculate source rectangle based on crop view
        const scale = cropScale;
        const x = cropPosition.x;
        const y = cropPosition.y;

        // The crop view is circular, centered. 
        // We need to map the view's center crop to the image.
        // Viewport is 280px, Canvas is 300px.
        const ratio = size / 280;

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.translate(x * ratio, y * ratio);
        ctx.scale(scale, scale);

        // Draw image centered at origin
        // We need to maintain aspect ratio relative to the square canvas
        const aspect = img.width / img.height;
        let drawWidth, drawHeight;

        if (aspect > 1) {
            drawHeight = size;
            drawWidth = size * aspect;
        } else {
            drawWidth = size;
            drawHeight = size / aspect;
        }

        ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        const finalBase64 = canvas.toDataURL('image/jpeg', 0.8);

        // Debug compression size
        const originalSize = Math.round((cropImageSrc.length * 3) / 4 / 1024);
        const compressedSize = Math.round((finalBase64.length * 3) / 4 / 1024);
        console.log(`📸 Compression Result: ${originalSize}KB -> ${compressedSize}KB`);

        setAvatarPreview(finalBase64);
        setNewTeacher(prev => ({ ...prev, avatar: finalBase64 }));
        setIsCropModalOpen(false);
        setIsCompressing(false);
    };

    // Pan Handlers
    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX - cropPosition.x, y: clientY - cropPosition.y });
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent page scroll
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setCropPosition({
            x: clientX - dragStart.x,
            y: clientY - dragStart.y
        });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };



    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Helper to format phone number
    const formatPhoneNumber = (number) => {
        if (!number) return '-';
        const cleaned = number.toString().replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3,4})(\d{3,4})(\d{2,6})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        // Fallback: add dashes every 4 digits for any length
        if (cleaned.length >= 4) {
            return cleaned.replace(/(\d{4})(?=\d)/g, '$1-');
        }
        return number;
    };

    // Load data from localStorage on mount
    useEffect(() => {
        // Load teachers
        const savedTeachers = localStorage.getItem('teachers_data');
        if (savedTeachers) {
            try {
                const parsed = JSON.parse(savedTeachers);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setTeachers(parsed);
                }
            } catch (e) {
                console.error('Failed to load teachers:', e);
            }
        }

        // Load classes for lookup
        const savedClasses = localStorage.getItem('classes_data');
        if (savedClasses) {
            try {
                const parsed = JSON.parse(savedClasses);
                if (Array.isArray(parsed)) {
                    setClasses(parsed);
                }
            } catch (e) {
                console.error('Failed to load classes:', e);
            }
        }

        setIsInitialLoad(false);
    }, []);

    // Save teachers to localStorage on changes
    useEffect(() => {
        if (isInitialLoad) return;
        localStorage.setItem('teachers_data', JSON.stringify(teachers));
    }, [teachers, isInitialLoad]);

    // Listen for storage changes from other components (e.g., StudentsMobile)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'classes_data') {
                try {
                    const updatedClasses = JSON.parse(e.newValue);
                    if (Array.isArray(updatedClasses)) {
                        setClasses(updatedClasses);
                    }
                } catch (err) {
                    console.error('Failed to parse classes from storage event:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.nip.includes(searchQuery)
    );

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleEditTeacher = (teacher) => {
        setEditingTeacher(teacher);
        setNewTeacher({
            niy: teacher.nip,
            name: teacher.name,
            email: teacher.email,
            whatsapp: teacher.phone,
            role: teacher.role
        });
        setAvatarPreview(teacher.avatar);
        setIsModalOpen(true);
    };

    // handleDeleteTeacher removed - now using openDeleteModal + handleConfirmDelete pattern

    const handleAddTeacher = (e) => {
        e.preventDefault();
        // Validate all required fields
        if (!newTeacher.name || !newTeacher.niy || !newTeacher.email || !newTeacher.whatsapp) {
            alert('Mohon lengkapi semua kolom yang wajib diisi');
            return;
        }

        // Check for duplicate NIY
        const isDuplicateNIY = teachers.some(t =>
            t.nip === newTeacher.niy && (!editingTeacher || t.id !== editingTeacher.id)
        );
        if (isDuplicateNIY) {
            alert('NIY sudah digunakan oleh guru lain. Mohon gunakan NIY yang berbeda.');
            return;
        }

        if (editingTeacher) {
            // Edit mode - update existing teacher
            setTeachers(prev => prev.map(t =>
                t.id === editingTeacher.id
                    ? {
                        ...t,
                        nip: newTeacher.niy,
                        name: newTeacher.name,
                        role: newTeacher.role,
                        avatar: avatarPreview || t.avatar,
                        email: newTeacher.email,
                        phone: newTeacher.whatsapp,
                    }
                    : t
            ));

            // Update teacher name in classes_data
            try {
                const savedClasses = localStorage.getItem('classes_data');
                if (savedClasses) {
                    let classesData = JSON.parse(savedClasses);
                    let classUpdated = false;

                    classesData = classesData.map(cls => {
                        let updated = false;

                        // Update Wali Kelas assignment
                        if (cls.teacherId === editingTeacher.id) {
                            if (newTeacher.role === 'Wali Kelas') {
                                cls.teacher = newTeacher.name;
                            } else {
                                cls.teacher = 'Belum ada wali';
                                cls.teacherId = null;
                            }
                            updated = true;
                        }

                        // Update Guru Kelas assignment
                        if (cls.guruKelasId === editingTeacher.id) {
                            if (newTeacher.role === 'Guru Kelas') {
                                cls.guruKelas = newTeacher.name;
                            } else {
                                cls.guruKelas = '';
                                cls.guruKelasId = null;
                            }
                            updated = true;
                        }
                        if (updated) classUpdated = true;
                        return cls;
                    });

                    if (classUpdated) {
                        localStorage.setItem('classes_data', JSON.stringify(classesData));
                        window.dispatchEvent(new Event('storage')); // Notify other tabs/components
                    }
                }
            } catch (error) {
                console.error('Error updating teacher name in classes:', error);
            }

            setEditingTeacher(null);
        } else {
            // Add mode - create new teacher
            const newId = Date.now();
            const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-cyan-500', 'bg-teal-500', 'bg-sky-600'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setTeachers([
                {
                    id: newId,
                    nip: newTeacher.niy,
                    name: newTeacher.name,
                    role: newTeacher.role,
                    class: '-',
                    color: randomColor,
                    avatar: avatarPreview,
                    email: newTeacher.email,
                    phone: newTeacher.whatsapp,
                },
                ...teachers
            ]);
        }

        setNewTeacher({ niy: '', name: '', email: '', whatsapp: '', role: 'Guru Kelas' });
        setAvatarPreview(null);
        setIsModalOpen(false);
    };

    // Modal State
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteConfig, setDeleteConfig] = useState({ type: null, id: null, title: '', message: '' });

    const openDeleteModal = (type, id = null, name = '') => {
        if (type === 'all') {
            setDeleteConfig({
                type: 'all',
                title: 'Hapus Semua Data?',
                message: 'Semua data guru akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.'
            });
        } else {
            setDeleteConfig({
                type: 'single',
                id,
                title: 'Hapus Guru?',
                message: `Yakin ingin menghapus data ${name}?`
            });
        }
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (deleteConfig.type === 'all') {
            setTeachers([]);
            localStorage.removeItem('teachers_data');

            // Also reset all teacher references in classes
            try {
                const savedClasses = localStorage.getItem('classes_data');
                if (savedClasses) {
                    const classesData = JSON.parse(savedClasses);
                    const updatedClasses = classesData.map(cls => ({
                        ...cls,
                        teacher: 'Belum ada wali',
                        teacherId: null,
                        guruKelas: '',
                        guruKelasId: null
                    }));
                    localStorage.setItem('classes_data', JSON.stringify(updatedClasses));
                }
            } catch (e) {
                console.error('Failed to update classes after deleting all teachers:', e);
            }
        } else if (deleteConfig.type === 'single') {
            const deletedId = deleteConfig.id;
            setTeachers(prev => prev.filter(t => t.id !== deletedId));
            setExpandedId(null);

            // Update classes_data to remove references to deleted teacher
            try {
                const savedClasses = localStorage.getItem('classes_data');
                if (savedClasses) {
                    let classesData = JSON.parse(savedClasses);
                    let updated = false;

                    classesData = classesData.map(cls => {
                        let changes = {};
                        if (cls.teacherId === deletedId) {
                            changes = { teacher: 'Belum ada wali', teacherId: null };
                            updated = true;
                        }
                        if (cls.guruKelasId === deletedId) {
                            changes = { ...changes, guruKelas: '', guruKelasId: null };
                            updated = true;
                        }
                        return Object.keys(changes).length > 0 ? { ...cls, ...changes } : cls;
                    });

                    if (updated) {
                        localStorage.setItem('classes_data', JSON.stringify(classesData));
                        setClasses(classesData); // Update local state too
                    }
                }
            } catch (e) {
                console.error('Failed to update classes after deleting teacher:', e);
            }
        }
        setShowConfirmModal(false);
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-slate-50 to-indigo-50/50 pb-32 scrollbar-hide font-sans">
            {/* Header */}
            <div className="bg-gradient-to-b from-blue-100/95 via-blue-50/95 to-white/95 backdrop-blur-xl z-30 border-b border-slate-200 px-5 pt-4 pb-1">
                <AdminHeader
                    title="Data Pengajar"
                    subtitle={`Total: ${teachers.length} Guru`}
                />
            </div>

            <div className="p-5 max-w-lg mx-auto">

                {/* Single Card Container with Integrated Header */}
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">

                    {/* Gradient Header */}
                    <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative">
                            <div className="flex items-center justify-between mb-1">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Data Guru</h3>
                                    <p className="text-blue-200 text-[11px] font-normal">Kelola data pengajar sekolah</p>
                                </div>
                                <div className="flex gap-2">
                                    {teachers.length > 0 && (
                                        <button
                                            onClick={() => openDeleteModal('all')}
                                            className="size-9 rounded-xl bg-white/20 text-white flex items-center justify-center active:scale-95 transition-all shadow-lg hover:bg-white/30 backdrop-blur-sm"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="size-9 rounded-xl bg-white text-blue-600 flex items-center justify-center active:scale-95 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <Plus size={20} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 relative group">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Cari nama atau NIP..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-9 pl-9 pr-3 bg-white rounded-lg text-[12px] font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal focus:ring-2 focus:ring-blue-400/30 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {filteredTeachers.map((teacher, index) => {
                        const isExpanded = expandedId === teacher.id;
                        return (
                            <div key={teacher.id} className={`group transition-all duration-300 ${index !== filteredTeachers.length - 1 ? 'border-b border-slate-100' : ''}`}>

                                {/* Main Row - Clickable */}
                                <div
                                    onClick={() => toggleExpand(teacher.id)}
                                    className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors duration-200 ${isExpanded ? 'bg-blue-50/30' : 'bg-white'}`}
                                >
                                    {/* Avatar - Photo Based */}
                                    <div className="size-11 rounded-full ring-2 ring-blue-500/80 ring-offset-2 ring-offset-blue-50 shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                                        {teacher.avatar ? (
                                            <img
                                                src={teacher.avatar}
                                                alt={teacher.name}
                                                className="w-full h-full rounded-full object-cover"
                                                style={{ objectPosition: 'top' }}
                                            />
                                        ) : (
                                            <div className={`w-full h-full ${teacher.color} flex items-center justify-center`}>
                                                <Users size={18} className="text-white opacity-95" strokeWidth={2} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-[14px] font-medium text-slate-600 leading-snug group-hover:text-blue-600 transition-colors">{teacher.name}</h3>
                                            {isExpanded ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-slate-300 stroke-[3]" />}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[11px] font-semibold tracking-tight px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                {teacher.role}
                                            </span>
                                            <span className={`text-[11px] font-semibold tracking-tight px-2.5 py-1 rounded-full ${(() => {
                                                const assignedClass = classes.find(c => c.teacherId === teacher.id || c.guruKelasId === teacher.id);
                                                const level = assignedClass ? assignedClass.level : 'other';

                                                const colors = {
                                                    '1': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-200',
                                                    '2': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-200',
                                                    '3': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-200',
                                                    '4': 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-200',
                                                    '5': 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm shadow-violet-200',
                                                    '6': 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-sm shadow-cyan-200',
                                                    'other': 'bg-slate-100 text-slate-500'
                                                };
                                                return colors[level] || colors['other'];
                                            })()}`}>
                                                {(() => {
                                                    const assignedClass = classes.find(c => c.teacherId === teacher.id || c.guruKelasId === teacher.id);
                                                    return assignedClass ? assignedClass.name : 'Belum ditugaskan';
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden bg-slate-50/50">
                                        <div className="p-4 pt-0 space-y-3">
                                            <div className="h-px w-full bg-slate-100 mb-3"></div>

                                            {/* Details Grid */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <ShieldCheck size={14} className="text-blue-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Jabatan</span>
                                                    </div>
                                                    <p className="text-[12px] font-bold text-slate-700">{teacher.role}</p>
                                                </div>
                                                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <School size={14} className="text-indigo-500" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Kelas</span>
                                                    </div>
                                                    <p className={`text-[12px] font-bold ${classes.some(c => c.teacherId === teacher.id || c.guruKelasId === teacher.id) ? 'text-blue-600' : 'text-amber-500'}`}>
                                                        {(() => {
                                                            const assignedClass = classes.find(c => c.teacherId === teacher.id || c.guruKelasId === teacher.id);
                                                            return assignedClass ? assignedClass.name : 'Belum ditugaskan';
                                                        })()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400">
                                                        <BadgeCheck size={14} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">NIY</p>
                                                        <p className="text-[12px] font-bold text-slate-700">{teacher.nip}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-400">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Email</p>
                                                        <p className="text-[12px] font-bold text-slate-700">{teacher.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                                        <Phone size={14} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Whatsapp</p>
                                                        <p className="text-[12px] font-bold text-slate-700">{formatPhoneNumber(teacher.phone)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={() => handleEditTeacher(teacher)}
                                                    className="flex-1 h-8 rounded-lg bg-indigo-500 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-600 active:scale-95 transition-all"
                                                >
                                                    <Pencil size={12} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal('single', teacher.id, teacher.name)}
                                                    className="flex-1 h-8 rounded-lg bg-slate-100 text-red-500 text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-red-50 active:scale-95 transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredTeachers.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center justify-center opacity-60">
                            <div className="size-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                                <UserCheck size={40} />
                            </div>
                            <p className="text-slate-500 font-bold text-sm">Tidak ditemukan</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Add/Edit Teacher */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => { setIsModalOpen(false); setEditingTeacher(null); setAvatarPreview(null); setNewTeacher({ niy: '', name: '', email: '', whatsapp: '', role: 'Guru Kelas' }); }}></div>
                    <div className="relative w-full max-w-[320px] bg-white rounded-[1.5rem] shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-300 scale-100 max-h-[85vh] overflow-y-auto scrollbar-hide">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg font-black text-slate-800 tracking-tight">{editingTeacher ? 'Edit Guru' : 'Input Guru'}</h3>
                                <p className="text-xs text-slate-400 font-medium leading-none mt-1">{editingTeacher ? 'Perbarui data pengajar.' : 'Lengkapi data pengajar baru.'}</p>
                            </div>
                            <button onClick={() => { setIsModalOpen(false); setEditingTeacher(null); setAvatarPreview(null); setNewTeacher({ niy: '', name: '', email: '', whatsapp: '', role: 'Guru Kelas' }); }} className="size-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shadow-sm border border-slate-100">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleAddTeacher} className="space-y-3 pb-10">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center mb-4">
                                <div className="relative">
                                    <div className="size-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                                        {isCompressing ? (
                                            <div className="animate-spin size-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                        ) : avatarPreview ? (
                                            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Users size={32} className="text-slate-300" />
                                        )}
                                    </div>
                                    <label className="absolute -bottom-1 -right-1 size-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
                                        <Camera size={14} className="text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">Maks 300x300px • Auto compress</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">NIY (Nomor Induk)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Y-2024..."
                                        value={newTeacher.niy}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, niy: e.target.value })}
                                        className="w-full h-10 px-4 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-0 rounded-xl text-slate-800 font-bold text-[13px] placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/10 transition-all font-mono tracking-wide shadow-inner"
                                        required
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <BadgeCheck className="size-4 text-indigo-200" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    placeholder="Nama dan gelar..."
                                    value={newTeacher.name}
                                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                    className="w-full h-10 px-4 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-0 rounded-xl text-slate-800 font-bold text-[13px] placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-inner"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email <span className="text-blue-500">(Login)</span></label>
                                    <input
                                        type="email"
                                        placeholder="email@sekolah.id"
                                        value={newTeacher.email}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                                        className="w-full h-10 px-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-0 rounded-xl text-slate-800 font-bold text-[12px] placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-inner"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Whatsapp</label>
                                    <input
                                        type="tel"
                                        placeholder="08xx-xxxx-xxxx"
                                        value={newTeacher.whatsapp}
                                        onChange={(e) => setNewTeacher({ ...newTeacher, whatsapp: e.target.value })}
                                        className="w-full h-10 px-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-0 rounded-xl text-slate-800 font-bold text-[12px] placeholder:font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Jabatan Fungsional</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                        className="w-full h-10 px-4 bg-slate-50 hover:bg-slate-50/80 border-0 rounded-xl text-slate-800 font-bold text-[13px] transition-all shadow-inner flex items-center justify-between group focus:ring-2 focus:ring-indigo-500/10 text-left"
                                    >
                                        <span>{newTeacher.role}</span>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={3} />
                                    </button>

                                    {isRoleDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {['Guru Kelas', 'Wali Kelas'].map((role) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => {
                                                        setNewTeacher({ ...newTeacher, role: role });
                                                        setIsRoleDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${newTeacher.role === role ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <Plus size={18} strokeWidth={3} className="text-indigo-200" />
                                    <span className="text-sm">Simpan Data</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-center">
                            <div className="size-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-50">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{deleteConfig.title}</h3>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{deleteConfig.message}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Crop Modal */}
            {isCropModalOpen && cropImageSrc && (
                <div className="fixed inset-0 z-[120] bg-black/90 flex flex-col pt-10 pb-5 px-5 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-6 text-white">
                        <h3 className="text-lg font-bold">Sesuaikan Foto</h3>
                        <button onClick={() => setIsCropModalOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Circular Mask Viewport */}
                        <div
                            className="relative size-[280px] rounded-full border-[4px] border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] z-10 overflow-hidden cursor-move touch-none"
                            onMouseDown={handlePointerDown}
                            onMouseMove={handlePointerMove}
                            onMouseUp={handlePointerUp}
                            onMouseLeave={handlePointerUp}
                            onTouchStart={handlePointerDown}
                            onTouchMove={handlePointerMove}
                            onTouchEnd={handlePointerUp}
                        >
                            <img
                                src={cropImageSrc}
                                alt="Crop Target"
                                draggable={false}
                                className="absolute max-w-none origin-center transition-transform duration-75 ease-out select-none"
                                style={{
                                    transform: `translate(-50%, -50%) translate(${cropPosition.x}px, ${cropPosition.y}px) scale(${cropScale})`,
                                    left: '50%',
                                    top: '50%',
                                    // Use auto dimensions to respect aspect ratio
                                    height: 'auto',
                                    width: '100%',
                                    minWidth: '280px', // Ensure it covers the circle initially
                                    minHeight: '280px'
                                }}
                            />
                        </div>
                        <p className="absolute bottom-5 text-white/50 text-xs font-medium z-20 pointer-events-none">
                            Geser & Cubit untuk atur posisi
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="w-full max-w-[320px] mx-auto space-y-6 pt-5">
                        <div className="flex items-center gap-4 px-2">
                            <ZoomOut size={20} className="text-white/60" />
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={cropScale}
                                onChange={(e) => setCropScale(parseFloat(e.target.value))}
                                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                            <ZoomIn size={20} className="text-white/60" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setIsCropModalOpen(false)}
                                className="h-12 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-600 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCropComplete}
                                className="h-12 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Check size={18} />
                                Gunakan Foto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default TeachersMobile;
