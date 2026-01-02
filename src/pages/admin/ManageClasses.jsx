import React, { useState, useEffect } from 'react';
import ClassesMobile from './classes/ClassesMobile';
import ClassesDesktop from './classes/ClassesDesktop';

const ManageClasses = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <ClassesMobile /> : <ClassesDesktop />;
};

export default ManageClasses;
