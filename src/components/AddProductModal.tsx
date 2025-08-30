import type { Product } from "@/types";
import React, { useState, useEffect } from "react";

// Modal Wrapper Component (unchanged)
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            document.addEventListener("keydown", handleEsc);

            return () => {
                document.body.style.overflow = "unset";
                document.removeEventListener("keydown", handleEsc);
            };
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            />
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-10 text-center sm:block sm:p-0">
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="relative z-50 inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform shadow-2xl rounded-xl">
                    <div className="px-6 py-4 border-b border-amber-200 bg-gradient-to-r from-amber-300 to-amber-400">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold leading-6 text-amber-900">
                                {title || "Modal"}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-amber-900 hover:text-amber-700 focus:outline-none transition-colors duration-200 p-1 rounded-full hover:bg-amber-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-white">{children}</div>
                </div>
            </div>
        </div>
    );
};

// Add/Edit Product Modal
export const AddProductModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
    editingProduct?: Product | null;
}> = ({ isOpen, onClose, onSave, editingProduct }) => {
    const [newProduct, setNewProduct] = useState<Partial<Product>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (editingProduct) {
                setNewProduct(editingProduct); // pre-fill when editing
            } else {
                setNewProduct({});
            }
            setErrors({});
            setIsSubmitting(false);
        }
    }, [isOpen, editingProduct]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value.split(",").map((item) => item.trim()),
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewProduct({ ...newProduct, [name]: checked });
    };

    const generateId = () => {
        return (
            Math.random().toString(36).substring(2, 10) +
            Math.random().toString(36).substring(2, 10)
        );
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newProduct.name) newErrors.name = "Name is required";
        if (!newProduct.price) newErrors.price = "Price is required";
        if (newProduct.price && Number(newProduct.price) < 0)
            newErrors.price = "Price must be positive";
        if (newProduct.sale_price && Number(newProduct.sale_price) < 0)
            newErrors.sale_price = "Sale price must be positive";
        if (newProduct.stock && Number(newProduct.stock) < 0)
            newErrors.stock = "Stock must be positive";
        if (
            newProduct.rating &&
            (Number(newProduct.rating) < 0 || Number(newProduct.rating) > 5)
        ) {
            newErrors.rating = "Rating must be between 0 and 5";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (!newProduct.id) {
            newProduct.id = generateId();
        }

        onSave(newProduct as Product);

        setIsSubmitting(false);
        setNewProduct({});
    };

    const categories = [
        "Electronics",
        "Clothing",
        "Home & Kitchen",
        "Beauty",
        "Sports",
        "Books",
        "Toys",
        "Jewelry",
    ];

    const isEditing = Boolean(editingProduct);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? "Edit Product" : "Add New Product"}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Product Name *
                        </label>
                        <input
                            placeholder="Enter product name"
                            name="name"
                            value={newProduct.name || ""}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${errors.name ? "border-red-500 bg-red-50" : "border-amber-300"
                                }`}
                        />
                        {errors.name && (
                            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Enter product description"
                            name="description"
                            value={newProduct.description || ""}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 border border-amber-300 rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                name="price"
                                value={newProduct.price || ""}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.price ? "border-red-500 bg-red-50" : "border-amber-300"
                                    }`}
                            />
                            {errors.price && (
                                <p className="text-red-600 text-xs mt-1">{errors.price}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-900 mb-1">
                                Sale Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                name="sale_price"
                                value={newProduct.sale_price || ""}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg ${errors.sale_price
                                    ? "border-red-500 bg-red-50"
                                    : "border-amber-300"
                                    }`}
                            />
                            {errors.sale_price && (
                                <p className="text-red-600 text-xs mt-1">{errors.sale_price}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            value={newProduct.category || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-amber-300 rounded-lg bg-white"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Stock
                        </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Quantity in stock"
                            name="stock"
                            value={newProduct.stock || ""}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${errors.stock ? "border-red-500 bg-red-50" : "border-amber-300"
                                }`}
                        />
                        {errors.stock && (
                            <p className="text-red-600 text-xs mt-1">{errors.stock}</p>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Sizes (comma separated)
                        </label>
                        <input
                            placeholder="e.g., S, M, L, XL"
                            name="sizes"
                            value={(newProduct.sizes || []).join(",")}
                            onChange={handleArrayChange}
                            className="w-full p-3 border border-amber-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Colors (comma separated)
                        </label>
                        <input
                            placeholder="e.g., Red, Blue, Green"
                            name="colors"
                            value={(newProduct.colors || []).join(",")}
                            onChange={handleArrayChange}
                            className="w-full p-3 border border-amber-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Image URLs (comma separated)
                        </label>
                        <input
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            name="images"
                            value={(newProduct.images || []).join(",")}
                            onChange={handleArrayChange}
                            className="w-full p-3 border border-amber-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Rating (0-5)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="4.5"
                            name="rating"
                            value={newProduct.rating || ""}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${errors.rating ? "border-red-500 bg-red-50" : "border-amber-300"
                                }`}
                        />
                        {errors.rating && (
                            <p className="text-red-600 text-xs mt-1">{errors.rating}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">
                            Tags (comma separated)
                        </label>
                        <input
                            placeholder="e.g., popular, new, summer"
                            name="tags"
                            value={(newProduct.tags || []).join(",")}
                            onChange={handleArrayChange}
                            className="w-full p-3 border border-amber-300 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center mt-4 p-3 border border-amber-300 rounded-lg bg-amber-50">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={newProduct.featured || false}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                        />
                        <label
                            htmlFor="featured"
                            className="ml-2 block text-sm font-medium text-amber-900"
                        >
                            Featured Product
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-medium py-2 px-6 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            {isEditing ? "Updating..." : "Adding..."}
                        </>
                    ) : (
                        isEditing ? "Update Product" : "Add Product"
                    )}
                </button>
            </div>
        </Modal>
    );
};
