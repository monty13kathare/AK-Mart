import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./pages/Footer";
import Header from "./components/Header";

interface LayoutProps {
    children?: ReactNode;
    currentPageName?: string;
}





export default function Layout({ children }: LayoutProps) {


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
            <Header />
            {/* Main Content */}
            <main className="flex-1">
                {children ?? <Outlet />}
            </main>
            <Footer />
        </div>
    );
}
