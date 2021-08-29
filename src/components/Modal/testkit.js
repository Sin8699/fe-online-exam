import React from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
//import { Link as RouterLink } from 'react-router-dom'
//material
import { DialogTitle, DialogContent, DialogActions, Grid, Button, TextField } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { LoadingButton } from '@material-ui/lab'

//icon
import { Icon } from '@iconify/react'
import closeFill from '@iconify/icons-eva/close-fill'
//constants
import { TYPE_MODAL } from '../../constants/modal'
//api
import useAxios from '../../hooks/useAxios'
import { CREATE_TEST_KIT, UPDATE_TEST_KIT } from '../../api/test-kit'
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
const startDateTemp = '2021-08-30 10:10:54.925075+07'
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

const ModalHeader = styled(DialogTitle)({ padding: 20, fontSize: 18, fontWeight: 600, borderBottom: '1px solid rgb(202, 207, 211)' })
const ModalBody = styled(DialogContent)({ padding: '0 20px 20px 20px' })
const ModalFooter = styled(DialogActions)({ borderTop: '1px solid rgb(202, 207, 211)', padding: '10px 20px' })
const initValue = { description: '', subject: '', course: '', startDate: startDateTemp, duration: 0 }

const TestKitModal = ({ onClose, selectedItem, typeModal }) => {
  let navigate = useNavigate()

  const { response: resCreate, fetchData: createTestKit, loading: create_loading } = useAxios(CREATE_TEST_KIT(), false)
  const { fetchData: updateTestKit, loading: update_loading } = useAxios(UPDATE_TEST_KIT(selectedItem?.id), false)

  const TestKitSchema = Yup.object().shape({
    description: Yup.string().required('Description required'),
    subject: Yup.string().required('Subject_id required'),
    course: Yup.string().required('Course_id required'),
    duration: Yup.number().min(30).max(120).required('Duration is required'),
  })

  const formik = useFormik({
    initialValues: typeModal === TYPE_MODAL.Edit ? selectedItem : initValue,
    validationSchema: TestKitSchema,
    onSubmit: async (formValue) => {
      if (typeModal === TYPE_MODAL.Create) {
        const code = await createTestKit(formValue)
        if (code === 0) navigate(`/dashboard/edittestkit/${resCreate.data}`)
      } else {
        const code = await updateTestKit(formValue)
        if (code === 0) onClose()
      }
    },
  })
  const { errors, touched, handleSubmit, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <ModalHeader>
          {typeModal === TYPE_MODAL.Create && 'New Test Kit'}
          {typeModal === TYPE_MODAL.Edit && selectedItem.id}
          <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                {...getFieldProps('subject')}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course"
                {...getFieldProps('Course')}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start date"
                {...getFieldProps('startDate')}
                error={Boolean(touched.startDate && errors.startDate)}
                helperText={touched.startDate && errors.startDate}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration"
                {...getFieldProps('duration')}
                error={Boolean(touched.duration && errors.duration)}
                helperText={touched.duration && errors.duration}
                type="number"
              />
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
          {/* {typeModal === TYPE_MODAL.Edit && (
            <Button component={RouterLink} to={`/dashboard/edittestkit/${selectedItem.id}`} variant="contained">
              Edit Question
            </Button>
          )} */}
          <LoadingButton type="submit" variant="contained" loading={typeModal === TYPE_MODAL.Create ? create_loading : update_loading}>
            {typeModal === TYPE_MODAL.Create ? 'Create' : 'Update'}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </FormikProvider>
  )
}

export default React.memo(TestKitModal)
