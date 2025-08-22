import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function ItemSelector({ onAddItem }) {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddClick = () => {
    if (selectedProduct && quantity > 0) {
      const product = products.find(p => p.id === parseInt(selectedProduct));
      onAddItem(product, quantity);
      setQuantity(1);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error al cargar productos.</p>;

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '20px' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="product-select" style={{ display: 'block', marginBottom: '8px' }}>Seleccionar Producto:</label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{ width: '100%', padding: '10px' }}
        >
          <option value="">-- Selecciona un producto --</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.nombre} (${product.precio})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity-input" style={{ display: 'block', marginBottom: '8px' }}>Cantidad:</label>
        <input
          id="quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{ padding: '10px', width: '80px' }}
        />
      </div>
      <button type="button" onClick={handleAddClick} className="primary-button" style={{ width: 'auto', padding: '10px 15px' }}>
        Agregar
      </button>
    </div>
  );
}