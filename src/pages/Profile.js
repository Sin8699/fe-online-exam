import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import { useState, useEffect } from 'react';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import ChangePassword from '../components/account/ChangePassword';
import Page from '../components/Page';
import { GET_INFO_PROFILE_CLIENT, GET_INFO_PROFILE_MANAGER, UPDATE_INFO_PROFILE_CLIENT, UPDATE_INFO_PROFILE_MANAGER } from '../api/auth';
import checkRole from '../helpers/checkRole';
import useAxios from '../hooks/useAxios';

// ----------------------------------------------------------------------

export default function Profile() {
  const { isClient } = checkRole();
  //Cách 1
  // let func;
  // isClient ? (func = GET_INFO_PROFILE_CLIENT()) : (func = GET_INFO_PROFILE_MANAGER());
  // const { response: resClientTest } = useAxios(func);

  //Cách 2 ---------------------------------------------------------------------------------------------------------------------
  const [userInfo, setUserInfo] = useState({});
  const { response: profile, fetchData: getProfileClient } = useAxios(GET_INFO_PROFILE_CLIENT(), false);
  const { response: profileManager, fetchData: getProfileManager } = useAxios(GET_INFO_PROFILE_MANAGER(), false);
  useEffect(() => {
    (async function () {
      if (isClient) await getProfileClient();
      else await getProfileManager();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setUserInfo(isClient ? profile : profileManager);
  }, [isClient, profile, profileManager]);
  console.log('userInfo: ', userInfo);
  //---------------------------------------------------------------------------------------------------------------------------

  return (
    <Page title="Dashboard | Profile | Online Exam-UI">
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
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
