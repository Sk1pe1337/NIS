import React, { useState } from 'react';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { CssBaseline } from '@mui/material';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (userRole) => {
    localStorage.setItem('role', userRole);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
  };

  if (!role) {
    return (
      <>
        <CssBaseline />
        {isRegistering ? (
          <RegisterPage onBack={() => setIsRegistering(false)} />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onRegisterClick={() => setIsRegistering(true)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      {role === 'admin' ? <AdminPage onLogout={handleLogout} /> : <UserPage onLogout={handleLogout} />}
    </>
  );
}

export default App;
