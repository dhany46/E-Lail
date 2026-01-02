import React, { useState, useEffect } from 'react';
import ActivitiesMobile from './activities/ActivitiesMobile';
import ActivitiesDesktop from './activities/ActivitiesDesktop';

const Activities = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <ActivitiesMobile /> : <ActivitiesDesktop />;
};

export default Activities;
