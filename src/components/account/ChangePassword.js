import { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core'
import { toast } from 'react-toastify'
import { optionToastDefaults } from '../../constant'
import { CHANGE_PASSWORD } from '../../api/auth'
import useAxios from '../../hooks/useAxios'

const ChangePassword = (props) => {
  const { fetchData: changePassword } = useAxios(CHANGE_PASSWORD(), false)
  const [values, setValues] = useState({ oldPassword: '', confirmPassword: '', newPassword: '' })

  const handleChangePassword = async () => {
    if (values.confirmPassword !== values.newPassword) {
      toast.error('New password no match with Confirm New password', optionToastDefaults)
    } else {
      const code = await changePassword({
        oldPass: values.oldPassword,
        newPass: values.newPassword
      })
      if (code === 0) {
        toast.success('Change Password success')
        setValues({ oldPassword: '', confirmPassword: '', newPassword: '' })
      }
    }
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader title="Change password" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Old Password"
                name="oldPassword"
                onChange={handleChange}
                required
                value={values.oldPassword}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                onChange={handleChange}
                required
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
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleChangePassword}>
            Save
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default ChangePassword
