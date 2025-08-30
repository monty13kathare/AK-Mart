import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight, Truck, Mail, Home, ShoppingBag, Clock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderSuccess() {
    const navigate = useNavigate();
    const [orderNumber, setOrderNumber] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const order = urlParams.get('order');
        if (order) {
            setOrderNumber(order);
            setIsVisible(true);
        } else {
            navigate(createPageUrl("Home"));
        }
    }, [navigate]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const checkIconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Header with celebration animation */}
                            <motion.div
                                variants={itemVariants}
                                className="text-center"
                            >
                                <motion.div
                                    variants={checkIconVariants}
                                    className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                                >
                                    <CheckCircle className="w-12 h-12 text-white" />
                                </motion.div>

                                <motion.h1
                                    className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4"
                                    variants={itemVariants}
                                >
                                    Order Confirmed!
                                </motion.h1>

                                <motion.p
                                    className="text-lg text-slate-600 max-w-md mx-auto"
                                    variants={itemVariants}
                                >
                                    Thank you for your purchase. We've received your order and will process it shortly.
                                </motion.p>
                            </motion.div>

                            {/* Order details card */}
                            <motion.div variants={itemVariants}>
                                <Card className="border-0 shadow-xl overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-5">
                                        <CardTitle className="flex items-center justify-center gap-2 text-lg">
                                            <Shield className="w-5 h-5" />
                                            Order Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-8 pb-6">
                                        {orderNumber && (
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6 text-center"
                                            >
                                                <p className="text-sm text-emerald-800 font-medium mb-1">Order Number</p>
                                                <p className="font-mono font-bold text-xl text-emerald-900">{orderNumber}</p>
                                            </motion.div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm mb-6">
                                            <motion.div
                                                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                                                whileHover={{ y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Clock className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">Processing</p>
                                                    <p className="text-slate-600 mt-1">1-2 business days</p>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                                                whileHover={{ y: -5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Truck className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">Delivery</p>
                                                    <p className="text-slate-600 mt-1">3-5 business days</p>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-sm">We've sent a confirmation email with your order details.</span>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Action buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                <Link to={createPageUrl("Products")} className="block">
                                    <Button
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white py-6 text-base font-medium shadow-md hover:shadow-lg transition-all"
                                    >
                                        <ShoppingBag className="mr-2 w-5 h-5" />
                                        Continue Shopping
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>

                                <Link to={createPageUrl("Home")}>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full border-slate-300 text-slate-700 hover:bg-slate-100 py-6 text-base font-medium"
                                    >
                                        <Home className="mr-2 w-5 h-5" />
                                        Back to Home
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Support section */}
                            <motion.div
                                variants={itemVariants}
                                className="text-center pt-6"
                            >
                                <p className="text-sm text-slate-600">
                                    Need help? <a href="#" className="text-slate-900 font-medium underline hover:text-slate-700 transition-colors">Contact Support</a>
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}