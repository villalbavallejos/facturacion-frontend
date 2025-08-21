// src/Dashboard.js (Modificado)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ClientList from './ClientList'; // Lo crearemos en el siguiente paso
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Routes>
          <Route path="clientes" element={<ClientList />} />
          {/* Agrega más rutas para otras secciones aquí */}
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </main>
    </div>
  );
}

// Componente simple para la página de bienvenida del dashboard
const WelcomePage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Selecciona una opción del menú.</h2>
    </div>
);

export default Dashboard;