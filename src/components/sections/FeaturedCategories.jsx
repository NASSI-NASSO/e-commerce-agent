import React from 'react';
import { ShoppingBag, Gem, UtensilsCrossed, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    {
        name: 'Fine Pottery',
        icon: <Brush className="text-morocco-saffron" size={32} />,
        description: 'Hand-painted ceramics from the heart of Safi.',
        color: 'from-blue-600/20 to-indigo-900/40',
        path: '/catalog?category=pottery'
    },
    {
        name: 'Berber Textiles',
        icon: <ShoppingBag className="text-morocco-terracotta" size={32} />,
        description: 'Authentic hand-woven carpets and traditional fabrics.',
        color: 'from-orange-600/20 to-red-900/40',
        path: '/catalog?category=textiles'
    },
    {
        name: 'Royal Jewelry',
        icon: <Gem className="text-morocco-emerald" size={32} />,
        description: 'Intricate silver and gold pieces with precious stones.',
        color: 'from-emerald-600/20 to-teal-900/40',
        path: '/catalog?category=jewelry'
    },
    {
        name: 'Medina Spices',
        icon: <UtensilsCrossed className="text-morocco-saffron" size={32} />,
        description: 'Pure, aromatic spices sourced from local cooperatives.',
        color: 'from-yellow-600/20 to-amber-900/40',
        path: '/catalog?category=spices'
    }
];

const FeaturedCategories = () => {
    return (
        <section className="px-6 py-20 bg-cover bg-fixed relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Explore Collections
                        </h2>
                        <p className="text-white/60 max-w-xl text-lg">
                            Each category is a gateway to a tradition. Discover artisan works that carry the story of Morocco.
                        </p>
                    </div>
                    <Link
                        to="/catalog"
                        className="mt-6 md:mt-0 text-morocco-saffron font-bold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        View All Collections <span>&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, i) => (
                        <Link
                            key={i}
                            to={cat.path}
                            className={`group relative h-80 rounded-[40px] p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-white/5 hover:border-morocco-saffron/30 shadow-2xl`}
                        >
                            {/* Background Gradient & Pattern */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} -z-10 group-hover:scale-110 transition-transform duration-700`}></div>
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <div className="w-24 h-24 border-4 border-white rounded-full"></div>
                            </div>

                            <div className="h-full flex flex-col justify-between">
                                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 self-start group-hover:bg-white/20 transition-colors">
                                    {cat.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black mb-2 group-hover:text-morocco-saffron transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute bottom-8 right-8 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                <span className="text-morocco-saffron">&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-morocco-emerald/5 blur-[150px] -z-10 pointer-events-none"></div>
        </section>
    );
};

export default FeaturedCategories;
