import {
  DashboardOutlined,
  LockOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  FileOutlined,
  FolderOutlined,
  GooglePlusOutlined,
  FundProjectionScreenOutlined,
  FileZipOutlined,
  FileSearchOutlined,
  FileDoneOutlined,
  ClockCircleFilled,
  TrophyOutlined,
  CrownOutlined,
  NotificationOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserAddOutlined,
  ToolOutlined,
  AreaChartOutlined,
  MessageOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SafetyOutlined,
  LineChartOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export interface NavConfigProps {
  label: string;
  key: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavConfigProps[];
}

const navConfig: NavConfigProps[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "gym",
    icon: <SmileOutlined />,
    label: "Gym",
    children: [
      {
        label: "Users",
        key: "gym/users",
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    key: "firebase",
    icon: <SmileOutlined />,
    label: "Firebase",
    children: [
      {
        label: "Admin",
        key: "firebase/admin",
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    key: "stream",
    icon: <VideoCameraOutlined />,
    label: "Stream",
  },
  {
    label: "Authentication",
    key: "auth",
    icon: <LockOutlined />,
  },
  {
    label: "Dashboards",
    key: "dashboards",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: "Admin Dashboard",
        key: "dashboards/admin",
        icon: <UserOutlined />,
      },
      {
        label: "Teacher Dashboard",
        key: "dashboards/teacher",
        icon: <TeamOutlined />,
      },
      {
        label: "Student Dashboard",
        key: "dashboards/student",
        icon: <BookOutlined />,
      },
      {
        label: "Staff Dashboard",
        key: "dashboards/staff",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: "Students",
    key: "/students",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: "Student Directory",
        key: "/students/directory",
        icon: <FolderOutlined />,
      },
      {
        label: "Student Profile",
        key: "/students/profile",
        icon: <UserOutlined />,
        children: [
          {
            label: "Personal Information",
            key: "/students/profile",
            icon: <UserOutlined />,
          },
          {
            label: "Academic Records",
            key: "/students/academics",
            icon: <BookOutlined />,
          },
          {
            label: "Attendance",
            key: "/students/attendance",
            icon: <CalendarOutlined />,
          },
          {
            label: "Discipline Records",
            key: "/students/discipline",
            icon: <FileZipOutlined />,
          },
          {
            label: "Parent Information",
            key: "/students/parents",
            icon: <UserOutlined />,
          },
          {
            label: "Medical Records",
            key: "/students/medical",
            icon: <FileZipOutlined />,
          },
          {
            label: "Documents",
            key: "/students/documents",
            icon: <FileOutlined />,
          },
        ],
      },
    ],
  },
  {
    label: "Academics",
    key: "/academics",
    icon: <BookOutlined />,
    children: [
      {
        label: "Class Schedule",
        key: "/academics/schedule",
        icon: <CalendarOutlined />,
      },
      {
        label: "Gradebook",
        key: "/academics/gradebook",
        icon: <BookOutlined />,
      },
      {
        label: "Report Cards",
        key: "/academics/reports",
        icon: <FileSearchOutlined />,
      },
      {
        label: "Assignments",
        key: "/academics/assignments",
        icon: <FileOutlined />,
      },
      {
        label: "Exams",
        key: "/academics/exams",
        icon: <FileDoneOutlined />,
        children: [
          {
            label: "Schedule",
            key: "/academics/exams/schedule",
            icon: <ClockCircleFilled />,
          },
          {
            label: "Results",
            key: "/academics/exams/results",
            icon: <TrophyOutlined />,
          },
        ],
      },
      {
        label: "Course Registration",
        key: "/academics/registration",
        icon: <FileOutlined />,
      },
    ],
  },
  {
    label: "Teachers",
    key: "/teachers",
    icon: <TeamOutlined />,
    children: [
      {
        label: "Teacher Directory",
        key: "/teachers/directory",
        icon: <FolderOutlined />,
      },
      {
        label: "Profile Management",
        key: "/teachers/profile",
        icon: <UserOutlined />,
      },
      {
        label: "Class Assignment",
        key: "/teachers/classes",
        icon: <GooglePlusOutlined />,
      },
      {
        label: "Attendance Management",
        key: "/teachers/attendance",
        icon: <CalendarOutlined />,
      },
      {
        label: "Grade Entry",
        key: "/teachers/grades",
        icon: <FundProjectionScreenOutlined />,
      },
      {
        label: "Leave Management",
        key: "/teachers/leave",
        icon: <CalendarOutlined />,
      },
      {
        label: "Teaching Schedule",
        key: "/teachers/schedule",
        icon: <CalendarOutlined />,
      },
    ],
  },
  {
    label: "Staff",
    key: "/staff",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: "Staff Directory",
        key: "/staff/directory",
        icon: <FolderOutlined />,
      },
      {
        label: "Role Management",
        key: "/staff/roles",
        icon: <UserOutlined />,
      },
      {
        label: "Attendance",
        key: "/staff/attendance",
        icon: <CalendarOutlined />,
      },
      {
        label: "Leave Management",
        key: "/staff/leave",
        icon: <CalendarOutlined />,
      },
      {
        label: "Performance Records",
        key: "/staff/performance",
        icon: <LineChartOutlined />,
      },
    ],
  },
  {
    label: "Administration",
    key: "/admin",
    icon: <CrownOutlined />,
    children: [
      {
        label: "School Calendar",
        key: "/admin/calendar",
        icon: <CalendarOutlined />,
      },
      {
        label: "Announcements",
        key: "/admin/announcements",
        icon: <NotificationOutlined />,
      },
      {
        label: "Document Management",
        key: "/admin/documents",
        icon: <FileTextOutlined />,
      },
      {
        label: "Fee Management",
        key: "/admin/fees",
        icon: <DollarOutlined />,
      },
      {
        label: "Admissions",
        key: "/admin/admissions",
        icon: <UserAddOutlined />,
      },
      {
        label: "Resource Management",
        key: "/admin/resources",
        icon: <ToolOutlined />,
      },
      {
        label: "Reports",
        key: "/admin/reports",
        icon: <AreaChartOutlined />,
      },
    ],
  },
  {
    label: "Communication",
    key: "/communication",
    icon: <MessageOutlined />,
    children: [
      {
        label: "Messages",
        key: "/communication/messages",
        icon: <MessageOutlined />,
      },
      {
        label: "Notice Board",
        key: "/communication/notices",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Parent Portal",
        key: "/communication/parent-portal",
        icon: <TeamOutlined />,
      },
      {
        label: "Events",
        key: "/communication/events",
        icon: <CalendarOutlined />,
      },
      {
        label: "Newsletter",
        key: "/communication/newsletter",
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    label: "Settings",
    key: "/settings",
    icon: <SettingOutlined />,
    children: [
      {
        label: "Academic Year",
        key: "/settings/academic-year",
        icon: <CalendarOutlined />,
      },
      {
        label: "Class Management",
        key: "/settings/classes",
        icon: <AppstoreOutlined />,
      },
      {
        label: "Subject Management",
        key: "/settings/subjects",
        icon: <BookOutlined />,
      },
      {
        label: "User Roles",
        key: "/settings/roles",
        icon: <SafetyOutlined />,
      },
      {
        label: "System Settings",
        key: "/settings/system",
        icon: <SettingOutlined />,
      },
    ],
  },
];

export default navConfig;
