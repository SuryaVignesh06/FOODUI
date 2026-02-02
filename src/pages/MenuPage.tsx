import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import OrderTypeModal from '../components/OrderTypeModal';
import { allDishes, categories, parsePrice } from '../data/menuData';
import type { Dish } from '../data/menuData';

const MenuPage = () => {
    const { orderType, addToCart, decrementFromCart, cartItems, cartTotal, itemCount } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Best Sellers');
    const [isVegOnly, setIsVegOnly] = useState(false);

    useEffect(() => {
        if (!orderType) {
            setIsModalOpen(true);
        }
    }, [orderType]);

    // Derived state for filtered dishes
    const filteredDishes = useMemo(() => {
        return allDishes.filter(dish => {
            if (isVegOnly && dish.category !== 'veg') return false;
            // In Swiggy style, we usually show section by section.
            // For now, let's just filter by the "selected category" tab if active, or just scroll to it (simpler to filter for now)
            return dish.displayCategory === selectedCategory;
        });
    }, [selectedCategory, isVegOnly]);

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };

    const handleAdd = (dish: Dish) => {
        addToCart({
            id: dish.id,
            name: dish.text,
            price: parsePrice(dish.price),
            priceString: dish.price,
            category: dish.category
        });
    };

    return (
        <div className="bg-[#111215] min-h-screen text-[#e0e0e0] font-sans pb-24">
            <OrderTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#111215] border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="font-bebas text-2xl tracking-wide">Menu</h1>
                            {orderType && (
                                <span className="text-xs text-green-400 uppercase tracking-widest border border-green-500/30 px-2 py-0.5 rounded">
                                    {orderType}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${isVegOnly ? 'text-green-500' : 'text-white/50'}`}>VEG</span>
                            <button
                                onClick={() => setIsVegOnly(!isVegOnly)}
                                className={`w-10 h-6 rounded-full p-1 transition-colors ${isVegOnly ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isVegOnly ? 'translate-x-4' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Nav - Horizontal Scrollable */}
                <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto no-scrollbar border-t border-white/5">
                    <div className="flex gap-6 min-w-max">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors
                                    ${selectedCategory === cat ? 'text-[#F0EAD6] border-[#F0EAD6]' : 'text-white/40 border-transparent hover:text-white/70'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 py-6">
                <div className="space-y-6">
                    {filteredDishes.map((dish) => {
                        const quantity = getItemQuantity(dish.id);
                        return (
                            <motion.div
                                key={dish.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                {/* Text Content */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-2 mb-1">
                                        <span className={`mt-1.5 w-4 h-4 rounded-sm border flex items-center justify-center
                                            ${dish.category === 'veg' ? 'border-green-500' : 'border-red-500'}
                                        `}>
                                            <div className={`w-2 h-2 rounded-full ${dish.category === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        </span>
                                        <h3 className="font-bebas text-xl text-[#F0EAD6] leading-none pt-1">{dish.text}</h3>
                                    </div>
                                    <p className="font-bold text-white mb-2">{dish.price}</p>
                                    <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{dish.description}</p>
                                </div>

                                {/* Image & Add Button */}
                                <div className="relative w-32 h-24 flex-shrink-0">
                                    <img src={dish.image} alt={dish.text} className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => handleAdd(dish)}
                                                className="bg-white text-green-700 font-bold px-6 py-2 rounded-lg shadow-lg uppercase text-sm hover:scale-105 transition-transform"
                                            >
                                                Add
                                            </button>
                                        ) : (
                                            <div className="flex items-center bg-white text-green-700 font-bold rounded-lg shadow-lg overflow-hidden h-9">
                                                <button
                                                    onClick={() => decrementFromCart(dish.id)}
                                                    className="px-3 hover:bg-gray-100 h-full flex items-center"
                                                >
                                                    -
                                                </button>
                                                <span className="px-1 min-w-[20px] text-center">{quantity}</span>
                                                <button
                                                    onClick={() => handleAdd(dish)}
                                                    className="px-3 hover:bg-gray-100 h-full flex items-center"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            {/* Floating Cart Bar */}
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none"
                    >
                        <Link to="/cart">
                            <div className="max-w-3xl mx-auto bg-[#F0EAD6] text-black rounded-xl p-4 shadow-2xl flex items-center justify-between pointer-events-auto cursor-pointer hover:scale-[1.02] transition-transform">
                                <div className="flex flex-col">
                                    <span className="font-bold uppercase tracking-wider text-xs text-gray-600">{itemCount} items</span>
                                    <span className="font-bebas text-xl">£{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                                    View Cart
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuPage;
