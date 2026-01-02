import React, { useState, useEffect } from 'react';
import StudentsMobile from './students/StudentsMobile';
import StudentsDesktop from './students/StudentsDesktop';

const ManageStudents = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <StudentsMobile /> : <StudentsDesktop />;
};

export default ManageStudents;
