import React, { useState } from 'react';
import { initialClients } from './data/initialClients';
import Login from './components/Login';
import MainLayout from './MainLayout';
import './styles/main.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [clients, setClients] = useState(initialClients);
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    // Redireccionará a la página principal después del login
    navigate('/dashboard'); 
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('jwtToken');
    // Redireccionará al login después del logout
    navigate('/');
  };

  return (
    <Routes>
      {/* Ruta para el login */}
      <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      
      {/* Rutas protegidas que solo se muestran si el usuario está autenticado */}
      {isLoggedIn ? (
        <Route 
          path="/dashboard" 
          element={<MainLayout 
            username={currentUser} 
            onLogout={handleLogout} 
            clients={clients}
            setClients={setClients}
          />} 
        />
      ) : (
        // Redirige a la página principal si el usuario no está autenticado
        <Route path="/dashboard" element={<p>Acceso denegado. Por favor, inicia sesión.</p>} />
      )}
    </Routes>
  );
}