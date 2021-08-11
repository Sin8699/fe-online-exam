import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Subject from "./pages/Subject";
import Course from "./pages/Course";
import FindExamSubject from "./pages/FindExamSubject";
import User from "./pages/User";
import TestUserManager from "./pages/TestUser";
import NotFound from "./pages/Page404";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import TestKitManage from "./pages/TestKit";
import NewTestKitForm from "./pages/NewTestKit";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "profile", element: <Profile /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "test-user", element: <TestUserManager /> },
        { path: "testkit", element: <TestKitManage /> },
        { path: "new-testkit", element: <NewTestKitForm /> },
        { path: "products", element: <Products /> },
        { path: "subject", element: <Subject /> },
        { path: "course", element: <Course /> },
        { path: "find-exam-subject", element: <FindExamSubject /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "confirm-account", element: <VerifyEmail /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
