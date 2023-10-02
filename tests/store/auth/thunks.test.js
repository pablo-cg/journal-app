import {
  firebaseLogout,
  logInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from '../../../src/firebase/providers';
import {
  login,
  logout,
  setCheckingStatus,
} from '../../../src/store/auth/auth-slice';
import {
  checkingAuthentication,
  startEmailLogIn,
  startEmailSignUp,
  startGoogleSignIn,
  startLogOut,
} from '../../../src/store/auth/thunks';
import { resetJournalState } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/auth-fixtures';

jest.mock('../../../src/firebase/providers');

describe('auth thunks Tests', () => {
  const dispatch = jest.fn();

  beforeAll(() => jest.clearAllMocks());

  test('debe invocar setCheckingStatus', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCheckingStatus());
  });

  test('startGoogleSignIn debe llamar checkingCredentials y login si es exitoso', async () => {
    const resultData = {
      ok: true,
      user: demoUser,
    };

    await signInWithGoogle.mockResolvedValue(resultData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCheckingStatus());
    expect(dispatch).toHaveBeenCalledWith(login(resultData.user));
  });

  test('startGoogleSignIn debe llamar checkingCredentials y logout si no es exitoso', async () => {
    const resultData = {
      ok: false,
      errorMessage: 'error',
    };

    await signInWithGoogle.mockResolvedValue(resultData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCheckingStatus());
    expect(dispatch).toHaveBeenCalledWith(logout(resultData.errorMessage));
  });

  test('startEmailSignUp debe llamar setCheckingStatus y login si es exitoso', async () => {
    const resultData = {
      ok: true,
      user: demoUser,
    };

    const formData = {
      displayName: demoUser.displayName,
      email: demoUser.email,
      password: 'passw0rd',
    };

    await signUpWithEmail.mockResolvedValue(resultData);

    await startEmailSignUp(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCheckingStatus());
    expect(dispatch).toHaveBeenCalledWith(login(resultData.user));
  });

  test('startEmailLogIn debe llamar checkingCredentials y login si es exitoso', async () => {
    const resultData = {
      ok: true,
      user: demoUser,
    };

    const loginData = {
      email: demoUser.email,
      password: 'passw0rd',
    };

    await logInWithEmail.mockResolvedValue(resultData);

    await startEmailLogIn(loginData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setCheckingStatus());
    expect(dispatch).toHaveBeenCalledWith(login(resultData.user));
  });

  test('startLogOut debe llamar firebaseLogout, resetJournalState y logout', async () => {
    await startLogOut()(dispatch);

    expect(firebaseLogout).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(resetJournalState());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
