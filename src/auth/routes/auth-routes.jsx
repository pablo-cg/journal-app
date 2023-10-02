import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, SignInPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
