import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { productData } from "@/entities/Product";
import ProductFilter from "@/components/ProductFilter";

// Product type
export interface Product {
    id: string | number;
    name: string;
    description?: string;
    price: number;
    sale_price?: number;
    rating?: number;
    created_date?: string;
    tags?: string[];
    category?: string;
    sizes?: string[];
    colors?: string[];
}

// Sort options type
type SortOption = "name" | "price_low" | "price_high" | "rating" | "newest";

// View mode type
type ViewMode = "grid" | "list";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("name");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const product2 = JSON.parse(localStorage.getItem('products') || '[]');
    const [filters, setFilters] = useState<any>({
        search: "",
        categories: [],
        sizes: [],
        colors: [],
        priceRange: [0, 1000],
    });

    // Merge both dummy and localStorage product data
    const mergeProductData = [...products, ...product2];


    // Load products
    useEffect(() => {
        loadProducts();
    }, []);

    // Apply filters whenever state changes
    useEffect(() => {
        applyFilters();
    }, [products, filters, sortBy]);

    // Get category from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");
        if (category && !filters.categories.includes(category)) {
            setFilters((prev: any) => ({
                ...prev,
                categories: [category],
            }));
        }
    }, []);

    const loadProducts = async () => {
        try {
            const data: Product[] = await productData;
            setProducts(data);

            // Adjust price range based on products
            if (data.length > 0) {
                const maxPrice = Math.max(...data.map((p) => p.price || 0));
                setFilters((prev: any) => ({
                    ...prev,
                    priceRange: [0, maxPrice],
                }));
            }
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...mergeProductData];

        // Search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.name?.toLowerCase().includes(searchLower) ||
                    product.description?.toLowerCase().includes(searchLower) ||
                    product.tags?.some((tag: any) => tag.toLowerCase().includes(searchLower))
            );
        }

        // Categories
        if (filters.categories.length > 0) {
            filtered = filtered.filter((product) =>
                filters.categories.includes(product.category || "")
            );
        }

        // Sizes
        if (filters.sizes.length > 0) {
            filtered = filtered.filter((product) =>
                product.sizes?.some((size: any) => filters.sizes.includes(size))
            );
        }

        // Colors
        if (filters.colors.length > 0) {
            filtered = filtered.filter((product) =>
                product.colors?.some((color: any) => filters.colors.includes(color))
            );
        }

        // Price
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            filtered = filtered.filter((product) => {
                const price = product.sale_price || product.price || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "price_low":
                    return (
                        (a.sale_price || a.price || 0) - (b.sale_price || b.price || 0)
                    );
                case "price_high":
                    return (
                        (b.sale_price || b.price || 0) - (a.sale_price || a.price || 0)
                    );
                case "rating":
                    return (b.rating || 0) - (a.rating || 0);
                case "newest":
                    return (
                        new Date(b.created_date || "").getTime() -
                        new Date(a.created_date || "").getTime()
                    );
                default:
                    return (a.name || "").localeCompare(b.name || "");
            }
        });

        setFilteredProducts(filtered);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-200 rounded w-48 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="h-96 bg-slate-200 rounded"></div>
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Array(9)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className="bg-slate-200 rounded-lg h-80"
                                            ></div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">All Products</h1>
                        <p className="text-slate-600">
                            Showing {filteredProducts.length} of {products.length} products
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                        >
                            <option value="name">Name A-Z</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest First</option>
                        </select>

                        {/* View Mode */}
                        {/* <div className="hidden sm:flex border border-slate-200 rounded-lg">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                                className="rounded-r-none"
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                                className="rounded-l-none"
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div> */}

                        {/* Mobile Filter Toggle */}
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterOpen(true)}
                            className="lg:hidden flex items-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <ProductFilter
                        filters={filters}
                        onFiltersChange={setFilters}
                        isOpen={isFilterOpen}
                        onToggle={() => setIsFilterOpen(!isFilterOpen)}
                        products={products}
                    />

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Package className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">
                                    No products found
                                </h3>
                                <p className="text-slate-600 mb-4">
                                    Try adjusting your filters or search terms
                                </p>
                                <Button
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            categories: [],
                                            sizes: [],
                                            colors: [],
                                            priceRange: [0, 1000],
                                        })
                                    }
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div
                                className={`grid gap-6 ${viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    : "grid-cols-1"
                                    }`}
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
