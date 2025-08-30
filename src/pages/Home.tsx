import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import { productData } from "@/entities/Product";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/HeroSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleBrands, setVisibleBrands] = useState(0);

    useEffect(() => {
        loadFeaturedProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleBrands(prev => (prev + 1) % brands.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const loadFeaturedProducts = () => {
        try {
            const featured = productData.filter((p) => p.featured).slice(0, 4);
            setFeaturedProducts(featured);
        } catch (error) {
            console.error("Error loading featured products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const categories = [
        {
            name: "Clothing",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
            href: createPageUrl("Products") + "?category=clothing",
        },
        {
            name: "Shoes",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
            href: createPageUrl("Products") + "?category=shoes",
        },
        {
            name: "Accessories",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
            href: createPageUrl("Products") + "?category=accessories",
        },
        {
            name: "Bags",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
            href: createPageUrl("Products") + "?category=bags",
        },
    ];

    const features = [
        {
            icon: Truck,
            title: "Free Shipping",
            description: "Free worldwide shipping on orders over $100",
        },
        {
            icon: Shield,
            title: "Secure Payment",
            description: "100% secure payment with SSL encryption",
        },
        {
            icon: Zap,
            title: "Fast Delivery",
            description: "Express delivery in 2-3 business days",
        },
    ];

    const brands = [
        { name: "Nike", logo: "https://pngimg.com/d/nike_PNG6.png" },
        { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png" },
        { name: "Gucci", logo: "https://pngimg.com/d/gucci_PNG19.png" },
        { name: "Prada", logo: "https://cdn.worldvectorlogo.com/logos/prada-1.svg" },
        { name: "Louis Vuitton", logo: "https://static.vecteezy.com/system/resources/previews/027/127/446/non_2x/louis-vuitton-logo-louis-vuitton-icon-transparent-free-png.png" },
        { name: "Zara", logo: "https://download.logo.wine/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.png" },
        { name: "H&M", logo: "https://cdn.worldvectorlogo.com/logos/h-m-1.svg" },
        { name: "Chanel", logo: "https://cdn.freebiesupply.com/logos/large/2x/chanel-2-logo-png-transparent.png" },
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Fashion Influencer",
            content: "The quality of products here is exceptional. I always find something unique that helps me stand out.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Stylist",
            content: "My go-to place for premium fashion. The customer service is as impeccable as their collections.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 5
        },
        {
            name: "Emma Rodriguez",
            role: "Model",
            content: "I love how they constantly update their inventory with the latest trends while maintaining classic pieces.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 4
        }
    ];

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section */}
            <Hero featuredProducts={featuredProducts} />

            {/* Features Strip */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="py-10 bg-gradient-to-r from-slate-900 to-slate-800 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="p-3 bg-amber-500/10 rounded-full mb-4 group-hover:bg-amber-500/20 transition-colors">
                                <feature.icon className="w-8 h-8 text-amber-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-slate-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Brand Slider */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="py-12 bg-slate-50 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center mb-10 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">Featured Brands</h2>
                    <div className="relative">
                        <div className="flex justify-center items-center gap-12 flex-wrap">
                            <AnimatePresence mode="wait">
                                {brands.slice(visibleBrands, visibleBrands + 4).map((brand) => (
                                    <motion.div
                                        key={brand.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.2 }}
                                        transition={{ duration: 0.5 }}
                                        className="h-16 w-40  transition-all duration-300 flex items-center justify-center rounded bg-gradient-to-r from-[#eee12d62] to-[#dfc242b2]"
                                    >
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="max-h-12 max-w-full object-contain"
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-2">
                        {brands.slice(0, 4).map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full ${visibleBrands % 4 === index ? 'bg-amber-500' : 'bg-slate-300'}`}
                                onClick={() => setVisibleBrands(index)}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Categories Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent"
                        >
                            Shop by Category
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-600 max-w-2xl mx-auto"
                        >
                            Explore our carefully curated categories of premium products
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="relative"
                            >
                                <Link to={category.href}>
                                    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                                            <h3 className="text-white font-bold text-xl mb-2">{category.name}</h3>
                                            <div className="flex items-center text-white/80 text-sm">
                                                <span>Explore</span>
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Featured Products */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-slate-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">Featured Products</h2>
                            <p className="text-slate-600">Handpicked favorites from our collection</p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to={createPageUrl("Products")}>
                                <Button variant="secondary" className="hidden sm:flex items-center group">
                                    View All
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="animate-pulse"
                                    >
                                        <div className="aspect-square bg-slate-200 rounded-lg mb-4"></div>
                                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                                    </motion.div>
                                ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product: any, index) => (
                                <motion.div
                                    key={product?.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8 sm:hidden">
                        <Link to={createPageUrl("Products")}>
                            <Button variant="outline">
                                View All Products <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl lg:text-4xl font-bold mb-4"
                        >
                            What Our Customers Say
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-300 max-w-2xl mx-auto"
                        >
                            Discover why thousands of fashion enthusiasts choose us
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-200 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Newsletter Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-20 bg-amber-50"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl lg:text-4xl font-bold mb-4"
                    >
                        Stay in the Loop
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-slate-600 max-w-2xl mx-auto mb-8"
                    >
                        Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <Button className="bg-amber-600 hover:bg-amber-700 px-6 py-3">
                            Subscribe
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}