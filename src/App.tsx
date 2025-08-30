// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import ManageProducts from "./pages/ManageProducts";
import UserProfile from "./pages/UserProfile";
import OrderSuccess from "./pages/OrderSuccess";
import LikeAndWishlist from "./pages/LikeAndWishlist";
import OrderHistory from "./pages/OrderHistory";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // ✅ Layout wraps all pages
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "userProfile", element: <UserProfile /> },

      { path: "manageProducts", element: <ManageProducts /> },
      { path: `productDetail/:id`, element: <ProductDetail /> },
      { path: "orderSuccess", element: <OrderSuccess /> },
      { path: "likes", element: <LikeAndWishlist /> },
      { path: "orderHistory", element: <OrderHistory /> },





    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
