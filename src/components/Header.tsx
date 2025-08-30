import { createPageUrl } from '@/utils';
import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from './ui/button';
import { Heart, Home, Info, Menu, MessageCircle, Package, ShoppingBag, User, X } from 'lucide-react';

interface CartItem {
    id: string;
    quantity: number;
}

interface LikeItem {
    id: string;
}

const navigation = [
    { name: "Home", href: createPageUrl("Home"), icon: Home },
    { name: "Products", href: createPageUrl("Products"), icon: Package },
    { name: "About", href: createPageUrl("About"), icon: Info },
    { name: "Contact", href: createPageUrl("Contact"), icon: MessageCircle },
];

// Custom event names for cross-component communication
const CART_UPDATED_EVENT = 'cartUpdated';
const LIKES_UPDATED_EVENT = 'likesUpdated';

// Function to trigger custom events
const triggerEvent = (eventName: string) => {
    window.dispatchEvent(new CustomEvent(eventName));
};

// Custom hook for cart management
const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load cart from localStorage on component mount
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (err) {
                console.error("Invalid cart data in localStorage");
                localStorage.removeItem("cart");
            }
        }

        // Listen for custom events
        const handleCartUpdate = () => {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (err) {
                    console.error("Invalid cart data in localStorage");
                }
            } else {
                setCartItems([]);
            }
        };

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
        return () => window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    }, []);

    // Listen for storage events to sync cart across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "cart") {
                if (e.newValue) {
                    try {
                        setCartItems(JSON.parse(e.newValue));
                    } catch (err) {
                        console.error("Invalid cart data in storage event");
                    }
                } else {
                    setCartItems([]);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Calculate total items in cart
    const cartItemCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    return { cartItems, cartItemCount: cartItemCount() };
};

// Custom hook for likes management
const useLikes = () => {
    const [likeItems, setLikeItems] = useState<LikeItem[]>([]);

    useEffect(() => {
        // Load likes from localStorage on component mount
        const savedLikes = localStorage.getItem("likedProducts");
        if (savedLikes) {
            try {
                setLikeItems(JSON.parse(savedLikes));
            } catch (err) {
                console.error("Invalid likes data in localStorage");
                localStorage.removeItem("likedProducts");
            }
        }

        // Listen for custom events
        const handleLikesUpdate = () => {
            const savedLikes = localStorage.getItem("likedProducts");
            if (savedLikes) {
                try {
                    setLikeItems(JSON.parse(savedLikes));
                } catch (err) {
                    console.error("Invalid likes data in localStorage");
                }
            } else {
                setLikeItems([]);
            }
        };

        window.addEventListener(LIKES_UPDATED_EVENT, handleLikesUpdate);
        return () => window.removeEventListener(LIKES_UPDATED_EVENT, handleLikesUpdate);
    }, []);

    // Listen for storage events to sync likes across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "likedProducts") {
                if (e.newValue) {
                    try {
                        setLikeItems(JSON.parse(e.newValue));
                    } catch (err) {
                        console.error("Invalid likes data in storage event");
                    }
                } else {
                    setLikeItems([]);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Calculate total likes
    const likeItemCount = useCallback(() => {
        return likeItems.length;
    }, [likeItems]);

    return { likeItems, likeItemCount: likeItemCount() };
};

// Export functions to update cart and likes from other components
export const updateCartCount = () => {
    triggerEvent(CART_UPDATED_EVENT);
};

export const updateLikesCount = () => {
    triggerEvent(LIKES_UPDATED_EVENT);
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { cartItemCount } = useCart();
    const { likeItemCount } = useLikes();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={createPageUrl("Home")} className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 bg-gradient-to-l from-amber-300 to-amber-700 rounded-lg flex items-center justify-center"
                            aria-label="AK-Mart Home"
                        >
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-800 to-amber-500 bg-clip-text text-transparent">AK-Mart</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ y: -2 }}
                                    className={`relative text-sm font-medium transition-colors ${isActive
                                        ? "text-amber-600"
                                        : "text-slate-700 hover:text-slate-900"
                                        }`}
                                >
                                    <Link to={item.href}>
                                        {item.name}
                                    </Link>
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-500 rounded"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">

                        {/* Wishlist Icon */}
                        <Link
                            to={createPageUrl("Likes")}
                            aria-label="Wishlist"
                            className="relative group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 rounded-full transition-colors duration-200 ${location.pathname === createPageUrl("Likes")
                                    ? 'bg-red-100 text-red-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Heart
                                    className={`w-5 h-5 transition-colors duration-200 ${location.pathname === createPageUrl("Likes")
                                        ? 'fill-red-600 text-red-600'
                                        : 'group-hover:text-red-500'
                                        }`}
                                />
                                {likeItemCount > 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <span className={`h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center ${location.pathname === createPageUrl("Likes")
                                            ? 'bg-red-600 text-white'
                                            : 'bg-red-500 text-white'
                                            }`}>
                                            {likeItemCount > 9 ? '9+' : likeItemCount}
                                        </span>
                                    </motion.div>
                                )}
                                {/* Active indicator dot */}
                                {location.pathname === createPageUrl("Likes") && likeItemCount === 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>

                        {/* Cart Icon */}
                        <Link
                            to={createPageUrl("Cart")}
                            className="relative group"
                            aria-label={`Shopping Cart with ${cartItemCount} items`}
                        >
                            <motion.div
                                animate={{
                                    scale: cartItemCount > 0 ? [1, 1.1, 1] : 1
                                }}
                                transition={{
                                    duration: 0.3,
                                    times: [0, 0.5, 1]
                                }}
                                className={`p-2 rounded-full transition-colors duration-200 ${location.pathname === createPageUrl("Cart")
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <ShoppingBag
                                    className={`w-5 h-5 transition-colors duration-200 ${location.pathname === createPageUrl("Cart")
                                        ? 'text-blue-600'
                                        : 'group-hover:text-blue-500'
                                        }`}
                                />
                                {cartItemCount > 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <span className={`h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center ${location.pathname === createPageUrl("Cart")
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-amber-600 text-white'
                                            }`}>
                                            {cartItemCount > 9 ? '9+' : cartItemCount}
                                        </span>
                                    </motion.div>
                                )}
                                {/* Active indicator dot */}
                                {location.pathname === createPageUrl("Cart") && cartItemCount === 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>

                        {/* User Profile Icon */}
                        <Link
                            to={createPageUrl("UserProfile")}
                            aria-label="User Profile"
                            className="relative group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 rounded-full transition-colors duration-200 ${location.pathname === createPageUrl("UserProfile")
                                    ? 'bg-green-100 text-green-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <User
                                    className={`w-5 h-5 transition-colors duration-200 ${location.pathname === createPageUrl("UserProfile")
                                        ? 'text-green-600'
                                        : 'group-hover:text-green-500'
                                        }`}
                                />
                                {/* Active indicator dot */}
                                {location.pathname === createPageUrl("UserProfile") && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-600 rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>

                        {/* Mobile menu button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="md:hidden"
                        >
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`p-2 rounded-full ${isMenuOpen
                                    ? 'bg-gray-200 text-gray-800'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden border-t border-gray-100 bg-white"
                    >
                        <div className="px-4 py-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? "text-amber-600 bg-amber-50"
                                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="mobile-underline"
                                                className="w-1 h-6 bg-amber-500 rounded-full"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;