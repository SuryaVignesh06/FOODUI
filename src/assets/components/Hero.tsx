import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
    images: {
        hero1: string;
        hero2: string;
        hero3: string;
    };
}

const Hero = ({ images }: HeroProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [-5, -20]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] pointer-events-none" />

            {/* Floating Image 1 - Top Right */}
            <motion.div
                className="absolute top-[8%] right-[5%] md:right-[10%] w-[180px] md:w-[280px] z-10"
                style={{ y: y1, rotate: rotate1 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <img
                    src={images.hero1}
                    alt="Signature Dish"
                    className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50 border border-[#F0EAD6]/10"
                />
            </motion.div>

            {/* Floating Image 2 - Bottom Left */}
            <motion.div
                className="absolute bottom-[10%] left-[5%] md:left-[8%] w-[220px] md:w-[350px] z-10"
                style={{ y: y2, rotate: rotate2 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <img
                    src={images.hero2}
                    alt="Delicious Food"
                    className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50 border border-[#F0EAD6]/10"
                />
            </motion.div>

            {/* Floating Image 3 - Small, Overlapping Text (Right side) */}
            <motion.div
                className="absolute top-[40%] right-[15%] md:right-[25%] w-[100px] md:w-[140px] z-30"
                style={{ y: y3 }}
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <img
                    src={images.hero3}
                    alt="Fresh Ingredients"
                    className="w-full h-auto rounded-xl shadow-xl shadow-black/50 border-2 border-[#F0EAD6]/20"
                />
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center px-4"
                style={{ opacity }}
            >
                {/* Headline */}
                <motion.h1
                    className="font-bebas text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] text-[#F0EAD6] uppercase tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="block">Taste The</span>
                    <span className="block text-[#F0EAD6]/80">Extraordinary</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="mt-6 text-[#F0EAD6]/60 text-lg md:text-xl font-light tracking-wide max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Premium street food, crafted with passion
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <span className="text-[#F0EAD6]/40 text-xs uppercase tracking-[0.3em]">Scroll</span>
                <motion.div
                    className="w-px h-12 bg-gradient-to-b from-[#F0EAD6]/40 to-transparent"
                    animate={{ scaleY: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
