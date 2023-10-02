import { CircularProgress, Grid, Typography } from '@mui/material';

export const AuthLoader = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4,
      }}
    >
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <CircularProgress color="warning" size={100} />
        <Typography
          fontSize={14}
          color="white"
          fontWeight="light"
          position="fixed"
        >
          Cargando...
        </Typography>
      </Grid>
    </Grid>
  );
};
