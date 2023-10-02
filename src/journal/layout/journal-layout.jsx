import { Box } from '@mui/material';
import { NavBar, SideBar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, paddingX: 3, marginTop: 11 }}>
        {children}
      </Box>
    </Box>
  );
};
