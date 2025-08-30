import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductCard({ product }: any) {
    const isOnSale = product.sale_price && product.sale_price < product.price;
    const displayPrice = isOnSale ? product.sale_price : product.price;
    const discountPercentage = isOnSale
        ? Math.round(((product.price - product.sale_price) / product.price) * 100)
        : 0;


    // State for tracking like and save status
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Check if product is already liked/saved on component mount
    useEffect(() => {
        // Check if product is liked
        const likedItems = JSON.parse(localStorage.getItem("likedProducts") || "[]");
        setIsLiked(likedItems.some((item: any) => item.id === product.id));

        // Check if product is saved
        const savedItems = JSON.parse(localStorage.getItem("savedProducts") || "[]");
        setIsSaved(savedItems.some((item: any) => item.id === product.id));
    }, [product.id]);

    const addToCart = (e: any) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find((item: any) => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: displayPrice,
                images: product.images?.[0] || "",
                quantity: 1,
                size: product.sizes?.[0] || "",
                color: product.colors?.[0] || "",
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));

        // Add to cart animation
        const button = e.currentTarget;
        const originalContent = button.innerHTML;
        button.innerHTML = 'Added!';
        button.classList.add('bg-green-500', 'hover:bg-green-600');

        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.remove('bg-green-500', 'hover:bg-green-600');
        }, 1500);
    };

    const toggleLike = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");

        if (isLiked) {
            // Remove from liked products
            const updatedLikes = likedProducts.filter((item: any) => item.id !== product.id);
            localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
            setIsLiked(false);
        } else {
            // Add to liked products
            const productToAdd = {
                id: product.id,
                name: product.name,
                price: displayPrice,
                originalPrice: product.price,
                images: product.images?.[0] || "",
                rating: product.rating,
                isOnSale,
            };

            likedProducts.push(productToAdd);
            localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
            setIsLiked(true);
        }

        window.dispatchEvent(new Event("likesUpdated"));
    };

    const toggleSave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const savedProducts = JSON.parse(localStorage.getItem("savedProducts") || "[]");

        if (isSaved) {
            // Remove from saved products
            const updatedSaves = savedProducts.filter((item: any) => item.id !== product.id);
            localStorage.setItem("savedProducts", JSON.stringify(updatedSaves));
            setIsSaved(false);
        } else {
            // Add to saved products
            const productToAdd = {
                id: product.id,
                name: product.name,
                price: displayPrice,
                originalPrice: product.price,
                images: product.images?.[0] || "",
                rating: product.rating,
                isOnSale,
            };

            savedProducts.push(productToAdd);
            localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
            setIsSaved(true);
        }

        window.dispatchEvent(new Event("savesUpdated"));
    };

    return (
        <Link
            to={createPageUrl("ProductDetail", { id: product.id })}
            className="block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={
                            product.images?.[0] ||
                            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                        }
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                    />

                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {isOnSale && (
                            <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-md">
                                {discountPercentage}% OFF
                            </Badge>
                        )}
                        {product.isNew && (
                            <Badge className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-md">
                                New
                            </Badge>
                        )}
                    </div>

                    {/* Quick view button */}
                    <div className={`absolute top-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <Button size="sm" className="rounded-full bg-white text-gray-800 hover:bg-amber-50 hover:text-amber-600 shadow-md text-xs font-medium">
                            <Eye className="w-3 h-3 mr-1" />
                            Quick View
                        </Button>
                    </div>

                    {/* Floating buttons */}
                    <div className={`absolute bottom-3 left-0 right-0 flex justify-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        <Button
                            size="sm"
                            variant="secondary"
                            className={`rounded-full ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} hover:bg-red-500 hover:text-white shadow-md transition-colors`}
                            onClick={toggleLike}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                        </Button>
                        <Button
                            size="sm"
                            className="rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-md"
                            onClick={addToCart}
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            className={`rounded-full ${isSaved ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'} hover:bg-indigo-500 hover:text-white shadow-md transition-colors`}
                            onClick={toggleSave}
                        >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                        </Button>
                    </div>
                </div>

                <CardContent className="p-4">
                    {/* Product Name */}
                    <h3 className="font-semibold mb-2 text-gray-900 line-clamp-2 hover:text-amber-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">({product.rating || 0})</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-gray-900">
                                ${displayPrice}
                            </span>
                            {isOnSale && (
                                <span className="text-sm text-gray-400 line-through">
                                    ${product.price}
                                </span>
                            )}
                        </div>

                        {/* Color swatches */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="flex gap-1">
                                {product.colors.slice(0, 3).map((color: any, index: any) => (
                                    <div
                                        key={index}
                                        className="w-5 h-5 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        title={color}
                                    />
                                ))}
                                {product.colors.length > 3 && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                        +{product.colors.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}