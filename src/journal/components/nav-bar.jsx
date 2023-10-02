import LogoutOutlined from '@mui/icons-material/LoginOutlined';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startLogOut } from '../../store/auth/thunks';

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(startLogOut());
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        marginLeft: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ marginRight: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>
          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
