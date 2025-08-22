import React from 'react';
import ProductList from '../components/ProductList';
import ProductModal from '../components/modals/ProductModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { useProducts } from '../hooks/useProducts';
import { useState } from 'react';

export default function ProductPage() {
    const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };
    
    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (productId) => {
        setProductToDelete(productId);
        setIsConfirmOpen(true);
    };

    const executeDelete = () => {
        deleteProduct(productToDelete);
        setIsConfirmOpen(false);
        setProductToDelete(null);
    };

    const handleSave = (productData) => {
        if (productData.id) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <p>Cargando productos...</p>;
        }
        if (error) {
            return <p style={{ color: 'red' }}>Error: {error}</p>;
        }
        return <ProductList 
            products={products} 
            onEdit={handleEdit} 
            onDelete={handleDeleteRequest} 
            onNew={handleNew} 
        />;
    };

    return (
        <main className="main-content">
            {renderContent()}
            <ProductModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSave}
                product={editingProduct} 
            />
            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={executeDelete}
                title="Confirmar Eliminación"
            >
                ¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.
            </ConfirmationModal>
        </main>
    );
}