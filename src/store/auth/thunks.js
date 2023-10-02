import {
  firebaseLogout,
  logInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from '../../firebase/providers';
import { resetJournalState } from '../journal';
import { login, logout, setCheckingStatus } from './auth-slice';

// no me gusta mucho el nombre 😒
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(setCheckingStatus());

    const { ok, user, errorMessage } = await signInWithGoogle();

    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login(user));
  };
};

export const startEmailSignUp = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(setCheckingStatus());

    const result = await signUpWithEmail({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result.user));
  };
};

export const startEmailLogIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(setCheckingStatus());

    const result = await logInWithEmail({
      email,
      password,
    });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result.user));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await firebaseLogout();

    dispatch(resetJournalState());
    dispatch(logout());
  };
};

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(setCheckingStatus());
  };
};
