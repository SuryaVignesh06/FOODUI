import { motion } from 'framer-motion';

const dishes = [
    { name: "Spiced Lamb Kofta", price: "£14", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop" },
    { name: "Charcoal Chicken", price: "£16", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop" },
    { name: "Hummus & Pita", price: "£8", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=600&auto=format&fit=crop" },
    { name: "Falafel Platter", price: "£12", image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?q=80&w=600&auto=format&fit=crop" }
];

const Gallery = () => {
    return (
        <section id="menu" className="bg-[#050505] py-24 px-4 md:px-12 border-t border-[#F0EAD6]/10">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    className="text-[#F0EAD6] text-4xl md:text-6xl font-condensed font-bold uppercase mb-16 text-center tracking-tighter"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Culinary <span className="text-[#F0EAD6] opacity-50">Masterpieces</span>
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {dishes.map((dish, i) => (
                        <motion.div
                            key={i}
                            className={`relative group overflow-hidden ${i % 2 === 1 ? 'md:mt-24' : ''}`}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <div className="overflow-hidden rounded-lg aspect-[4/5]">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex justify-between items-end">
                                <div>
                                    <h4 className="text-2xl text-[#F0EAD6] font-condensed font-bold uppercase">{dish.name}</h4>
                                    <p className="text-[#0B3333] bg-[#F0EAD6] px-2 py-0.5 text-xs font-bold tracking-widest mt-2 inline-block rounded-sm">SIGNATURE</p>
                                </div>
                                <span className="text-xl text-[#F0EAD6] font-bold">{dish.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
