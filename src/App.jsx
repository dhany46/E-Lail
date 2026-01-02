import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import PagePlaceholder from './components/ui/PagePlaceholder';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role if trying to access unauthorized route
    if (user.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'Guru') return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === 'Siswa') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Redirect if already logged in
const LoginRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;

    if (user) {
        if (user.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'Guru') return <Navigate to="/teacher/dashboard" replace />;
        if (user.role === 'Siswa') return <Navigate to="/student/dashboard" replace />;
    }
    return children;
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="classes" element={<ManageClasses />} />
              <Route path="teachers" element={<ManageTeachers />} />
              <Route path="students" element={<ManageStudents />} />
              <Route path="activities" element={<Activities />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['Siswa']}><StudentLayout /></ProtectedRoute>}>
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
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={['Guru']}><TeacherLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/teacher/dashboard" replace />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="reports" element={<TeacherReports />} />
              <Route path="students" element={<TeacherStudentDetail />} />
              <Route path="settings" element={<PagePlaceholder title="Pengaturan Guru" />} />
            </Route>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
