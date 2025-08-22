import React from 'react';

export default function ItemList({ items, onRemoveItem }) {
  if (items.length === 0) {
    return <p>No hay productos en la factura.</p>;
  }

  return (
    <table className="client-table" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.productoId}>
            <td>{item.producto.nombre}</td>
            <td>{item.cantidad}</td>
            <td>${item.producto.precio.toFixed(2)}</td>
            <td>${(item.cantidad * item.producto.precio).toFixed(2)}</td>
            <td>
              <button onClick={() => onRemoveItem(item.productoId)} className="delete-button" style={{ padding: '5px 10px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}