import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import styles from './styles';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const tabs = [
    {
      value: '/',
      label: 'Home'
    },
    {
      value: '/remixes',
      label: 'Remixes'
    }
  ];

  return (
    <header>
      <Box sx={styles.filler} />
      <Box sx={styles.headerWrapper}>
        <Tabs
          value={location.pathname}
          onChange={handleChange}
          sx={styles.headerTabs}
          aria-label="secondary tabs example"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>
    </header>
  );
};

export default Header;
