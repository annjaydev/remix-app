import { useMemo } from 'react';
import Box from '@mui/material/Box';
import getCurrentYear from '@/utils/getCurrentYear';
import styles from './styles';

const Footer = () => {
  const currentYearMemoized = useMemo(() => getCurrentYear(), []);
  return (
    <footer>
      <Box sx={styles.footer}>© {currentYearMemoized} Enjoy the sound</Box>
    </footer>
  );
};

export default Footer;
