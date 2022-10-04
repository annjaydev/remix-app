import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FetchResult, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
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
  TextField,
  Typography
} from '@mui/material';

import { RemixFormProps } from '@/helpers/types';
import { GenreTypeEnum, IRemixCreateDto, IRemixUpdateDto } from '@/graphql/types/_server';
import { CREATE_REMIX, UPDATE_REMIX } from '@/graphql/mutations';
import {
  descriptionFieldValidation,
  emailFieldValidation,
  nameFieldValidation,
  priceFieldValidation,
  trackLengthFieldValidation
} from './validation';
import styles from './styles';
import { remixesGenres, successCreateMessage } from '@/helpers/constants';

export const RemixForm: FC<RemixFormProps> = ({
  remixes,
  setOpen,
  currentRemix,
  isUpdate = false
}) => {
  const {
    register,
    formState: { dirtyFields, errors },
    handleSubmit
  } = useForm<IRemixCreateDto>({
    mode: 'onBlur',
    defaultValues: currentRemix ?? {}
  });

  const [createRemix, createdRemix] = useMutation(CREATE_REMIX);
  const [updateRemix, updatedRemix] = useMutation(UPDATE_REMIX);

  const { enqueueSnackbar } = useSnackbar();

  const loading = createdRemix.loading || updatedRemix.loading;
  const formTitle = `${isUpdate ? 'Edit' : 'Add'} remix`;

  const getEditedFieldsValues = (formData: IRemixUpdateDto): IRemixUpdateDto => {
    const dirtyFieldsList = Object.keys(dirtyFields) as (keyof IRemixUpdateDto)[];

    const dirtyFieldsData = dirtyFieldsList.reduce(
      (obj, propertyKey) => ({ ...obj, [propertyKey]: formData[propertyKey] }),
      {}
    );

    return { id: formData.id, ...dirtyFieldsData };
  };

  const handleMutationResponse = (
    answer: Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
  ): void => {
    answer
      .then((res) => {
        if (res.data) {
          remixes.refetch();
          enqueueSnackbar(successCreateMessage, { variant: 'success' });
        }
      })
      .catch((err) => enqueueSnackbar(err.errors[0].message, { variant: 'error' }))
      .finally(() => setOpen(false));
  };

  const handleCreateRemix = (data: IRemixCreateDto): void => {
    const mutationData = { ...data, isStore: true };
    const pendingResults = createRemix({ variables: { remixValues: mutationData } });

    handleMutationResponse(pendingResults);
  };

  const handleUpdateRemix = (data: IRemixUpdateDto): void => {
    const mutationData = getEditedFieldsValues(data);
    const pendingResults = updateRemix({ variables: { remixValues: mutationData } });

    handleMutationResponse(pendingResults);
  };

  const onSubmit: SubmitHandler<IRemixCreateDto> = (data) => {
    isUpdate ? handleUpdateRemix({ ...data, id: currentRemix!.id }) : handleCreateRemix(data);
  };

  return (
    <Dialog open>
      <DialogTitle>
        <Typography variant="h5">{formTitle}</Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 1 }}>
          {`To ${formTitle.toLowerCase()}, please fill the fields below.`}
        </DialogContentText>

        <form id="remixForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Author Email"
            fullWidth
            error={!!errors?.authorEmail}
            helperText={errors?.authorEmail?.message ?? ' '}
            variant="outlined"
            {...register('authorEmail', emailFieldValidation)}
          />

          <TextField
            label="Remix name"
            fullWidth
            error={!!errors?.name}
            helperText={errors?.name?.message ?? ' '}
            variant="outlined"
            {...register('name', nameFieldValidation)}
          />

          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              defaultValue={GenreTypeEnum.Electronic}
              fullWidth
              label="Genre"
              sx={{ mb: 3 }}
              {...register('genre')}
            >
              {remixesGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            inputProps={{ min: 1 }}
            label="Price"
            type="number"
            error={!!errors?.price}
            helperText={errors?.price?.message ?? ' '}
            {...register('price', priceFieldValidation)}
          />

          <TextField
            fullWidth
            inputProps={{ min: 1 }}
            label="Track Length"
            type="number"
            error={!!errors?.trackLength}
            helperText={errors?.trackLength?.message ?? ' '}
            {...register('trackLength', trackLengthFieldValidation)}
          />

          <TextField
            fullWidth
            placeholder="Enter remix description here"
            multiline
            rows={3}
            error={!!errors?.description}
            helperText={errors?.description?.message ?? ' '}
            {...register('description', descriptionFieldValidation)}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(false)} sx={{ ...styles.actionButton }}>
          Cancel
        </Button>

        <Button form="remixForm" sx={{ ...styles.actionButton }} type="submit">
          {loading ? 'Wait...' : formTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
