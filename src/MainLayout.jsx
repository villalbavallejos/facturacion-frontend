import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ClientList from './components/ClientList';
import ClientModal from './components/modals/ClientModal';
import ConfirmationModal from './components/modals/ConfirmationModal';
import { useClients } from './hooks/useClients';

export default function MainLayout({ username, onLogout }) {
  const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Botón "Nuevo Cliente"
  const handleNew = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };
  
  // Botón "Editar" en la tabla
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  // Botón "Eliminar" en la tabla
  const handleDeleteRequest = (clientId) => {
    setClientToDelete(clientId);
    setIsConfirmOpen(true);
  };

  // Confirmación del modal de eliminación
  const executeDelete = () => {
    deleteClient(clientToDelete);
    setIsConfirmOpen(false);
    setClientToDelete(null);
  };

  // Guardar (crear/editar) desde el modal
  const handleSave = (clientData) => {
    if (clientData.id) {
      updateClient(clientData);
    } else {
      addClient(clientData);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p>Cargando clientes...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>;
    }
    return <ClientList 
      clients={clients} 
      onEdit={handleEdit} 
      onDelete={handleDeleteRequest} 
      onNew={handleNew} 
    />;
  };

  return (
    <div className="app-layout">
      <Sidebar username={username} onLogout={onLogout} />
      <main className="main-content">
        {renderContent()}
      </main>
      <ClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        client={editingClient} 
      />
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeDelete}
        title="Confirmar Eliminación"
      >
        ¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.
      </ConfirmationModal>
    </div>
  );
}