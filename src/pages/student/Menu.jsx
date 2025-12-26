import React, { useState, useEffect } from 'react';
import MenuDesktop from './menu/MenuDesktop';
import MenuMobile from './menu/MenuMobile';

// Force HMR update
const Menu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <MenuMobile /> : <MenuDesktop />;
};

export default Menu;
