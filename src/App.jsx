import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageClasses from './pages/admin/ManageClasses';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageStudents from './pages/admin/ManageStudents';
import Activities from './pages/admin/Activities';
import Settings from './pages/admin/Settings';
import './index.css';

import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/Dashboard';
import StudentHistory from './pages/student/History';
import StudentInput from './pages/student/Input';
import StudentMenu from './pages/student/Menu';
import StudentProfile from './pages/student/Profile';
import StudentLeaderboard from './pages/student/Leaderboard';
import TeacherLayout from './layouts/TeacherLayout';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherReports from './pages/teacher/ReportManagement';
import TeacherStudentDetail from './pages/teacher/StudentDetail';
import PagePlaceholder from './components/ui/PagePlaceholder'; // Create this simple component if it doesn't exist, or inline it. The previous tool call created it.

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="classes" element={<ManageClasses />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="activities" element={<Activities />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="input" element={<StudentInput />} />
            <Route path="history" element={<StudentHistory />} />
            <Route path="leaderboard" element={<StudentLeaderboard />} />
            <Route path="menu" element={<StudentMenu />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="progress" element={<PagePlaceholder title="Misi Harian" />} />
            <Route path="pending" element={<PagePlaceholder title="Menunggu Verifikasi" />} />
            <Route path="notes" element={<PagePlaceholder title="Catatan Guru" />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="reports" element={<TeacherReports />} />
            <Route path="students" element={<TeacherStudentDetail />} />
            <Route path="settings" element={<PagePlaceholder title="Pengaturan Guru" />} />
          </Route>

          {/* Default Redirect - Update to catch root */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
