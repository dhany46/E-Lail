import React, { useState, useEffect } from 'react';
import SettingsMobile from './settings/SettingsMobile';
import SettingsDesktop from './settings/SettingsDesktop';

const Settings = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <SettingsMobile /> : <SettingsDesktop />;
};

export default Settings;
