import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Filter } from "lucide-react";
import React from "react";

interface Product {
    id: string | number;
    name: string;
    price: number;
    colors?: string[];
    category?: string;
    size?: string;
}

interface FilterState {
    search: string;
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
}

interface ProductFilterProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    isOpen: boolean;
    onToggle: () => void;
    products?: Product[];
}

export default function ProductFilter({
    filters,
    onFiltersChange,
    isOpen,
    onToggle,
    products = [],
}: ProductFilterProps) {
    const categories = ["clothing", "shoes", "accessories", "bags", "jewelry"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const availableColors = [...new Set(products.flatMap((p) => p.colors || []))];
    const maxPrice = Math.max(...products.map((p) => p.price || 0), 1000);

    const handlePriceChange = (value: number[]) => {
        onFiltersChange({ ...filters, priceRange: value as [number, number] });
    };

    const handleCategoryChange = (category: string, checked: boolean) => {
        const newCategories = checked
            ? [...(filters.categories || []), category]
            : (filters.categories || []).filter((c) => c !== category);
        onFiltersChange({ ...filters, categories: newCategories });
    };

    const handleSizeChange = (size: string, checked: boolean) => {
        const newSizes = checked
            ? [...(filters.sizes || []), size]
            : (filters.sizes || []).filter((s) => s !== size);
        onFiltersChange({ ...filters, sizes: newSizes });
    };

    const handleColorChange = (color: string, checked: boolean) => {
        const newColors = checked
            ? [...(filters.colors || []), color]
            : (filters.colors || []).filter((c) => c !== color);
        onFiltersChange({ ...filters, colors: newColors });
    };

    const clearFilters = () => {
        onFiltersChange({
            search: "",
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, maxPrice],
        });
    };

    const filterContent = (
        <div className="space-y-6">
            {/* Search */}
            <div>
                <Label htmlFor="search" className="text-sm font-semibold mb-2 block">
                    Search Products
                </Label>
                <Input
                    id="search"
                    placeholder="Search..."
                    value={filters.search || ""}
                    onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                    className="border-gray-300 focus:border-amber-400 focus:ring-amber-400 rounded-md"
                />
            </div>

            {/* Price Range */}
            <div>
                <Label className="text-sm font-semibold mb-4 block">
                    Price: ${filters.priceRange?.[0]} - ${filters.priceRange?.[1]}
                </Label>
                <Slider
                    value={filters.priceRange || [0, maxPrice]}
                    onValueChange={handlePriceChange}
                    max={maxPrice}
                    step={10}
                    className="w-full"
                />
            </div>

            {/* Categories */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Categories</Label>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={category}
                                checked={(filters.categories || []).includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, Boolean(checked))}
                                className="text-amber-600"
                            />
                            <Label htmlFor={category} className="capitalize text-sm cursor-pointer">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <Label className="text-sm font-semibold mb-3 block">Sizes</Label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <label key={size} className="cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={(filters.sizes || []).includes(size)}
                                onChange={(e) => handleSizeChange(size, e.target.checked)}
                            />
                            <div
                                className={`px-3 py-1 border rounded-md text-sm font-medium transition-colors ${(filters.sizes || []).includes(size)
                                    ? "bg-gradient-to-r from-amber-400 to-amber-700 text-white"
                                    : "border-gray-300 hover:border-amber-500"
                                    }`}
                            >
                                {size}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Colors */}
            {availableColors.length > 0 && (
                <div>
                    <Label className="text-sm font-semibold mb-3 block">Colors</Label>
                    <div className="flex flex-wrap gap-2">
                        {availableColors.map((color) => (
                            <label key={color} className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={(filters.colors || []).includes(color)}
                                    onChange={(e) => handleColorChange(color, e.target.checked)}
                                />
                                <div
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${(filters.colors || []).includes(color)
                                        ? "border-amber-600 scale-110"
                                        : "border-gray-300 hover:border-amber-500"
                                        }`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Filters */}
            <Button variant="secondary" onClick={clearFilters} className="w-full mt-4">
                Clear All Filters
            </Button>
        </div>
    );

    if (isOpen) {
        return (
            <div className="lg:hidden fixed inset-0 z-50 bg-transparent bg-opacity-1 backdrop-blur-sm">
                <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Filters</h3>
                        <Button variant="ghost" size="icon" onClick={onToggle}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    {filterContent}
                </div>
            </div>
        );
    }

    return (
        <Card className="hidden lg:block h-fit border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Filter className="w-5 h-5 text-amber-600" />
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">{filterContent}</CardContent>
        </Card>
    );
}
