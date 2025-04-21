import { RouteObject } from 'react-router-dom';
import { adminRoutes } from './adminRoutes';
import { studentRoutes } from './studentRoutes';
import { teacherRoutes } from './teacherRoutes';
import { staffRoutes } from './staffRoutes';
import { settingsRoutes } from './settingsRoutes';
import { gymRoutes } from './gymRoutes';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import { Navigate } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      ...adminRoutes,
      ...studentRoutes,
      ...teacherRoutes,
      ...staffRoutes,
      ...settingsRoutes,
      ...gymRoutes,
      { path: '*', element: <NotFound /> },
    ],
  },
];