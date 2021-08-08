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
// ----------------------------------------------------------------------

export default function App() {
  const accessToken = getAccessToken();
  const history = useNavigate();

  useEffect(() => {
    if (!accessToken) {
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
