import React from 'react'
import dayjs from 'dayjs'
//material
import { Grid, Button, TextField, InputAdornment } from '@material-ui/core'
import { ModalHeader, ModalBody, ModalFooter } from '../../assets/styled/Modal'
import { LoadingButton } from '@material-ui/lab'
import AdapterDayjs from '@material-ui/lab/AdapterDayjs'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import DateTimePicker from '@material-ui/lab/DateTimePicker'
//icon
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
//constants
import { TYPE_MODAL } from '../../constants/modal'
//helpers
import validateData from '../../helpers/validationSchema'
import { toast } from 'react-toastify'
//api
import useAxios from '../../hooks/useAxios'
import { CREATE_TEST_KIT, UPDATE_TEST_KIT } from '../../api/test-kit'
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

const TestKitModal = ({ onClose, selectedItem, typeModal, onSuccess }) => {
  const [formValue, setFormValue] = React.useState({})
  const [errors, setErrors] = React.useState({})

  React.useEffect(() => {
    typeModal === TYPE_MODAL.Edit ? setFormValue({ ...selectedItem }) : setFormValue({ startDate: null })
  }, [selectedItem, typeModal])

  const { fetchData: createTestKit, loading: create_loading } = useAxios(CREATE_TEST_KIT(), false)
  const { fetchData: updateTestKit, loading: update_loading } = useAxios(UPDATE_TEST_KIT(selectedItem?.id), false)

  const create = async (data) => {
    const code = await createTestKit(data)
    if (code === 0) {
      toast.success('Create success')
      onSuccess()
    }
  }
  const update = async (data) => {
    const code = await updateTestKit(data)
    if (code === 0) {
      toast.success('Update success')
      onSuccess()
    }
  }

  const handleSubmit = async () => {
    try {
      await validateData('testkitSchema', { ...formValue, startDate: dayjs(formValue.startDate).format() }, (data) => {
        if (typeModal === TYPE_MODAL.Create) create(data)
        else update(data)
      })
    } catch (errs) {
      setErrors(errs)
    }
  }

  const handleChangeForm = (key) => (e) => {
    let value
    switch (key) {
      case 'startDate':
        value = e
        break
      case 'duration':
        value = +e.target.value
        break
      default:
        value = e.target.value
        break
    }
    setFormValue({ ...formValue, [key]: value })
    setErrors({ ...errors, [key]: false })
  }

  return (
    <>
      <ModalHeader>
        {typeModal === TYPE_MODAL.Create && 'New Test Kit'}
        {typeModal === TYPE_MODAL.Edit && `Code Test Kit: ${selectedItem.id}`}
        <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formValue.description || ''}
                onChange={handleChangeForm('description')}
                error={Boolean(errors.description)}
                helperText={errors.description}
                multiline
                maxRows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                value={formValue.subject || ''}
                onChange={handleChangeForm('subject')}
                error={Boolean(errors.subject)}
                helperText={errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course"
                value={formValue.course || ''}
                onChange={handleChangeForm('course')}
                error={Boolean(errors.course)}
                helperText={errors.course}
              />
            </Grid>
            <Grid item xs={8}>
              <DateTimePicker
                renderInput={(props) => {
                  return <TextField {...props} fullWidth error={Boolean(errors.startDate)} helperText={errors.startDate} />
                }}
                label="Start date"
                value={formValue.startDate}
                onChange={handleChangeForm('startDate')}
                inputFormat="DD/MM/YYYY hh:mm a"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Duration"
                type="number"
                value={formValue.duration || ''}
                onChange={handleChangeForm('duration')}
                error={Boolean(errors.duration)}
                helperText={errors.duration}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minute</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
        <LoadingButton variant="contained" loading={typeModal === TYPE_MODAL.Create ? create_loading : update_loading} onClick={handleSubmit}>
          {typeModal === TYPE_MODAL.Create ? 'Create' : 'Update'}
        </LoadingButton>
      </ModalFooter>
    </>
  )
}

export default React.memo(TestKitModal)
