import React, { useState, useMemo } from 'react';

export default function ProductList({ products, onEdit, onDelete, onNew }) {
    const [filter, setFilter] = useState('');

    const filteredProducts = useMemo(() => {
        if (!products) {
            return [];
        }
        return products.filter(product =>
            product.nombre.toLowerCase().includes(filter.toLowerCase())
        );
    }, [products, filter]);

return (
  <div className="client-list-container">
    <div className="content-header">
      <h2>Listado de Productos</h2>
      <button onClick={onNew} className="primary-button" style={{width: 'auto', padding: '12px 20px'}}>Nuevo Producto</button>
    </div>
    <input
      type="text"
      className="filter-input"
      placeholder="Buscar producto por nombre..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
    <table className="client-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map(product => (
          <tr key={product.id}>
            <td>{product.nombre}</td>
            <td>${product.precio}</td>
            <td>{product.descripcion}</td>
            <td>{product.stock}</td>
            <td className="actions-cell">
              <button onClick={() => onEdit(product)} className="edit-button">Editar</button>
              <button onClick={() => onDelete(product.id)} className="delete-button">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}