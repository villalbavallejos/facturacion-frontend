// src/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importa la hoja de estilos CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: username,
        password: password,
      });

      const token = response.data;
      localStorage.setItem('jwtToken', token);
      
      alert('¡Bienvenido! Has iniciado sesión correctamente.');
      // Opcional: Redireccionar al usuario a la página de clientes
      // window.location.href = '/clientes'; 
      
    } catch (error) {
      console.error('Error durante el login:', error);
      alert('Error: Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;