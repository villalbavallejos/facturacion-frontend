import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainLayout from './MainLayout';
import ClientPage from './pages/ClientPage';
import ProductPage from './pages/ProductPage';
import './styles/main.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && !isLoggedIn) {
      setIsLoggedIn(true);
      setCurrentUser('Usuario'); 
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    navigate('/dashboard/clientes'); 
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('jwtToken');
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      
      {isLoggedIn ? (
        <Route path="/dashboard" element={<MainLayout username={currentUser} onLogout={handleLogout} />}>
            <Route path="clientes" element={<ClientPage />} />
            <Route path="productos" element={<ProductPage />} />
        </Route>
      ) : (
        <Route path="/dashboard/*" element={<p>Acceso denegado. Por favor, inicia sesión.</p>} />
      )}
      
      <Route path="*" element={<p>Página no encontrada.</p>} />
    </Routes>
  );
}