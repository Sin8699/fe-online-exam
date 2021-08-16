import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@material-ui/core';
import DateRangePickerViewDesktop from '@material-ui/lab/DateRangePicker/DateRangePickerViewDesktop';
import { isEqual } from 'lodash';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const AccountProfileDetails = ({ dataProfile }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({ ...dataProfile });
  }, [dataProfile]);

  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="First name" onChange={handleChange('firstName')} required value={values.firstName || ''} variant="outlined" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Last name" onChange={handleChange('lastName')} required value={values.lastName || ''} variant="outlined" />
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
              <TextField fullWidth label="Address" name="address" onChange={handleChange} value={values.address} variant="outlined" />
            </Grid> */}
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Gender"
                name="gender"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
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
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default React.memo(AccountProfileDetails, (prevProps, nextProps) => isEqual(prevProps, nextProps));
