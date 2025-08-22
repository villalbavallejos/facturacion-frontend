import { useState } from 'react';
import { initialClients } from '../data/initialClients';

export const useClients = () => {
  const [clients, setClients] = useState(initialClients);

  const addClient = (clientData) => {
    const newClient = { ...clientData, id: Date.now() };
    setClients([...clients, newClient]);
  };

  const updateClient = (clientData) => {
    setClients(clients.map(c => c.id === clientData.id ? clientData : c));
  };

  const deleteClient = (clientId) => {
    setClients(clients.filter(c => c.id !== clientId));
  };

  return { clients, addClient, updateClient, deleteClient };
};