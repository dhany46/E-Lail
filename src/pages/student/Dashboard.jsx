import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import DashboardDesktop from './dashboard/DashboardDesktop';
import DashboardMobile from './dashboard/DashboardMobile';
import { getActivityConfig, getAllWorshipCategories } from '../../utils/worshipConfig';
import { getAppConfig } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

// Helper function to load all activities from localStorage
// Keeping this here for shared access
import { loadAllActivities } from '../../services/activityService.jsx';

const Dashboard = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [stats, setStats] = useState({
        totalPoints: 0,
        todayPoints: 0,
        pendingCount: 0,
        todayCount: 0,
        targetDaily: getAppConfig().dailyTarget
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load data
    useEffect(() => {
        const allLoadedActivities = loadAllActivities();
        setActivities(allLoadedActivities);
    }, []);

    // Calculate stats (Semester Based)
    useEffect(() => {
        const todayNow = new Date();
        const year = todayNow.getFullYear();
        const month = todayNow.getMonth(); // 0-11
        const today = `${year}-${String(month + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;

        // Semester & Academic Year Logic
        let semesterStart, semesterEnd, semesterLabel, academicYearLabel;

        if (month >= 6) { // Jul - Dec (Semester 1)
            semesterStart = new Date(`${year}-07-01`);
            semesterEnd = new Date(`${year}-12-31`);
            semesterLabel = "Semester 1";
            academicYearLabel = `${year}/${year + 1}`;
        } else { // Jan - Jun (Semester 2)
            semesterStart = new Date(`${year}-01-01`);
            semesterEnd = new Date(`${year}-06-30`);
            semesterLabel = "Semester 2";
            academicYearLabel = `${year - 1}/${year}`;
        }

        // Filter activities for CURRENT SEMESTER only
        const semesterActivities = activities.filter(a => {
            const activityDate = new Date(a.rawDate);
            return activityDate >= semesterStart && activityDate <= semesterEnd;
        });

        const totalPoints = semesterActivities.reduce((sum, a) => sum + a.points, 0);

        // Today stats remains based on ALL activities for today (regardless of semester logic, though usually overlaps)
        const todayActivities = activities.filter(a => a.rawDate === today);
        const todayPoints = todayActivities.reduce((sum, a) => sum + a.points, 0);
        const pendingCount = activities.filter(a => a.status === 'Menunggu').length;
        const todayCount = todayActivities.length;

        setStats({
            totalPoints, // Now stores Semester Points
            todayPoints,
            pendingCount,
            todayCount,
            targetDaily: getAppConfig().dailyTarget,
            semesterLabel,
            academicYearLabel
        });
    }, [activities]);

    // Mock teacher note (Centralized data)
    // Mock teacher note properties
    const noteId = 'note-2024-10-20-v1'; // Unique ID for the note
    const noteSentDate = '2024-10-20';

    // State for note display logic
    const [noteStatus, setNoteStatus] = useState({
        isNew: false,
        displayDate: new Date(`${noteSentDate}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    });

    // Effect to handle "First Seen" logic
    useEffect(() => {
        const todayNow = new Date();
        const today = `${todayNow.getFullYear()}-${String(todayNow.getMonth() + 1).padStart(2, '0')}-${String(todayNow.getDate()).padStart(2, '0')}`;
        const storageKey = `teacher_note_seen_${noteId}`;
        const firstSeenDate = localStorage.getItem(storageKey);

        if (!firstSeenDate) {
            // First time seeing this note: Mark as seen TODAY
            localStorage.setItem(storageKey, today);
            setNoteStatus({
                isNew: true,
                displayDate: 'Hari ini'
            });
        } else {
            // Already seen. Check if it's been more than 1 day since first seen.
            // Requirement: "pastikan sudah lewat 1 hari status berubah" (Ensure status changes after 1 day passed)
            // If today is different from firstSeenDate, it's "Old"
            if (today !== firstSeenDate) {
                setNoteStatus({
                    isNew: false,
                    displayDate: new Date(`${noteSentDate}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
                });
            } else {
                // Still same day as first seen
                setNoteStatus({
                    isNew: true,
                    displayDate: 'Hari ini'
                });
            }
        }
    }, [noteId, noteSentDate]);

    const teacherNote = {
        teacherName: 'Ustadz Ahmad',
        teacherInitials: 'UA',
        message: 'Alhamdulillah, semangat belajar dan beribadah terus ya! Jangan lupa hafalan Juz 30 minggu depan 📖',
        date: noteStatus.displayDate,
        isNew: noteStatus.isNew
    };

    const props = {
        activities,
        stats,
        studentInfo: user, // Pass user data from AuthContext as studentInfo
        teacherNote // Pass to children
    };

    return isMobile ? <DashboardMobile {...props} /> : <DashboardDesktop {...props} />;
};

export default Dashboard;
