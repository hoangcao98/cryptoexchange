/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { FiatSpotPage } from 'app/pages/FiatSpotPage/Loadable';
import PublicRoute from './components/common/publicRoute';
import { useTranslation } from 'react-i18next';
// Theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'theme/theme';
import { useThemeContext } from 'app/components/common/themeContext';
import { StyledToastContainer } from './style';
import { SuccessToast, ErrorToast } from 'app/components/Toast';

//get store redux
import { useDispatch, useSelector } from 'react-redux';
import { selectToast } from 'app/components/Toast/slice/selectors';
import { useToastSlice } from 'app/components/Toast/slice';
import { authService } from 'services/authService';
import { useEffect } from 'react';
export function App() {
  const dispatch = useDispatch();
  const { actions: toastActions } = useToastSlice();
  const dataToast: any = useSelector(selectToast);
  const { i18n } = useTranslation();
  const { theme } = useThemeContext();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  // check access token
  useEffect(() => {
    authService.autoRefreshAccessToken();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode}>
        <Helmet htmlAttributes={{ lang: i18n.language }}>
          <meta name="description" content="Trading View" />
        </Helmet>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path="/wallet/fiat" element={<FiatSpotPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <StyledToastContainer>
          <SuccessToast
            close={() => dispatch(toastActions.closeSuccessToast())}
            show={dataToast.openSuccessToast}
            title={dataToast.titleSuccessToast}
            message={dataToast.messageSuccessToast}
          />
          <ErrorToast
            close={() => dispatch(toastActions.closeErrorToast())}
            show={dataToast.openErrorToast}
            title={dataToast.titleErrorToast}
            message={dataToast.messageErrorToast}
          />
        </StyledToastContainer>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}
