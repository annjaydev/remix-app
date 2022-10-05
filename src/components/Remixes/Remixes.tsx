import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Box, Button } from '@mui/material';

import AbsoluteLoading from '@/shared/ui/AbsoluteLoading/AbsoluteLoading';
import { GET_REMIXES } from '@/graphql/queries';
import { RemixForm } from '../RemixForm';
import { Table } from '../Table';
import styles from './styles';

const Remixes = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState<boolean>(false);

  const remixes = useQuery(GET_REMIXES);

  return (
    <Box sx={{ ...styles.page }}>
      <Button onClick={() => setIsAddFormOpen(true)} sx={{ ...styles.addButton }}>
        Add remix
      </Button>

      {remixes.loading ? <AbsoluteLoading /> : <Table remixes={remixes} />}

      {isAddFormOpen && <RemixForm remixes={remixes} setOpen={setIsAddFormOpen} />}
    </Box>
  );
};

export default Remixes;
