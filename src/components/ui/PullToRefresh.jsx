import React, { useRef, useState, useEffect } from 'react';

/**
 * PullToRefresh Component
 * @param {Function} onRefresh - Async function to call on refresh
 * @param {React.ReactNode} children - Content to scroll/refresh
 */
const PullToRefresh = ({ onRefresh, children }) => {
    const containerRef = useRef(null);
    const [pullStart, setPullStart] = useState(0);
    const [pullChange, setPullChange] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const THRESHOLD = 80; // px to pull to trigger refresh
    const MAX_PULL = 150; // max visual pull

    const handleTouchStart = (e) => {
        if (isRefreshing) return;
        const scrollTop = containerRef.current?.scrollTop;
        if (scrollTop === 0) {
            setPullStart(e.touches[0].clientY);
        }
    };

    const handleTouchMove = (e) => {
        if (isRefreshing || pullStart === 0) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - pullStart;

        // Only handle pull down when at top
        if (containerRef.current?.scrollTop === 0 && diff > 0) {
            // Add resistance
            const pulled = Math.min(diff * 0.5, MAX_PULL);
            setPullChange(pulled);
            // Prevent default browser refresh/scroll if we are pulling
            // Note: passive listeners make preventing default hard in modern browsers,
            // but for custom UI this is standard handling. 
            // Often best to rely on CSS overscroll-behavior-y: contain on body
        } else {
            setPullChange(0);
        }
    };

    const handleTouchEnd = async () => {
        if (isRefreshing) return;

        if (pullChange >= THRESHOLD) {
            setIsRefreshing(true);
            setPullChange(60); // Snap to loading position

            try {
                if (onRefresh) await onRefresh();
            } finally {
                setIsRefreshing(false);
                setPullChange(0);
            }
        } else {
            setPullChange(0); // Snap back
            setPullStart(0);
        }
    };

    return (
        <div
            ref={containerRef}
            className="h-full overflow-y-auto scrollbar-hide scroll-smooth relative touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Refresh Indicator */}
            <div
                className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none z-[80] transition-transform duration-300"
                style={{
                    height: '0px',
                    transform: `translateY(${pullChange > 0 ? pullChange - 40 : -40}px)`
                }}
            >
                <div className={`p-2 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center ${isRefreshing ? 'animate-spin' : ''}`}>
                    {isRefreshing ? (
                        <span className="material-symbols-outlined text-blue-500 text-xl">progress_activity</span>
                    ) : (
                        <span
                            className="material-symbols-outlined text-blue-500 text-xl transition-transform duration-300"
                            style={{ transform: `rotate(${pullChange >= THRESHOLD ? 180 : 0}deg)` }}
                        >
                            arrow_downward
                        </span>
                    )}
                </div>
            </div>

            {/* Content Wrapper */}
            <div
                className="transition-transform duration-200 ease-out min-h-full"
                style={{ transform: `translateY(${pullChange}px)` }}
            >
                {children}
            </div>
        </div>
    );
};

export default PullToRefresh;
