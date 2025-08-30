
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    CreditCard,
    Lock,
    Truck,
    MapPin,
    User,
    Mail,
    Phone,
    CheckCircle,
    Shield,
    Download,
    Printer,
    ShoppingBag,
    AlertCircle,
    Calendar,
    Package,
    Clock,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomerInfo, Order, OrderItem, PaymentMethod } from "@/types";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
    category?: string;
    brand?: string;
    stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
}

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
};

const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export default function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const [orderCompleted, setOrderCompleted] = useState(false);
    const [completedOrder, setCompletedOrder] = useState<Order | any>(null);
    const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Mock delivery dates
    const deliveryOptions = [
        { id: "standard", name: "Standard Delivery", cost: 5.99, days: "3-5 business days" },
        { id: "express", name: "Express Delivery", cost: 12.99, days: "2-3 business days" },
        { id: "priority", name: "Priority Delivery", cost: 19.99, days: "1-2 business days" }
    ];

    const paymentOptions = [
        { id: "credit_card", name: "Credit Card", icon: <CreditCard className="w-5 h-5 text-slate-500" /> },
        { id: "paypal", name: "PayPal", icon: <Shield className="w-5 h-5 text-slate-500" /> },
        { id: "bank_transfer", name: "Bank Transfer", icon: <Truck className="w-5 h-5 text-slate-500" /> },
    ];
    const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]);


    // Calculate estimated delivery date
    useEffect(() => {
        const today = new Date();
        let deliveryDays = 3;

        if (selectedDelivery.id === "express") deliveryDays = 2;
        if (selectedDelivery.id === "priority") deliveryDays = 1;

        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + deliveryDays);

        // Format date as "Month Day, Year"
        setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }));
    }, [selectedDelivery]);

    // Form state using CustomerInfo + payment method
    const [formData, setFormData] = useState<CustomerInfo & { payment_method: PaymentMethod }>({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        payment_method: "credit_card",
    });

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                const cart: CartItem[] = JSON.parse(savedCart);
                if (Array.isArray(cart) && cart.length > 0) {
                    // Add mock data for demonstration
                    const enhancedCart = cart.map(item => ({
                        ...item,
                        category: item.category || "Fashion",
                        brand: item.brand || "BrandX",
                        stockStatus: item.stockStatus || (Math.random() > 0.2 ? "in-stock" : "low-stock")
                    }));
                    setCartItems(enhancedCart);
                } else {
                    navigate(createPageUrl("Cart"));
                }
            } else {
                navigate(createPageUrl("Cart"));
            }
        } catch (err) {
            console.error("Error reading cart:", err);
            navigate(createPageUrl("Cart"));
        }
    }, [navigate]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : selectedDelivery.cost;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax - discount;

    const handleInputChange = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when field is updated
        if (formErrors[field]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
        if (!formData.phone.trim()) errors.phone = "Phone is required";
        if (!formData.address.trim()) errors.address = "Address is required";
        if (!formData.city.trim()) errors.city = "City is required";
        if (!formData.postal_code.trim()) errors.postal_code = "Postal code is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const applyPromoCode = () => {
        if (promoCode.toUpperCase() === "SAVE10") {
            setDiscount(subtotal * 0.1); // 10% discount
            // Show success message
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else if (promoCode.toUpperCase() === "FREESHIP") {
            setDiscount(selectedDelivery.cost);
            // Show success message
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setDiscount(0);
            // Show error message
            setFormErrors(prev => ({
                ...prev,
                promoCode: "Invalid promo code. Try SAVE10 or FREESHIP."
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const orderNumber = `ORD-${Date.now()}`;

            // Convert cartItems to OrderItem[]
            const orderItems: OrderItem[] = cartItems.map((item) => ({
                product_id: item.id,
                product_name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                product_image: item.image,
                color: item.color,
            }));

            // Build Order object with payment status as "paid"
            const newOrder: Order = {
                order_number: orderNumber,
                items: orderItems,
                total_amount: total,
                customer_info: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    postal_code: formData.postal_code,
                },
                payment_method: formData.payment_method,
                payment_status: "paid", // Mark as paid
                status: "processing",
                order_date: new Date().toISOString(),
                estimated_delivery: estimatedDelivery,
                shipping_method: selectedDelivery.name,
            };

            // Simulate API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Save order to localStorage for order history
            const existingOrders = localStorage.getItem("orders");
            const orders = existingOrders ? JSON.parse(existingOrders) : [];
            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Clear cart
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));

            // Set completed order and show success UI
            setCompletedOrder(newOrder);
            setOrderCompleted(true);
        } catch (error) {
            console.error("Error creating order:", error);
            alert("There was an error processing your order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const printBill = () => {
        window.print();
    };

    const downloadBill = () => {
        // Simple implementation to download bill as text file
        const billContent = `
            ORDER CONFIRMATION
            ==================
            Order Number: ${completedOrder?.order_number}
            Date: ${completedOrder?.order_date ? new Date(completedOrder.order_date).toLocaleDateString() : new Date().toLocaleDateString()}
            
            SHIPPING TO:
            ${completedOrder?.customer_info.name}
            ${completedOrder?.customer_info.address}
            ${completedOrder?.customer_info.city}, ${completedOrder?.customer_info.postal_code}
            ${completedOrder?.customer_info.email}
            ${completedOrder?.customer_info.phone}
            
            ORDER SUMMARY:
            ${completedOrder?.items.map((item: any) => `
              - ${item.product_name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            `).join('')}
            
            Subtotal: $${subtotal.toFixed(2)}
            Shipping: ${shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            Tax: $${tax.toFixed(2)}
            Discount: $${discount.toFixed(2)}
            Total: $${total.toFixed(2)}
            
            Payment Method: ${completedOrder?.payment_method}
            Payment Status: ${completedOrder?.payment_status}
            
            Thank you for your order!
        `;

        const blob = new Blob([billContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${completedOrder?.order_number}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (orderCompleted && completedOrder) {
        return (
            <div className="min-h-screen bg-white py-8 print:bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="relative inline-block">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <motion.div
                                className="absolute -top-1 -right-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            >
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Order Confirmed!</h1>
                        <p className="text-slate-600 mt-2">
                            Thank you for your purchase. Your order has been placed successfully.
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                            Order #: {completedOrder.order_number}
                        </p>
                    </motion.div>

                    {/* Order Details Card */}
                    <Card className="border-0 shadow-lg overflow-hidden print:shadow-none">
                        <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 print:bg-amber-600">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Order Details</CardTitle>
                                <div className="flex gap-2 print:hidden">
                                    <Button variant="outline" size="sm" onClick={downloadBill} className="bg-white/10 hover:bg-white/20 border-white text-white">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Bill
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={printBill} className="bg-white/10 hover:bg-white/20 border-white text-white">
                                        <Printer className="w-4 h-4 mr-2" />
                                        Print
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            {/* Order Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Order Information</h3>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Order Number:</span> {completedOrder.order_number}</p>
                                        <p><span className="font-medium">Order Date:</span> {new Date(completedOrder.order_date || new Date()).toLocaleDateString()}</p>
                                        <p><span className="font-medium">Payment Method:</span> {completedOrder.payment_method}</p>
                                        <p><span className="font-medium">Payment Status:</span>
                                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                {completedOrder.payment_status || "paid"}
                                            </span>
                                        </p>
                                        <p><span className="font-medium">Order Status:</span>
                                            <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                                {completedOrder.status}
                                            </span>
                                        </p>
                                        <p><span className="font-medium">Estimated Delivery:</span> {completedOrder.estimated_delivery}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800 mb-2">Shipping Information</h3>
                                    <div className="space-y-1 text-sm">
                                        <p>{completedOrder.customer_info.name}</p>
                                        <p>{completedOrder.customer_info.address}</p>
                                        <p>{completedOrder.customer_info.city}, {completedOrder.customer_info.postal_code}</p>
                                        <p>{completedOrder.customer_info.email}</p>
                                        <p>{completedOrder.customer_info.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-4">Order Items</h3>
                                <div className="space-y-4">
                                    {completedOrder.items.map((item: any, index: any) => (
                                        <div key={index} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100">
                                                    <img
                                                        src={cartItems.find(ci => ci.id === item.product_id)?.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80"}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.product_name}</p>
                                                    <div className="text-sm text-slate-600">
                                                        {item.size && <span>Size: {item.size} </span>}
                                                        {item.color && <span>Color: {item.color} </span>}
                                                        <span>Qty: {item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-slate-200 pt-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Shipping</span>
                                        <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Tax</span>
                                        <span className="font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-lg font-semibold text-slate-800 pt-2 border-t border-slate-200">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card className="mt-6 border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4">
                            <CardTitle className="text-lg font-semibold">What's Next?</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-lg bg-amber-50">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Package className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h4 className="font-medium text-slate-800">Order Processing</h4>
                                    <p className="text-sm text-slate-600 mt-1">We're preparing your items for shipment</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-amber-50">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Truck className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h4 className="font-medium text-slate-800">Shipping</h4>
                                    <p className="text-sm text-slate-600 mt-1">Your order will be shipped soon</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-amber-50">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <h4 className="font-medium text-slate-800">Delivery</h4>
                                    <p className="text-sm text-slate-600 mt-1">Expected by {estimatedDelivery}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 print:hidden">
                        <Button
                            onClick={() => navigate(createPageUrl("Home"))}
                            variant="secondary"
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            onClick={() => navigate(createPageUrl("OrderHistory"))}
                            variant="default"
                        >
                            View Order History
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with back button */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <Button
                        variant="default"
                        onClick={() => navigate(createPageUrl("Cart"))}
                        className="rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                    </Button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                        Checkout
                    </h1>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center w-full max-w-md mb-4">
                            {[1, 2, 3].map((step) => (
                                <React.Fragment key={step}>
                                    <div
                                        className={`flex flex-col items-center cursor-pointer ${activeStep >= step ? 'text-slate-900' : 'text-slate-400'}`}
                                        onClick={() => setActiveStep(step)}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= step ? 'bg-amber-600 text-white' : 'bg-slate-200'}`}>
                                            {activeStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                                        </div>
                                        <span className="text-xs mt-1 font-medium hidden sm:block">
                                            {step === 1 ? 'Details' : step === 2 ? 'Shipping' : 'Payment'}
                                        </span>
                                    </div>
                                    {step < 3 && (
                                        <div className={`flex-1 h-1 mx-2 ${activeStep > step ? 'bg-amber-600' : 'bg-slate-200'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="w-full max-w-md">
                            <Progress value={activeStep * 33.33} className="h-2" />
                        </div>
                    </div>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Customer Info */}
                        <motion.div
                            variants={staggerChildren}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {/* Contact Information Card */}
                            <motion.div variants={fadeIn}>
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-500 text-white py-4">
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-slate-700">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    placeholder="John Doe"
                                                    className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.name ? 'border-red-500' : ''}`}
                                                />
                                                {formErrors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-slate-700">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    placeholder="john@example.com"
                                                    className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.email ? 'border-red-500' : ''}`}
                                                />
                                                {formErrors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-slate-700">Phone Number *</Label>
                                            <Input
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                                className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.phone ? 'border-red-500' : ''}`}
                                            />
                                            {formErrors.phone && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.phone}</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Shipping Address Card */}
                            <motion.div variants={fadeIn}>
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-500 text-white py-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            <CardTitle className="text-lg font-semibold">Shipping Address</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="address" className="text-slate-700">Address *</Label>
                                            <Input
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={(e) => handleInputChange("address", e.target.value)}
                                                placeholder="123 Main Street"
                                                className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.address ? 'border-red-500' : ''}`}
                                            />
                                            {formErrors.address && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.address}</p>}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city" className="text-slate-700">City *</Label>
                                                <Input
                                                    id="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                                    placeholder="New York"
                                                    className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.city ? 'border-red-500' : ''}`}
                                                />
                                                {formErrors.city && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.city}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="postal_code" className="text-slate-700">Postal Code *</Label>
                                                <Input
                                                    id="postal_code"
                                                    required
                                                    value={formData.postal_code}
                                                    onChange={(e) => handleInputChange("postal_code", e.target.value)}
                                                    placeholder="10001"
                                                    className={`focus:ring-slate-900 focus:border-slate-900 ${formErrors.postal_code ? 'border-red-500' : ''}`}
                                                />
                                                {formErrors.postal_code && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.postal_code}</p>}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Delivery Options */}
                            <motion.div variants={fadeIn}>
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-500 text-white py-4">
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-5 h-5" />
                                            <CardTitle className="text-lg font-semibold">Delivery Options</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            {deliveryOptions.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${selectedDelivery.id === option.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-400'}`}
                                                    onClick={() => setSelectedDelivery(option)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedDelivery.id === option.id ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                                                            {selectedDelivery.id === option.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{option.name}</p>
                                                            <p className="text-sm text-slate-600">{option.days}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-medium">${option.cost.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar className="w-4 h-4 text-amber-600" />
                                                <span>Estimated delivery: {estimatedDelivery}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Payment Method Card */}
                            <motion.div variants={fadeIn}>
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-500 text-white py-4">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            <CardTitle className="text-lg font-semibold">Payment Method</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            {paymentOptions.map((method: any) => (
                                                <div
                                                    key={method.id}
                                                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${formData.payment_method === method.id
                                                        ? "border-amber-500 bg-amber-50"
                                                        : "border-slate-200 hover:border-slate-400"
                                                        }`}
                                                    onClick={() => handleInputChange("payment_method", method.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {/* Custom radio circle */}
                                                        <div
                                                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.payment_method === method.id
                                                                ? "border-amber-500 bg-amber-500"
                                                                : "border-slate-300"
                                                                }`}
                                                        >
                                                            {formData.payment_method === method.id && (
                                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                                            )}
                                                        </div>
                                                        <p className="font-medium">{method.name}</p>
                                                    </div>
                                                    {method.icon}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Lock className="w-4 h-4 text-green-600" />
                                                <span>Your payment information is secure and encrypted</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                        </motion.div>

                        {/* Right Column - Order Summary */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={slideInRight}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="border-0 shadow-xl sticky top-8 overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" />
                                        <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-6">
                                    {/* Items */}
                                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                                                    <img
                                                        src={
                                                            item.image ||
                                                            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&q=80"
                                                        }
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-slate-800 truncate">{item.name}</h4>
                                                            <div className="text-sm text-slate-600 mt-1">
                                                                {item.size && <span className="mr-3">Size: {item.size}</span>}
                                                                {item.color && <span>Color: {item.color}</span>}
                                                            </div>
                                                        </div>
                                                        <p className="font-medium text-slate-800">${item.price}</p>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex items-center gap-1 text-sm text-slate-600">
                                                            <span>Qty: {item.quantity}</span>
                                                            {item.stockStatus === "low-stock" && (
                                                                <Badge variant="outline" className="text-xs text-amber-600 border-amber-200 bg-amber-50">
                                                                    Low Stock
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>



                                    {/* Promo Code */}
                                    <div className="space-y-3">
                                        <Label htmlFor="promoCode" className="text-slate-700">Promo Code</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="promoCode"
                                                placeholder="Enter promo code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                className="focus:ring-slate-900 focus:border-slate-900"
                                            />

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={applyPromoCode}
                                                className="whitespace-nowrap"
                                            >
                                                Apply
                                            </Button>

                                        </div>
                                        {formErrors.promoCode && (
                                            <p className="text-red-500 text-xs flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {formErrors.promoCode}
                                            </p>
                                        )}

                                        {/* Promo Code Suggestions */}
                                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                            <p className="text-sm font-medium text-amber-800 mb-2 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                Available promo codes:
                                            </p>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-amber-700 bg-amber-100 border-amber-300">
                                                        SAVE10
                                                    </Badge>
                                                    <span className="text-amber-700">- 10% off your order</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-amber-700 bg-amber-100 border-amber-300">
                                                        FREESHIP
                                                    </Badge>
                                                    <span className="text-amber-700">- Free shipping</span>
                                                </div>
                                            </div>
                                        </div>

                                        {discount > 0 && (
                                            <div className="text-green-600 text-sm flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Discount applied: ${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Summary */}
                                    <div className="space-y-3 border-t border-slate-200 pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Subtotal</span>
                                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Shipping</span>
                                            <span className="font-medium">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Tax</span>
                                            <span className="font-medium">${tax.toFixed(2)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-${discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-semibold text-slate-800 pt-3 border-t border-slate-200">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Security Badge */}
                                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 p-3 bg-slate-50 rounded-lg">
                                        <Lock className="w-4 h-4" />
                                        <span>Secure checkout • 256-bit SSL encryption</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        disabled={isLoading || cartItems.length === 0}
                                        className="w-full py-6 text-lg font-semibold "
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <Lock className="w-5 h-5" />
                                                Complete Order • ${total.toFixed(2)}
                                            </div>
                                        )}
                                    </Button>

                                    {/* Continue Shopping Link */}
                                    <div className="text-center">
                                        <Button
                                            type="button"
                                            variant="link"
                                            onClick={() => navigate(createPageUrl("Cart"))}
                                            className="text-slate-600 hover:text-slate-800"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Return to Cart
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </form>
            </div>
        </div>
    );
}