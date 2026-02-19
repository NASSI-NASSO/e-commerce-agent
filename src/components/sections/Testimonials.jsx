import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        name: 'Sarah J.',
        location: 'Paris, France',
        comment: "The bargaining experience was surprisingly fun and fair. I felt like I was actually in the Marrakech medina! The quality of the rug I received is exceptional.",
        rating: 5
    },
    {
        name: 'Omar K.',
        location: 'Casablanca, Morocco',
        comment: "Finally, a platform that respects the art of the deal. The AI agent is smart, and the delivery was faster than expected. Truly authentic Moroccan crafts.",
        rating: 5
    },
    {
        name: 'Elena M.',
        location: 'New York, USA',
        comment: "Beautifully designed website. The pottery I bought is a masterpiece. I love that I could negotiate the price based on my appreciation of the craft.",
        rating: 4
    }
];

const Testimonials = () => {
    return (
        <section className="px-6 py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Voices from the <span className="text-morocco-saffron">Medina</span>
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        Our customers are our storytellers. See why thousands of people trust the Souk for authentic treasures.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="glass p-10 rounded-[40px] relative border-white/5 hover:border-morocco-saffron/20 transition-all duration-500 hover:-translate-y-2 group"
                        >
                            <Quote className="absolute top-8 right-8 text-morocco-saffron/10 group-hover:text-morocco-saffron/20 transition-colors" size={60} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={i < review.rating ? "text-morocco-saffron" : "text-white/10"}
                                    />
                                ))}
                            </div>

                            <p className="text-white/80 italic text-lg mb-8 leading-relaxed">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-morocco-terracotta to-morocco-saffron rounded-2xl flex items-center justify-center text-white font-black text-xl">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-morocco-saffron transition-colors">
                                        {review.name}
                                    </h4>
                                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                                        {review.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-morocco-emerald/5 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-morocco-terracotta/5 blur-[150px] rounded-full -z-10"></div>
        </section>
    );
};

export default Testimonials;
