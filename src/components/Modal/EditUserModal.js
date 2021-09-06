import React from 'react'
//material
import { Grid, Button, Select, MenuItem } from '@material-ui/core'
import { ModalHeader, ModalBody, ModalFooter } from '../../assets/styled/Modal'
import { LoadingButton } from '@material-ui/lab'
import AdapterDayjs from '@material-ui/lab/AdapterDayjs'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
//icon
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
//constants
import { TYPE_MODAL } from '../../constants/modal'
//helpers
import { toast } from 'react-toastify'
//api
import useAxios from '../../hooks/useAxios'
import { UPDATE_USER } from '../../api/users'
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

const EditUserModal = ({ onClose, selectedItem, typeModal, onSuccess }) => {
  const [newRole, setRole] = React.useState(selectedItem.role)

  const { fetchData: updateUserByAdmin, loading: update_loading } = useAxios(UPDATE_USER(selectedItem?.id), false)

  const update = async (data) => {
    const code = await updateUserByAdmin(data)
    if (code === 0) {
      toast.success('Update success')
      onSuccess(data)
    }
  }

  const handleSubmit = async () => {
    try {
      const data = {
        role: newRole,
        status: selectedItem.status
      }

      update(data)
    } catch (errs) {
      console.log('errs', errs)
    }
  }

  return (
    <>
      <ModalHeader>
        {typeModal === TYPE_MODAL.Edit && `Edit user: ${selectedItem.email}`}
        <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Select
                labelId="Role"
                id="role"
                fullWidth
                value={newRole}
                onChange={(e) => {
                  setRole(e.target.value)
                }}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <LoadingButton variant="contained" loading={update_loading} onClick={handleSubmit}>
          {typeModal === TYPE_MODAL.Create ? 'Create' : 'Update'}
        </LoadingButton>
      </ModalFooter>
    </>
  )
}

export default React.memo(EditUserModal)
