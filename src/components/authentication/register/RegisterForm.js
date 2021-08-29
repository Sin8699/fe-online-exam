import * as Yup from 'yup'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useFormik, Form, FormikProvider } from 'formik'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
import { useNavigate } from 'react-router-dom'
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import useAxios from '../../../hooks/useAxios'
import { REGISTER_USER } from '../../../api/auth'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { fetchData: registerUser, loading } = useAxios(REGISTER_USER(), false)

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({ fullname, email, password }) => {
      const code = await registerUser({
        fullname,
        email,
        password,
      })
      if (code === 0) {
        navigate('/login', { replace: true })
      }
    },
  })

  const { errors, touched, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Full name"
              {...getFieldProps('fullname')}
              error={Boolean(touched.fullname && errors.fullname)}
              helperText={touched.fullname && errors.fullname}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
