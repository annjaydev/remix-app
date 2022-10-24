import { FC, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ClearIcon from '@mui/icons-material/Clear';

import { RemixTableProps } from '@/helpers/types';
import { columns, dataColumns, rowsPerPageSizes } from '@/helpers/constants';
import styles from './styles';
import { IRemixModel } from '@/graphql/types/_server';
import DeleteModal from '../DeleteModal/DeleteModal';
import { RemixForm } from '../RemixForm';

const Table: FC<RemixTableProps> = ({ remixes, page, setPage, rowsPerPage, setRowsPerPage }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

  const [currentRemix, setCurrentRemix] = useState<IRemixModel | undefined>(undefined);

  const {
    items,
    meta: { total }
  } = remixes.data.remixes;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRemix = (remix: IRemixModel): void => {
    setIsDeleteModalOpen(true);
    setCurrentRemix(remix);
  };

  const handleUpdateRemix = (remix: IRemixModel): void => {
    setIsUpdateFormOpen(true);
    setCurrentRemix(remix);
  };

  const handleCloseDeleteModal = (): void => setIsDeleteModalOpen(false);

  const handleCloseAddForm = (): void => setIsUpdateFormOpen(false);

  const getTableRow = (data: IRemixModel) => (
    <TableRow key={data.id}>
      {dataColumns.map((column) => {
        const cellValue = data[column.value as keyof IRemixModel];

        return (
          <TableCell key={column.value} align="left">
            {cellValue}
          </TableCell>
        );
      })}

      <TableCell onClick={() => handleUpdateRemix(data)}>
        <IconButton color="primary">
          <AutoFixHighIcon sx={styles.actionIcon} />
        </IconButton>
      </TableCell>

      <TableCell onClick={() => handleDeleteRemix(data)}>
        <IconButton color="primary">
          <ClearIcon sx={styles.actionIcon} />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ ...styles.tableContainer }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.value} align="left" width={column.width}>
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{(items as [IRemixModel]).map((remix) => getTableRow(remix))}</TableBody>
        </MuiTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageSizes}
        count={total}
        labelRowsPerPage="Remixes per page"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {isDeleteModalOpen && (
        <DeleteModal
          id={currentRemix?.id}
          handleCloseModal={handleCloseDeleteModal}
          remixes={remixes}
        />
      )}

      {isUpdateFormOpen && (
        <RemixForm
          currentRemix={currentRemix}
          isUpdate
          remixes={remixes}
          handleCloseForm={handleCloseAddForm}
        />
      )}
    </>
  );
};

export default Table;
