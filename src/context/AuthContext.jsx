import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUserPhoto = (photoBase64) => {
        if (!user) return;
        
        const updatedUser = { ...user, photo: photoBase64 };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Also update in students_data if exists
        const studentsData = localStorage.getItem('students_data');
        if (studentsData) {
            try {
                const students = JSON.parse(studentsData);
                const updatedStudents = students.map(s => 
                    s.nis === user.nis ? { ...s, photo: photoBase64 } : s
                );
                localStorage.setItem('students_data', JSON.stringify(updatedStudents));
            } catch (e) {
                console.error('Failed to update student photo in students_data', e);
            }
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        updateUserPhoto
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
