import React, { useState, useEffect } from 'react';
import DashboardMobile from './dashboard/DashboardMobile';
import DashboardDesktop from './dashboard/DashboardDesktop';

const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <DashboardMobile /> : <DashboardDesktop />;
};

export default Dashboard;
