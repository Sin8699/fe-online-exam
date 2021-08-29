import React, { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core'
import { isEqual } from 'lodash'
import useAxios from '../../hooks/useAxios'
import { UPDATE_INFO_PROFILE_USER } from '../../api/auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setProfileSaga } from '../../redux/action/profile'

const AccountProfileDetails = ({ dataProfile }) => {
  const [values, setValues] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    setValues({ ...dataProfile })
  }, [dataProfile])

  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value })
  }

  const { fetchData: updateProfileUser } = useAxios(UPDATE_INFO_PROFILE_USER(), false)

  const handleUpdateProfile = async () => {
    const code = await updateProfileUser({
      fullname: values.fullname,
    })
    if (code === 0) {
      toast.success('Submit success')
      dispatch(
        setProfileSaga({
          ...dataProfile,
          fullname: values.fullname,
        })
      )
    }
  }

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Full name" onChange={handleChange('fullname')} required value={values.fullname || ''} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Create at" value={dayjs(values.createdAt).format('DD-MM-YYYY') || ''} variant="outlined" disabled />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField fullWidth label="Phone Number" name="phone" onChange={handleChange} type="number" value={values.phone} variant="outlined" />
            </Grid> */}
            {/* <Grid item md={6} xs={12}>
              <TextField fullWidth label="Create at" type="date" onChange={handleChange('createdAt')} value={values.createdAt || ''} variant="outlined" />
            </Grid> */}
            {/* <Grid item md={6} xs={12}>
              <TextField fullWidth label="Select Gender" name="gender" onChange={handleChange} select SelectProps={{ native: true }} value={values.gender} variant="outlined">
                {genders.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button color="primary" variant="contained" onClick={handleUpdateProfile}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default React.memo(AccountProfileDetails, (prevProps, nextProps) => isEqual(prevProps, nextProps))
