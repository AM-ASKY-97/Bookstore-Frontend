import logo from './logo.svg';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './Component/frontend/main/Main';
import { useEffect, useState } from 'react';
import LoadingPage from './Component/frontend/loading/LoadingPage';
import LoginPage from './Component/frontend/auth/login/LoginPage';
import RegisterPage from './Component/frontend/auth/register/RegisterPage';
import PrivateRoutes from './Component/protected/PrivateRoutes';
import AdminMasterLayout from './Component/admin/master-layout/AdminMasterLayout';
import routes from './Component/admin/route/routes';
import ErrorPage from './Component/error_page/ErrorPage';
import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  const [loading, setLoading] = useState(true); // Changed initial state to true
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // You might want to validate the token here by sending a request to the server
          // For simplicity, I'm just setting authenticated to true if token exists
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        {authenticated ? (
          <Route path="/login" element={<Navigate to="/auth" />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
        {authenticated ? (
          <Route path="/new-user" element={<Navigate to="/auth" />} />
        ) : (
          <Route path="/new-user" element={<RegisterPage />} />
        )}

        <Route element={<PrivateRoutes />}>
          <Route path="/auth" element={<AdminMasterLayout />}>
            {routes
              .filter(route => route.component)
              .map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            <Route index element={<Navigate to="/auth/dashboard" />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
