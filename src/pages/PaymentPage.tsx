import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
    const { cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cash'>('upi');
    const [isProcessing, setIsProcessing] = useState(false);

    const finalAmount = (cartTotal * 1.05).toFixed(2);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/order-confirmation');
            clearCart();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#F0EAD6] font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#050505] border-b border-white/10 p-4">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    <Link to="/cart" className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="font-bebas text-2xl tracking-wide">Payment</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* Amount Display */}
                <div className="text-center mb-10">
                    <p className="text-white/50 uppercase tracking-widest text-sm mb-2">Total Payable</p>
                    <h2 className="font-bebas text-6xl text-[#F0EAD6]">£{finalAmount}</h2>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-8">
                    <h3 className="font-bebas text-xl text-white/50 tracking-wider mb-4">Select Payment Method</h3>

                    <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300
                            ${paymentMethod === 'upi' ? 'bg-[#8B0000]/10 border-[#8B0000] text-[#F0EAD6]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 14.5l-3.293 3.293a1 1 0 01-1.414 0l-3.293 3.293" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold">UPI / QR Code</p>
                                <p className="text-xs opacity-60">Google Pay, PhonePe, Paytm</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#8B0000]' : 'border-white/20'}`}>
                            {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-[#8B0000]" />}
                        </div>
                    </button>

                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300
                            ${paymentMethod === 'card' ? 'bg-[#8B0000]/10 border-[#8B0000] text-[#F0EAD6]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold">Credit / Debit Card</p>
                                <p className="text-xs opacity-60">Visa, Mastercard</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#8B0000]' : 'border-white/20'}`}>
                            {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-[#8B0000]" />}
                        </div>
                    </button>

                    <button
                        onClick={() => setPaymentMethod('cash')}
                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300
                            ${paymentMethod === 'cash' ? 'bg-[#8B0000]/10 border-[#8B0000] text-[#F0EAD6]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-bold">Cash at Counter</p>
                                <p className="text-xs opacity-60">Pay when you pick up</p>
                            </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[#8B0000]' : 'border-white/20'}`}>
                            {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-[#8B0000]" />}
                        </div>
                    </button>
                </div>

                {/* Footer Button */}
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-[#8B0000] text-[#F0EAD6] py-5 rounded-xl font-bebas text-2xl tracking-widest uppercase hover:bg-[#6b0000] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/30 flex items-center justify-center gap-3"
                >
                    {isProcessing ? (
                        <>
                            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Pay £${finalAmount}`
                    )}
                </button>
            </main>
        </div>
    );
};

export default PaymentPage;
