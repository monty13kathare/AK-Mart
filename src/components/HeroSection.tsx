import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    images: string[];
    description: string;
}

interface HeroProps {
    featuredProducts: Product[];
}

// Banner images for the slider
const bannerImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1700&q=80",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
];

export default function Hero({ featuredProducts }: HeroProps) {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    // Auto-slide banners every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Auto-slide products every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [featuredProducts.length]);

    // const nextBanner = () => {
    //     setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length);
    // };

    // const prevBanner = () => {
    //     setCurrentBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    // };

    // const nextProduct = () => {
    //     setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length);
    // };

    // const prevProduct = () => {
    //     setCurrentProductIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    // };

    return (
        <section className="relative h-screen max-h-[800px] flex items-center overflow-hidden">
            {/* Banner Image Slider */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBannerIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bannerImages[currentBannerIndex]})` }}
                    />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60"></div>

                {/* Banner navigation */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentBannerIndex === index ? 'bg-amber-500' : 'bg-white/50'}`}
                            onClick={() => setCurrentBannerIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Banner arrows */}
                {/* <button
                    onClick={prevBanner}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextBanner}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button> */}
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left Text Content */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white max-w-2xl space-y-6"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Redefine Your <span className="text-amber-400">Style Identity</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-200 mt-4">
                            Discover exclusive collections that blend timeless elegance with contemporary trends.
                            Curated by fashion experts to help you express your unique personality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                    >
                        <Link to="/products">
                            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 flex items-center gap-2 group">
                                Explore Collection
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 flex items-center gap-2 group"
                        >
                            <Play className="w-5 h-5 mr-1" />
                            Spring Lookbook
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="grid grid-cols-3 gap-6 pt-6 mt-8 border-t border-white/20"
                    >
                        <div>
                            <p className="text-3xl font-bold text-amber-400">200+</p>
                            <p className="text-slate-300">Designer Brands</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-amber-400">5K+</p>
                            <p className="text-slate-300">Happy Customers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-amber-400">100%</p>
                            <p className="text-slate-300">Quality Guaranteed</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Product Slider */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full lg:w-[45%] flex justify-center items-center"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProductIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-sm"
                        >
                            {featuredProducts.length > 0 && (
                                <motion.div
                                    className="bg-white shadow-2xl rounded-2xl overflow-hidden cursor-pointer"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={featuredProducts[currentProductIndex].images[0]}
                                            alt={featuredProducts[currentProductIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl mb-2">{featuredProducts[currentProductIndex].name}</h3>
                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                            {featuredProducts[currentProductIndex].description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-amber-600 font-bold text-xl">${featuredProducts[currentProductIndex].price}</p>
                                            <div className="flex items-center text-yellow-400">
                                                <Star className="w-5 h-5 fill-current mr-1" />
                                                {featuredProducts[currentProductIndex].rating}
                                            </div>
                                        </div>
                                        <Button variant="secondary" className="w-full mt-4">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Product navigation */}
                    {/* <button
                        onClick={prevProduct}
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white text-slate-900 p-2 rounded-full shadow-lg hover:bg-amber-50 transition-all"
                        aria-label="Previous product"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextProduct}
                        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white text-slate-900 p-2 rounded-full shadow-lg hover:bg-amber-50 transition-all"
                        aria-label="Next product"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button> */}
                </motion.div>
            </div>

            {/* Animated decorative elements */}
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full opacity-10 blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </section>
    );
}