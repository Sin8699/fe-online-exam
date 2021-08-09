import React, { useEffect } from "react";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { ACTIVE_CLIENT } from "../api/client";
import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Card, Stack, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import CircularProgress from "@material-ui/core/CircularProgress";

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  padding: theme.spacing(12, 0),
}));

function VerifyEmail() {
  const navigate = useNavigate();

  const { fetchData: activeClient, loading } = useAxios(ACTIVE_CLIENT(), false);

  useEffect(() => {
    (async function () {
      const { location } = window;
      console.log("location", location);
      const { activeKey, email } = queryString.parse(location.search);
      console.log("email", email);
      console.log("activeKey", activeKey);

      const code = await activeClient({
        activeKey,
        email,
      });
      console.log("code", code);

      if (code === 0) {
        navigate("/login", { replace: true });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootStyle title="Login | Online Exam-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Verify Email Online Exam
          </Typography>
          {loading && <CircularProgress />}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default VerifyEmail;
