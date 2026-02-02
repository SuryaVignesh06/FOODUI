import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Dish {
    name: string;
    description: string;
    price: string;
    image: string;
    yOffset: number;
    rotation: number;
}

interface HorizontalGalleryProps {
    dishes: Dish[];
}

const HorizontalGallery = ({ dishes }: HorizontalGalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate the horizontal scroll distance
    const totalWidth = dishes.length * 100; // vw units
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${totalWidth - 100}vw`]);

    return (
        <section ref={containerRef} className="relative" style={{ height: `${dishes.length * 100}vh` }}>
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
                {/* Horizontal Track */}
                <motion.div
                    className="flex items-center h-full"
                    style={{ x }}
                >
                    {dishes.map((dish, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center px-8"
                        >
                            {/* Floating Dish Card */}
                            <motion.div
                                className="relative group cursor-pointer"
                                style={{
                                    transform: `translateY(${dish.yOffset}px) rotate(${dish.rotation}deg)`
                                }}
                                whileHover={{ scale: 1.05, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Image */}
                                <div className="relative w-[300px] md:w-[400px] lg:w-[500px] aspect-square overflow-hidden rounded-3xl shadow-2xl shadow-black/60">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                                        <h3 className="font-bebas text-4xl md:text-5xl text-[#F0EAD6] uppercase tracking-wide mb-2">
                                            {dish.name}
                                        </h3>
                                        <p className="text-[#F0EAD6]/70 text-center text-sm md:text-base mb-4 max-w-xs">
                                            {dish.description}
                                        </p>
                                        <span className="font-bebas text-3xl text-[#F0EAD6]">{dish.price}</span>
                                    </div>
                                </div>

                                {/* Decorative Line */}
                                <div className="absolute -right-20 md:-right-40 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4">
                                    <div className="w-16 md:w-32 h-px bg-[#F0EAD6]/30" />
                                    <span className="font-bebas text-2xl text-[#F0EAD6]/40 uppercase tracking-widest whitespace-nowrap">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Background Number */}
                            <div className="absolute right-10 bottom-10 font-bebas text-[20vw] text-[#F0EAD6]/5 leading-none pointer-events-none select-none">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        </div>
                    ))}

                    {/* End Card */}
                    <div className="flex-shrink-0 w-screen h-screen flex items-center justify-center">
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-bebas text-6xl md:text-8xl text-[#F0EAD6] uppercase tracking-wide mb-4">
                                Best Dishes
                            </h2>
                            <p className="text-[#F0EAD6]/50 text-lg tracking-widest uppercase">
                                Scroll to continue
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Section Title - Fixed */}
                <div className="absolute top-8 left-8 z-10">
                    <span className="font-bebas text-xl md:text-2xl text-[#F0EAD6]/40 uppercase tracking-[0.3em]">
                        Best Dishes
                    </span>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-8 left-8 right-8 h-1 bg-[#F0EAD6]/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#F0EAD6]/60 rounded-full"
                        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HorizontalGallery;
