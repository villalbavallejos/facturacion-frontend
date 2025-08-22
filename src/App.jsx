import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainLayout from './MainLayout';
import ClientPage from './pages/ClientPage';
import ProductPage from './pages/ProductPage';
import FacturaPage from './pages/FacturaPage';
import './styles/main.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentUser('Usuario'); 
      // --- LÍNEA CLAVE AÑADIDA ---
      // Si el usuario ya está autenticado, navega al dashboard.
      navigate('/dashboard/clientes');
    }
  }, []); // Se ejecuta solo una vez al cargar la aplicación

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
            <Route index element={<Navigate to="clientes" replace />} />
            <Route path="clientes" element={<ClientPage />} />
            <Route path="productos" element={<ProductPage />} />
            <Route path="facturacion" element={<FacturaPage />} />
        </Route>
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
      )}
      
      <Route path="*" element={<p>Página no encontrada.</p>} />
    </Routes>
  );
}