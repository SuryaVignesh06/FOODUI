import React from 'react';
import { motion } from 'framer-motion';

const locations = [
    {
        city: "LEEDS",
        area: "City Centre",
        address: "7 Duncan St, Leeds LS1 6DQ", // Standard location for Sqew Leeds
        link: "https://deliveroo.co.uk/menu/leeds/leeds-city-centre/sqew-serious-kebabs",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80" // Placeholder cinematic vibe
    },
    {
        city: "MANCHESTER",
        area: "Deansgate",
        address: "Piccadilly Gardens, Manchester M1 1RG", // Approximate/Placeholder until verified
        link: "https://deliveroo.co.uk/menu/manchester/manchester-central/sqew-shawarma-bar",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
    }
];

const Locations: React.FC = () => {
    return (
        <section id="locations" className="relative py-32 bg-[#050505] overflow-hidden selection:bg-[#0B3333] selection:text-[#F0EAD6]">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl md:text-8xl font-condensed font-bold text-[#F0EAD6] tracking-tighter mb-4">
                        FIND US
                    </h2>
                    <div className="w-24 h-1 bg-[#0B3333] mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={loc.city}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <motion.img
                                    src={loc.image}
                                    alt={loc.city}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                <h3 className="text-5xl font-condensed font-bold text-[#F0EAD6] mb-2 tracking-wide group-hover:scale-110 transition-transform duration-500">
                                    {loc.city}
                                </h3>
                                <p className="text-xl text-[#F0EAD6]/80 uppercase tracking-widest mb-1">{loc.area}</p>
                                <p className="text-sm text-[#F0EAD6]/60 mb-8 font-light">{loc.address}</p>

                                <a
                                    href={loc.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-[#0B3333] text-[#F0EAD6] rounded-full font-bold uppercase tracking-widest hover:bg-[#F0EAD6] hover:text-[#0B3333] transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    Order Now
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Locations;
