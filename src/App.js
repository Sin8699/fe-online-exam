import { Provider } from 'react-redux';
import appStore from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// components
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from 'axios-jwt';
import { isExpired } from './api/config';
// ----------------------------------------------------------------------

const NOT_CHECK_TOKEN = ['confirm-password', 'reset-password'];

export default function App() {
  const accessToken = getAccessToken();

  const history = useNavigate();

  useEffect(() => {
    const { pathname } = window.location;
    if ((!accessToken || isExpired()) && !NOT_CHECK_TOKEN.some((route) => pathname.includes(route))) {
      history('/login');
    }
  }, [accessToken, history]);

  return (
    <Provider store={appStore}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
        <ToastContainer />
      </ThemeConfig>
    </Provider>
  );
}
