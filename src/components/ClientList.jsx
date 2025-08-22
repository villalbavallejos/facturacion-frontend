import React, { useState, useMemo } from 'react';

export default function ClientList({ clients, onEdit, onDelete, onNew }) {
  const [filter, setFilter] = useState('');

  const filteredClients = useMemo(() => {
    if (!clients) {
      return [];
    }

    return clients.filter(client =>
      client.nombre.toLowerCase().includes(filter.toLowerCase())
    );
  }, [clients, filter]);

  return (
    <div className="client-list-container">
      <div className="content-header">
        <h2>Listado de Clientes</h2>
        <button onClick={onNew} className="primary-button" style={{width: 'auto', padding: '12px 20px'}}>Nuevo Cliente</button>
      </div>
      <input
        type="text"
        className="filter-input"
        placeholder="Buscar cliente por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="client-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id}>
              <td>{client.nombre}</td>
              <td>{client.email}</td>
              <td>{client.telefono}</td>
              <td className="actions-cell">
                {/* Llama a la prop onEdit con el objeto client */}
                <button onClick={() => onEdit(client)} className="edit-button">Editar</button>
                {/* Llama a la prop onDelete con el id del cliente */}
                <button onClick={() => onDelete(client.id)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}