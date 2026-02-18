import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const successMessage = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        const result = login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 border-4 border-morocco-saffron rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-4 border-morocco-terracotta rounded-full blur-3xl"></div>
            </div>

            <div className="glass-dark w-full max-w-md p-10 rounded-[2.5rem] border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-morocco-terracotta via-morocco-saffron to-morocco-emerald"></div>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-2">Welcome <span className="text-morocco-saffron">Back</span></h1>
                    <p className="text-white/40 font-medium">Step into the Medina and continue your journey.</p>
                </div>

                {successMessage && (
                    <div className="bg-morocco-emerald/10 border border-morocco-emerald/20 text-morocco-emerald text-sm p-4 rounded-xl mb-6 text-center animate-pulse">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-widest text-white/60 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tajine@marrakech.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-morocco-saffron transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-widest text-white/60 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-morocco-saffron transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="text-xs text-morocco-saffron font-bold hover:underline">Forgot password?</button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-morocco-terracotta hover:bg-morocco-clay text-white py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-morocco-terracotta/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <span>Connecting...</span> : (
                            <>
                                <span>Enter the Souk</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest"><span className="bg-morocco-midnight px-4 text-white/30">Or join with</span></div>
                    </div>

                    <button className="w-full glass hover:bg-white/10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 mb-8">
                        <Github size={20} />
                        <span>Continue with GitHub</span>
                    </button>

                    <p className="text-center text-white/40 text-sm">
                        First time in Marrakech? <Link to="/register" className="text-morocco-saffron font-bold hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
