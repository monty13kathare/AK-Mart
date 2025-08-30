export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    sale_price?: number;
    category: "clothing" | "shoes" | "accessories" | "bags" | "jewelry" | "electronics" | "beauty" | any;
    sizes?: ("XS" | "S" | "M" | "L" | "XL" | "XXL") | any;
    colors?: string[] | any;
    images?: string[] | any;
    stock?: number;
    featured?: boolean;
    rating?: number | any;
    tags?: string[] | any;
    brand?: string;
    sku?: string;
    createdAt?: string;
    length?: any;
    weight?: any;
    height?: any;
    width?: any;
    published?: any;
}




// Item in the order
export interface OrderItem {
    product_id: string;
    product_name: string;
    product_image: string | any;
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
    payment_status?: any;
    order_date?: Date | any;
    estimated_delivery?: any;
    shipping_method?: any;
}

// ✅ Example default order object
export const defaultOrder: Order = {
    order_number: "",
    items: [],
    total_amount: 0,
    status: "pending",
};


export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    profilePic: string;
    productsAdded: Product[];
    likes: Product[];
    wishlist: Product[];
    orders?: string[];
    bio?: string;
    joinedDate?: string;
}