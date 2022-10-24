import { FC } from 'react';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';

import { DELETE_REMIX } from '@/graphql/mutations';
import { DeleteModalProps } from '@/helpers/types';
import styles from './styles';
import { successDeleteMessage } from '@/helpers/constants';

const DeleteModal: FC<DeleteModalProps> = ({ id, remixes, handleCloseModal }) => {
  const [deleteRemix, deletedRemix] = useMutation(DELETE_REMIX);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRemix = () => {
    deleteRemix({ variables: { id } })
      .then((res) => {
        if (res.data) {
          remixes.refetch();
          enqueueSnackbar(successDeleteMessage, { variant: 'success' });
          deletedRemix.client.resetStore();
        }
      })
      .catch((err) => enqueueSnackbar(err.errors[0].message, { variant: 'error' }))
      .finally(handleCloseModal);
  };

  return (
    <Dialog open onClose={handleCloseModal}>
      <DialogTitle>
        <Typography variant="h5">Delete Remix</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          Are you sure you want to delete the current remix?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Grid container justifyContent="space-between">
          <Button sx={{ ...styles.actionButton }} onClick={handleDeleteRemix}>
            {deletedRemix.loading ? 'Wait...' : 'Delete'}
          </Button>

          <Button sx={{ ...styles.actionButton }} onClick={handleCloseModal}>
            Cancel
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
