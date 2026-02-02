import React, { createContext, useContext, useState } from 'react';

export type OrderType = 'dine-in' | 'parcel' | 'offline' | null;

export interface CartItem {
    id: number;
    name: string;
    price: number; // Store as number for calculations
    priceString: string; // Store original string for display if needed
    quantity: number;
    category: 'veg' | 'non-veg';
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    decrementFromCart: (id: number) => void;
    clearCart: () => void;
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
    tableId: number | null;
    setTableId: (id: number | null) => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderType, setOrderType] = useState<OrderType>(null);
    const [tableId, setTableId] = useState<number | null>(null);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const decrementFromCart = (id: number) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === id);
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
            }
            // Remove if quantity becomes 0
            return prev.filter(i => i.id !== id);
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        setTableId(null);
        setOrderType(null);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            decrementFromCart,
            clearCart,
            orderType,
            setOrderType,
            tableId,
            setTableId,
            cartTotal,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
