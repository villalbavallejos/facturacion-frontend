// src/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menú Principal</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/clientes" className="menu-item">
            Clientes
          </Link>
        </li>
        <li>
          <Link to="/productos" className="menu-item">
            Productos
          </Link>
        </li>
        {/* Agrega más enlaces aquí */}
      </ul>
    </div>
  );
}

export default Sidebar;