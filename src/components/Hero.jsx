import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-morocco-terracotta/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold mb-8 animate-bounce">
                <Sparkles size={14} className="text-morocco-saffron" />
                <span className="text-morocco-sand uppercase tracking-widest">Experience the Soul of the Souk</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                The Art of <br />
                <span className="text-gradient">Modern Bargaining</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mb-12">
                Step into our digital Medina. Chat with our intelligent AI concierge, explore authentic treasures, and negotiate your way to the perfect deal.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
                <Link
                    to="/chat"
                    className="bg-morocco-terracotta hover:bg-morocco-clay text-white px-10 py-5 rounded-3xl font-black text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-morocco-terracotta/20 flex items-center gap-3"
                >
                    <span>Start Bargaining</span>
                    <ArrowRight size={20} />
                </Link>
                <Link
                    to="/catalog"
                    className="glass hover:bg-white/10 px-10 py-5 rounded-3xl font-black text-lg transition-all flex items-center gap-3"
                >
                    Explore Catalog
                </Link>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                {[
                    { label: 'Authentic', sub: 'Verified Sources' },
                    { label: 'Smart AI', sub: 'Fair Negotiation' },
                    { label: '24/7 Support', sub: 'Souk Never Sleeps' },
                    { label: 'Fast Delivery', sub: 'Across Morocco' }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-2xl font-black text-morocco-saffron mb-1">{stat.label}</span>
                        <span className="text-xs text-white/40 uppercase tracking-widest font-bold">{stat.sub}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
