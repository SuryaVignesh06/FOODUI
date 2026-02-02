import { motion } from 'framer-motion';

interface Dish {
    name: string;
    description: string;
    price: string;
    image: string;
    yOffset: number;
    rotation: number;
}

interface VerticalGalleryProps {
    dishes: Dish[];
}

const VerticalGallery = ({ dishes }: VerticalGalleryProps) => {
    return (
        <section className="relative bg-[#050505] py-24 overflow-hidden">
            {/* Cinematic Light Effects */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#8B0000]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#F0EAD6]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Section Title */}
            <motion.div
                className="text-center mb-20 px-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-bebas text-6xl md:text-8xl lg:text-9xl text-[#F0EAD6] uppercase tracking-wider drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    Best Dishes
                </h2>
                <div className="w-24 h-1 bg-[#F0EAD6]/40 mx-auto mt-6" />
            </motion.div>

            {/* Dishes Grid - Vertical Scroll with Staggered Layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {dishes.map((dish, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-32 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                            }`}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        {/* Image Container */}
                        <motion.div
                            className="relative w-full md:w-1/2 aspect-square max-w-lg mx-auto"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Glow Effect Behind Image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/30 to-amber-500/20 rounded-3xl blur-3xl scale-90 opacity-60" />

                            {/* Image */}
                            <motion.div
                                className="relative overflow-hidden rounded-3xl"
                                style={{
                                    rotate: dish.rotation / 2,
                                    transformOrigin: "center center"
                                }}
                                whileHover={{ rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                                />

                                {/* Shine Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                                    initial={{ x: '-100%', opacity: 0 }}
                                    whileHover={{ x: '100%', opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.div>

                            {/* Number Badge */}
                            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 bg-[#8B0000] rounded-full flex items-center justify-center shadow-2xl">
                                <span className="font-bebas text-2xl md:text-3xl text-[#F0EAD6]">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            className={`w-full md:w-1/2 text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}
                            initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <h3 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-[#F0EAD6] uppercase tracking-wide mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                                {dish.name}
                            </h3>
                            <p className="text-[#F0EAD6]/70 text-lg md:text-xl leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                                {dish.description}
                            </p>
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <span className="font-bebas text-3xl md:text-4xl text-[#F0EAD6]">
                                    {dish.price}
                                </span>
                                <motion.button
                                    className="px-6 py-2 bg-[#8B0000] text-[#F0EAD6] font-bebas text-lg tracking-wider uppercase rounded-full hover:bg-[#F0EAD6] hover:text-[#8B0000] transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Order
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Decoration */}
            <motion.div
                className="flex justify-center mt-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="w-32 h-1 bg-[#F0EAD6]/20" />
            </motion.div>
        </section>
    );
};

export default VerticalGallery;
