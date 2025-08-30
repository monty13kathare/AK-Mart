import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";

// Define Cart Item Type
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
    color?: string;
}

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        loadCart();

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    const loadCart = () => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsedCart: CartItem[] = JSON.parse(savedCart);
                setCartItems(parsedCart);
            } catch (error) {
                console.error("Error parsing cart:", error);
                setCartItems([]);
            }
        }
    };

    const updateCart = (newCart: CartItem[]) => {
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = (itemIndex: number, newQuantity: number) => {
        if (newQuantity <= 0) return;

        const newCart = [...cartItems];
        newCart[itemIndex].quantity = newQuantity;
        updateCart(newCart);
    };

    const removeItem = (itemIndex: number) => {
        const newCart = cartItems.filter((_, index) => index !== itemIndex);
        updateCart(newCart);
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-slate-600 mb-8">Add some products to get started</p>
                        <Link to={createPageUrl("Products")}>
                            <Button size="lg" variant="secondary">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <Button onClick={() => navigate(-1)} className="">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Shopping Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <Card key={item.id || index} className="overflow-hidden border-gray-300">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="w-full sm:w-32 aspect-square rounded-lg overflow-hidden bg-slate-100">
                                            <img
                                                src={
                                                    item.image ||
                                                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80"
                                                }
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">
                                                        {item.name}
                                                    </h3>
                                                    <div className="space-y-1 text-sm text-slate-600">
                                                        {item.size && <p>Size: {item.size}</p>}
                                                        {item.color && <p>Color: {item.color}</p>}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    onClick={() => removeItem(index)}
                                                    className="text-slate-400 hover:text-red-500 "
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-slate-200 rounded-lg">
                                                    <Button
                                                        size="icon"
                                                        onClick={() =>
                                                            updateQuantity(index, item.quantity - 1)
                                                        }
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <span className="px-4 py-2 font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            updateQuantity(index, item.quantity + 1)
                                                        }
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold text-lg">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        ${item.price} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8 border border-gray-300">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>

                                {subtotal < 100 && shipping > 0 && (
                                    <p className="text-sm text-slate-600">
                                        Add ${(100 - subtotal).toFixed(2)} more for free shipping
                                    </p>
                                )}

                                <hr />

                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <Link to={createPageUrl("Checkout")} className="block">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link to={createPageUrl("Products")} className="block">
                                    <Button size="lg" variant="default" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
