import React, { useState } from "react";
import queryString from "query-string";
import useAxios from "../hooks/useAxios";
import { RESET_PASSWORD } from "../api/auth";
import { useNavigate } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Card, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";

import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { toast } from "react-toastify";

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

const ChangePasswordComp = (props) => {
  const navigate = useNavigate();

  const { fetchData: resetPasswordClient, loading } = useAxios(
    RESET_PASSWORD(),
    false
  );

  const [values, setValues] = useState({
    confirmPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { confirmPassword, newPassword } = values;
    if (confirmPassword !== newPassword) {
      toast.error("Confirm Password don't match", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    const { location } = window;
    const { forgotKey, email } = queryString.parse(location.search);

    const code = await resetPasswordClient({
      forgotKey,
      email,
      password: newPassword,
    });

    if (code === 0) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={onSubmit}>
      <Card>
        <CardHeader title="Change password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                required
                onChange={handleChange}
                value={values.newPassword}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                onChange={handleChange}
                required
                value={values.confirmPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={loading}
          >
            Save
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};

function ResetPassword() {
  return (
    <RootStyle title="Reset Password | Online Exam-UI">
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
          <ChangePasswordComp />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default ResetPassword;
