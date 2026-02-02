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

    // Only enough height for the dishes (no extra slide)
    const sectionHeight = dishes.length * 100;

    // Transform scroll to horizontal - ends exactly at last dish
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(dishes.length - 1) * 100}%`]
    );

    return (
        <section
            ref={containerRef}
            className="relative bg-[#050505]"
            style={{ height: `${sectionHeight}vh` }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
                {/* Horizontal Track */}
                <motion.div
                    className="flex h-full"
                    style={{ x, width: `${dishes.length * 100}%` }}
                >
                    {dishes.map((dish, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center"
                        >
                            {/* Floating Dish Card - NO CONTAINER/BORDER */}
                            <motion.div
                                className="relative group cursor-pointer"
                                style={{
                                    transform: `translateY(${dish.yOffset}px) rotate(${dish.rotation}deg)`
                                }}
                                whileHover={{ scale: 1.08, rotate: 0, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                {/* Image - Clean, no border */}
                                <div className="relative w-[280px] md:w-[380px] lg:w-[450px] aspect-square overflow-hidden rounded-2xl">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay with Info */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-8">
                                        <h3 className="font-bebas text-3xl md:text-4xl text-[#F0EAD6] uppercase tracking-wide mb-2 text-center">
                                            {dish.name}
                                        </h3>
                                        <p className="text-[#F0EAD6]/70 text-center text-sm md:text-base mb-4 max-w-xs">
                                            {dish.description}
                                        </p>
                                        <span className="font-bebas text-2xl md:text-3xl text-[#F0EAD6]">{dish.price}</span>
                                    </div>
                                </div>

                                {/* Decorative Line */}
                                <div className="absolute -right-16 md:-right-32 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4">
                                    <div className="w-12 md:w-24 h-px bg-[#F0EAD6]/30" />
                                    <span className="font-bebas text-xl text-[#F0EAD6]/20 uppercase tracking-widest">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Large Background Number */}
                            <div className="absolute right-8 bottom-8 font-bebas text-[15vw] md:text-[18vw] text-[#F0EAD6]/[0.02] leading-none pointer-events-none select-none">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Fixed Section Title */}
                <div className="absolute top-8 left-8 z-10">
                    <span className="font-bebas text-lg md:text-xl text-[#F0EAD6]/25 uppercase tracking-[0.4em]">
                        Best Dishes
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-8 left-8 right-8 h-[2px] bg-[#F0EAD6]/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#F0EAD6]/50 rounded-full origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </div>
        </section>
    );
};

export default HorizontalGallery;
