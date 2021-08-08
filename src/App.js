// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// components
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "axios-jwt";
import { isExpired } from "./api/config";
// ----------------------------------------------------------------------

export default function App() {
  const accessToken = getAccessToken();

  const history = useNavigate();

  useEffect(() => {
    if (!accessToken || isExpired()) {
      history("/login");
    }
  }, [accessToken, history]);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
      <ToastContainer />
    </ThemeConfig>
  );
}
