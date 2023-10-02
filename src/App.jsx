import { AppRouter } from './router/app-router';
import { AppTheme } from './theme/app-theme';

export const App = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
