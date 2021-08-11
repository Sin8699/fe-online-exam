import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

const DialogConfirmAction = ({ open, onClose, onSubmit, isLoading }) => {
  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Are you sure</DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={onSubmit} autoFocus>
          Agree
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmAction;
