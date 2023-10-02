export const initialState = {
  status: 'checking', // checking, authenticated, not-authenticated
  user: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated', // checking, authenticated, not-authenticated
  user: {
    uid: 'TEST-ae40-4c17-82fc-50eaec5f24c8',
    email: 'test@email.com',
    displayName: 'Test',
    photoURL: 'https://test.com/test-image.jpg',
  },
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated', // checking, authenticated, not-authenticated
  user: null,
  errorMessage: undefined,
};

export const demoUser = {
  uid: 'TEST-3d45-4824-8767-65360bf8ecda',
  email: 'demo@email.com',
  displayName: 'Demo',
  photoURL: 'https://demo.com/demo-image.jpg',
};
