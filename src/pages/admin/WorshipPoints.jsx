import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorshipPointsMobile from './settings/WorshipPointsMobile';
import PagePlaceholder from '../../components/ui/PagePlaceholder';

const WorshipPoints = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <WorshipPointsMobile onBack={() => navigate('/admin/settings')} /> : <PagePlaceholder title="Pengaturan Poin Ibadah (Desktop)" />;
};

export default WorshipPoints;
