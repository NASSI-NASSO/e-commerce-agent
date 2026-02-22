import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import productService from '../services/product.service';
import { formatCurrency } from '../utils/formatters';
import { Search, Filter, X, Camera, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import handImage from '../assets/Hand.jpg';
import pofImage from '../assets/pof.jpg';
import zelligImage from '../assets/zellig.jpg';
import arganImage from '../assets/argan.jpg';
import woolImage from '../assets/Brown.jpg';
import spicesMixImage from '../assets/Golden Spice Magic_ Essential Kitchen Secrets to Boost Flavor & Aroma_.jpg';
import necklaceImage from '../assets/Necklace Ai.jpg';
import potImage from '../assets/pot.jpg';
import berbersImage from '../assets/berbers.jpg';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiMatch, setAiMatch] = useState(null);

    const categories = ['All', 'Tableware', 'Furniture', 'Decor', 'Beauty', 'Textiles', 'Food', 'Jewelry', 'Pottery'];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsAnalyzing(true);
        setAiMatch(null);

        // Simulate AI Analysis
        setTimeout(() => {
            // Find a random product to "match"
            const randomMatch = products[Math.floor(Math.random() * products.length)];
            setAiMatch(randomMatch);
            setIsAnalyzing(false);
            
            // Scroll to the match if it exists
            setTimeout(() => {
                const element = document.getElementById(`product-${randomMatch.id}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }, 3000);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Initialize with static data for now as fallback, 
                // but attempt to fetch from service
                const staticProducts = [
                    { id: 1, name: 'Handcrafted Teapot', price: 250, category: 'Tableware', status: 'In Stock', image: handImage },
                    { id: 2, name: 'Leather Pouf', price: 450, category: 'Furniture', status: 'Limited', image: pofImage },
                    { id: 3, name: 'Zellige Tile', price: 15, category: 'Decor', status: 'In Stock', image: zelligImage },
                    { id: 4, name: 'Argan Oil', price: 120, category: 'Beauty', status: 'In Stock', image: arganImage },
                    { id: 5, name: 'Wool Carpet', price: 1200, category: 'Textiles', status: 'Handmade', image: woolImage },
                    { id: 6, name: 'Spices Mix', price: 45, category: 'Food', status: 'Fresh', image: spicesMixImage },
                    { id: 7, name: 'Berber Silver Necklace', price: 850, category: 'Jewelry', status: 'Authentic', image: necklaceImage },
                    { id: 8, name: 'Ceramic Safi Vase', price: 320, category: 'Pottery', status: 'Hand-painted', image: potImage },
                    { id: 9, name: 'Beni Ourain Rug', price: 2100, category: 'Textiles', status: 'Vintage', image: berbersImage },
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

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    if (loading) return <div className="p-8 text-center"><p className="text-2xl animate-pulse">Unveiling Treasures...</p></div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 min-h-screen">
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-black mb-4">Our <span className="text-morocco-saffron">Treasures</span></h1>
                        <p className="text-white/50 text-xl max-w-2xl">Browse our curated collection of authentic Moroccan goods. See something you like? Click "Bargain" to start your negotiation.</p>
                    </div>

                    {/* Search and Filter UI */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-morocco-saffron transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search treasures..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 py-4 w-full sm:w-80 focus:outline-none focus:border-morocco-saffron transition-all"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* AI Image Search Button */}
                        <div className="relative">
                            <input 
                                type="file" 
                                id="ai-search" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <label 
                                htmlFor="ai-search"
                                className={`flex items-center gap-2 px-6 py-4 rounded-2xl cursor-pointer transition-all border font-bold ${
                                    isAnalyzing 
                                        ? 'bg-morocco-saffron/10 border-morocco-saffron text-morocco-saffron' 
                                        : 'bg-morocco-terracotta hover:bg-morocco-clay border-transparent text-white'
                                } shadow-lg shadow-morocco-terracotta/20`}
                            >
                                {isAnalyzing ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Camera size={20} />
                                )}
                                <span>{isAnalyzing ? "AI Analyzing..." : "Search with Photo"}</span>
                            </label>

                            {/* AI Match Result Notification */}
                            <AnimatePresence>
                                {aiMatch && !isAnalyzing && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute top-full mt-4 left-0 right-0 z-50 glass p-4 rounded-2xl border border-morocco-saffron/30 shadow-2xl flex items-center gap-4 bg-morocco-midnight"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                                            <img src={aiMatch.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-morocco-saffron uppercase flex items-center gap-1">
                                                <Sparkles size={10} /> AI Match Found
                                            </p>
                                            <p className="text-sm font-bold truncate">{aiMatch.name}</p>
                                        </div>
                                        <button 
                                            onClick={() => setAiMatch(null)}
                                            className="p-1 hover:bg-white/10 rounded-full"
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap gap-3 mt-8">
                    <div className="flex items-center gap-2 mr-4 text-white/40">
                        <Filter size={18} />
                        <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                                selectedCategory === cat
                                    ? 'bg-morocco-saffron text-morocco-midnight border-morocco-saffron shadow-lg shadow-morocco-saffron/20'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            status={product.status}
                            image={product.image}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 glass rounded-[3rem]">
                    <Search size={64} className="mx-auto text-white/10 mb-6" />
                    <h2 className="text-3xl font-black mb-2">No Treasures <span className="text-morocco-saffron">Found</span></h2>
                    <p className="text-white/40">Try adjusting your search or filter to find what you're looking for.</p>
                    <button 
                        onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                        className="mt-8 text-morocco-saffron font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Catalog;
