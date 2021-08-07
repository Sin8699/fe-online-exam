import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const DialogConfirmAction = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Are you sure</DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmAction;
