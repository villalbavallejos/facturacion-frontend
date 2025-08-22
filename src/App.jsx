// src/App.jsx
import React, { useState, useEffect } from 'react';
import { initialClients } from './data/initialClients';
import Login from './components/Login';
import MainLayout from './MainLayout';
import './styles/main.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [clients, setClients] = useState(initialClients); // Ojo: Aún usas mock data.

  const navigate = useNavigate();

  // --- NUEVA LÓGICA DE PERSISTENCIA ---
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    // Verifica si hay un token y el usuario no está logueado
    if (token && !isLoggedIn) {
      // Si el token existe, cambia el estado a autenticado
      setIsLoggedIn(true);
      // Puedes decodificar el token para obtener el nombre de usuario si lo necesitas
      // Por ahora, lo pondremos de forma genérica
      setCurrentUser('Usuario'); 
    }
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    navigate('/dashboard'); 
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
        <Route path="/dashboard" element={<p>Acceso denegado. Por favor, inicia sesión.</p>} />
      )}
      
      {/* Añade una ruta de comodín para cualquier URL no definida */}
      <Route path="*" element={<p>Página no encontrada.</p>} />
    </Routes>
  );
}