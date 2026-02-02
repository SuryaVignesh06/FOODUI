import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './SmokeEffect.css';

interface HeroProps {
    images: {
        hero1: string; // Bottom center - main plate (under text)
        hero2: string; // Right side of text (sauce cup)
        hero3: string; // Top right corner (flour/powder splash)
        hero4: string; // Top left (wrap/shawarma - tilted)
    };
}

const Hero = ({ images }: HeroProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* Cinematic Light Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F0EAD6]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* === REALISTIC SMOKE EFFECT - MULTI-LAYER === */}

            {/* Smoke Layer 1 - Base Fog Rising */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(to top, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)',
                    filter: 'blur(30px)',
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Smoke Layer 2 - Left Wisp */}
            <motion.div
                className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{
                    x: [0, 80, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Smoke Layer 3 - Right Wisp */}
            <motion.div
                className="absolute bottom-[15%] right-[15%] w-[250px] h-[250px] rounded-full pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
                    filter: 'blur(35px)',
                }}
                animate={{
                    x: [0, -60, 0],
                    y: [0, -120, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.25, 0.5, 0.25],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Smoke Layer 4 - Central Rising Steam */}
            <motion.div
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[400px] h-[500px] pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    filter: 'blur(50px)',
                }}
                animate={{
                    y: [0, -80, 0],
                    scaleY: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Smoke Layer 5 - Thin Wisps Floating */}
            <motion.div
                className="absolute bottom-[30%] left-[30%] w-[150px] h-[200px] rounded-full pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, -150, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />

            {/* Smoke Layer 6 - Background Haze */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-5"
                style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(200,200,200,0.05) 0%, transparent 50%)',
                }}
                animate={{
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* hero4.png - Top Left (Wrap/Shawarma - tilted, hanging from above) - BIGGER */}
            <div className="absolute -top-8 left-[2%] md:left-[5%] z-10">
                {/* Animated Smoke for Hero 4 */}
                <motion.div
                    className="absolute pointer-events-none z-50"
                    style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: '150px', height: '200px' }}
                >
                    <motion.div
                        className="absolute w-16 h-32 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)', filter: 'blur(8px)', left: '30%' }}
                        animate={{ y: [0, -80, -160], opacity: [0.7, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                        className="absolute w-12 h-28 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)', filter: 'blur(6px)', left: '50%' }}
                        animate={{ y: [0, -100, -180], opacity: [0.6, 0.3, 0], scale: [0.7, 1.1, 1.4] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                    />
                </motion.div>
                <motion.img
                    src={images.hero4}
                    alt=""
                    className="w-[180px] md:w-[280px] lg:w-[350px] h-auto object-contain pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    style={{ y: y4, rotate: -15 }}
                    initial={{ opacity: 0, y: -50, rotate: -20 }}
                    animate={{ opacity: 1, y: 0, rotate: -15 }}
                    transition={{ duration: 1, delay: 0.1 }}
                />
            </div>

            {/* hero3.png - Top Right Corner (Flour/Powder Splash) - BIGGER */}
            <div className="absolute -top-16 -right-16 md:right-0 z-10">
                {/* Animated Smoke for Hero 3 */}
                <motion.div
                    className="absolute pointer-events-none z-50"
                    style={{ bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '180px', height: '220px' }}
                >
                    <motion.div
                        className="absolute w-14 h-30 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)', filter: 'blur(7px)', left: '35%' }}
                        animate={{ y: [0, -90, -170], opacity: [0.65, 0.35, 0], scale: [0.75, 1.15, 1.5] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                    />
                    <motion.div
                        className="absolute w-10 h-24 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 70%)', filter: 'blur(5px)', left: '55%' }}
                        animate={{ y: [0, -70, -140], opacity: [0.5, 0.25, 0], scale: [0.7, 1, 1.3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
                    />
                </motion.div>
                <motion.img
                    src={images.hero3}
                    alt=""
                    className="w-[200px] md:w-[320px] lg:w-[400px] h-auto object-contain pointer-events-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                    style={{ y: y3 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>

            {/* hero2.png - Right Side of Text (Sauce Cup) - BIGGER */}
            <div className="absolute top-[35%] right-[6%] md:right-[10%] z-20">
                {/* NO Smoke for Hero 2 (Removed as requested) */}
                <motion.img
                    src={images.hero2}
                    alt=""
                    className="w-[80px] md:w-[120px] lg:w-[160px] h-auto object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                    style={{ y: y2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />
            </div>

            {/* hero1.png - Bottom Center (Main Plate - under the text) - BIGGEST with most smoke */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 z-30">
                {/* Animated Smoke for Hero 1 - Most Prominent */}
                <motion.div
                    className="absolute pointer-events-none z-50"
                    style={{ top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '350px', height: '300px' }}
                >
                    {/* Large center smoke cloud */}
                    <motion.div
                        className="absolute w-24 h-40 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 50%, transparent 70%)', filter: 'blur(10px)', left: '45%' }}
                        animate={{ y: [0, -100, -200], opacity: [0.8, 0.5, 0], scale: [0.9, 1.4, 1.8] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
                    />
                    {/* Left smoke wisp */}
                    <motion.div
                        className="absolute w-16 h-32 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)', filter: 'blur(8px)', left: '20%' }}
                        animate={{ y: [0, -80, -160], x: [-5, 10, -5], opacity: [0.7, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                    />
                    {/* Right smoke wisp */}
                    <motion.div
                        className="absolute w-14 h-28 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 50%, transparent 70%)', filter: 'blur(7px)', left: '70%' }}
                        animate={{ y: [0, -90, -170], x: [5, -8, 5], opacity: [0.6, 0.35, 0], scale: [0.75, 1.1, 1.4] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
                    />
                    {/* Extra wisp */}
                    <motion.div
                        className="absolute w-12 h-24 rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 70%)', filter: 'blur(6px)', left: '35%' }}
                        animate={{ y: [0, -70, -140], opacity: [0.5, 0.3, 0], scale: [0.7, 1, 1.3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 2.2 }}
                    />
                </motion.div>
                <motion.img
                    src={images.hero1}
                    alt=""
                    className="w-[300px] md:w-[450px] lg:w-[550px] h-auto object-contain pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                    style={{ y: y1 }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                />
            </div>

            {/* Main Content - Text */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center text-center px-4"
                style={{ opacity }}
            >
                {/* Main Title */}
                <motion.h1
                    className="font-bebas text-[22vw] md:text-[16vw] lg:text-[14vw] leading-[0.85] text-[#F0EAD6] uppercase tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    SQUZZZ
                </motion.h1>

                {/* Decorative Line + Subtitle */}
                <motion.div
                    className="flex items-center gap-4 mt-2"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="w-10 md:w-16 h-[2px] bg-[#F0EAD6]" />
                    <span className="font-bebas text-base md:text-xl lg:text-2xl text-[#F0EAD6] tracking-[0.25em] uppercase">
                        The Unforgettable Taste
                    </span>
                </motion.div>
            </motion.div>

            {/* Bottom Decorative Line */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] max-w-2xl h-[2px] bg-[#F0EAD6]/20 z-10" />
        </section>
    );
};

export default Hero;
