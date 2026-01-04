import { FaMosque, FaStar, FaBookOpen, FaHeart, FaCloudSun, FaSmileWink, FaMagic, FaHandHoldingHeart, FaCommentSlash, FaPray, FaHandsHelping, FaSeedling, FaLeaf, FaGraduationCap, FaPencilAlt, FaUsers, FaHome, FaChild, FaRunning, FaMoon, FaWater, FaHandPaper, FaBroom, FaUtensils, FaBed, FaClock, FaCalendarCheck, FaClipboardCheck, FaThumbsUp, FaHandshake } from 'react-icons/fa';
import { ConfigRepositorySync } from '../services/storage/repositories/configRepository.js';

// Format text to proper Indonesian EYD (title case with exceptions)
const LOWERCASE_WORDS = ['dan', 'atau', 'di', 'ke', 'dari', 'yang', 'untuk', 'dengan', 'pada', 'oleh', 'sebagai', 'dalam', 'atas', 'bagi', 'tentang', 'tanpa', 'antara', 'sampai', 'hingga', 'serta', 'maupun', 'namun', 'tetapi', 'melainkan', 'sedangkan', 'karena', 'sebab', 'jika', 'bila', 'apabila', 'kalau', 'meskipun', 'walaupun', 'walau', 'supaya', 'agar', 'ketika', 'saat', 'waktu'];

