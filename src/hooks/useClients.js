// src/hooks/useClients.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/clientes';

export const useClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener el token JWT
    const getAuthToken = () => {
        return localStorage.getItem('jwtToken');
    };

    // Función genérica para manejar errores de la API
    const handleError = (err) => {
        console.error('API Error:', err);
        if (err.response && err.response.status === 401) {
            setError('No estás autorizado. Por favor, inicia sesión de nuevo.');
            // Aquí podrías redirigir al login si fuera necesario
        } else {
            setError('Ocurrió un error al conectar con el servidor.');
        }
    };

    // --- Cargar los clientes al iniciar la aplicación ---
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = getAuthToken();
                const response = await axios.get(API_BASE_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setClients(response.data);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    // --- Lógica para manipular clientes ---

    const addClient = async (clientData) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(API_BASE_URL, clientData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClients([...clients, response.data]);
        } catch (err) {
            handleError(err);
        }
    };

    const updateClient = async (clientData) => {
        try {
            const token = getAuthToken();
            const response = await axios.put(`${API_BASE_URL}/${clientData.id}`, clientData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClients(clients.map(c => c.id === clientData.id ? response.data : c));
        } catch (err) {
            handleError(err);
        }
    };

    const deleteClient = async (clientId) => {
        try {
            const token = getAuthToken();
            await axios.delete(`${API_BASE_URL}/${clientId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClients(clients.filter(c => c.id !== clientId));
        } catch (err) {
            handleError(err);
        }
    };

    return { clients, loading, error, addClient, updateClient, deleteClient };
};