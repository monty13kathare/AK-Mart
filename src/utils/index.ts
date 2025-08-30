// Map page names to URLs
const pageRoutes: Record<string, string> = {
    Home: "/",
    Products: "/products",
    About: "/about",
    Contact: "/contact",
    Cart: "/cart",
    Profile: "/profile",
    ProductDetail: "/productDetail/:id", // dynamic segment
    UserProfile: "/userProfile",
    ManageProducts: "/manageProducts",
    Checkout: "/checkout",
    OrderSuccess: "/orderSuccess",
    Likes: "/likes",
    OrderHistory: "/orderHistory"
};

interface Params {
    [key: string]: string | number;
}

// Updated function to replace dynamic params
export function createPageUrl(pageName: string, params?: Params): string {
    let path = pageRoutes[pageName] || "/";

    if (params) {
        Object.keys(params).forEach(key => {
            path = path.replace(`:${key}`, encodeURIComponent(params[key].toString()));
        });
    }

    return path;
}
