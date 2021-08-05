import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Card, Stack, Link, Container, Typography } from "@material-ui/core";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { TextField } from "@material-ui/core";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@material-ui/lab";

import * as Yup from "yup";

// ----------------------------------------------------------------------

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
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      // navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <RootStyle title="Login | Online Exam-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Ohhhh!!!!
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Forgot Password?
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your email and we will send you instruction to reset your
              password.
            </Typography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ my: 2 }}
              >
                Login
              </LoadingButton>
              <LoadingButton
                fullWidth
                size="large"
                type="button"
                variant="outlined"
                loading={isSubmitting}
                href="/"
              >
                Back
              </LoadingButton>
            </Form>
          </FormikProvider>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
