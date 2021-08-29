import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import { Card, Container, Typography, Divider, Button } from '@material-ui/core'
// components
import Page from '../components/Page'
import { MHidden } from '../components/@material-extend'

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}))

function VerifyEmailError() {
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
          <Typography variant="h4" gutterBottom style={{ color: '#FF4842' }}>
            Verify Email Online Exam Error
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Button component={RouterLink} variant="outlined" to="/login" color="error">
            Back to login page
          </Button>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}

export default VerifyEmailError
