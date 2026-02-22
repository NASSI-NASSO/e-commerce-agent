import React, { useState, useEffect } from 'react';
import { Package, Plus, DollarSign, TrendingUp, Trash2, Edit2, Check, X, LayoutDashboard, ShoppingBag, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import handImage from '../assets/Hand.jpg';
import pofImage from '../assets/pof.jpg';
import zelligImage from '../assets/zellig.jpg';
import arganImage from '../assets/argan.jpg';
import woolImage from '../assets/Brown.jpg';
import spicesMixImage from '../assets/Golden Spice Magic_ Essential Kitchen Secrets to Boost Flavor & Aroma_.jpg';
import necklaceImage from '../assets/Necklace Ai.jpg';
import potImage from '../assets/pot.jpg';
import berbersImage from '../assets/berbers.jpg';

const Admin = () => {
    // Initial products from Catalog
    const [products, setProducts] = useState([
        { id: 1, name: 'Handcrafted Teapot', price: 250, category: 'Tableware', status: 'In Stock', image: handImage },
        { id: 2, name: 'Leather Pouf', price: 450, category: 'Furniture', status: 'Limited', image: pofImage },
        { id: 3, name: 'Zellige Tile', price: 15, category: 'Decor', status: 'In Stock', image: zelligImage },
        { id: 4, name: 'Argan Oil', price: 120, category: 'Beauty', status: 'In Stock', image: arganImage },
        { id: 5, name: 'Wool Carpet', price: 1200, category: 'Textiles', status: 'Handmade', image: woolImage },
        { id: 6, name: 'Spices Mix', price: 45, category: 'Food', status: 'Fresh', image: spicesMixImage },
        { id: 7, name: 'Berber Silver Necklace', price: 850, category: 'Jewelry', status: 'Authentic', image: necklaceImage },
        { id: 8, name: 'Ceramic Safi Vase', price: 320, category: 'Pottery', status: 'Hand-painted', image: potImage },
        { id: 9, name: 'Beni Ourain Rug', price: 2100, category: 'Textiles', status: 'Vintage', image: berbersImage },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editPrice, setEditPrice] = useState('');
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Decor', status: 'In Stock' });
    const [stats] = useState({
        totalSales: '12,450',
        activeBargains: 14,
        successRate: '68%',
        topProduct: 'Handcrafted Teapot'
    });

    const handleUpdatePrice = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, price: parseFloat(editPrice) } : p));
        setEditingId(null);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            id: products.length + 1,
            price: parseFloat(newProduct.price),
        };
        setProducts([product, ...products]);
        setNewProduct({ name: '', price: '', category: 'Decor', status: 'In Stock' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this treasure from the souk?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-8 min-h-screen bg-morocco-midnight/20">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                        <LayoutDashboard className="text-morocco-saffron" size={36} />
                        Souk <span className="text-morocco-saffron">Dashboard</span>
                    </h1>
                    <p className="text-white/40 font-medium">Manage your treasures, prices, and merchant analytics.</p>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Total Revenue', value: `${stats.totalSales} MAD`, icon: <DollarSign className="text-morocco-emerald" /> },
                    { label: 'Active Bargains', value: stats.activeBargains, icon: <TrendingUp className="text-morocco-saffron" /> },
                    { label: 'Bargain Success', value: stats.successRate, icon: <Check className="text-morocco-emerald" /> },
                    { label: 'Best Seller', value: stats.topProduct, icon: <ShoppingBag className="text-morocco-terracotta" /> }
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-white/5">{stat.icon}</div>
                        <div>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Product Management */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Package className="text-morocco-saffron" size={24} />
                            Inventory
                        </h2>
                        <span className="text-xs font-bold text-white/20 uppercase tracking-widest">{products.length} Items Total</span>
                    </div>

                    <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                <tr>
                                    <th className="px-8 py-5">Product</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center">
                                                    {product.image ? (
                                                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="text-white/20" size={20} />
                                                    )}
                                                </div>
                                                <span className="font-bold">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            {editingId === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number"
                                                        value={editPrice}
                                                        onChange={(e) => setEditPrice(e.target.value)}
                                                        className="bg-white/5 border border-morocco-saffron/50 rounded-lg px-2 py-1 w-20 text-sm focus:outline-none"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => handleUpdatePrice(product.id)} className="text-morocco-emerald hover:scale-110"><Check size={18}/></button>
                                                    <button onClick={() => setEditingId(null)} className="text-red-500 hover:scale-110"><X size={18}/></button>
                                                </div>
                                            ) : (
                                                <span className="font-black text-morocco-saffron">{formatCurrency(product.price)}</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => {setEditingId(product.id); setEditPrice(product.price.toString());}}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add New Product Form */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Plus className="text-morocco-emerald" size={24} />
                        Add Treasure
                    </h2>
                    <form onSubmit={handleAddProduct} className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Product Name</label>
                            <input 
                                required
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                placeholder="e.g. Vintage Lantern"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-morocco-saffron transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Price (MAD)</label>
                                <input 
                                    required
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-morocco-saffron transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Category</label>
                                <select 
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-morocco-saffron transition-all"
                                >
                                    <option value="Decor">Decor</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Pottery">Pottery</option>
                                    <option value="Textiles">Textiles</option>
                                    <option value="Jewelry">Jewelry</option>
                                </select>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-morocco-terracotta hover:bg-morocco-clay text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-morocco-terracotta/20 flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Add to Catalog
                        </button>
                    </form>

                    <div className="glass p-8 rounded-[2.5rem] border border-morocco-saffron/10 bg-morocco-saffron/[0.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="text-morocco-saffron" size={24} />
                            <h3 className="font-bold text-lg">Merchant Insight</h3>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed mb-4">
                            Negotiations are currently <span className="text-morocco-emerald font-bold">12% more aggressive</span> this week. 
                            Consider lowering starting prices on <span className="text-morocco-saffron">Beni Ourain Rugs</span> to increase conversion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
