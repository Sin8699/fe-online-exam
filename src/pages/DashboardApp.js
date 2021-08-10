// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppTest,
  // AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";

import checkRole from "../helpers/checkRole";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { isAdmin } = checkRole();

  return (
    <Page title="Dashboard | Online Exam-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {isAdmin && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppTest />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppNewUsers />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppItemOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBugReports total={3} />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
