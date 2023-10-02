import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../src/auth/pages/login-page';
import { authSlice } from '../../../src/store/auth';
import { notAuthenticatedState } from '../../fixtures/auth-fixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartEmailLogIn = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => {
  return {
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startEmailLogIn: ({ email, password }) =>
      mockStartEmailLogIn({ email, password }),
  };
});

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch:
      () =>
      (fn = () => {}) =>
        fn(), // 😑🤮
  };
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('<LoginPage /> Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe renderizar el componente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('el botón de google debe hacer el dispatch de startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');

    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('el botón de iniciar sesión debe hacer el dispatch de startEmailLogIn con los parametros de email y contraseña', () => {
    const email = 'test@test.cl';
    const password = 'p4ssw0rd';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const form = screen.getByLabelText('submit-form');
    fireEvent.submit(form);

    expect(mockStartEmailLogIn).toHaveBeenCalledWith({ email, password });
  });
});
