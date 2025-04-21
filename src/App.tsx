import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import StaffDashboard from './pages/dashboards/StaffDashboard';

// Stream Page
import StreamPage from './pages/Stream';

// Authentication
import Auth from './pages/Auth';

// Student Pages
import AllStudents from './pages/students/AllStudents';
import StudentProfile from './pages/students/Profile';
import StudentAcademics from './pages/students/Academics';
import StudentAttendance from './pages/students/Attendance';
import StudentDiscipline from './pages/students/Discipline';
import StudentParents from './pages/students/Parents';
import StudentMedical from './pages/students/Medical';
import StudentDocuments from './pages/students/Documents';

// Academic Pages
import ClassSchedule from './pages/academics/Schedule';
import Gradebook from './pages/academics/Gradebook';
import ReportCards from './pages/academics/Reports';
import Assignments from './pages/academics/Assignments';
import ExamSchedule from './pages/academics/exams/Schedule';
import ExamResults from './pages/academics/exams/Results';
import CourseRegistration from './pages/academics/Registration';

// Teacher Pages
import TeacherDirectory from './pages/teachers/Directory';
import TeacherProfile from './pages/teachers/Profile';
import TeacherClasses from './pages/teachers/Classes';
import TeacherAttendance from './pages/teachers/Attendance';
import TeacherGrades from './pages/teachers/Grades';
import TeacherLeave from './pages/teachers/Leave';
import TeacherSchedule from './pages/teachers/Schedule';

// Staff Pages
import StaffDirectory from './pages/staff/Directory';
import StaffRoles from './pages/staff/Roles';
import StaffAttendance from './pages/staff/Attendance';
import StaffLeave from './pages/staff/Leave';
import StaffPerformance from './pages/staff/Performance';

// Admin Pages
import AdminCalendar from './pages/admin/Calendar';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminDocuments from './pages/admin/Documents';
import AdminFees from './pages/admin/Fees';
import AdminAdmissions from './pages/admin/Admissions';
import AdminResources from './pages/admin/Resources';
import AdminReports from './pages/admin/Reports';

// Communication Pages
import Messages from './pages/communication/Messages';
import NoticeBoard from './pages/communication/Notices';
import ParentPortal from './pages/communication/ParentPortal';
import Events from './pages/communication/Events';
import Newsletter from './pages/communication/Newsletter';

// Settings Pages
import AcademicYear from './pages/settings/AcademicYear';
import ClassManagement from './pages/settings/Classes';
import SubjectManagement from './pages/settings/Subjects';
import UserRoles from './pages/settings/Roles';
import SystemSettings from './pages/settings/System';

// Other Pages
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboards/admin" element={<AdminDashboard />} />
          <Route path="dashboards/teacher" element={<TeacherDashboard />} />
          <Route path="dashboards/student" element={<StudentDashboard />} />
          <Route path="dashboards/staff" element={<StaffDashboard />} />

          {/* Stream Route */}
          <Route path="stream" element={<StreamPage />} />

          {/* Auth Route */}
          <Route path="auth" element={<Auth />} />

          {/* Student Routes */}
          <Route path="students/directory" element={<AllStudents />} />
          <Route path="students/profile" element={<StudentProfile />} />
          <Route path="students/academics" element={<StudentAcademics />} />
          <Route path="students/attendance" element={<StudentAttendance />} />
          <Route path="students/discipline" element={<StudentDiscipline />} />
          <Route path="students/parents" element={<StudentParents />} />
          <Route path="students/medical" element={<StudentMedical />} />
          <Route path="students/documents" element={<StudentDocuments />} />

          {/* Academic Routes */}
          <Route path="academics/schedule" element={<ClassSchedule />} />
          <Route path="academics/gradebook" element={<Gradebook />} />
          <Route path="academics/reports" element={<ReportCards />} />
          <Route path="academics/assignments" element={<Assignments />} />
          <Route path="academics/exams/schedule" element={<ExamSchedule />} />
          <Route path="academics/exams/results" element={<ExamResults />} />
          <Route path="academics/registration" element={<CourseRegistration />} />

          {/* Teacher Routes */}
          <Route path="teachers/directory" element={<TeacherDirectory />} />
          <Route path="teachers/profile" element={<TeacherProfile />} />
          <Route path="teachers/classes" element={<TeacherClasses />} />
          <Route path="teachers/attendance" element={<TeacherAttendance />} />
          <Route path="teachers/grades" element={<TeacherGrades />} />
          <Route path="teachers/leave" element={<TeacherLeave />} />
          <Route path="teachers/schedule" element={<TeacherSchedule />} />

          {/* Staff Routes */}
          <Route path="staff/directory" element={<StaffDirectory />} />
          <Route path="staff/roles" element={<StaffRoles />} />
          <Route path="staff/attendance" element={<StaffAttendance />} />
          <Route path="staff/leave" element={<StaffLeave />} />
          <Route path="staff/performance" element={<StaffPerformance />} />

          {/* Admin Routes */}
          <Route path="admin/calendar" element={<AdminCalendar />} />
          <Route path="admin/announcements" element={<AdminAnnouncements />} />
          <Route path="admin/documents" element={<AdminDocuments />} />
          <Route path="admin/fees" element={<AdminFees />} />
          <Route path="admin/admissions" element={<AdminAdmissions />} />
          <Route path="admin/resources" element={<AdminResources />} />
          <Route path="admin/reports" element={<AdminReports />} />

          {/* Communication Routes */}
          <Route path="communication/messages" element={<Messages />} />
          <Route path="communication/notices" element={<NoticeBoard />} />
          <Route path="communication/parent-portal" element={<ParentPortal />} />
          <Route path="communication/events" element={<Events />} />
          <Route path="communication/newsletter" element={<Newsletter />} />

          {/* Settings Routes */}
          <Route path="settings/academic-year" element={<AcademicYear />} />
          <Route path="settings/classes" element={<ClassManagement />} />
          <Route path="settings/subjects" element={<SubjectManagement />} />
          <Route path="settings/roles" element={<UserRoles />} />
          <Route path="settings/system" element={<SystemSettings />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
