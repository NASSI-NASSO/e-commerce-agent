import React from 'react';

const Chat = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar for Cart/Bargain State */}
            <div className="w-80 glass-dark border-r border-white/10 p-6 hidden lg:block">
                <h2 className="text-xl font-bold mb-6 text-morocco-saffron">Your Bargains</h2>
                <div className="space-y-4">
                    <div className="glass p-4 rounded-xl border-l-4 border-morocco-terracotta">
                        <p className="text-xs uppercase text-morocco-terracotta font-bold mb-1">In Negotiation</p>
                        <p className="font-bold">Moroccan Lantern</p>
                        <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-400">Target:</span>
                            <span className="text-white font-bold">85 MAD</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-morocco-midnight to-black/90">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex justify-start">
                        <div className="glass p-4 rounded-2xl max-w-md">
                            <p>Salam! I am your personal shopping concierge. How can I help you negotiate the best price today?</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 glass border-t border-white/10">
                    <div className="max-w-4xl mx-auto flex gap-4">
                        <input
                            type="text"
                            placeholder="Tell me what you want or start bargaining..."
                            className="flex-1 bg-white/5 border border-white/20 rounded-full px-6 py-3 focus:outline-none focus:border-morocco-saffron"
                        />
                        <button className="bg-morocco-terracotta text-white p-3 rounded-full hover:scale-105 transition-all">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
