import { createPageUrl } from "@/utils";
import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const handleSubscribe = (e: any) => {
        e.preventDefault();
        if (email) {
            // In a real app, you would handle the subscription here
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white relative">
            {/* Back to top button */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                                AK-Mart
                            </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                            Premium fashion and lifestyle products for the modern individual.
                            Curated collections that blend style with substance.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/profile.php?id=61560968723953"
                                className="bg-slate-700 hover:bg-amber-500 p-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            {/* <a
                                href="#"
                                className="bg-slate-700 hover:bg-amber-500 p-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a> */}
                            <a
                                href="https://www.instagram.com/mr_kathare_13/"
                                className="bg-slate-700 hover:bg-amber-500 p-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/arvind-kathare-01955b213/"
                                className="bg-slate-700 hover:bg-amber-500 p-2.5 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
                            Shop
                        </h3>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li>
                                <Link
                                    to={createPageUrl("Products")}
                                    className="hover:text-amber-500 transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Bestsellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Sale
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
                            Support
                        </h3>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li>
                                <Link
                                    to={createPageUrl("Contact")}
                                    className="hover:text-amber-500 transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Returns & Exchanges
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
                            Company
                        </h3>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li>
                                <Link
                                    to={createPageUrl("About")}
                                    className="hover:text-amber-500 transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-amber-500 transition-all duration-300 flex items-center group">
                                    <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-2 md:col-span-2">
                        <h3 className="font-bold text-lg mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-amber-500">
                            Stay Updated
                        </h3>
                        <p className="text-slate-300 text-sm mb-4">
                            Subscribe to our newsletter for exclusive offers and updates
                        </p>

                        {subscribed ? (
                            <div className="bg-green-900/30 text-green-400 p-3 rounded-lg text-sm flex items-center">
                                <Heart className="w-4 h-4 mr-2 fill-current" />
                                Thank you for subscribing!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg px-5 py-3 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-amber-500/20"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}

                        <div className="mt-6 space-y-2">
                            <div className="flex items-center text-slate-300 text-sm">
                                <Phone className="w-4 h-4 mr-2 text-amber-500" />
                                <span>+91 1234567890</span>
                            </div>
                            <div className="flex items-center text-slate-300 text-sm">
                                <Mail className="w-4 h-4 mr-2 text-amber-500" />
                                <span>support@AK-Mart.com</span>
                            </div>
                            <div className="flex items-start text-slate-300 text-sm">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                                <span>Gondwara , Raipur Chhattisgarh, India, IN 493221</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm flex items-center">
                        &copy; {new Date().getFullYear()} AK-Mart. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <img src="https://logodix.com/logo/568886.jpg" alt="Visa" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                        <img src="https://pngimg.com/d/mastercard_PNG16.png" alt="Mastercard" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmCw9KwTMuJOlqCjSQ8StSY7qg0gMtohnqA&s" alt="PayPal" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                        <img src="https://download.logo.wine/logo/Apple_Pay/Apple_Pay-Logo.wine.png" alt="Apple Pay" className="h-6 opacity-70 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </footer>
    );
}