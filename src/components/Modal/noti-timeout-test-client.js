import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';

export default function DialogNotification({ open, onSubmit }) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Đã hết giờ làm bài</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton variant="contained" onClick={onSubmit} autoFocus>
          Nộp bài
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
