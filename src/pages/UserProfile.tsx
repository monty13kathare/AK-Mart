import { AddProductModal } from "@/components/AddProductModal";
import { Button } from "@/components/ui/button";
import { productData } from "@/entities/Product";
import ResetAllModal from "@/model/ResetAllModal";
import type { Product, User } from "@/types";
import { createPageUrl } from "@/utils";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const currentUser: User = {
    id: "u12345",
    name: "Arvind Kathare",
    email: "arvindkathare001@gmail.com",
    role: "admin",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    productsAdded: productData.slice(0, 3),
    likes: productData.slice(3, 6),
    wishlist: productData.slice(6, 9),
    orders: ["Order #1234", "Order #5678"],
    bio: "I love shopping and adding new products to the catalog!",
    joinedDate: "2025-05-15"
};

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"products" | "likes" | "wishlist" | "orders">("products");
    const [user, setUser] = useState<User>(currentUser);
    const [editing, setEditing] = useState(false);
    const [tempUser, setTempUser] = useState<User>(currentUser);
    const [isUploading, setIsUploading] = useState(false);
    const [notification, setNotification] = useState<{ type: string, message: string } | null>(null);

    const [isResetAllModalOpen, setIsResetAllModalOpen] = useState(false);


    const likedData = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    const savedData = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const orderData = JSON.parse(localStorage.getItem('orders') || '[]');
    const productData = JSON.parse(localStorage.getItem('products') || '[]');


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Show notification
    const showNotification = (type: string, message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // Open edit modal
    const openEdit = () => {
        setTempUser(user);
        setEditing(true);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTempUser({ ...tempUser, [name]: value });
    };

    // Simulate image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            // Simulate upload process
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target && typeof event.target.result === 'string') {
                        setTempUser({ ...tempUser, profilePic: event.target.result });
                        setIsUploading(false);
                    }
                };
                reader.readAsDataURL(e.target.files![0]);
            }, 1500);
        }
    };

    // Load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setTempUser(parsedUser);
        }
    }, []);

    // Save user changes
    const saveUser = () => {
        setUser(tempUser);

        // Save in localStorage
        localStorage.setItem("user", JSON.stringify(tempUser));

        setEditing(false);
        showNotification("success", "Profile updated successfully!");
    };

    // Calculate time since joining
    const getTimeSinceJoining = () => {
        const joinDate = new Date(user.joinedDate || "2023-05-15");
        const now = new Date();
        const diffInMonths = (now.getFullYear() - joinDate.getFullYear()) * 12 +
            (now.getMonth() - joinDate.getMonth());

        if (diffInMonths < 1) return "Less than a month";
        if (diffInMonths === 1) return "1 month";
        if (diffInMonths < 12) return `${diffInMonths} months`;

        const years = Math.floor(diffInMonths / 12);
        return `${years} year${years > 1 ? 's' : ''}`;
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setEditing(false);
        };

        if (editing) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [editing]);



    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-md transition-opacity duration-300 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-amber-300 to-amber-500 h-32 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <button
                                    onClick={openEdit}
                                    className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-600 to-amber-300 text-white p-2 rounded-full shadow-md hover:from-amber-400 hover:to-amber-600 transition-colors"
                                    aria-label="Edit profile"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-6">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                {user.bio && <p className="mt-3 text-gray-700 max-w-2xl">{user.bio}</p>}

                                <div className="flex items-center mt-4 space-x-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Joined {getTimeSinceJoining()} ago
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center ">
                                <button
                                    onClick={openEdit}
                                    className="mt-4 md:mt-0 flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm" onClick={() => setIsResetAllModalOpen(true)}>Reset All Data</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" >
                        <Link to={createPageUrl("ManageProducts")}>
                            <div className="flex items-center" >
                                <div className="p-3 rounded-lg bg-amber-100 text-amber-600" >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-800">{productData.length}</p>
                                    <p className="text-gray-600 text-sm">Products Added</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Link to={createPageUrl("Likes")}>
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-red-100 text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-800">{likedData?.length || 0}</p>
                                    <p className="text-gray-600 text-sm">Likes</p>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Link to={createPageUrl("Likes")}>
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-800">{savedData?.length}</p>
                                    <p className="text-gray-600 text-sm">Wishlist</p>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <Link to={createPageUrl("OrderHistory")}>
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-bold text-gray-800">{orderData?.length || 0}</p>
                                    <p className="text-gray-600 text-sm">Orders</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto -mb-px">
                            <button
                                onClick={() => setActiveTab("products")}
                                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === "products" ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Products Added ({productData.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("likes")}
                                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === "likes" ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Likes ({likedData?.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("wishlist")}
                                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === "wishlist" ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Wishlist ({savedData?.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${activeTab === "orders" ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Orders ({orderData?.length || 0})
                            </button>
                        </nav>
                    </div>


                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "products" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {productData?.map((product: any) => (
                                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        <Link to={`/productDetail/${product.id}`}>

                                            <div className="relative h-48 overflow-hidden">

                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                                {product.featured && (
                                                    <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-gray-900 font-bold">${product.price}</span>
                                                        {product.sale_price && (
                                                            <span className="ml-2 text-sm text-gray-500 line-through">${product.sale_price}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "likes" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {likedData?.map((product: any) => (
                                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        <Link to={`/productDetail/${product.id}`}>
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={product.images}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-900 font-bold">${product.price}</span>
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "wishlist" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedData?.map((product: any) => (
                                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                        <Link to={`/productDetail/${product.id}`}>
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={product.images}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-900 font-bold">${product.price}</span>
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Method
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Payment Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Shipping Method
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orderData?.map((order: any, index: any) => (
                                            <tr key={order} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {order.order_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(order.order_date || new Date().toISOString())}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.payment_method}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {order.payment_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.shipping_method}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${order.total_amount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}


                    </div>

                </div>

            </div>



            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white  rounded-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto shadow-lg shadow-gray-500/50">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 ">
                            <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                            <button
                                onClick={() => setEditing(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6 text-center">
                                <div className="relative inline-block">
                                    <img
                                        src={tempUser.profilePic}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
                                    />
                                    <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-amber-700">
                                        {isUploading ? (
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        )}
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        placeholder="Your name"
                                        name="name"
                                        value={tempUser.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        placeholder="Your email"
                                        name="email"
                                        value={tempUser.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input
                                        placeholder="Your role"
                                        name="role"
                                        value={tempUser.role}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        placeholder="Tell us about yourself"
                                        name="bio"
                                        value={tempUser.bio}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 justify-end">
                                <Button
                                    variant="default"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={saveUser}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            <ResetAllModal open={isResetAllModalOpen} onClose={() => setIsResetAllModalOpen(false)} />
        </div>
    );
};

export default UserProfile;