import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Blueprint, { type Table } from '../components/Blueprint';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// Initial tables data
const initialTables: Table[] = [
    // Left Section
    { id: 1, name: 'T1', seats: 2, x: 25, y: 15, type: 'round', status: 'available' },
    { id: 2, name: 'T2', seats: 2, x: 25, y: 30, type: 'round', status: 'booked' },
    { id: 3, name: 'T3', seats: 4, x: 25, y: 45, type: 'square', status: 'available' },

    // Middle Main Section
    { id: 4, name: 'T4', seats: 4, x: 45, y: 20, type: 'square', status: 'available' },
    { id: 5, name: 'T5', seats: 4, x: 45, y: 35, type: 'square', status: 'available' },
    { id: 6, name: 'T6', seats: 6, x: 45, y: 50, type: 'rect', status: 'available' },
    { id: 7, name: 'T7', seats: 4, x: 60, y: 20, type: 'square', status: 'available' },
    { id: 8, name: 'T8', seats: 4, x: 60, y: 35, type: 'square', status: 'booked' },

    // Right Section / Window
    { id: 9, name: 'T9', seats: 2, x: 80, y: 20, type: 'round', status: 'available' },
    { id: 10, name: 'T10', seats: 2, x: 80, y: 35, type: 'round', status: 'available' },

    // Outdoor
    { id: 11, name: 'O1', seats: 4, x: 85, y: 70, type: 'square', status: 'available' },
    { id: 12, name: 'O2', seats: 4, x: 85, y: 85, type: 'square', status: 'available' },
];

const BookingPage = () => {
    const navigate = useNavigate();
    const { setOrderType, setTableId } = useCart(); // Use Cart Context
    const [tables, setTables] = useState<Table[]>(initialTables);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(2);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Navbar props mock placeholders
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const handleTableSelect = (id: number) => {
        setTables(prev => prev.map(t => ({
            ...t,
            status: t.id === id ? 'selected' : (t.status === 'selected' ? 'available' : t.status)
        })));
        setSelectedTable(id === selectedTable ? null : id);
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTable || !date || !time) return;

        // Simulating API call
        setTimeout(() => {
            setShowConfirmation(true);
        }, 1000);
    };

    const handleProceedToFood = () => {
        if (selectedTable) {
            setOrderType('dine-in');
            setTableId(selectedTable);
            navigate('/menu');
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-[#F0EAD6] font-sans">
            <Navbar isOrderModalOpen={isOrderModalOpen} setIsOrderModalOpen={setIsOrderModalOpen} />

            <motion.div
                className="pt-28 pb-10 px-6 max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-12">
                    <h1 className="font-bebas text-5xl md:text-7xl mb-4">Reserve Your Table</h1>
                    <p className="text-white/60 text-lg">Select your preferred spot on our interactive blueprint</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Blueprint Section */}
                    <div className="lg:col-span-2">
                        <Blueprint tables={tables} onTableSelect={handleTableSelect} requiredGuests={guests} />

                        <div className="flex gap-6 mt-6 justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500/20 border border-blue-400 rounded-sm"></div>
                                <span className="text-sm">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500/40 border border-green-400 rounded-sm"></div>
                                <span className="text-sm">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500/10 border border-red-500/30 rounded-sm"></div>
                                <span className="text-sm">Booked</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <motion.form
                            onSubmit={handleBooking}
                            className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 sticky top-28"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="font-bebas text-3xl mb-6">Booking Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm uppercase tracking-wider text-white/50 mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/50 text-white"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm uppercase tracking-wider text-white/50 mb-2">Time</label>
                                        <input
                                            type="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/50 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm uppercase tracking-wider text-white/50 mb-2">Guests</label>
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/50 text-white [&>option]:bg-black"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                                <option key={n} value={n}>{n} People</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white/60">Selected Table:</span>
                                        <span className="font-mono text-xl text-green-400">
                                            {selectedTable ? tables.find(t => t.id === selectedTable)?.name : 'None'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedTable}
                                    className={`w-full py-4 text-xl font-bebas uppercase tracking-widest rounded-lg transition-all
                                        ${selectedTable
                                            ? 'bg-[#F0EAD6] text-black hover:bg-white hover:scale-105'
                                            : 'bg-white/10 text-white/30 cursor-not-allowed'}
                                    `}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </motion.form>
                    </div>
                </div>
            </motion.div>

            <Footer />

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-[#1a1a1a] p-10 rounded-3xl border border-white/20 max-w-md w-full text-center relative overflow-hidden"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="font-bebas text-4xl mb-4">Booking Confirmed!</h2>
                            <p className="text-white/60 mb-8">
                                You have successfully booked Table {tables.find(t => t.id === selectedTable)?.name} for {guests} guests on {date} at {time}.
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleProceedToFood}
                                    className="w-full py-3 bg-[#F0EAD6] text-black font-bebas text-xl rounded-lg hover:brightness-110 transition-all uppercase"
                                >
                                    Order Food Now
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-3 bg-white/5 text-white font-bebas text-xl rounded-lg hover:bg-white/10 transition-all uppercase"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingPage;
