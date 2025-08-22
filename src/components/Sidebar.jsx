import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ username, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Mi App</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard/clientes" className={({ isActive }) => isActive ? "active" : ""}>
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/productos" className={({ isActive }) => isActive ? "active" : ""}>
            Productos
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="user-info">Conectado como: <strong>{username}</strong></div>
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
      </div>
    </aside>
  );
}