export const formatToEYD = (text) => {
    if (!text) return '';

    // Trim and normalize spaces
    const cleaned = text.trim().replace(/\s+/g, ' ');

    // Split into words
    const words = cleaned.split(' ');

    // Format each word
    const formatted = words.map((word, index) => {
        const lower = word.toLowerCase();

        // First word always capitalized
        if (index === 0) {
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }

        // Check if it's a word that should stay lowercase
        if (LOWERCASE_WORDS.includes(lower)) {
            return lower;
        }

        // Capitalize first letter
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return formatted.join(' ');
};
import { BiSolidDonateHeart } from 'react-icons/bi';
import { MdOutlineWbTwilight, MdLightMode, MdSunny, MdNightsStay, MdBedtime, MdNoFood, MdFamilyRestroom, MdCleanHands, MdVolunteerActivism, MdSelfImprovement, MdSchool, MdEmojiPeople, MdAccessTime, MdHealthAndSafety } from 'react-icons/md';
import { IoSparkles, IoHeart, IoBook, IoPeople, IoHappy, IoLeaf, IoWater, IoTime, IoCheckmarkCircle, IoRibbon } from 'react-icons/io5';

// Available icons for selection (grouped by category)
export const AVAILABLE_ICONS = {
    ibadah: [
        { id: 'mosque', icon: FaMosque, label: 'Masjid' },
        { id: 'pray', icon: FaPray, label: 'Berdoa' },
        { id: 'star', icon: FaStar, label: 'Bintang' },
        { id: 'moon', icon: FaMoon, label: 'Bulan' },
        { id: 'twilight', icon: MdOutlineWbTwilight, label: 'Subuh' },
        { id: 'sun_light', icon: MdLightMode, label: 'Siang' },
        { id: 'sunny', icon: MdSunny, label: 'Terik' },
        { id: 'night', icon: MdNightsStay, label: 'Malam' },
        { id: 'bedtime', icon: MdBedtime, label: 'Tidur' },
        { id: 'cloud_sun', icon: FaCloudSun, label: 'Duha' },
        { id: 'no_food', icon: MdNoFood, label: 'Puasa' },
        { id: 'self_improve', icon: MdSelfImprovement, label: 'Meditasi' },
    ],
    literasi: [
        { id: 'book', icon: FaBookOpen, label: 'Buku' },
        { id: 'read', icon: IoBook, label: 'Membaca' },
        { id: 'pencil', icon: FaPencilAlt, label: 'Menulis' },
        { id: 'graduate', icon: FaGraduationCap, label: 'Belajar' },
        { id: 'school', icon: MdSchool, label: 'Sekolah' },
    ],
    kebaikan: [
        { id: 'heart', icon: FaHeart, label: 'Hati' },
        { id: 'heart_io', icon: IoHeart, label: 'Kasih' },
        { id: 'donate', icon: BiSolidDonateHeart, label: 'Donasi' },
        { id: 'volunteer', icon: MdVolunteerActivism, label: 'Sukarela' },
        { id: 'hands_help', icon: FaHandsHelping, label: 'Membantu' },
        { id: 'hand_heart', icon: FaHandHoldingHeart, label: 'Peduli' },
        { id: 'handshake', icon: FaHandshake, label: 'Jabat Tangan' },
        { id: 'thumbs_up', icon: FaThumbsUp, label: 'Jempol' },
        { id: 'family', icon: MdFamilyRestroom, label: 'Keluarga' },
        { id: 'home', icon: FaHome, label: 'Rumah' },
        { id: 'people', icon: IoPeople, label: 'Orang' },
        { id: 'users', icon: FaUsers, label: 'Grup' },
    ],
    karakter: [
        { id: 'smile', icon: FaSmileWink, label: 'Senyum' },
        { id: 'happy', icon: IoHappy, label: 'Bahagia' },
        { id: 'magic', icon: FaMagic, label: 'Ajaib' },
        { id: 'sparkle', icon: IoSparkles, label: 'Cemerlang' },
        { id: 'no_talk', icon: FaCommentSlash, label: 'Diam' },
        { id: 'clean_hands', icon: MdCleanHands, label: 'Bersih' },
        { id: 'ribbon', icon: IoRibbon, label: 'Penghargaan' },
        { id: 'checkmark', icon: IoCheckmarkCircle, label: 'Selesai' },
        { id: 'clipboard', icon: FaClipboardCheck, label: 'Tugas' },
        { id: 'calendar', icon: FaCalendarCheck, label: 'Jadwal' },
    ],
    aktivitas: [
        { id: 'child', icon: FaChild, label: 'Anak' },
        { id: 'running', icon: FaRunning, label: 'Lari' },
        { id: 'emoji', icon: MdEmojiPeople, label: 'Aktivitas' },
        { id: 'broom', icon: FaBroom, label: 'Bersih-bersih' },
        { id: 'utensils', icon: FaUtensils, label: 'Makan' },
        { id: 'bed', icon: FaBed, label: 'Istirahat' },
        { id: 'clock', icon: FaClock, label: 'Waktu' },
        { id: 'time', icon: IoTime, label: 'Jam' },
        { id: 'health', icon: MdHealthAndSafety, label: 'Kesehatan' },
        { id: 'seedling', icon: FaSeedling, label: 'Tumbuh' },
        { id: 'leaf', icon: FaLeaf, label: 'Daun' },
        { id: 'water', icon: FaWater, label: 'Air' },
    ],
};

// All available icons as flat array
export const ALL_ICONS = Object.values(AVAILABLE_ICONS).flat();

// Available colors with their class names
export const AVAILABLE_COLORS = [
    { id: 'blue', bg: 'bg-blue-500', name: 'Biru', hex: '#3b82f6' },
    { id: 'amber', bg: 'bg-amber-500', name: 'Kuning', hex: '#f59e0b' },
    { id: 'emerald', bg: 'bg-emerald-500', name: 'Hijau', hex: '#10b981' },
    { id: 'rose', bg: 'bg-rose-500', name: 'Merah Muda', hex: '#f43f5e' },
    { id: 'purple', bg: 'bg-purple-500', name: 'Ungu', hex: '#a855f7' },
    { id: 'indigo', bg: 'bg-indigo-500', name: 'Nila', hex: '#6366f1' },
    { id: 'cyan', bg: 'bg-cyan-500', name: 'Biru Muda', hex: '#06b6d4' },
    { id: 'teal', bg: 'bg-teal-500', name: 'Teal', hex: '#14b8a6' },
    { id: 'orange', bg: 'bg-orange-500', name: 'Oranye', hex: '#f97316' },
    { id: 'pink', bg: 'bg-pink-500', name: 'Pink', hex: '#ec4899' },
    { id: 'lime', bg: 'bg-lime-500', name: 'Hijau Muda', hex: '#84cc16' },
    { id: 'sky', bg: 'bg-sky-500', name: 'Langit', hex: '#0ea5e9' },
    { id: 'violet', bg: 'bg-violet-500', name: 'Violet', hex: '#8b5cf6' },
    { id: 'fuchsia', bg: 'bg-fuchsia-500', name: 'Fuchsia', hex: '#d946ef' },
    { id: 'red', bg: 'bg-red-500', name: 'Merah', hex: '#ef4444' },
    { id: 'slate', bg: 'bg-slate-500', name: 'Abu-abu', hex: '#64748b' },
];

// Get icon component by id
export const getIconById = (iconId) => {
    const found = ALL_ICONS.find(i => i.id === iconId);
    return found ? found.icon : FaStar;
};

// Get color config by id
export const getColorById = (colorId) => {
    return AVAILABLE_COLORS.find(c => c.id === colorId) || AVAILABLE_COLORS[0];
};

// Default categories configuration (source of truth for structure)
export const DEFAULT_CATEGORIES = [
    {
        id: 'wajib',
        title: 'Salat Wajib',
        icon: FaMosque,
        color: 'bg-blue-500',
        items: [
            { id: 'subuh', label: 'Salat Subuh', points: 20, defaultTime: '04:45' },
            { id: 'zuhur', label: 'Salat Zuhur', points: 20, defaultTime: '12:15' },
            { id: 'asar', label: 'Salat Asar', points: 20, defaultTime: '15:30' },
            { id: 'magrib', label: 'Salat Magrib', points: 20, defaultTime: '18:10' },
            { id: 'isya', label: 'Salat Isya', points: 20, defaultTime: '19:25' },
        ]
    },
    {
        id: 'sunnah',
        title: 'Ibadah Sunah',
        icon: FaStar,
        color: 'bg-amber-500',
        items: [
            { id: 'dhuha', label: 'Salat Duha', points: 15, placeholder: 'Berapa rakaat?' },
            { id: 'tahajud', label: 'Salat Tahajud', points: 20, placeholder: 'Berapa rakaat?' },
            { id: 'rawatib', label: 'Salat Rawatib', points: 10, placeholder: "Qabliah atau Ba'diah?" },
            { id: 'senin_kamis', label: 'Puasa Senin / Kamis', points: 30, placeholder: 'Senin atau Kamis?' },
            { id: 'daud', label: 'Puasa Daud', points: 40, placeholder: 'Hari ke berapa?' },
        ]
    },
    {
        id: 'tadarus',
        title: 'Tadarus & Literasi',
        icon: FaBookOpen,
        color: 'bg-emerald-500',
        items: [
            { id: 'alquran', label: "Al-Qur'an", points: 50, type: 'form' },
            { id: 'hijrati', label: 'Hijrati', points: 30, type: 'form' },
            { id: 'literasi', label: 'Literasi', points: 15, type: 'form' },
        ]
    },
    {
        id: 'additional',
        title: 'Kebaikan & Karakter',
        icon: FaHeart,
        color: 'bg-rose-500',
        items: [
            { id: 'infaq', label: 'Infak / Sedekah', points: 10, placeholder: 'Berapa nominalnya?' },
            { id: 'help', label: 'Bantu Orang Tua', points: 25, placeholder: 'Bantu ngapain?' },
            { id: 'five_s', label: 'Melakukan 5S', points: 10, placeholder: 'Sapa siapa aja?' },
            { id: 'magic_words', label: '5 Kata Ajaib', points: 10, placeholder: 'Kata apa yang diucap?' },
            { id: 'help_others', label: 'Bantu Sesama', points: 20, placeholder: 'Bantu siapa?' },
            { id: 'no_bad_words', label: 'Tidak Berkata Kasar', points: 15, placeholder: 'Alhamdulillah!' },
        ]
    }
];

// Activity icons and colors mapping (default activities)
export const ACTIVITY_CONFIG = {
    // Salat Wajib - blue theme
    'subuh': { icon: MdOutlineWbTwilight, iconId: 'twilight', color: 'bg-blue-500', colorName: 'blue' },
    'zuhur': { icon: MdLightMode, iconId: 'sun_light', color: 'bg-blue-500', colorName: 'blue' },
    'asar': { icon: MdSunny, iconId: 'sunny', color: 'bg-blue-500', colorName: 'blue' },
    'magrib': { icon: MdNightsStay, iconId: 'night', color: 'bg-blue-500', colorName: 'blue' },
    'isya': { icon: MdBedtime, iconId: 'bedtime', color: 'bg-blue-500', colorName: 'blue' },
    // Ibadah Sunnah
    'dhuha': { icon: FaCloudSun, iconId: 'cloud_sun', color: 'bg-amber-500', colorName: 'amber' },
    'tahajud': { icon: MdNightsStay, iconId: 'night', color: 'bg-indigo-500', colorName: 'indigo' },
    'rawatib': { icon: FaMosque, iconId: 'mosque', color: 'bg-cyan-500', colorName: 'cyan' },
    'senin_kamis': { icon: MdNoFood, iconId: 'no_food', color: 'bg-rose-500', colorName: 'rose' },
    'daud': { icon: MdNoFood, iconId: 'no_food', color: 'bg-purple-500', colorName: 'purple' },
    // Tadarus
    'alquran': { icon: FaBookOpen, iconId: 'book', color: 'bg-blue-500', colorName: 'blue' },
    'hijrati': { icon: FaBookOpen, iconId: 'book', color: 'bg-amber-500', colorName: 'amber' },
    'literasi': { icon: FaBookOpen, iconId: 'book', color: 'bg-indigo-500', colorName: 'indigo' },
    // Kebaikan
    'infaq': { icon: BiSolidDonateHeart, iconId: 'donate', color: 'bg-emerald-500', colorName: 'emerald' },
    'help': { icon: FaHeart, iconId: 'heart', color: 'bg-rose-500', colorName: 'rose' },
    'five_s': { icon: FaSmileWink, iconId: 'smile', color: 'bg-amber-500', colorName: 'amber' },
    'magic_words': { icon: FaMagic, iconId: 'magic', color: 'bg-purple-500', colorName: 'purple' },
    'help_others': { icon: FaHandHoldingHeart, iconId: 'hand_heart', color: 'bg-blue-500', colorName: 'blue' },
    'no_bad_words': { icon: FaCommentSlash, iconId: 'no_talk', color: 'bg-teal-500', colorName: 'teal' },
};

// Category icons mapping
export const CATEGORY_ICONS = {
    'wajib': { icon: FaMosque, iconId: 'mosque' },
    'sunnah': { icon: FaStar, iconId: 'star' },
    'tadarus': { icon: FaBookOpen, iconId: 'book' },
    'additional': { icon: FaHeart, iconId: 'heart' },
};

// Get custom activity configs from storage
// Now uses ConfigRepositorySync for abstraction
export const getCustomActivityConfigs = () => {
    return ConfigRepositorySync.getCustomActivityConfigs();
};

// Save custom activity config to storage
// Now uses ConfigRepositorySync for abstraction
export const saveCustomActivityConfig = (activityId, iconId, colorName) => {
    ConfigRepositorySync.saveCustomActivityConfig(activityId, iconId, colorName);
};

// Get activity config (checks custom configs first, then defaults)
export const getActivityConfig = (itemId) => {
    // Check if it's a default activity
    if (ACTIVITY_CONFIG[itemId]) {
        return ACTIVITY_CONFIG[itemId];
    }

    // Check custom activity configs
    const customConfigs = getCustomActivityConfigs();
    if (customConfigs[itemId]) {
        const { iconId, colorName } = customConfigs[itemId];
        const colorConfig = getColorById(colorName);
        return {
            icon: getIconById(iconId),
            iconId,
            color: colorConfig.bg,
            colorName
        };
    }

    return { icon: FaStar, iconId: 'star', color: 'bg-slate-500', colorName: 'slate' };
};

// Get used colors in current categories
export const getUsedColors = () => {
    const categories = getWorshipCategories();
    const usedColors = new Set();

    categories.forEach(cat => {
        cat.items.forEach(item => {
            const config = getActivityConfig(item.id);
            if (config.colorName) {
                usedColors.add(config.colorName);
            }
        });
    });

    return Array.from(usedColors);
};

// Get available (unused) colors
export const getAvailableColors = () => {
    const usedColors = getUsedColors();
    return AVAILABLE_COLORS.filter(c => !usedColors.includes(c.id));
};

// Get next available color (first unused, or cycle back if all used)
export const getNextAvailableColor = () => {
    const available = getAvailableColors();
    if (available.length > 0) {
        return available[0];
    }
    // If all colors used, return a random one
    return AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)];
};

