import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Star,
    Heart,
    Share2,
    ShoppingBag,
    Minus,
    Plus,
    Truck,
    Shield,
    RotateCcw,
} from "lucide-react";
import { productData } from "@/entities/Product";

// Cart Item type
interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
}

export default function ProductDetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>(); // ✅ call hook at top

    useEffect(() => {
        if (id) {
            loadProduct(id);
        } else {
            navigate(createPageUrl("Products"));
        }
    }, [id, navigate]);



    const loadProduct = async (id: string) => {
        try {
            setIsLoading(true);

            // 1️⃣ Get products from localStorage
            const storedProducts = localStorage.getItem("products");
            const localProducts = storedProducts ? JSON.parse(storedProducts) : [];

            // 2️⃣ Try to find product in localStorage first
            let foundProduct = localProducts.find((p: any) => p.id === id);

            // 3️⃣ If not found in localStorage, fallback to main productData
            if (!foundProduct) {
                const allProducts = await productData; // API or static data
                foundProduct = allProducts.find((p: any) => p.id === id);
            }

            // 4️⃣ If product found, set states
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedSize(foundProduct.sizes?.[0] || "");
                setSelectedColor(foundProduct.colors?.[0] || "");
            } else {
                // 5️⃣ If product not found anywhere, redirect to Products page
                navigate(createPageUrl("Products"));
            }
        } catch (error) {
            console.error("Error loading product:", error);
            navigate(createPageUrl("Products"));
        } finally {
            setIsLoading(false);
        }
    };




    const addToCart = () => {
        if (!product) return;

        const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const isOnSale = !!(product.sale_price && product.sale_price < product.price);
        const price = isOnSale ? product.sale_price! : product.price;

        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price,
            image: product.images?.[selectedImage] || "",
            quantity,
            size: selectedSize,
            color: selectedColor,
        };

        const existingItemIndex = cart.findIndex(
            (item) =>
                item.id === product.id &&
                item.size === selectedSize &&
                item.color === selectedColor
        );

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));

        navigate(createPageUrl("Cart"));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <div className="aspect-square bg-slate-200 rounded-lg"></div>
                                <div className="flex gap-4">
                                    {Array(4)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-20 h-20 bg-slate-200 rounded-lg"
                                            ></div>
                                        ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                                <div className="h-32 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                    <Button onClick={() => navigate(createPageUrl("Products"))}>
                        Browse Products
                    </Button>
                </div>
            </div>
        );
    }

    const isOnSale = !!(product.sale_price && product.sale_price < product.price);
    const displayPrice = isOnSale ? product.sale_price! : product.price;

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 -ml-4 hover:text-amber-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
                            <img
                                src={
                                    product.images?.[selectedImage] ||
                                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto">
                                {product.images.map((image: any, index: any) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? "border-amber-400"
                                            : "border-gray-200 hover:border-amber-400"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title & Price */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold">${displayPrice}</span>
                                    {isOnSale && (
                                        <>
                                            <span className="text-xl text-slate-500 line-through">
                                                ${product.price}
                                            </span>
                                            <Badge className="bg-red-500">
                                                {Math.round(
                                                    (1 - product.sale_price! / product.price) * 100
                                                )}
                                                % OFF
                                            </Badge>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 ml-auto">
                                    <Button variant="ghost" size="icon">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {product.rating && (
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-slate-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-slate-600">({product.rating})</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div>
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-slate-600">{product.description}</p>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size: any) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border rounded-lg transition-all ${selectedSize === size
                                                ? "bg-gradient-to-r from-amber-500 to-amber-700 text-white"
                                                : "border-amber-300 hover:border-amber-500"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
                                <div className="flex gap-3">
                                    {product.colors.map((color: any) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === color
                                                ? "border-amber-400 scale-110"
                                                : "border-slate-200 hover:border-amber-400"
                                                }`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <h3 className="font-semibold mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {product.stock !== undefined && (
                                    <span className="text-sm text-slate-600">
                                        {product.stock > 10
                                            ? "In Stock"
                                            : `Only ${product.stock} left`}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full py-4"
                            onClick={addToCart}
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" />
                            Add to Cart - ${(displayPrice * quantity).toFixed(2)}
                        </Button>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3 text-sm">
                                <Truck className="w-5 h-5 text-slate-600" />
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Shield className="w-5 h-5 text-slate-600" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <RotateCcw className="w-5 h-5 text-slate-600" />
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
