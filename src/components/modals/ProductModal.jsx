import React, { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSave, product }) {
    // Añade 'stock' al estado del formulario
    const [formData, setFormData] = useState({ nombre: '', precio: 0, descripcion: '', stock: 0 });

    useEffect(() => {
        if (product) {
            setFormData({
                nombre: product.nombre,
                precio: product.precio,
                descripcion: product.descripcion,
                stock: product.stock // Carga el valor del stock
            });
        } else {
            setFormData({ nombre: '', precio: 0, descripcion: '', stock: 0 });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Convierte el valor a número si el campo es 'precio' o 'stock'
        setFormData(prev => ({ ...prev, [name]: (name === 'precio' || name === 'stock') ? parseFloat(value) : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...product, ...formData });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Precio</label>
                        <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Descripción</label>
                        <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Stock</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-button">Cancelar</button>
                        <button type="submit" className="primary-button">{product ? 'Guardar Cambios' : 'Crear Producto'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}