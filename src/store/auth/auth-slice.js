import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', // checking, authenticated, not-authenticated
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
  },
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },

    logout(state, { payload }) {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = payload;
    },

    setCheckingStatus(state) {
      state.status = 'checking';
    },
  },
});

export const { login, logout, setCheckingStatus } = authSlice.actions;
