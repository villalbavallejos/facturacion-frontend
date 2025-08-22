import React from 'react';

export default function Sidebar({ username, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Mi App</div>
      <ul className="sidebar-menu"><li className="active">Clientes</li></ul>
      <div className="sidebar-footer">
        <div className="user-info">Conectado como: <strong>{username}</strong></div>
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      </div>
    </aside>
  );
}