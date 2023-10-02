import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      user: { displayName, email, photoURL, uid },
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      user: null,
      errorMessage: error.message,
    };
  }
}

export async function signUpWithEmail({ email, password, displayName }) {
  try {
    const result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    await updateProfile(firebaseAuth.currentUser, {
      displayName,
    });

    const { user } = result;

    return {
      ok: true,
      user: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      user: null,
      errorMessage: error.message,
    };
  }
}

export async function logInWithEmail({ email, password }) {
  try {
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { user } = result;

    return {
      ok: true,
      user: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      user: null,
      errorMessage: error.message,
    };
  }
}

export async function firebaseLogout() {
  await firebaseAuth.signOut();
}
