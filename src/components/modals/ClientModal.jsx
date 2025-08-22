import React, { useState, useEffect } from 'react';

export default function ClientModal({ isOpen, onClose, onSave, client }) {
  // Cambia 'name' a 'nombre' y añade 'telefono'
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });

  useEffect(() => {
    if (client) {
      // Usa client.nombre, client.email y client.telefono
      setFormData({ 
        nombre: client.nombre, 
        email: client.email, 
        telefono: client.telefono 
      });
    } else {
      setFormData({ nombre: '', email: '', telefono: '' });
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // La función onSave recibirá el objeto con los nombres correctos
    onSave({ ...client, ...formData });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{client ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label>Nombre</label>
            {/* El atributo 'name' debe coincidir con el estado: nombre */}
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Teléfono</label>
            {/* Añade el input para el teléfono */}
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
            <button type="submit" className="primary-button">{client ? 'Guardar Cambios' : 'Crear Cliente'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}