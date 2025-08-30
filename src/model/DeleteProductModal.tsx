import React from "react";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    productName,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Delete Product
                </h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-medium">{productName}</span>? <br />
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => (onConfirm(), onClose())}
                        className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
