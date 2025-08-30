import React, { useState, useEffect } from "react";
import { AddProductModal } from "@/components/AddProductModal";
import { DeleteProductModal } from "@/model/DeleteProductModal";
import { Link } from "react-router-dom";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    sale_price?: number;
    images?: string[];
}

const ManageProducts: React.FC = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Load products from localStorage on mount
    useEffect(() => {
        try {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts) {
                setProductList(JSON.parse(storedProducts));
            }
        } catch (error) {
            console.error("Error loading products from localStorage:", error);
            // Initialize with empty array if there's an error
            setProductList([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save products whenever productList changes
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem("products", JSON.stringify(productList));
            } catch (error) {
                console.error("Error saving products to localStorage:", error);
            }
        }
    }, [productList, isLoading]);

    // Handle delete
    const handleDelete = (id: string) => {
        const updatedProducts = productList.filter((p) => p.id !== id);
        setProductList(updatedProducts);
    };

    // Handle edit (open modal with product data)
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsAddProductModalOpen(true);
    };

    // Handle save (new or edited product)
    const handleSave = (product: Product) => {
        if (editingProduct) {
            // Update existing product
            setProductList((prev) =>
                prev.map((p) => (p.id === product.id ? product : p))
            );
        } else {
            // Add new product
            setProductList((prev) => [...prev, product]);
        }
        setEditingProduct(null);
        setIsAddProductModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">Manage Your Products</h2>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsAddProductModalOpen(true);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    + Add New Product
                </button>
            </div>

            {productList.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No products yet</h3>
                    <button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Create Product
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productList.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <Link to={`/productDetail/${product.id}`}>
                                <div className="h-48 bg-gray-200 overflow-hidden">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            📦
                                        </div>
                                    )}
                                </div>
                            </Link>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Category:</span> {product.category}
                                </p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-lg font-bold text-amber-600">
                                        ${product.price}
                                        {product.sale_price && product.sale_price > 0 && (
                                            <span className="ml-2 text-sm text-gray-500 line-through">
                                                ${product.sale_price}
                                            </span>
                                        )}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => {
                    setEditingProduct(null);
                    setIsAddProductModalOpen(false);
                }}
                onSave={handleSave}
                editingProduct={editingProduct}
            />

            <DeleteProductModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => handleDelete(selectedProduct.id)}
                productName={selectedProduct?.name}

            />
        </div>
    );
};

export default ManageProducts;