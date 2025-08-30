import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ResetModalProps {
    open: boolean;
    onClose: () => void;
    resetType?: "all" | "orders" | "products" | "likes" | "wishlist";
}

const ResetAllModal: React.FC<ResetModalProps> = ({ open, onClose, resetType = "all" }) => {
    const [selectedOptions, setSelectedOptions] = useState({
        orders: false,
        products: false,
        likes: false,
        wishlist: false
    });

    // Reset selected options when modal opens
    useEffect(() => {
        if (open) {
            if (resetType === "all") {
                setSelectedOptions({
                    orders: true,
                    products: true,
                    likes: true,
                    wishlist: true
                });
            } else {
                setSelectedOptions(prev => ({
                    ...prev,
                    [resetType]: true
                }));
            }
        }
    }, [open, resetType]);

    const handleReset = () => {
        // Clear data based on the selected options
        if (selectedOptions.products) localStorage.removeItem("products");
        if (selectedOptions.likes) localStorage.removeItem("likedProducts");
        if (selectedOptions.wishlist) localStorage.removeItem("savedProducts");
        if (selectedOptions.orders) localStorage.removeItem("orders");

        onClose();
        alert("✅ Selected data has been reset!");
    };

    const handleOptionChange = (option: keyof typeof selectedOptions) => {
        setSelectedOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const getTitle = () => {
        if (resetType !== "all") {
            return getSpecificTitle(resetType);
        }
        return "Reset Data";
    };

    const getSpecificTitle = (type: string) => {
        switch (type) {
            case "orders": return "Reset Orders";
            case "products": return "Reset Products";
            case "likes": return "Reset Likes";
            case "wishlist": return "Reset Wishlist";
            default: return "Reset Data";
        }
    };

    const allSelected = selectedOptions.orders &&
        selectedOptions.products &&
        selectedOptions.likes &&
        selectedOptions.wishlist;

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedOptions({
                orders: false,
                products: false,
                likes: false,
                wishlist: false
            });
        } else {
            setSelectedOptions({
                orders: true,
                products: true,
                likes: true,
                wishlist: true
            });
        }
    };

    // Function to determine the button text based on selection
    const getButtonText = () => {
        const selectedCount = Object.values(selectedOptions).filter(Boolean).length;
        const selectedTypes = Object.entries(selectedOptions)
            .filter(([_, isSelected]) => isSelected)
            .map(([key]) => key);

        if (selectedCount === 0) return "Reset";
        if (selectedCount === 4) return "Reset All";
        if (selectedCount === 1) return `Reset ${selectedTypes[0].charAt(0).toUpperCase() + selectedTypes[0].slice(1)}`;
        return `Reset Selected (${selectedCount})`;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="rounded-2xl shadow-xl border-none max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">{getTitle()}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <p className="text-gray-600">
                        Select the data you want to reset. This action cannot be undone.
                    </p>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="select-all"
                            checked={allSelected}
                            onCheckedChange={handleSelectAll}
                        />
                        <Label htmlFor="select-all" className="font-medium">Select All</Label>
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="products"
                                checked={selectedOptions.products}
                                onCheckedChange={() => handleOptionChange("products")}
                            />
                            <Label htmlFor="products">Products</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="orders"
                                checked={selectedOptions.orders}
                                onCheckedChange={() => handleOptionChange("orders")}
                            />
                            <Label htmlFor="orders">Orders</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="likes"
                                checked={selectedOptions.likes}
                                onCheckedChange={() => handleOptionChange("likes")}
                            />
                            <Label htmlFor="likes">Likes</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="wishlist"
                                checked={selectedOptions.wishlist}
                                onCheckedChange={() => handleOptionChange("wishlist")}
                            />
                            <Label htmlFor="wishlist">Wishlist</Label>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleReset}
                        disabled={!selectedOptions.orders &&
                            !selectedOptions.products &&
                            !selectedOptions.likes &&
                            !selectedOptions.wishlist}
                    >
                        {getButtonText()}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ResetAllModal;