import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="glass p-10 rounded-[3rem] shadow-2xl flex flex-col items-center">
                    <ShoppingBag size={80} className="text-white/10 mb-6" />
                    <h2 className="text-3xl font-black mb-4">Your Bag is <span className="text-morocco-saffron">Empty</span></h2>
                    <p className="text-white/40 max-w-xs mb-8">Authentic treasures are waiting for you in the Medina. Let's start exploring!</p>
                    <Link
                        to="/catalog"
                        className="bg-morocco-terracotta hover:bg-morocco-clay text-white px-10 py-4 rounded-2xl font-black transition-all transform hover:scale-105"
                    >
                        Go to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black mb-2">Shopping <span className="text-morocco-saffron">Bag</span></h1>
                    <p className="text-white/40 font-medium">Review your selections before we finalize your order.</p>
                </div>
                <Link to="/catalog" className="flex items-center gap-2 text-morocco-saffron font-bold hover:underline mb-2">
                    <ArrowLeft size={18} />
                    <span>Continue Shopping</span>
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="glass p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-center group hover:border-white/20 transition-all">
                            <div className="w-32 h-32 bg-morocco-midnight/50 rounded-2xl flex items-center justify-center shrink-0">
                                <ShoppingBag size={40} className="text-white/10" />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xl font-bold group-hover:text-morocco-saffron transition-colors">{item.name}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-white/20 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <p className="text-white/40 text-sm mb-4 uppercase tracking-widest font-bold">{item.category}</p>

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4 glass bg-white/5 px-4 py-2 rounded-xl">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="text-white/60 hover:text-morocco-saffron transition-colors"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="text-white/60 hover:text-morocco-saffron transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <div className="text-2xl font-black text-morocco-saffron">
                                        {item.price * item.quantity} MAD
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="glass-dark p-8 rounded-[2.5rem] border-white/5 sticky top-32 shadow-2xl">
                        <h2 className="text-2xl font-black mb-8">Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-white/50">
                                <span>Subtotal</span>
                                <span className="font-bold text-white">{cartTotal} MAD</span>
                            </div>
                            <div className="flex justify-between text-white/50">
                                <span>Shipping</span>
                                <span className="text-morocco-emerald font-bold tracking-widest uppercase text-xs">Free</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <span className="text-lg font-bold">Total</span>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-morocco-saffron">{cartTotal} MAD</p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">VAT Included</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-morocco-terracotta hover:bg-morocco-clay text-white py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] shadow-xl shadow-morocco-terracotta/20 mb-4">
                            Checkout Now
                        </button>

                        <div className="glass bg-morocco-saffron/5 border-morocco-saffron/20 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-morocco-saffron/20 flex items-center justify-center text-morocco-saffron">
                                <ShoppingBag size={20} />
                            </div>
                            <p className="text-xs text-morocco-sand leading-relaxed">
                                Add one more item to unlock <span className="font-bold">Artisan Rewards</span>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
