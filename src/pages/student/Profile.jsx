import React, { useState, useEffect } from 'react';
import ProfileDesktop from './profile/ProfileDesktop';
import ProfileMobile from './profile/ProfileMobile';

const Profile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <ProfileMobile /> : <ProfileDesktop />;
};

export default Profile;
