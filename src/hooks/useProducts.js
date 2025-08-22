import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/productos';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthToken = () => {
        return localStorage.getItem('jwtToken');
    };

    const handleError = (err) => {
        console.error('API Error:', err);
        if (err.response && err.response.status === 401) {
            setError('No estás autorizado. Por favor, inicia sesión de nuevo.');
        } else {
            setError('Ocurrió un error al conectar con el servidor.');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = getAuthToken();
                const response = await axios.get(API_BASE_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (err) {
                handleError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(API_BASE_URL, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts([...products, response.data]);
        } catch (err) {
            handleError(err);
        }
    };

    const updateProduct = async (productData) => {
        try {
            const token = getAuthToken();
            const response = await axios.put(`${API_BASE_URL}/${productData.id}`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(products.map(p => p.id === productData.id ? response.data : p));
        } catch (err) {
            handleError(err);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const token = getAuthToken();
            await axios.delete(`${API_BASE_URL}/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(products.filter(p => p.id !== productId));
        } catch (err) {
            handleError(err);
        }
    };

    return { products, loading, error, addProduct, updateProduct, deleteProduct };
};