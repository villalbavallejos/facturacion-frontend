import React from 'react';
import ClientList from '../components/ClientList';
import ClientModal from '../components/modals/ClientModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { useClients } from '../hooks/useClients';
import { useState } from 'react';

export default function ClientPage() {
    const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
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
        <main className="main-content">
            {renderContent()}
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
        </main>
    );
}