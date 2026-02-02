import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLinks = [
    { label: "Home", href: "#" },
    { label: "Explore Menu", href: "#menu" },
    { label: "Book Now", href: "#book" },
];

interface NavbarProps {
    isOrderModalOpen: boolean;
    setIsOrderModalOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOrderModalOpen, setIsOrderModalOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showHours, setShowHours] = useState(false);

    const openingHours = [
        { day: "MON", time: "11.30 - 10PM" },
        { day: "TUES", time: "11.30 - 11PM" },
        { day: "WED", time: "11.30 - 11PM" },
        { day: "THUR", time: "11.30 - 12AM" },
        { day: "FRI", time: "11.30 - 1AM" },
        { day: "SAT", time: "11.30 - 1AM" },
        { day: "SUN", time: "11.30 - 11PM" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-start pointer-events-none">

                {/* Logo - Always visible */}
                <div className="pointer-events-auto">
                    <h1 className="font-bebas text-4xl tracking-wider text-[#F0EAD6] mix-blend-difference">
                        SQUZZZ
                    </h1>
                </div>

                {/* Mobile Order Button - Visible only on mobile */}
                <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="md:hidden pointer-events-auto bg-[#F0EAD6] text-[#050505] px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-[#0B3333] hover:text-[#F0EAD6] transition-colors duration-300 z-50 ml-auto mr-4 shadow-lg"
                >
                    ORDER NOW
                </button>

                {/* Hamburger Toggle - Always visible */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto relative w-14 h-14 bg-[#F0EAD6] rounded-full flex flex-col justify-center items-center gap-1.5 hover:bg-[#0B3333] hover:text-[#F0EAD6] transition-colors duration-300 z-50 group"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-black group-hover:bg-[#F0EAD6] block transition-colors duration-300"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-8 h-0.5 bg-black group-hover:bg-[#F0EAD6] block transition-colors duration-300"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-black group-hover:bg-[#F0EAD6] block transition-colors duration-300"
                    />
                </button>

                {/* Drawer Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black pointer-events-auto z-30"
                            />

                            {/* Menu Container */}
                            <motion.div
                                initial={{ clipPath: "circle(0% at 100% 0%)" }}
                                animate={{ clipPath: "circle(150% at 100% 0%)" }}
                                exit={{ clipPath: "circle(0% at 100% 0%)" }}
                                transition={{ type: "spring", stiffness: 40, damping: 10 }}
                                className="fixed top-0 right-0 h-screen w-full md:w-[480px] bg-[#E9E8E3] z-40 shadow-2xl pointer-events-auto flex flex-col p-10 pt-24 overflow-y-auto"
                            >
                                {/* Menu Items */}
                                <ul className="flex flex-col gap-4 mb-8">
                                    {NavLinks.map((link, i) => (
                                        <motion.li
                                            key={link.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                        >
                                            <a href={link.href} className="text-4xl font-condensed font-bold text-black uppercase hover:pl-4 transition-all duration-300 block">
                                                {link.label}
                                            </a>
                                        </motion.li>
                                    ))}

                                    {/* Opening Hours Toggle */}
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <button
                                            onClick={() => setShowHours(!showHours)}
                                            className="text-4xl font-condensed font-bold text-black uppercase hover:pl-4 transition-all duration-300 flex items-center gap-4 w-full text-left"
                                        >
                                            OPENING HOURS
                                            <span className={`text-2xl transition-transform duration-300 ${showHours ? 'rotate-180' : ''}`}>▼</span>
                                        </button>

                                        <AnimatePresence>
                                            {showHours && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="py-4 space-y-2 text-[#0B3333]">
                                                        {openingHours.map((slot, idx) => (
                                                            <li key={idx} className="flex justify-between text-lg font-bold font-condensed tracking-wide border-b border-[#0B3333]/10 pb-1">
                                                                <span>{slot.day}</span>
                                                                <span>{slot.time}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.li>
                                </ul>

                                {/* Footer Actions */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col gap-6 mt-auto"
                                >
                                    {/* Marquee Button */}
                                    <button
                                        onClick={() => setIsOrderModalOpen(true)}
                                        className="w-full bg-[#0B3333] text-[#E9E8E3] py-4 rounded-lg overflow-hidden relative group"
                                    >
                                        <div className="flex gap-4 animate-marquee whitespace-nowrap group-hover:pause">
                                            {[1, 2, 3, 4].map(n => (
                                                <React.Fragment key={n}>
                                                    <span className="font-bold tracking-widest text-lg">ORDER NOW</span>
                                                    <span className="font-bold tracking-widest text-lg">•</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </button>

                                    <div className="flex justify-between items-center text-[#0B3333]">
                                        <span className="text-xl font-bold font-condensed">FOLLOW US</span>
                                        <div className="flex gap-4">
                                            {/* Social Links */}
                                            <a href="https://www.facebook.com/sqewuk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0B3333] flex items-center justify-center hover:bg-[#0B3333] hover:text-white transition-colors cursor-pointer">
                                                FB
                                            </a>
                                            <a href="https://www.instagram.com/sqew.uk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#0B3333] flex items-center justify-center hover:bg-[#0B3333] hover:text-white transition-colors cursor-pointer">
                                                IG
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Order Location Modal */}
                <AnimatePresence>
                    {isOrderModalOpen && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOrderModalOpen(false)}
                                className="absolute inset-0 bg-black pointer-events-auto"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#E9E8E3] rounded-3xl p-8 max-w-md w-full relative z-10 pointer-events-auto text-center"
                            >
                                <button
                                    onClick={() => setIsOrderModalOpen(false)}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-transparent hover:bg-black/5 rounded-full text-3xl text-black"
                                >
                                    &times;
                                </button>

                                <h2 className="text-3xl font-condensed font-bold text-[#0B3333] mb-2 uppercase">Order From?</h2>
                                <p className="text-[#0B3333] uppercase text-lg mb-8">Choose your nearest location</p>

                                <div className="flex flex-col gap-4">
                                    <a
                                        href="https://deliveroo.co.uk/menu/leeds/leeds-city-centre/sqew-serious-kebabs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#0B3333] text-[#E9E8E3] py-6 rounded-xl hover:bg-[#1a4444] transition-colors flex flex-col items-center w-full"
                                    >
                                        <span className="text-2xl font-bold tracking-widest uppercase">LEEDS</span>
                                        <span className="text-sm opacity-80 uppercase tracking-wider">City Centre</span>
                                    </a>
                                    <a
                                        href="https://deliveroo.co.uk/menu/manchester/manchester-central/sqew-shawarma-bar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#0B3333] text-[#E9E8E3] py-6 rounded-xl hover:bg-[#1a4444] transition-colors flex flex-col items-center w-full"
                                    >
                                        <span className="text-2xl font-bold tracking-widest uppercase">MANCHESTER</span>
                                        <span className="text-sm opacity-80 uppercase tracking-wider">Deansgate</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </nav>
        </>
    );
};

export default Navbar;
