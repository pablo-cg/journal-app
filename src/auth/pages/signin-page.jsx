import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startEmailSignUp } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/auth-layout';

const initialFormState = {
  displayName: '',
  email: '',
  password: '',
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
  displayName: [(value) => !!value.trim().length, 'El nombre es obligatorio'],
};

export const SignInPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const { errorMessage, status } = useSelector((state) => state.auth);

  const isSigningUp = useMemo(() => status === 'checking', [status]);

  const {
    onInputChange,
    formState,
    isFormValid,
    displayNameMessage,
    emailMessage,
    passwordMessage,
  } = useForm(initialFormState, formValidations);

  function handleSubmit(event) {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startEmailSignUp(formState));
  }

  return (
    <AuthLayout title="Registro">
      <form onSubmit={handleSubmit}>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              type="text"
              placeholder="Juan Pérez"
              name="displayName"
              value={formState.displayName}
              onChange={onInputChange}
              error={!!displayNameMessage && formSubmitted}
              helperText={displayNameMessage}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo"
              type="email"
              placeholder="email@email.com"
              name="email"
              value={formState.email}
              onChange={onInputChange}
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
              value={formState.password}
              onChange={onInputChange}
              error={!!passwordMessage && formSubmitted}
              helperText={passwordMessage}
            />
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid display={errorMessage ? '' : 'none'} item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isSigningUp}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end" gap={1}>
            <Typography>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresa Aquí
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
