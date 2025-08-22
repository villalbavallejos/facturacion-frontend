import React, { useState } from 'react';
import { useClients } from '../../hooks/useClients';
import { useProducts } from '../../hooks/useProducts';
import ItemSelector from './ItemSelector';
import ItemList from './ItemList';
import axios from 'axios';

const API_FACTURAS_URL = 'http://localhost:8080/api/facturas';

export default function FacturaForm() {
  const { clients } = useClients();
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getAuthToken = () => localStorage.getItem('jwtToken');

  const handleAddItem = (product, quantity) => {
    const existingItem = items.find(item => item.productoId === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.productoId === product.id
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      ));
    } else {
      setItems([...items, { productoId: product.id, cantidad: quantity, producto: product }]);
    }
  };

  const handleRemoveItem = (productId) => {
    setItems(items.filter(item => item.productoId !== productId));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!selectedClient) {
      setError("Por favor, selecciona un cliente.");
      return;
    }
    if (items.length === 0) {
      setError("La factura debe tener al menos un producto.");
      return;
    }

    const facturaData = items.map(item => ({
      productoId: item.productoId,
      cantidad: item.cantidad
    }));

    try {
      await axios.post(`${API_FACTURAS_URL}/${selectedClient}`, facturaData, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      setSuccess(true);
      setSelectedClient('');
      setItems([]);
    } catch (err) {
      console.error('Error al crear factura:', err);
      setError("Error al crear la factura. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Factura creada con éxito.</p>}

        {/* 1. Selector de Cliente */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="client-select" style={{ display: 'block', marginBottom: '8px' }}>Seleccionar Cliente:</label>
          <select
            id="client-select"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            style={{ width: '100%', padding: '10px' }}
            required
          >
            <option value="">-- Selecciona un cliente --</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.nombre} ({client.email})
              </option>
            ))}
          </select>
        </div>

        {/* 2. Selector de Productos */}
        <ItemSelector onAddItem={handleAddItem} />

        {/* 3. Lista de Productos en la Factura */}
        <div style={{ marginTop: '20px' }}>
          <ItemList items={items} onRemoveItem={handleRemoveItem} />
          <h3 style={{ textAlign: 'right', marginTop: '15px' }}>Total: ${calculateTotal()}</h3>
        </div>

        {/* 4. Botón de Envío */}
        <button type="submit" className="primary-button" style={{ marginTop: '20px' }}>
          Crear Factura
        </button>
      </form>
    </div>
  );
}