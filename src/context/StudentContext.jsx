import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
    const [navigationBlocker, setNavigationBlocker] = useState(null);

    return (
        <StudentContext.Provider value={{ navigationBlocker, setNavigationBlocker }}>
            {children}
        </StudentContext.Provider>
    );
};
