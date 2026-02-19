import React from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="px-6 py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="glass p-12 md:p-20 rounded-[60px] border-white/5 relative overflow-hidden group">
                    {/* Background Patterns */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <div className="grid grid-cols-12 h-full">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="border-r border-b border-white"></div>
                            ))}
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-morocco-saffron/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-morocco-saffron/20 transition-colors">
                            <Mail className="text-morocco-saffron" size={40} />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Join the <span className="text-gradient">Souk Insider</span>
                        </h2>

                        <p className="text-white/60 text-lg mb-12">
                            Receive curators' picks, early access to new collections, and exclusive bargaining tips directly in your inbox. No spam, just pure authentic craft.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 p-2 glass rounded-[35px] border-white/10 group-focus-within:border-morocco-saffron/30 transition-all shadow-2xl">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 px-8 py-4 flex-grow text-lg"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-morocco-saffron hover:bg-morocco-sand text-morocco-midnight px-10 py-4 rounded-[30px] font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <span>Subscribe</span>
                                <Send size={20} />
                            </button>
                        </form>

                        <p className="mt-8 text-white/20 text-xs font-bold uppercase tracking-widest">
                            Join 5,000+ Medina enthusiasts worldwide
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-morocco-terracotta/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-morocco-emerald/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        </section>
    );
};

export default Newsletter;
