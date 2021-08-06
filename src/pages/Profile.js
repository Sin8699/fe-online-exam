import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../components/account/AccountProfile";
import AccountProfileDetails from "../components/account/AccountProfileDetails";
import ChangePassword from "../components/account/ChangePassword";
import Page from "../components/Page";

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Page title="Dashboard | Profile | Online Exam-UI">
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <ChangePassword />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