// Get worship categories from storage or return defaults
// Now uses ConfigRepositorySync for abstraction
export const getWorshipCategories = (includeArchived = false) => {
    const savedData = ConfigRepositorySync.getWorshipSettings();

    // Default categories processing
    let finalCategories = [];

    if (savedData) {
        try {
            // savedData is already parsed by repository, no need for JSON.parse
            const parsedData = savedData;
            // Merge saved items with default structure to preserve icons/colors
            const mergedCategories = DEFAULT_CATEGORIES.map(defCat => {
                const savedCat = parsedData.find(c => c.id === defCat.id);
                if (savedCat) {
                    // Use saved items directly (they include both default and custom items)
                    const mergedItems = savedCat.items.map(savedItem => {
                        const defItem = defCat.items.find(d => d.id === savedItem.id);
                        if (defItem) {
                            return {
                                ...defItem,
                                ...savedItem,
                                label: savedItem.label ? formatToEYD(savedItem.label) : defItem.label
                            };
                        }
                        return {
                            ...savedItem,
                            label: formatToEYD(savedItem.label)
                        };
                    });

                    return {
                        ...defCat,
                        items: mergedItems,
                        title: savedCat.title ? formatToEYD(savedCat.title) : defCat.title,
                        isArchived: savedCat.isArchived
                    };
                }
                return defCat;
            });

            // Add any new categories created by admin (custom categories)
            parsedData.forEach(savedCat => {
                if (!mergedCategories.find(c => c.id === savedCat.id)) {
                    const catIconConfig = CATEGORY_ICONS[savedCat.id];
                    mergedCategories.push({
                        ...savedCat,
                        title: formatToEYD(savedCat.title),
                        icon: catIconConfig ? catIconConfig.icon : (savedCat.iconId ? getIconById(savedCat.iconId) : FaStar),
                        color: savedCat.color || 'bg-purple-500',
                        isArchived: savedCat.isArchived,
                        items: savedCat.items.map(item => ({
                            ...item,
                            label: formatToEYD(item.label)
                        }))
                    });
                }
            });

            finalCategories = mergedCategories;
        } catch (e) {
            console.error("Failed to load worship settings", e);
            finalCategories = DEFAULT_CATEGORIES;
        }
    } else {
        finalCategories = DEFAULT_CATEGORIES;
    }

    // Filter out archived items/categories if not requested
    if (!includeArchived) {
        return finalCategories
            .filter(cat => !cat.isArchived)
            .map(cat => ({
                ...cat,
                items: cat.items.filter(item => !item.isArchived)
            }));
    }

    return finalCategories;
};

