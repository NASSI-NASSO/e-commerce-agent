import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productService from '../services/product.service';
import { formatCurrency } from '../utils/formatters';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Initialize with static data for now as fallback, 
                // but attempt to fetch from service
                const staticProducts = [
                    { id: 1, name: 'Handcrafted Teapot', price: 250, category: 'Tableware', status: 'In Stock' },
                    { id: 2, name: 'Leather Pouf', price: 450, category: 'Furniture', status: 'Limited' },
                    { id: 3, name: 'Zellige Tile', price: 15, category: 'Decor', status: 'In Stock' },
                    { id: 4, name: 'Argan Oil', price: 120, category: 'Beauty', status: 'In Stock' },
                    { id: 5, name: 'Wool Carpet', price: 1200, category: 'Textiles', status: 'Handmade' },
                    { id: 6, name: 'Spices Mix', price: 45, category: 'Food', status: 'Fresh' },
                ];

                try {
                    const fetchedProducts = await productService.getProducts();
                    if (fetchedProducts && Array.isArray(fetchedProducts)) {
                        setProducts(fetchedProducts);
                    } else {
                        setProducts(staticProducts);
                    }
                } catch (err) {
                    console.warn('Using static products as fallback');
                    setProducts(staticProducts);
                }
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="p-8 text-center"><p className="text-2xl animate-pulse">Unveiling Treasures...</p></div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8">
            <header className="mb-12">
                <h1 className="text-5xl font-black mb-4">Our <span className="text-morocco-saffron">Treasures</span></h1>
                <p className="text-white/50 text-xl max-w-2xl">Browse our curated collection of authentic Moroccan goods. See something you like? Click "Bargain" to start your negotiation.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        status={product.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
