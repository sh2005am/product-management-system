import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productApi.js';
import './ProductsPage.css';
import { useNavigate } from 'react-router-dom';
import Cards from './components/Cards.jsx';
import { IoMdAddCircle } from "react-icons/io";
import AddProducts from './components/AddProducts.jsx';
import EditProducts from './components/EditProducts.jsx';

const ProductsPage = () => {
    const navigate = useNavigate();

    // States
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false); // State for Add form
    const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State for Edit form
    const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message || "failed to fetch products");
                if (error.response?.status === 401) navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handlers for Adding
    const handleAdded = (newProduct) => {
        setProducts([newProduct, ...products]);
        setIsAddFormOpen(false);
    };

    // Handler for Deleting
    const handleDeleted = (_id) => {
        setProducts(products.filter(pr => pr._id !== _id));
    };

    // Handlers for Editing
    const handleEdit = (productToEdit) => {
        setEditingProduct(productToEdit);
        setIsEditFormOpen(true);
    };
    const handleUpdate = (updatedProduct) => {
        setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
        setIsEditFormOpen(false);
    };
    
    // Generic cancel handler for both forms
    const handleCancel = () => {
        setIsAddFormOpen(false);
        setIsEditFormOpen(false);
    };

    const filteredProducts = products.filter(pr =>
        pr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pr.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="top">
                <h1>Product Holo-deck</h1>
                <input type="text" placeholder="Search Products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="prods">
                {filteredProducts.map(pr => (
                    <Cards 
                        key={pr._id}
                        prodValue={pr}
                        onEdit={() => handleEdit(pr)} // Correctly passes the product to the handler
                        onDelete={() => handleDeleted(pr._id)} // Correctly passes the ID to the handler
                    />
                ))}
            </div>
            
            <IoMdAddCircle className='add' onClick={() => setIsAddFormOpen(true)} />
            
            {isAddFormOpen && (
                <div id="form-container" className="glass-effect">
                    <AddProducts onCancel={handleCancel} onAdded={handleAdded} />
                </div>
            )}
            
            {isEditFormOpen && editingProduct && (
                <div id="form-container" className="glass-effect">
                    <EditProducts
                        product={editingProduct}
                        onClose={handleCancel}
                        onUpdate={handleUpdate}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsPage;