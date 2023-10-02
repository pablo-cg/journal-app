import Google from '@mui/icons-material/Google';
import { Alert, Button, Grid, Link, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startEmailLogIn, startGoogleSignIn } from '../../store/auth';
import { AuthLayout } from '../layout/auth-layout';

const initialFormState = {
  email: '',
  password: '',
  // email: 'john@doe.com',
  // password: '123456',
};

const formValidations = {
  email: [
    (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    'Debe ser un Correo válido',
  ],
  password: [
    (value) => value.trim().length >= 6,
    'La contraseña debe tener más de 6 caracteres',
  ],
};

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const {
    onInputChange,
    formState,
    isFormValid,
    emailMessage,
    passwordMessage,
  } = useForm(initialFormState, formValidations);

  function handleSubmit(event) {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startEmailLogIn(formState));
  }

  function onGoogleSignIn() {
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} aria-label="submit-form">
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              type="email"
              placeholder="email@email.com"
              name="email"
              onChange={onInputChange}
              value={formState.email}
              error={!!emailMessage && formSubmitted}
              helperText={emailMessage}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              inputProps={{
                'data-testid': 'password',
              }}
              onChange={onInputChange}
              value={formState.password}
              error={!!passwordMessage && formSubmitted}
              helperText={passwordMessage}
            />
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid display={errorMessage ? '' : 'none'} item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Iniciar Sesión
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                sx={{ display: 'flex', gap: 0.5 }}
                onClick={onGoogleSignIn}
                aria-label="google-btn"
              >
                <Google />
                <span>Google</span>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/sign-in">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
