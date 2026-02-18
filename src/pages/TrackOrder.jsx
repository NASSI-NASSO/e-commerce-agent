import React from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrder = () => {
    const steps = [
        { id: 1, title: 'Order Placed', date: '2026-02-17 14:30', icon: <Clock size={20} />, status: 'completed' },
        { id: 2, title: 'Confirmed', date: '2026-02-17 15:45', icon: <CheckCircle size={20} />, status: 'completed' },
        { id: 3, title: 'In Treatment', date: '2026-02-18 09:00', icon: <Package size={20} />, status: 'current' },
        { id: 4, title: 'Shipped', date: 'Pending', icon: <Truck size={20} />, status: 'upcoming' },
        { id: 5, title: 'Delivered', date: 'Pending', icon: <CheckCircle size={20} />, status: 'upcoming' },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-black mb-4 tracking-tight">Track Your <span className="text-morocco-saffron">Treasure</span></h1>
                <p className="text-white/50 text-lg">Enter your order reference to see exactly where your authentic Moroccan pieces are.</p>
            </header>

            <div className="glass p-8 rounded-3xl mb-12">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder="Order Reference (e.g. SOUK-12345)"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-morocco-saffron transition-all"
                        />
                    </div>
                    <button className="bg-morocco-terracotta hover:bg-morocco-clay text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-morocco-terracotta/20">
                        Track Order
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 ml-[-1px]"></div>

                <div className="space-y-12 relative">
                    {steps.map((step) => (
                        <div key={step.id} className="flex gap-8 items-start">
                            <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${step.status === 'completed' ? 'bg-morocco-emerald text-white' :
                                step.status === 'current' ? 'bg-morocco-saffron text-morocco-midnight animate-pulse' :
                                    'bg-white/5 text-white/20 border border-white/10'
                                }`}>
                                {step.icon}
                            </div>

                            <div className="flex-1 pt-2">
                                <h3 className={`text-xl font-bold ${step.status === 'upcoming' ? 'text-white/30' : 'text-white'}`}>
                                    {step.title}
                                </h3>
                                <p className="text-white/40 text-sm font-medium mt-1 uppercase tracking-widest">{step.date}</p>
                                {step.status === 'current' && (
                                    <div className="mt-4 glass p-4 rounded-xl border-l-4 border-morocco-saffron">
                                        <p className="text-sm text-morocco-sand">Your order is being carefully packed by our artisans in Marrakech.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
