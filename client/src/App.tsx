import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import Profile from './pages/Profile';
import Assignments from './pages/Assignments';
import Schedule from './pages/Schedule';
import Exams from './pages/Exams';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManager from './pages/admin/UserManager';
import CourseManager from './pages/admin/CourseManager';
import CourseEditor from './pages/admin/CourseEditor';
import StudentManagement from './pages/admin/StudentManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseView />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManager />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/courses" element={<CourseManager />} />
              <Route path="/admin/courses/:id" element={<CourseEditor />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
