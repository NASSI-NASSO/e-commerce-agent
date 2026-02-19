import React from 'react';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialOffer = () => {
    return (
        <section className="px-6 py-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-gradient-to-r from-morocco-terracotta to-morocco-clay rounded-[50px] overflow-hidden shadow-2xl shadow-morocco-terracotta/20 relative group">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-morocco-saffron/10 blur-[100px] -z-0"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-morocco-midnight/20 blur-[100px] -z-0"></div>

                    <div className="flex flex-col lg:flex-row items-center relative z-10">
                        <div className="p-12 lg:p-20 lg:w-3/5">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold mb-8 text-morocco-sand uppercase tracking-widest border border-white/10">
                                <Sparkles size={14} className="text-morocco-saffron animate-pulse" />
                                <span>Limited Time Offer</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                                The Golden Hour <br />
                                <span className="text-morocco-saffron">Flash Sale</span>
                            </h2>

                            <p className="text-white/80 text-lg mb-12 max-w-xl">
                                Enjoy up to <span className="text-white font-bold text-2xl">40% OFF</span> on selected Moroccan antiquities and rugs. Every item has a story, yours is just a bargain away.
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                <Link
                                    to="/catalog"
                                    className="bg-morocco-midnight text-white px-10 py-5 rounded-3xl font-black text-lg transition-all hover:scale-105 shadow-xl hover:shadow-morocco-midnight/30 flex items-center gap-3"
                                >
                                    <span>Grab the Deal</span>
                                    <ArrowRight size={20} />
                                </Link>

                                <div className="flex items-center gap-4 px-6 py-4 glass rounded-3xl border-white/10">
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-morocco-saffron">04</span>
                                        <span className="text-[10px] uppercase font-bold text-white/40">Hours</span>
                                    </div>
                                    <span className="text-2xl font-black text-white/20">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-morocco-saffron">27</span>
                                        <span className="text-[10px] uppercase font-bold text-white/40">Mins</span>
                                    </div>
                                    <span className="text-2xl font-black text-white/20">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-2xl font-black text-morocco-saffron">52</span>
                                        <span className="text-[10px] uppercase font-bold text-white/40">Secs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/5 p-12 lg:p-0 flex justify-center lg:justify-end pr-0 lg:pr-20 relative">
                            {/* Decorative Container for an 'Image' or Illustration */}
                            <div className="w-80 h-80 md:w-96 md:h-96 glass rounded-full flex items-center justify-center relative animate-float">
                                <div className="absolute inset-0 bg-morocco-saffron/20 blur-[60px] rounded-full"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <Timer size={100} className="text-morocco-saffron mb-4" />
                                    <span className="text-3xl font-black text-white">40% OFF</span>
                                    <span className="text-xs uppercase font-bold tracking-widest text-white/60">Limited Selection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-morocco-terracotta/5 blur-[150px] -z-10 rounded-full"></div>
        </section>
    );
};

export default SpecialOffer;
