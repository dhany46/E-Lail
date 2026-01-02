import React, { useState, useEffect } from 'react';
import TeachersMobile from './teachers/TeachersMobile';
import TeachersDesktop from './teachers/TeachersDesktop';

const ManageTeachers = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <TeachersMobile /> : <TeachersDesktop />;
};

export default ManageTeachers;
