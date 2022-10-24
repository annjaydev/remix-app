import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

import { emptySortingFieldValue, sortDirections, sortingFields } from '@/helpers/constants';
import { ColumnName, ISortColumns, SortFormProps } from '@/helpers/types';
import styles from './styles';

const SortForm: FC<SortFormProps> = ({ setOpen, setSorting, sorting }) => {
  const { handleSubmit, register } = useForm<ISortColumns>({
    mode: 'onBlur'
  });

  const [asc, desc] = sortDirections;

  const handleCloseForm = () => setOpen(false);

  const onSubmit: SubmitHandler<ISortColumns> = (data) => {
    setSorting(data);
    setOpen(false);
  };

  return (
    <Dialog open PaperProps={{ sx: styles.dialog }} onClose={handleCloseForm}>
      <DialogTitle>
        <Typography variant="h5">Sorting</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          Choose the necessary fields for sorting
        </DialogContentText>

        <form id="sortForm" onSubmit={handleSubmit(onSubmit)}>
          {sortingFields.map((field) => (
            <FormControl key={field.value} fullWidth>
              <InputLabel>{field.title}</InputLabel>

              <Select
                defaultValue={sorting[field.value as ColumnName]}
                fullWidth
                label={field.title}
                sx={{ mb: 3 }}
                {...register(field.value as ColumnName)}
              >
                <MenuItem key="no" value={emptySortingFieldValue}>
                  No sorting
                </MenuItem>

                <MenuItem key="asc" value={asc}>
                  Ascending
                </MenuItem>

                <MenuItem key="desc" value={desc}>
                  Descending
                </MenuItem>
              </Select>
            </FormControl>
          ))}
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseForm} sx={{ ...styles.actionButton }}>
          Cancel
        </Button>

        <Button form="sortForm" sx={{ ...styles.actionButton }} type="submit">
          Save sorting
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SortForm;
