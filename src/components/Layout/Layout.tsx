import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import styles from './styles';
import { Footer, Header } from '@/shared';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Box sx={styles.main}>
        <main>
          <Outlet />
        </main>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
