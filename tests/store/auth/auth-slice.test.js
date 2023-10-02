import { authSlice, login, logout } from '../../../src/store/auth/auth-slice';
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/auth-fixtures';

describe('auth-slice Tests', () => {
  test('debe regresar el estado inicial y tener "auth" como name', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });

  test('debe realizar la autenticacion', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      user: demoUser,
      errorMessage: null,
    });
  });

  test('debe realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe realizar el logout y mostrar un mensaje de error', () => {
    const errorMsg = 'Test mensaje error';

    const state = authSlice.reducer(authenticatedState, logout(errorMsg));

    expect(state).toEqual({
      status: 'not-authenticated',
      user: null,
      errorMessage: errorMsg,
    });
  });
});