// Get prayers list for InputMobile (Salat Wajib)
export const getPrayers = () => {
    const categories = getWorshipCategories();
    const wajibCat = categories.find(c => c.id === 'wajib');

    if (!wajibCat) return [];

    return wajibCat.items
        .filter(item => !item.isArchived)
        .map(item => {
            const config = getActivityConfig(item.id);
            return {
                id: item.id,
                label: item.label,
                points: item.points,
                Icon: config.icon || FaStar,
                defaultTime: item.defaultTime || '12:00'
            };
        });
};

// Get sunnah worships for InputMobile
export const getSunnahWorships = () => {
    const categories = getWorshipCategories();
    const sunnahCat = categories.find(c => c.id === 'sunnah');

    if (!sunnahCat) return [];

    return sunnahCat.items
        .filter(item => !item.isArchived)
        .map(item => {
            const config = getActivityConfig(item.id);
            return {
                id: item.id,
                label: item.label,
                points: item.points,
                Icon: config.icon || FaStar,
                color: config.colorName || 'amber',
                placeholder: item.placeholder || 'Tambahkan catatan...',
                type: item.type || 'checkbox'
            };
        });
};

// Get additional worships for InputMobile
export const getAdditionalWorships = () => {
    const categories = getWorshipCategories();
    const additionalCat = categories.find(c => c.id === 'additional');

    if (!additionalCat) return [];

    return additionalCat.items
        .filter(item => !item.isArchived)
        .map(item => {
            const config = getActivityConfig(item.id);
            return {
                id: item.id,
                label: item.label,
                points: item.points,
                Icon: config.icon || FaStar,
                color: config.colorName || 'rose',
                placeholder: item.placeholder || 'Tambahkan catatan...',
                type: item.type || 'checkbox'
            };
        });
};

