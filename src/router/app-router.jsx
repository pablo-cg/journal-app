import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/auth-routes';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/journal-routes';
import { AuthLoader } from '../ui/components';

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === 'checking') return <AuthLoader />;

  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
