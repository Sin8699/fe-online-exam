import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import Course from './pages/Course';
import Subject from './pages/Subject';
import Profile from './pages/Profile';
import TestExam from './pages/TestExam';
import TestKitManage from './pages/TestKit';
import TestKitForm from './pages/EditTestKit';
import VerifyEmail from './pages/VerifyEmail';
import TestUserManager from './pages/TestUser';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import FindExamSubject from './pages/FindExam';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'profile', element: <Profile /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'test-user', element: <TestUserManager /> },
        { path: 'testkit', element: <TestKitManage /> },
        { path: 'edittestkit/:slug', element: <TestKitForm /> },
        { path: 'test-exam', element: <TestExam /> },
        { path: 'subject', element: <Subject /> },
        { path: 'course', element: <Course /> },
        { path: 'find-exam-subject', element: <FindExamSubject /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'confirm-account', element: <VerifyEmail /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
