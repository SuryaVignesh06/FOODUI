import { motion } from 'framer-motion';

const Footer = () => {
    const navLinks = [
        { label: "Home", href: "#" },
        { label: "Explore Menu", href: "#menu" },
        { label: "Book Now", href: "#book" },
    ];

    return (
        <footer className="bg-[#050505] text-[#F0EAD6] pt-24 pb-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F0EAD6]/20 to-transparent" />

            <div className="container mx-auto px-6 flex flex-col items-center">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-bebas text-2xl md:text-3xl text-[#F0EAD6]/70 hover:text-[#F0EAD6] transition-colors uppercase tracking-widest"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Large Watermark */}
                <motion.h1
                    className="font-bebas text-[25vw] leading-none text-[#F0EAD6] opacity-5 select-none pb-12"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 0.05 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    SQUZZZ
                </motion.h1>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs opacity-40 uppercase tracking-widest border-t border-white/5 pt-8 gap-4">
                    <span>© 2026 Squzzz. All Rights Reserved.</span>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
