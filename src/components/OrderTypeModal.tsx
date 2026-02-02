import { motion, AnimatePresence } from 'framer-motion';
import { useCart, type OrderType } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface OrderTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderTypeModal: React.FC<OrderTypeModalProps> = ({ isOpen, onClose }) => {
    const { setOrderType } = useCart();
    const navigate = useNavigate();

    const handleSelect = (type: OrderType) => {
        if (type === 'offline') {
            // Redirect to booking for Dine-in
            navigate('/booking');
            onClose();
        } else {
            setOrderType(type);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 max-w-md w-full text-center shadow-2xl"
                    >
                        <h2 className="font-bebas text-4xl text-white mb-2">How would you like to order?</h2>
                        <p className="text-white/50 mb-8">Choose your dining preference</p>

                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => handleSelect('parcel')}
                                className="group relative p-6 bg-white/5 hover:bg-[#F0EAD6] border border-white/10 hover:border-[#F0EAD6] rounded-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                                        <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bebas text-2xl text-white group-hover:text-black">Takeaway / Parcel</h3>
                                        <p className="text-sm text-white/50 group-hover:text-black/60">Order and pick up your food</p>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => handleSelect('offline')}
                                className="group relative p-6 bg-white/5 hover:bg-[#F0EAD6] border border-white/10 hover:border-[#F0EAD6] rounded-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                                        <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bebas text-2xl text-white group-hover:text-black">Dine-in (Book Table)</h3>
                                        <p className="text-sm text-white/50 group-hover:text-black/60">Reserve a table to eat here</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OrderTypeModal;
