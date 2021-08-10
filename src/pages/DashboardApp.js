// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppTest,
  AppCurrentSubject,
  AppConversionRates,
} from "../components/_dashboard/app";

import { LIST_CLIENT_TEST } from "../api/client-test";
import { CLIENT_LIST } from "../api/client";
import { SUBJECT_LIST } from "../api/subject";
import useAxios from "../hooks/useAxios";

// ----------------------------------------------------------------------
const categories = [
  "Test 1",
  "Test 2",
  "Test 3",
  "Test 4",
  "Test 5",
  "Test 6",
  "Test 7",
  "Test 8",
  "Test 9",
  "Test 10",
];

const points = [8, 6, 8.6, 9.8, 1, 2, 7, 5, 4, 8];

export default function DashboardApp() {
  const { response: resClientTest } = useAxios(LIST_CLIENT_TEST());
  const dataTest = (resClientTest || {}).data || [];

  const { response: resUsers } = useAxios(CLIENT_LIST());
  const users = (resUsers || {}).data || [];

  const { response: resSubjects } = useAxios(SUBJECT_LIST());
  const subjects = (resSubjects || {}).data || [];

  return (
    <Page title="Dashboard | Online Exam-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {/*================================================ ADMIN */}
          <Grid item xs={12} sm={6} md={3}>
            <AppTest total={dataTest.length} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers total={users.length} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders total={subjects.length} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports total={3} />
          </Grid>
          {/*================================================ ADMIN */}

          <Grid item xs={12} md={6} lg={12}>
            <AppConversionRates
              data={{
                categories: categories,
                points: points,
              }}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
