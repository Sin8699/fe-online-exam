import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../components/account/AccountProfile";
import AccountProfileDetails from "../components/account/AccountProfileDetails";
import ChangePassword from "../components/account/ChangePassword";
import Page from "../components/Page";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function Profile() {
  const { profile: userInfo } = useSelector((state) => state.profileState);

  //---------------------------------------------------------------------------------------------------------------------------

  return (
    <Page title="Dashboard | Profile | Online Exam-UI">
      <Box
        sx={{ backgroundColor: "background.default", minHeight: "100%", py: 3 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile dataProfile={userInfo} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails dataProfile={userInfo} />
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
