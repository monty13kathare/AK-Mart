import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
    Calendar,
    Receipt,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    ArrowLeft,
    Download,
    Eye
} from "lucide-react";
import { motion } from "framer-motion";
import type { Order, OrderStatus } from "@/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
};

export default function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [cancelOrderDialog, setCancelOrderDialog] = useState<{
        open: boolean;
        orderNumber: string | null;
    }>({
        open: false,
        orderNumber: null,
    });
    const [successAlert, setSuccessAlert] = useState<{
        open: boolean;
        message: string;
    }>({
        open: false,
        message: "",
    });

    useEffect(() => {
        // Simulate loading orders from localStorage or API
        const loadOrders = () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                const savedOrders = localStorage.getItem("orders");
                if (savedOrders) {
                    const ordersData: Order[] = JSON.parse(savedOrders);
                    setOrders(ordersData);
                }
            } catch (err) {
                console.error("Error loading orders:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadOrders();
    }, []);

    const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return <Clock className="w-4 h-4 mr-1" />;
            case "processing":
                return <Package className="w-4 h-4 mr-1" />;
            case "shipped":
                return <Truck className="w-4 h-4 mr-1" />;
            case "delivered":
                return <CheckCircle className="w-4 h-4 mr-1" />;
            case "cancelled":
                return <XCircle className="w-4 h-4 mr-1" />;
            default:
                return <Clock className="w-4 h-4 mr-1" />;
        }
    };

    const getStatusVariant = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "processing":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "shipped":
                return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
            case "delivered":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "cancelled":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };

    const getPaymentStatusVariant = (status: any) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "failed":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            case "refunded":
                return "bg-purple-100 text-purple-800 hover:bg-purple-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const viewOrderDetails = (orderNumber: string) => {
        navigate(createPageUrl("OrderDetails") + `?order=${orderNumber}`);
    };

    const downloadInvoice = (order: any) => {
        // Simple implementation to download invoice as text file
        const invoiceContent = `
            INVOICE
            =======
            Order Number: ${order.order_number}
            Date: ${formatDate(order.order_date || new Date().toISOString())}
            
            BILL TO:
            ${order.customer_info.name}
            ${order.customer_info.address}
            ${order.customer_info.city}, ${order.customer_info.postal_code}
            ${order.customer_info.email}
            ${order.customer_info.phone}
            
            ORDER ITEMS:
            ${order.items.map((item: any) => `
              - ${item.product_name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            `).join('')}
            
            Subtotal: $${order.total_amount.toFixed(2)}
            Shipping: ${order.shipping_cost === 0 ? "FREE" : `$${order.shipping_cost?.toFixed(2) || "0.00"}`}
            Total: $${order.total_amount.toFixed(2)}
            
            Payment Method: ${order.payment_method}
            Payment Status: ${order.payment_status}
            Order Status: ${order.status}
            
            Thank you for your business!
        `;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${order.order_number}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Function to cancel an order
    const cancelOrder = (orderNumber: string) => {
        // Show confirmation dialog
        setCancelOrderDialog({
            open: true,
            orderNumber,
        });
    };

    const handleConfirmCancel = () => {
        if (!cancelOrderDialog.orderNumber) return;

        // Filter out the cancelled order (remove it completely)
        const updatedOrders = orders.filter(order =>
            order.order_number !== cancelOrderDialog.orderNumber
        );

        // Update state
        setOrders(updatedOrders);

        // Update localStorage by removing the order completely
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Close confirmation dialog
        setCancelOrderDialog({
            open: false,
            orderNumber: null,
        });

        // Show success message
        setSuccessAlert({
            open: true,
            message: "Order has been cancelled and removed successfully.",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text text-transparent">
                            Order History
                        </h1>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cancel Order Confirmation Dialog */}
                <AlertDialog open={cancelOrderDialog.open} onOpenChange={(open) =>
                    setCancelOrderDialog({ open, orderNumber: open ? cancelOrderDialog.orderNumber : null })
                }>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to cancel order #{cancelOrderDialog.orderNumber}?
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmCancel}
                                className="bg-red-500 hover:bg-red-700 text-gray-100"
                            >
                                Yes, Cancel Order
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Success Alert Dialog */}
                <Dialog open={successAlert.open} onOpenChange={(open) =>
                    setSuccessAlert({ open, message: open ? successAlert.message : "" })
                }>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Success
                            </DialogTitle>
                            <DialogDescription>
                                {successAlert.message}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => setSuccessAlert({ open: false, message: "" })}>
                                OK
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Order History
                    </h1>
                </motion.div>

                {/* Orders List */}
                <motion.div
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {orders.length === 0 ? (
                        <motion.div
                            variants={fadeIn}
                            className="text-center py-12"
                        >
                            <Receipt className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
                            <p className="text-slate-600 mb-6">
                                You haven't placed any orders yet.
                            </p>
                            <Button onClick={() => navigate(createPageUrl("Home"))}>
                                Start Shopping
                            </Button>
                        </motion.div>
                    ) : (
                        orders.map((order, index) => (
                            <motion.div
                                key={order.order_number}
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 py-4 border-b border-slate-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div className="mb-2 sm:mb-0">
                                                <CardTitle className="text-lg font-semibold text-slate-900">
                                                    Order #{order.order_number}
                                                </CardTitle>
                                                <p className="text-sm text-slate-600 flex items-center mt-1">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {formatDate(order.order_date || new Date().toISOString())}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline" className={getStatusVariant(order.status)}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Badge>
                                                <Badge variant="outline" className={getPaymentStatusVariant(order.payment_status || "pending")}>
                                                    {order.payment_status?.charAt(0).toUpperCase() + order.payment_status?.slice(1) || "Pending"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {/* Order Items Preview */}
                                        <div className="mb-6">
                                            <h4 className="font-medium text-slate-900 mb-3">Items</h4>
                                            <div className="space-y-3">
                                                {order.items.slice(0, 2).map((item: any, idx: any) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-100 mr-3">
                                                                <img
                                                                    src={item.product_image}
                                                                    alt={item.product_name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-slate-900">{item.product_name}</p>
                                                                <div className="text-xs text-slate-600">
                                                                    {item.size && <span>Size: {item.size} </span>}
                                                                    {item.color && <span>Color: {item.color} </span>}
                                                                    <span>Qty: {item.quantity}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm font-medium text-slate-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <p className="text-sm text-slate-600 mt-2">
                                                        +{order.items.length - 2} more items
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium text-slate-900 mb-2">Shipping Address</h4>
                                                <p className="text-sm text-slate-600">
                                                    {order.customer_info.name}<br />
                                                    {order.customer_info.address}<br />
                                                    {order.customer_info.city}, {order.customer_info.postal_code}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-900 mb-2">Order Summary</h4>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Subtotal</span>
                                                        <span className="font-medium">${order.total_amount.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Shipping</span>
                                                        <span className="font-medium">
                                                            {order.shipping_cost === 0 ? "FREE" : `$${order.shipping_cost?.toFixed(2) || "0.00"}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t border-slate-200 font-medium text-slate-900">
                                                        <span>Total</span>
                                                        <span>${order.total_amount.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Payment Method</span>
                                                        <span className="font-medium capitalize">
                                                            {order.payment_method?.replace("_", " ") || "Credit Card"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-200">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => viewOrderDetails(order.order_number)}
                                                className="flex items-center"
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => downloadInvoice(order)}
                                                className="flex items-center"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Invoice
                                            </Button>
                                            {order.status === "delivered" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center"
                                                >
                                                    <Truck className="w-4 h-4 mr-2" />
                                                    Track Package
                                                </Button>
                                            )}
                                            {order.status !== "cancelled" && order.status !== "delivered" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => cancelOrder(order.order_number)}
                                                    className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Cancel Order
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
}