import React, { useState, useEffect } from 'react';

export default function ClientModal({ isOpen, onClose, onSave, client }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    if (client) {
      setFormData({ name: client.name, email: client.email, company: client.company });
    } else {
      setFormData({ name: '', email: '', company: '' });
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Compañía</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
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