// Get tadarus config
export const getTadarusConfig = () => {
    const categories = getWorshipCategories();
    const tadarusCat = categories.find(c => c.id === 'tadarus');

    if (!tadarusCat) return { alquran: 50, hijrati: 30, literasi: 15 };

    const config = {};
    tadarusCat.items.forEach(item => {
        config[item.id] = item.points;
    });

    return config;
};

// Get all custom categories (categories created by admin, not default ones)
export const getCustomCategories = () => {
    const categories = getWorshipCategories(); // This already filters archived
    const defaultIds = ['wajib', 'sunnah', 'tadarus', 'additional'];

    return categories
        .filter(cat => !defaultIds.includes(cat.id) && !cat.isArchived) // Also check isArchived here
        .map(cat => ({
            ...cat,
            Icon: cat.icon || getIconById(cat.iconId) || FaStar,
            items: cat.items
                .filter(item => !item.isArchived) // Filter archived items
                .map(item => {
                    const config = getActivityConfig(item.id);
                    return {
                        id: item.id,
                        label: item.label,
                        points: item.points,
                        Icon: config.icon || FaStar,
                        color: config.colorName || 'purple',
                        placeholder: item.placeholder || 'Tambahkan catatan...',
                        type: item.type || 'checkbox'
                    };
                })
        }))
        .filter(cat => cat.items.length > 0); // Remove empty categories
};

// Get ALL categories for InputMobile (including custom)
// Set includeArchived to true for history display
export const getAllWorshipCategories = (includeArchived = false) => {
    const categories = getWorshipCategories(includeArchived);

    return categories.map(cat => {
        const catIcon = cat.icon || getIconById(cat.iconId) || FaStar;

        // Filter items: if includeArchived is false, exclude items with isArchived=true
        const visibleItems = cat.items.filter(item => includeArchived || !item.isArchived);

        return {
            ...cat,
            Icon: catIcon,
            items: visibleItems.map(item => {
                const config = getActivityConfig(item.id);
                return {
                    id: item.id,
                    label: item.label,
                    points: item.points,
                    Icon: config.icon || FaStar,
                    color: config.colorName || 'blue',
                    placeholder: item.placeholder || 'Tambahkan catatan...',
                    defaultTime: item.defaultTime,
                    isArchived: item.isArchived,
                    type: item.type || 'checkbox'
                };
            })
        };
    }).filter(cat => cat.items.length > 0); // Remove categories that have no visible items
};
