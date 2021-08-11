import React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
//material
import { DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/styles';
//icon
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
//constants
import { TYPE_MODAL } from '../../constants/modal';
//api
import useAxios from '../../hooks/useAxios';
import { CREATE_COURSE, UPDATE_COURSE } from '../../api/course';

const ModalHeader = styled(DialogTitle)({ padding: 20, fontSize: 18, fontWeight: 600, borderBottom: '1px solid rgb(202, 207, 211)' });
const ModalBody = styled(DialogContent)({ padding: '0 20px 20px 20px' });
const ModalFooter = styled(DialogActions)({ borderTop: '1px solid rgb(202, 207, 211)', padding: '10px 20px' });

const CourseModal = ({ onClose, onSuccess, typeModal, selectedItem }) => {
  const initValue = { name: '', description: '', status: '' };

  const { fetchData: createCourse, loading: create_loading } = useAxios(CREATE_COURSE(), false);
  const { fetchData: updateCourse, loading: update_loading } = useAxios(UPDATE_COURSE(), false);

  const CourseSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    description: Yup.string().required('Description name required'),
    status: Yup.string().required('Status name required'),
  });

  const formik = useFormik({
    initialValues: selectedItem || initValue,
    validationSchema: CourseSchema,
    onSubmit: async (formValue) => {
      let code;
      if (typeModal === TYPE_MODAL.Create) code = await createCourse(formValue);
      else code = await updateCourse(formValue);
      if (code === 0) {
        onClose();
        onSuccess();
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <ModalHeader>
          {typeModal === TYPE_MODAL.Edit && selectedItem.name}
          {typeModal === TYPE_MODAL.Create && 'New course'}
          <Icon icon={closeFill} width={24} height={24} style={{ cursor: 'pointer', float: 'right', color: '#CACFD3' }} onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Grid container spacing={3} style={{ marginTop: 5 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Status"
                {...getFieldProps('status')}
                error={Boolean(touched.status && errors.status)}
                helperText={touched.status && errors.status}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                fullWidth
                rows={4}
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
          <LoadingButton variant="contained" type="submit" loading={typeModal === TYPE_MODAL.Create ? create_loading : update_loading}>
            {typeModal === TYPE_MODAL.Edit ? 'Update' : 'Create'}
          </LoadingButton>
        </ModalFooter>
      </Form>
    </FormikProvider>
  );
};

export default React.memo(CourseModal);
