import React, { useState, useEffect } from 'react';
import LeaderboardDesktop from './leaderboard/LeaderboardDesktop';
import LeaderboardMobile from './leaderboard/LeaderboardMobile';

const Leaderboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <LeaderboardMobile /> : <LeaderboardDesktop />;
};

export default Leaderboard;
