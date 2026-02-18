import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center mx-4 mt-4 rounded-2xl">
            <Link to="/" className="text-2xl font-bold text-gradient">
                SOUK AI
            </Link>

            <div className="hidden md:flex gap-8 items-center font-medium">
                <Link to="/catalog" className="hover:text-morocco-saffron transition-colors">Catalog</Link>
                <Link to="/chat" className="hover:text-morocco-saffron transition-colors flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Ask Agent</span>
                </Link>
                <Link to="/track" className="hover:text-morocco-saffron transition-colors">Track Order</Link>
            </div>

            <div className="flex gap-4 items-center">
                <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                    <Search size={20} />
                </button>
                <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-all relative">
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-morocco-terracotta text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-3 pl-2 border-l border-white/10 ml-2">
                        <span className="text-xs font-bold text-morocco-saffron hidden lg:block">Salam, {user.name}</span>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-red-500/10 text-white/60 hover:text-red-500 rounded-full transition-all group"
                            title="Logout"
                        >
                            <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition-all">
                        <User size={20} />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
