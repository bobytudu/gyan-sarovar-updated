import { RouteObject } from 'react-router-dom';
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

// Gym Pages
import UsersList from './pages/gym/UsersList';
import UserDetail from './pages/gym/UserDetail';

// Other Pages
import NotFound from './pages/NotFound';
import { Navigate } from 'react-router-dom';
import Admin from "./pages/firebase/Admin";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Gym Routes
      { path: "gym/users", element: <UsersList /> },
      { path: "gym/users/:id", element: <UserDetail /> },

      //firebase
      { path: "firebase/admin", element: <Admin /> },

      // Dashboard Routes
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboards/admin", element: <AdminDashboard /> },
      { path: "dashboards/teacher", element: <TeacherDashboard /> },
      { path: "dashboards/student", element: <StudentDashboard /> },
      { path: "dashboards/staff", element: <StaffDashboard /> },

      // Stream Route
      { path: "stream", element: <StreamPage /> },

      // Auth Route
      { path: "auth", element: <Auth /> },

      // Student Routes
      { path: "students/directory", element: <AllStudents /> },
      { path: "students/profile", element: <StudentProfile /> },
      { path: "students/academics", element: <StudentAcademics /> },
      { path: "students/attendance", element: <StudentAttendance /> },
      { path: "students/discipline", element: <StudentDiscipline /> },
      { path: "students/parents", element: <StudentParents /> },
      { path: "students/medical", element: <StudentMedical /> },
      { path: "students/documents", element: <StudentDocuments /> },

      // Academic Routes
      { path: "academics/schedule", element: <ClassSchedule /> },
      { path: "academics/gradebook", element: <Gradebook /> },
      { path: "academics/reports", element: <ReportCards /> },
      { path: "academics/assignments", element: <Assignments /> },
      { path: "academics/exams/schedule", element: <ExamSchedule /> },
      { path: "academics/exams/results", element: <ExamResults /> },
      { path: "academics/registration", element: <CourseRegistration /> },

      // Teacher Routes
      { path: "teachers/directory", element: <TeacherDirectory /> },
      { path: "teachers/profile", element: <TeacherProfile /> },
      { path: "teachers/classes", element: <TeacherClasses /> },
      { path: "teachers/attendance", element: <TeacherAttendance /> },
      { path: "teachers/grades", element: <TeacherGrades /> },
      { path: "teachers/leave", element: <TeacherLeave /> },
      { path: "teachers/schedule", element: <TeacherSchedule /> },

      // Staff Routes
      { path: "staff/directory", element: <StaffDirectory /> },
      { path: "staff/roles", element: <StaffRoles /> },
      { path: "staff/attendance", element: <StaffAttendance /> },
      { path: "staff/leave", element: <StaffLeave /> },
      { path: "staff/performance", element: <StaffPerformance /> },

      // Admin Routes
      { path: "admin/calendar", element: <AdminCalendar /> },
      { path: "admin/announcements", element: <AdminAnnouncements /> },
      { path: "admin/documents", element: <AdminDocuments /> },
      { path: "admin/fees", element: <AdminFees /> },
      { path: "admin/admissions", element: <AdminAdmissions /> },
      { path: "admin/resources", element: <AdminResources /> },
      { path: "admin/reports", element: <AdminReports /> },

      // Communication Routes
      { path: "communication/messages", element: <Messages /> },
      { path: "communication/notices", element: <NoticeBoard /> },
      { path: "communication/parent-portal", element: <ParentPortal /> },
      { path: "communication/events", element: <Events /> },
      { path: "communication/newsletter", element: <Newsletter /> },

      // Settings Routes
      { path: "settings/academic-year", element: <AcademicYear /> },
      { path: "settings/classes", element: <ClassManagement /> },
      { path: "settings/subjects", element: <SubjectManagement /> },
      { path: "settings/roles", element: <UserRoles /> },
      { path: "settings/system", element: <SystemSettings /> },

      // 404 Route
      { path: "*", element: <NotFound /> },
    ],
  },
];