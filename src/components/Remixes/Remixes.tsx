import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Box, Button } from '@mui/material';

import AbsoluteLoading from '@/shared/ui/AbsoluteLoading/AbsoluteLoading';
import { GET_REMIXES } from '@/graphql/queries';
import { RemixForm } from '../RemixForm';
import { Table } from '../Table';
import styles from './styles';
import { IRemixGetDto } from '@/graphql/types/_server';
import { SortForm } from '../SortForm';
import { stateToSortingVariables } from '@/helpers/functions';
import { ISortColumns } from '@/helpers/types';
import { defaultSortingState } from '@/helpers/constants';

const Remixes = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);
  const [isSortFormOpen, setIsSortFormOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [sorting, setSorting] = useState<ISortColumns>(defaultSortingState);

  const payload: IRemixGetDto = {
    paginate: {
      skip: page * rowsPerPage,
      take: rowsPerPage
    },
    sorts: stateToSortingVariables(sorting)
  };

  const remixes = useQuery(GET_REMIXES, {
    variables: payload
  });

  const handleCloseAddForm = (): void => setIsAddFormOpen(false);

  return (
    <Box sx={{ ...styles.page }}>
      {remixes.loading ? (
        <AbsoluteLoading />
      ) : (
        <>
          <Button onClick={() => setIsAddFormOpen(true)} sx={{ ...styles.addButton }}>
            Add remix
          </Button>

          <Button onClick={() => setIsSortFormOpen(true)} sx={{ ...styles.sortButton }}>
            Set sorting
          </Button>

          <Table
            remixes={remixes}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />

          {isAddFormOpen && <RemixForm remixes={remixes} handleCloseForm={handleCloseAddForm} />}

          {isSortFormOpen && (
            <SortForm setOpen={setIsSortFormOpen} setSorting={setSorting} sorting={sorting} />
          )}
        </>
      )}
    </Box>
  );
};

export default Remixes;
