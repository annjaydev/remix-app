import { FC, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ClearIcon from '@mui/icons-material/Clear';

import { RemixTableProps } from '@/helpers/types';
import { columns, dataColumns } from '@/helpers/constants';
import styles from './styles';
import { IRemixModel } from '@/graphql/types/_server';
import DeleteModal from '../DeleteModal/DeleteModal';
import { RemixForm } from '../RemixForm';

const Table: FC<RemixTableProps> = ({ remixes }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState<boolean>(false);

  const [currentRemix, setCurrentRemix] = useState<IRemixModel | undefined>(undefined);

  const remixesData: [IRemixModel] = remixes.data.remixes.items;

  const handleDeleteRemix = (remix: IRemixModel): void => {
    setIsDeleteModalOpen(true);
    setCurrentRemix(remix);
  };

  const handleUpdateRemix = (remix: IRemixModel): void => {
    setIsUpdateFormOpen(true);
    setCurrentRemix(remix);
  };

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
        <Tooltip title="Edit Remix">
          <AutoFixHighIcon sx={styles.actionIcon} />
        </Tooltip>
      </TableCell>

      <TableCell onClick={() => handleDeleteRemix(data)}>
        <Tooltip title="Delete Remix">
          <ClearIcon sx={styles.actionIcon} />
        </Tooltip>
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
          <TableBody>{remixesData.map((remix) => getTableRow(remix))}</TableBody>
        </MuiTable>
      </TableContainer>

      {isDeleteModalOpen && (
        <DeleteModal id={currentRemix?.id} setOpen={setIsDeleteModalOpen} remixes={remixes} />
      )}

      {isUpdateFormOpen && (
        <RemixForm
          currentRemix={currentRemix}
          isUpdate
          remixes={remixes}
          setOpen={setIsUpdateFormOpen}
        />
      )}
    </>
  );
};

export default Table;
