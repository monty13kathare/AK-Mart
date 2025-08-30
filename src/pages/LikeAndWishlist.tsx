import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import { Link } from 'react-router-dom';

const LikeAndWishlist = () => {
    const [activeTab, setActiveTab] = useState<'likes' | 'wishlist'>('likes');
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

    // Load liked products
    useEffect(() => {
        const loadLikedProducts = () => {
            const items = JSON.parse(localStorage.getItem("likedProducts") || "[]");
            setLikedProducts(items);
        };

        loadLikedProducts();
        window.addEventListener("likesUpdated", loadLikedProducts);

        return () => {
            window.removeEventListener("likesUpdated", loadLikedProducts);
        };
    }, []);

    // Load wishlist products
    useEffect(() => {
        const loadSavedProducts = () => {
            const items = JSON.parse(localStorage.getItem("savedProducts") || "[]");
            setWishlistProducts(items);
        };

        loadSavedProducts();
        window.addEventListener("savesUpdated", loadSavedProducts);

        return () => {
            window.removeEventListener("savesUpdated", loadSavedProducts);
        };
    }, []);

    // Remove from likes and localStorage
    const removeFromLikes = (productId: string) => {
        const updatedLikes = likedProducts.filter(product => product.id !== productId);
        setLikedProducts(updatedLikes);
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
        window.dispatchEvent(new Event("likesUpdated"));
    };

    // Remove from wishlist and localStorage
    const removeFromWishlist = (productId: string) => {
        const updatedWishlist = wishlistProducts.filter(product => product.id !== productId);
        setWishlistProducts(updatedWishlist);
        localStorage.setItem("savedProducts", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("savesUpdated"));
    };

    // Move product to wishlist
    const moveToWishlist = (product: Product) => {
        // Remove from likes
        const updatedLikes = likedProducts.filter(p => p.id !== product.id);
        setLikedProducts(updatedLikes);
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));

        // Add to wishlist
        const updatedWishlist = [...wishlistProducts, product];
        setWishlistProducts(updatedWishlist);
        localStorage.setItem("savedProducts", JSON.stringify(updatedWishlist));

        // Dispatch events to update other components
        window.dispatchEvent(new Event("likesUpdated"));
        window.dispatchEvent(new Event("savesUpdated"));
    };

    // Move product to likes
    const moveToLikes = (product: Product) => {
        // Remove from wishlist
        const updatedWishlist = wishlistProducts.filter(p => p.id !== product.id);
        setWishlistProducts(updatedWishlist);
        localStorage.setItem("savedProducts", JSON.stringify(updatedWishlist));

        // Add to likes
        const updatedLikes = [...likedProducts, product];
        setLikedProducts(updatedLikes);
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));

        // Dispatch events to update other components
        window.dispatchEvent(new Event("likesUpdated"));
        window.dispatchEvent(new Event("savesUpdated"));
    };

    // Filter and sort products
    const filterAndSortProducts = (products: Product[]) => {
        let filtered = products?.filter(product =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort products
        filtered?.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'price') {
                return a.price - b.price;
            } else {
                return b.rating - a.rating;
            }
        });

        return filtered;
    };

    const filteredLikedProducts = filterAndSortProducts(likedProducts);
    const filteredWishlistProducts = filterAndSortProducts(wishlistProducts);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold  mb-2 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent"
                    >
                        Your Favorites
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600"
                    >
                        Manage your liked items and wishlist
                    </motion.p>
                </div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm"
                >
                    <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Sort by:</span>
                        <select
                            className="border border-gray-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-8"
                >
                    <div className="border border-gray-200 rounded-xl p-1 bg-white shadow-sm">
                        <button
                            onClick={() => setActiveTab('likes')}
                            className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'likes'
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                Likes ({likedProducts.length})
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'wishlist'
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Wishlist ({wishlistProducts.length})
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'likes' ? (
                            <motion.div
                                key="likes"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="col-span-full"
                            >
                                {filteredLikedProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredLikedProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onRemove={() => removeFromLikes(product.id)}
                                                onMove={() => moveToWishlist(product)}
                                                moveButtonText="Add to Wishlist"
                                                type="likes"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        type="likes"
                                        hasProducts={likedProducts.length > 0}
                                        searchTerm={searchTerm}
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="wishlist"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="col-span-full"
                            >
                                {filteredWishlistProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredWishlistProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onRemove={() => removeFromWishlist(product.id)}
                                                onMove={() => moveToLikes(product)}
                                                moveButtonText="Add to Likes"
                                                type="wishlist"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        type="wishlist"
                                        hasProducts={wishlistProducts.length > 0}
                                        searchTerm={searchTerm}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Product Card Component
const ProductCard = ({
    product,
    onRemove,
    onMove,
    moveButtonText,
    type
}: {
    product: Product;
    onRemove: () => void;
    onMove: () => void;
    moveButtonText: string;
    type: 'likes' | 'wishlist';
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <div className="h-48 overflow-hidden">
                    <Link to={`/productDetail/${product.id}`}>
                        <motion.img
                            src={product.images}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                </div>

                <motion.button
                    onClick={onRemove}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </motion.button>

                {type === 'likes' && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            Liked
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.name}</h3>
                    <span className="font-bold text-amber-600">${product.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                </div>

                <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>

                <motion.div
                    className="flex space-x-2"
                    initial={false}
                    animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        onClick={onMove}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                        {moveButtonText}
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Empty State Component
const EmptyState = ({
    type,
    hasProducts,
    searchTerm
}: {
    type: 'likes' | 'wishlist';
    hasProducts: boolean;
    searchTerm: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm"
        >
            <div className="text-gray-300 mb-6">
                {type === 'likes' ? (
                    <svg className="mx-auto h-20 w-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                )}
            </div>

            {hasProducts && searchTerm ? (
                <>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No matching products found</h3>
                    <p className="text-gray-500">Try adjusting your search term</p>
                </>
            ) : type === 'likes' ? (
                <>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No liked items yet</h3>
                    <p className="text-gray-500">Items you like will appear here</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                        onClick={() => window.location.href = '/products'}
                    >
                        Browse Products
                    </motion.button>
                </>
            ) : (
                <>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500">Save items you love for later</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                        onClick={() => window.location.href = '/products'}
                    >
                        Discover Products
                    </motion.button>
                </>
            )}
        </motion.div>
    );
};

export default LikeAndWishlist;