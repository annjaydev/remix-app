import { FC } from 'react';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { DELETE_REMIX } from '@/graphql/mutations';
import { DeleteModalProps } from '@/helpers/types';
import styles from './styles';
import { successDeleteMessage } from '@/helpers/constants';

const DeleteModal: FC<DeleteModalProps> = ({ id, remixes, setOpen }) => {
  const [deleteRemix, deletedRemix] = useMutation(DELETE_REMIX);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRemix = () => {
    deleteRemix({ variables: { id } })
      .then((res) => {
        if (res.data) {
          remixes.refetch();
          enqueueSnackbar(successDeleteMessage, { variant: 'success' });
        }
      })
      .catch((err) => enqueueSnackbar(err.errors[0].message, { variant: 'error' }))
      .finally(() => setOpen(false));
  };

  return (
    <Modal open>
      <Box sx={{ ...styles.modal }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Delete Remix
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Are you sure you want to delete the current remix?
        </Typography>

        <Grid container justifyContent="space-between">
          <Button sx={{ ...styles.actionButton }} onClick={handleDeleteRemix}>
            {deletedRemix.loading ? 'Wait...' : 'Delete'}
          </Button>

          <Button sx={{ ...styles.actionButton }} onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
