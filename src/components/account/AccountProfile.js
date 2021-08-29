import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@material-ui/core'
import faker from 'faker'
import Upload from 'rc-upload'

const avatarTemp = faker.image.avatar()

const AccountProfile = ({ dataProfile }) => {
  const [values, setValues] = useState({})
  useEffect(() => {
    setValues({ ...dataProfile })
  }, [dataProfile])

  return (
    <Card>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar src={avatarTemp} sx={{ height: 100, width: 100 }} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {values.fullname}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {values.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          <Upload
            multiple={false}
            action={() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve('/upload.do')
                }, 2000)
              })
            }}
            onStart={(file) => {
              console.log('onStart', file, file.name)
            }}
            onSuccess={(ret) => {
              console.log('onStart', ret)
            }}
            onError={(file) => {
              console.log('onStart', file, file.name)
            }}
          >
            Upload avt
          </Upload>
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile
