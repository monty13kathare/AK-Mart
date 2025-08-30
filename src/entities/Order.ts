// order.ts

// Item in the order
export interface OrderItem {
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
}

// Customer info
export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
}

// Order status options
export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

// Payment method options
export type PaymentMethod = "credit_card" | "paypal" | "bank_transfer";

// Main Order type
export interface Order {
    order_number: string; // Unique order identifier
    items: OrderItem[];   // Ordered items
    total_amount: number; // Total order amount
    customer_info?: CustomerInfo; // Customer information
    status?: OrderStatus; // Default: "pending"
    payment_method?: PaymentMethod; // Payment method
}

// ✅ Example default order object
export const defaultOrder: Order = {
    order_number: "",
    items: [],
    total_amount: 0,
    status: "pending",
};
