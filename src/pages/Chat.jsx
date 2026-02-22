import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, User, Bot, Loader2, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import chatService from '../services/chat.service';

const Chat = () => {
    const location = useLocation();
    const bargainingProduct = location.state?.product;
    
    const [messages, setMessages] = useState([
        {
            role: 'agent',
            text: `Salam! I am your personal shopping concierge. ${bargainingProduct ? `I see you're interested in the ${bargainingProduct.name}.` : ''} How can I help you negotiate the best price today?`,
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US'; // You can change this or make it dynamic

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                    setIsListening(true);
                } catch (error) {
                    console.error('Failed to start speech recognition:', error);
                }
            } else {
                alert("Speech recognition is not supported in your browser.");
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || isTyping) return;

        const userMsg = {
            role: 'user',
            text: inputText.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            // Send to n8n workflow
            const response = await chatService.sendMessage(userMsg.text, bargainingProduct, messages);
            
            // Assume n8n returns response in a field like 'output', 'response', or 'text'
            // or if the workflow just returns the string directly.
            const agentText = response.output || response.response || response.text || (typeof response === 'string' ? response : "I'm processing your request...");

            setMessages(prev => [...prev, {
                role: 'agent',
                text: agentText,
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            console.error('Failed to send message:', error);
            setMessages(prev => [...prev, {
                role: 'agent',
                text: "Sorry, I'm having trouble connecting to the Medina right now. Please try again later.",
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden pt-4">
            {/* Sidebar for Cart/Bargain State */}
            <div className="w-80 glass-dark border-r border-white/10 p-6 hidden lg:block overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 text-morocco-saffron flex items-center gap-2">
                    <Bot size={20} />
                    Your Bargains
                </h2>
                <div className="space-y-4">
                    {bargainingProduct ? (
                        <div className="glass p-4 rounded-xl border-l-4 border-morocco-saffron bg-morocco-saffron/5">
                            <p className="text-xs uppercase text-morocco-saffron font-bold mb-2">Current Negotiation</p>
                            <div className="flex items-center gap-3 mb-3">
                                {bargainingProduct.image ? (
                                    <img src={bargainingProduct.image} alt={bargainingProduct.name} className="w-12 h-12 rounded-lg object-cover shadow-lg" />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                                        <Bot size={24} className="text-white/20" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-sm leading-tight">{bargainingProduct.name}</p>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{bargainingProduct.category}</p>
                                </div>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-xs">
                                    <span className="text-white/40">Market Price</span>
                                    <span className="text-white font-bold">{bargainingProduct.price} MAD</span>
                                </div>
                                <div className="flex justify-between text-xs items-center">
                                    <span className="text-morocco-saffron font-bold">Your Offer</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-morocco-saffron font-black animate-pulse">Negotiating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                            <Bot size={40} className="mx-auto text-white/10 mb-4" />
                            <p className="text-white/40 text-sm">No active negotiations. Visit the Catalog to start a bargain!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-morocco-midnight to-black/90 relative">
                {/* Messages Display */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                                        msg.role === 'user' ? 'bg-morocco-terracotta text-white' : 'bg-morocco-saffron text-morocco-midnight'
                                    }`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-xl ${
                                        msg.role === 'user' 
                                            ? 'bg-morocco-terracotta/20 border border-morocco-terracotta/30 text-white rounded-tr-none' 
                                            : 'glass border border-white/10 text-white rounded-tl-none'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <p className={`text-[8px] mt-2 font-bold uppercase tracking-tighter ${
                                            msg.role === 'user' ? 'text-white/40' : 'text-morocco-saffron/60'
                                        }`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-morocco-saffron text-morocco-midnight flex items-center justify-center shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="glass border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-morocco-saffron rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-morocco-saffron rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-morocco-saffron rounded-full animate-bounce"></span>
                                        </div>
                                        <span className="text-[10px] font-bold text-morocco-saffron/60 uppercase tracking-widest">Consulting Artisan...</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 glass border-t border-white/10 bg-black/40">
                    <form 
                        onSubmit={handleSendMessage}
                        className="max-w-4xl mx-auto relative flex gap-4"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            disabled={isTyping}
                            placeholder={isTyping ? "Artisan is thinking..." : isListening ? "Listening... (Salam, I'm listening!)" : "Tell me what you want or start bargaining..."}
                            className={`flex-1 bg-white/5 border rounded-2xl px-6 py-4 focus:outline-none transition-all disabled:opacity-50 ${
                                isListening ? 'border-morocco-saffron ring-2 ring-morocco-saffron/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'border-white/10 focus:border-morocco-saffron'
                            }`}
                        />
                        
                        <button
                            type="button"
                            onClick={toggleListening}
                            disabled={isTyping}
                            className={`p-4 rounded-2xl flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                                isListening 
                                    ? 'bg-morocco-saffron text-morocco-midnight animate-pulse' 
                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                            title={isListening ? "Stop Listening" : "Start Voice Bargaining"}
                        >
                            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>

                        <button 
                            type="submit"
                            disabled={!inputText.trim() || isTyping}
                            className={`p-4 rounded-2xl flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
                                !inputText.trim() || isTyping
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-morocco-terracotta text-white hover:scale-105 hover:bg-morocco-clay shadow-morocco-terracotta/20'
                            }`}
                        >
                            {isTyping ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                        </button>
                    </form>
                    <div className="max-w-4xl mx-auto mt-3 flex justify-center">
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
                            Powered by <span className="text-morocco-saffron">AI Negotiation Engine</span> via n8n
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
