import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, addToCart, decrementFromCart, removeFromCart, cartTotal, orderType } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] text-[#F0EAD6] flex flex-col items-center justify-center p-6 text-center font-sans">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <h2 className="font-bebas text-5xl mb-4 text-[#8B0000]">Your Cart is Empty</h2>
                    <p className="text-white/60 mb-8 text-lg">Looks like you haven't added any delicious items yet.</p>
                    <Link to="/menu">
                        <button className="bg-[#F0EAD6] text-[#050505] px-8 py-3 rounded-xl font-bebas text-xl tracking-widest uppercase hover:bg-[#d6d0bc] transition-colors">
                            Browse Menu
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#F0EAD6] font-sans pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#050505] border-b border-white/10 shadow-lg">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/menu" className="p-2 hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 text-white/60 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="uppercase text-sm tracking-widest">Back to Menu</span>
                    </Link>
                    <h1 className="font-bebas text-3xl tracking-wide absolute left-1/2 -translate-x-1/2">My Cart</h1>
                    <div className="w-8" /> {/* Spacer for centering */}
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Order Type Badge */}
                {orderType && (
                    <div className="mb-6 flex justify-center">
                        <span className="bg-[#8B0000]/20 border border-[#8B0000]/40 text-[#F0EAD6] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
                            Order Type: {orderType}
                        </span>
                    </div>
                )}

                {/* Items List */}
                <div className="space-y-4 mb-8">
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors"
                        >
                            {/* Veg/Non-Veg Indicator */}
                            <div className={`flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center ${item.category === 'veg' ? 'border-green-500' : 'border-red-500'}`}>
                                <div className={`w-2 h-2 rounded-full ${item.category === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="font-bebas text-xl text-[#F0EAD6]">{item.name}</h3>
                                <p className="text-white/50 text-sm">£{item.price.toFixed(2)}</p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                                <button
                                    onClick={() => decrementFromCart(item.id)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-lg font-bold text-white/80"
                                >
                                    -
                                </button>
                                <span className="font-mono w-6 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded text-lg font-bold text-white/80"
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-white/30 hover:text-red-500 transition-colors p-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Bill Details */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-24">
                    <h3 className="font-bebas text-2xl mb-4 text-white/50 tracking-wider">Bill Summary</h3>

                    <div className="flex justify-between text-white/70 mb-2">
                        <span>Item Total</span>
                        <span>£{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70 mb-4 pb-4 border-b border-white/10">
                        <span>Taxes & Charges (5%)</span>
                        <span>£{(cartTotal * 0.05).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xl font-bold text-[#F0EAD6]">
                        <span>To Pay</span>
                        <span>£{(cartTotal * 1.05).toFixed(2)}</span>
                    </div>
                </div>
            </main>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050505] border-t border-white/10 z-50">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/payment')}
                        className="w-full bg-[#8B0000] text-[#F0EAD6] py-4 rounded-xl font-bebas text-2xl tracking-widest uppercase hover:bg-[#6b0000] transition-colors shadow-lg shadow-red-900/20"
                    >
                        Proceed to Pay  •  £{(cartTotal * 1.05).toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
