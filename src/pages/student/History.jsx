import React, { useState, useEffect } from 'react';
import HistoryDesktop from './history/HistoryDesktop';
import HistoryMobile from './history/HistoryMobile';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load data only once here if needed to pass down found prop drilling, 
    // or let each component handle its own data loading as currently implemented.
    // Given the previous structure, each component (Desktop/Mobile) seems to have its own data loading logic internally.
    // However, to keep it clean, we can just render them. 
    // But wait, the original `History.jsx` had all the logic. 
    // I should check `HistoryDesktop.jsx` to make sure it has the logic.
    // I previously viewed `HistoryDesktop.jsx` in step 66 and it seemed to have the full logic copied from `History.jsx`.

    return isMobile ? <HistoryMobile /> : <HistoryDesktop />;
};

export default History;
