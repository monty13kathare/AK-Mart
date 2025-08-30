import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    X,
    Filter,
    Search,
    ChevronDown,
    ChevronUp,
    Sparkles,
    RotateCcw
} from "lucide-react";
import React, { useState, useEffect } from "react";

interface Product {
    id: string | number;
    name: string;
    price: number;
    colors?: string[];
    category?: string;
    size?: string;
    rating?: number;
    tags?: string[];
}

interface FilterState {
    search: string;
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
    rating: number;
    tags: string[];
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
    const ratings = [4, 3, 2, 1];

    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        sizes: true,
        colors: true,
        rating: true,
        tags: true
    });

    const availableColors = [...new Set(products.flatMap((p) => p.colors || []))];
    const availableTags = [...new Set(products.flatMap((p) => p.tags || []))];
    const maxPrice = Math.max(...products.map((p) => p.price || 0), 1000);

    // Animation for mobile drawer
    const [drawerAnimation, setDrawerAnimation] = useState('enter');

    useEffect(() => {
        if (isOpen) {
            setDrawerAnimation('enter');
        } else {
            setDrawerAnimation('exit');
        }
    }, [isOpen]);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section as keyof typeof expandedSections]
        }));
    };

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

    const handleRatingChange = (rating: number, checked: boolean) => {
        const newRating = checked ? rating : 0;
        onFiltersChange({ ...filters, rating: newRating });
    };

    const handleTagChange = (tag: string, checked: boolean) => {
        const newTags = checked
            ? [...(filters.tags || []), tag]
            : (filters.tags || []).filter((t) => t !== tag);
        onFiltersChange({ ...filters, tags: newTags });
    };

    const clearFilters = () => {
        onFiltersChange({
            search: "",
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, maxPrice],
            rating: 0,
            tags: []
        });
    };

    const FilterSection = ({ title, children, sectionKey }: {
        title: string;
        children: React.ReactNode;
        sectionKey: keyof typeof expandedSections;
    }) => (
        <div className="border-b border-gray-100 py-4 last:border-0">
            <button
                className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-2"
                onClick={() => toggleSection(sectionKey)}
            >
                <span className="flex items-center gap-2">
                    {title}
                </span>
                {expandedSections[sectionKey] ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
            </button>
            {expandedSections[sectionKey] && (
                <div className="animate-fadeIn">
                    {children}
                </div>
            )}
        </div>
    );

    const filterContent = (
        <div className="space-y-2">
            {/* Search */}
            <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search products..."
                    value={filters.search || ""}
                    onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                    className="pl-10 border-gray-200 focus:border-amber-400 focus:ring-amber-400 rounded-lg py-2"
                />
            </div>

            {/* Active Filters Indicator */}
            {(filters.categories?.length > 0 || filters.sizes?.length > 0 ||
                filters.colors?.length > 0 || filters?.rating > 0 || filters.tags?.length > 0 ||
                filters.priceRange[0] > 0 || filters?.priceRange[1] < maxPrice) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-800">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium">Filters active</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 text-xs h-8"
                        >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Clear
                        </Button>
                    </div>
                )}

            {/* Price Range */}
            <FilterSection title="Price Range" sectionKey="price">
                <div className="pt-2 pb-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>${filters.priceRange?.[0]}</span>
                        <span>${filters.priceRange?.[1]}</span>
                    </div>
                    <Slider
                        value={filters.priceRange || [0, maxPrice]}
                        onValueChange={handlePriceChange}
                        max={maxPrice}
                        step={10}
                        className="w-full text-amber-500"
                    />
                </div>
            </FilterSection>

            {/* Categories */}
            <FilterSection title="Categories" sectionKey="categories">
                <div className="space-y-2 pt-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-3">
                            <Checkbox
                                id={`category-${category}`}
                                checked={(filters.categories || []).includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, Boolean(checked))}
                                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label
                                htmlFor={`category-${category}`}
                                className="capitalize text-sm cursor-pointer text-gray-700 font-normal flex-1"
                            >
                                {category}
                            </Label>
                            <span className="text-xs text-gray-400">
                                {products.filter(p => p.category === category).length}
                            </span>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Sizes */}
            <FilterSection title="Sizes" sectionKey="sizes">
                <div className="grid grid-cols-3 gap-2 pt-3">
                    {sizes.map((size) => (
                        <label key={size} className="cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={(filters.sizes || []).includes(size)}
                                onChange={(e) => handleSizeChange(size, e.target.checked)}
                            />
                            <div
                                className={`p-2 border rounded-lg text-center text-sm font-medium transition-all duration-200 ${(filters.sizes || []).includes(size)
                                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                                    : "border-gray-200 hover:border-amber-300 bg-white"
                                    }`}
                            >
                                {size}
                            </div>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Colors */}
            {availableColors.length > 0 && (
                <FilterSection title="Colors" sectionKey="colors">
                    <div className="grid grid-cols-6 gap-2 pt-3">
                        {availableColors.map((color) => (
                            <label key={color} className="cursor-pointer flex justify-center">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={(filters.colors || []).includes(color)}
                                    onChange={(e) => handleColorChange(color, e.target.checked)}
                                />
                                <div
                                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${(filters.colors || []).includes(color)
                                        ? "scale-110 ring-2 ring-offset-2 ring-amber-400"
                                        : "hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                >
                                    {(filters.colors || []).includes(color) && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* Rating */}
            <FilterSection title="Customer Rating" sectionKey="rating">
                <div className="space-y-2 pt-2">
                    {ratings.map((rating) => (
                        <div key={rating} className="flex items-center space-x-3">
                            <Checkbox
                                id={`rating-${rating}`}
                                checked={filters.rating === rating}
                                onCheckedChange={(checked) => handleRatingChange(rating, Boolean(checked))}
                                className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <Label
                                htmlFor={`rating-${rating}`}
                                className="text-sm cursor-pointer text-gray-700 font-normal flex items-center gap-1"
                            >
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1">& up</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            {/* Tags */}
            {availableTags.length > 0 && (
                <FilterSection title="Product Tags" sectionKey="tags">
                    <div className="flex flex-wrap gap-2 pt-2">
                        {availableTags.map((tag) => (
                            <label key={tag} className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={(filters.tags || []).includes(tag)}
                                    onChange={(e) => handleTagChange(tag, e.target.checked)}
                                />
                                <div
                                    className={`px-3 py-1 border rounded-full text-xs transition-all ${(filters.tags || []).includes(tag)
                                        ? "bg-amber-100 text-amber-800 border-amber-200"
                                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                                        }`}
                                >
                                    {tag}
                                </div>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* Clear Filters Button */}
            <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full mt-6 border-amber-300 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
            >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Filters
            </Button>
        </div>
    );

    // Mobile view
    if (isOpen) {
        return (
            <div className={`lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${drawerAnimation === 'enter' ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-xl transform transition-transform duration-300 ${drawerAnimation === 'enter' ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-amber-500" />
                            Filters
                        </h3>
                        <Button variant="ghost" size="icon" onClick={onToggle} className="rounded-full hover:bg-gray-100">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    {filterContent}
                </div>
            </div>
        );
    }

    // Desktop view
    return (
        <Card className="hidden lg:block h-fit border-gray-200 shadow-sm sticky top-4">
            <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <Filter className="w-5 h-5 text-amber-500" />
                    Filters
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="ml-auto text-xs text-gray-500 hover:text-amber-600"
                    >
                        Clear all
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                {filterContent}
            </CardContent>
        </Card>
    );
}