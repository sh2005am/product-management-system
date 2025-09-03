import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { updateProduct } from '../../api/productApi';

const EditProducts = ({ product, onUpdate, onClose }) => {
    const [name, setName] = useState(product.name);
    const [image, setImage] = useState(product.image); // Using 'image'
    const [price, setPrice] = useState(product.price);
    const [sku, setSku] = useState(product.sku || '');
    const [stock, setStock] = useState(product.stock || '');

    useEffect(() => {
        setName(product.name);
        setImage(product.image); // Using 'image'
        setPrice(product.price);
        setSku(product.sku || '');
        setStock(product.stock || '');
    }, [product]);

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { name, price, image ,sku ,stock}; // Sending 'image'
            const updatedProduct = await updateProduct(product._id, updatedData);
            onUpdate(updatedProduct);
            onClose();
        } catch (error) {
            console.error("Failed to update product:", error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitProduct} className="formcomp">
                <div className="header">
                    <h1>Edit Product</h1>
                    <MdClose onClick={onClose} size={50} />
                </div>
                <label htmlFor="enter-name">&nbsp;Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-effect" />
                <label htmlFor="sku">&nbsp;SKU:</label>
                <input type="text" className="glass-effect" value={sku} onChange={(e) => setSku(e.target.value)} />
                <div className='sec'>
                    <div className="cont">
                        <label htmlFor="add-price">&nbsp;Price:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="cont">
                        <label htmlFor="stock">&nbsp;Stock:</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                </div>
                <label htmlFor="urli">&nbsp;Image URL:</label>
                <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder='https://...' />
                <div className="btns">
                    <button type="button" className="discard btn2" onClick={onClose}>Discard</button>
                    <button className="addbtn btn2" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditProducts;