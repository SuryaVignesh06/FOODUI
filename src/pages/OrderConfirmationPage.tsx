import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    // Generate random order ID
    const orderId = Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="min-h-screen bg-[#050505] text-[#F0EAD6] flex flex-col items-center justify-center p-6 text-center">

            {/* Success Checkmark Animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
            >
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="font-bebas text-5xl md:text-7xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F0EAD6] to-[#d6d0bc]">
                    Order Confirmed!
                </h1>
                <p className="text-white/60 text-lg mb-2">
                    Your delicious meal is being prepared.
                </p>
                <p className="text-xl font-mono text-[#8B0000] mb-12 tracking-widest">
                    ID: #{orderId}
                </p>

                <div className="bg-white/5 p-6 rounded-2xl max-w-sm mx-auto mb-12 border border-white/5">
                    <p className="text-sm text-white/40 uppercase tracking-widest mb-2">Estimated Time</p>
                    <p className="text-3xl font-bold">15-20 Mins</p>
                </div>

                <Link to="/">
                    <button className="bg-white/10 border border-white/10 text-[#F0EAD6] px-10 py-4 rounded-xl font-bebas text-xl tracking-widest uppercase hover:bg-white/20 transition-all">
                        Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderConfirmationPage;
