import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import homeFill from '@iconify/icons-eva/home-fill'
import personFill from '@iconify/icons-eva/person-fill'
import settings2Fill from '@iconify/icons-eva/settings-2-fill'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
// material
import { alpha } from '@material-ui/core/styles'
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@material-ui/core'
// components
import MenuPopover from '../../components/MenuPopover'
//
import { logout } from '../../api/config'
import { useSelector } from 'react-redux'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/profile',
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#',
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { profile: userInfo } = useSelector((state) => state.profileState)

  const { fullname = '', email = '', avatar = 'https://media.defense.gov/2020/Oct/25/2002523049/-1/-1/0/201025-M-AB981-003.JPG' } = userInfo
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={avatar} alt={fullname} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {fullname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            fullWidth
            color="inherit"
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
