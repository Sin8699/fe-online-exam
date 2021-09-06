// material
import { Box, Grid, Container, Typography } from '@material-ui/core'
// components
import Page from '../components/Page'
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppTest,
  // AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app'
import { useDispatch } from 'react-redux'
import { actionTypesUsers } from '../redux/action/users'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actionTypesUsers.REQUEST_USERS_DATA })
  }, [dispatch])

  const { profile } = useSelector((state) => state.profileState)

  return (
    <Page title="Dashboard | Online Exam-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {profile?.role === 'ADMIN' ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppNewUsers />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppTest />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppItemOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBugReports />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} md={12} lg={12}>
              <AppConversionRates />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  )
}
