// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";

// import useAxios from "./hooks/useAxios";
// import { LOGIN } from "./api/auth";

// ----------------------------------------------------------------------

const ACCOUNT_ADMIN = {
  email: "admin@localhost.com",
  password: "ServiceCore!3",
};

export default function App() {
  // const { response, loading, fetchData } = useAxios(LOGIN(), false);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
