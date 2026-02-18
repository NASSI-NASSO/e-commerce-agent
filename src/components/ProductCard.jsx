import React from 'react';
import { ShoppingCart, MessageCircle, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatters';

const ProductCard = ({ id, name, price, category, status }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id, name, price, category });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="glass rounded-3xl overflow-hidden group hover:border-morocco-saffron/40 transition-all duration-500 hover:shadow-2xl hover:shadow-morocco-saffron/5">
            <div className="h-64 bg-morocco-midnight/40 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-morocco-midnight/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-morocco-saffron border border-morocco-saffron/20">
                    {category}
                </div>
                {status && (
                    <div className="absolute top-4 right-4 bg-morocco-emerald/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-morocco-emerald border border-morocco-emerald/20 uppercase tracking-wider">
                        {status}
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center text-white/5 group-hover:scale-110 transition-transform duration-700">
                    {/* Image placeholder */}
                    <ShoppingCart size={80} />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-morocco-midnight/80 to-transparent opacity-60"></div>

                {/* Quick Add Overlay */}
                <button
                    onClick={handleAddToCart}
                    className={`absolute bottom-4 right-4 p-3 rounded-2xl transition-all shadow-lg ${isAdded ? 'bg-morocco-emerald text-white' : 'glass hover:bg-morocco-saffron hover:text-morocco-midnight'
                        }`}
                >
                    {isAdded ? <Plus size={20} className="rotate-45" /> : <Plus size={20} />}
                </button>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-morocco-saffron transition-colors">{name}</h3>
                    <div className="flex items-center text-morocco-saffron">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold ml-1">4.9</span>
                    </div>
                </div>
                <p className="text-white/50 text-sm mb-6 line-clamp-2">Authentic piece crafted by local artisans in the heart of the Medina.</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Fixed Price</span>
                        <span className="text-2xl font-bold text-morocco-saffron">{formatCurrency(price)}</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            className={`p-3 rounded-2xl transition-all shadow-lg flex items-center gap-2 font-bold text-sm ${isAdded ? 'bg-morocco-emerald text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                        >
                            <ShoppingCart size={18} />
                            <span>{isAdded ? 'Added' : 'Add'}</span>
                        </button>

                        <button className="bg-morocco-terracotta hover:bg-morocco-clay text-white p-3 rounded-2xl transition-all shadow-lg shadow-morocco-terracotta/20 flex items-center gap-2 group/btn">
                            <MessageCircle size={20} className="group-hover/btn:rotate-12 transition-transform" />
                            <span className="font-bold text-sm px-1">Bargain</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
