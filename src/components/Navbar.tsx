import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavLinks = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Explore Menu", href: "/menu", isRoute: true },
    { label: "Book Now", href: "/booking", isRoute: true },
];

interface NavbarProps {
    isOrderModalOpen: boolean;
    setIsOrderModalOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOrderModalOpen, setIsOrderModalOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-start pointer-events-none">

                {/* Logo */}
                <div className="pointer-events-auto">
                    <h1 className="font-bebas text-4xl tracking-wider text-[#F0EAD6] mix-blend-difference">
                        SQUZZZ
                    </h1>
                </div>

                {/* Mobile Order Button */}
                <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="md:hidden pointer-events-auto bg-[#F0EAD6] text-[#050505] px-4 py-2 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-[#8B0000] hover:text-[#F0EAD6] transition-colors duration-300 z-50 ml-auto mr-4 shadow-lg"
                >
                    ORDER
                </button>

                {/* Hamburger Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto relative w-14 h-14 bg-[#F0EAD6] rounded-full flex flex-col justify-center items-center gap-1.5 hover:bg-[#8B0000] transition-colors duration-300 z-50 group"
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
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black pointer-events-auto z-30"
                            />

                            <motion.div
                                initial={{ clipPath: "circle(0% at 100% 0%)" }}
                                animate={{ clipPath: "circle(150% at 100% 0%)" }}
                                exit={{ clipPath: "circle(0% at 100% 0%)" }}
                                transition={{ type: "spring", stiffness: 40, damping: 10 }}
                                className="fixed top-0 right-0 h-screen w-full md:w-[480px] bg-[#F0EAD6] z-40 shadow-2xl pointer-events-auto flex flex-col p-10 pt-24"
                            >
                                <ul className="flex flex-col gap-4 mb-auto">
                                    {NavLinks.map((link, i) => (
                                        <motion.li
                                            key={link.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                        >
                                            {link.isRoute ? (
                                                <Link
                                                    to={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="font-bebas text-5xl text-[#050505] uppercase hover:pl-4 hover:text-[#8B0000] transition-all duration-300 block"
                                                >
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="font-bebas text-5xl text-[#050505] uppercase hover:pl-4 hover:text-[#8B0000] transition-all duration-300 block"
                                                >
                                                    {link.label}
                                                </a>
                                            )}
                                        </motion.li>
                                    ))}
                                </ul>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col gap-6"
                                >
                                    <button
                                        onClick={() => {
                                            setIsOrderModalOpen(true);
                                            setIsOpen(false);
                                        }}
                                        className="w-full bg-[#8B0000] text-[#F0EAD6] py-4 rounded-lg font-bebas text-2xl tracking-widest uppercase hover:bg-[#5C0000] transition-colors"
                                    >
                                        Order Now
                                    </button>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            {/* Order Modal */}
            <AnimatePresence>
                {isOrderModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOrderModalOpen(false)}
                            className="absolute inset-0 bg-black"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#F0EAD6] rounded-3xl p-8 max-w-md w-full relative z-10 text-center"
                        >
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-transparent hover:bg-black/5 rounded-full text-3xl text-black"
                            >
                                &times;
                            </button>
                            <h2 className="font-bebas text-4xl text-[#8B0000] mb-2 uppercase">
                                Order Now
                            </h2>
                            <p className="text-[#050505]/60 uppercase text-lg mb-8">
                                Choose your location
                            </p>
                            <div className="flex flex-col gap-4">
                                <a
                                    href="#"
                                    className="bg-[#8B0000] text-[#F0EAD6] py-6 rounded-xl hover:bg-[#5C0000] transition-colors flex flex-col items-center w-full"
                                >
                                    <span className="font-bebas text-3xl tracking-widest uppercase">Location 1</span>
                                    <span className="text-sm opacity-80 uppercase tracking-wider">City Centre</span>
                                </a>
                                <a
                                    href="#"
                                    className="bg-[#8B0000] text-[#F0EAD6] py-6 rounded-xl hover:bg-[#5C0000] transition-colors flex flex-col items-center w-full"
                                >
                                    <span className="font-bebas text-3xl tracking-widest uppercase">Location 2</span>
                                    <span className="text-sm opacity-80 uppercase tracking-wider">Downtown</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
