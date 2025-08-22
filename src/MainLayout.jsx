import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ClientList from './components/ClientList';
import ClientModal from './components/modals/ClientModal';
import ConfirmationModal from './components/modals/ConfirmationModal';
import { useClients } from './hooks/useClients'; // Importa el hook

export default function MainLayout({ username, onLogout }) {
  const { clients, addClient, updateClient, deleteClient } = useClients(); // Usa el hook
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleNew = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };
  
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (clientId) => {
    setClientToDelete(clientId);
    setIsConfirmOpen(true);
  };

  const executeDelete = () => {
    deleteClient(clientToDelete);
    setIsConfirmOpen(false);
    setClientToDelete(null);
  };

  const handleSave = (clientData) => {
    if (clientData.id) {
      updateClient(clientData);
    } else {
      addClient(clientData);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar username={username} onLogout={onLogout} />
      <main className="main-content">
        <ClientList 
          clients={clients} 
          onEdit={handleEdit} 
          onDelete={handleDeleteRequest} 
          onNew={handleNew} 
        />
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