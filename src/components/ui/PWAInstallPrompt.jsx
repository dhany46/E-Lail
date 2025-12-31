import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.jpg';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // checks if app is already installed
        const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

        if (isAppInstalled) return;

        // Check if user dismissed recently (last 48 hours)
        const lastDismissed = localStorage.getItem('pwa_prompt_dismissed_at');
        if (lastDismissed) {
            const timeDiff = Date.now() - parseInt(lastDismissed, 10);
            if (timeDiff < 48 * 60 * 60 * 1000) {
                return;
            }
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Show prompt after a short delay
            setTimeout(() => {
                setIsVisible(true);
            }, 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('pwa_prompt_dismissed_at', Date.now().toString());
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Top Toast Notification - No Backdrop to keep it non-intrusive */}
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none"
                    >
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm pointer-events-auto border border-blue-50 overflow-hidden relative ring-1 ring-black/5">
                            <div className="p-3 pr-10 flex items-center gap-3">
                                <div className="size-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-md">
                                    <img
                                        src={logo}
                                        alt="App Icon"
                                        className="w-full h-full object-cover rounded-[10px]"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-slate-800 leading-tight">
                                        Pasang Buku Lail
                                    </h3>
                                    <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-1">
                                        Akses lebih cepat & hemat kuota! 🚀
                                    </p>
                                </div>

                                <button
                                    onClick={handleInstallClick}
                                    className="shrink-0 py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-[10px] shadow-sm shadow-blue-200 active:scale-95 transition-all flex items-center gap-1.5"
                                >
                                    <FaDownload />
                                    Install
                                </button>

                                <button
                                    onClick={handleDismiss}
                                    className="absolute top-1 right-1 p-2 text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
