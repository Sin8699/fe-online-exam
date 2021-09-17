import { Provider } from 'react-redux'
import appStore from './redux/store'
// routes
import Router from './routes'
// theme
import ThemeConfig from './theme'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// components
import ScrollToTop from './components/ScrollToTop'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from 'axios-jwt'
import split from 'lodash/split'
import { isExpired } from './api/config'
import { saveToStorage } from './utils/storage'
// ----------------------------------------------------------------------
//&& !NOT_CHECK_TOKEN.some((route) => pathname.includes(route))
// ----------------------------------------------------------------------

const NOT_AUTH = ['/verify-success', '/verify-error', '/login', '/register', '/forgot-password']

export default function App() {
  const accessToken = getAccessToken()

  const history = useNavigate()

  useEffect(() => {
    const { pathname } = window.location
    const loginByGoogle = (split(pathname, '/')[1] || '') === 'login-success'
    const exam = (split(pathname, '/')[2] || '') === 'test-exam'

    if ((NOT_AUTH.includes(pathname) || loginByGoogle) && !accessToken) {
      history(pathname)
    } else {
      if (isExpired()) {
        window.localStorage.clear()
        history('/login')
      }
      if (exam) saveToStorage('linkExam', pathname)
    }
  }, [accessToken, history])

  return (
    <Provider store={appStore}>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
        <ToastContainer />
      </ThemeConfig>
    </Provider>
  )
}
