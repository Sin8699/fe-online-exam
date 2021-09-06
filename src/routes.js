import { Navigate, useRoutes } from 'react-router-dom'
// layouts
import DashboardLayout from './layouts/dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
//
import DashboardApp from './pages/DashboardApp'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Profile from './pages/Profile'
import TestExam from './pages/TestExam'
import TestKitManage from './pages/TestKit'
import TestKitForm from './pages/EditTestKit'
import VerifyEmailSuccess from './pages/VerifyEmailSuccess'
import VerifyEmailError from './pages/VerifyEmailError'
import TestUserManager from './pages/TestUser'
import ManagerTestUserByOwner from './pages/TestsByOwner'
// import ResetPassword from './pages/ResetPassword'
import LoginGoogleSuccess from './pages/LoginGoogleSuccess'
import ForgotPassword from './pages/ForgotPassword'
import FindExamSubject from './pages/FindExam'
import NotFound from './pages/Page404'

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
        { path: 'tests-by-owner', element: <ManagerTestUserByOwner /> },
        { path: 'testkit', element: <TestKitManage /> },
        { path: 'edittestkit/:slug', element: <TestKitForm /> },
        { path: 'test-exam/:id', element: <TestExam /> },
        { path: 'find-exam', element: <FindExamSubject /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'verify-success', element: <VerifyEmailSuccess /> },
        { path: 'verify-error', element: <VerifyEmailError /> },
        { path: 'login-success/:token', element: <LoginGoogleSuccess /> },
        // { path: 'reset-password', element: <ResetPassword /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}
