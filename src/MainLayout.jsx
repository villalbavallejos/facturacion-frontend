import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ username, onLogout }) {
  return (
    <div className="app-layout">
      <Sidebar username={username} onLogout={onLogout} />
      {/* Outlet renderiza el componente de la ruta anidada */}
      <Outlet />
    </div>
  );
}