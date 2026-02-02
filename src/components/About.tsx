import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
    heading: string;
    body: string;
    image: string;
}

const About = ({ heading, body, image }: AboutProps) => {
    return (
        <section
            id="story"
            className="relative min-h-screen py-32 overflow-hidden"
            style={{ backgroundColor: '#8B0000' }}
        >
            {/* Cinematic Light Effects */}
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#F0EAD6]/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] pointer-events-none" />

            {/* Smoke Effect - Top */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

            {/* Smoke Effect - Animated wisps */}
            <motion.div
                className="absolute top-[20%] left-[10%] w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[30%] right-[15%] w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[20%] w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    y: [0, -50, 0],
                    scale: [1, 1.4, 1],
                    opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto relative">

                    {/* Left Side Attractive Image - Floating/Parallax */}
                    <motion.img
                        src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=600"
                        alt="Ambience"
                        className="absolute -left-48 top-10 w-[300px] md:w-[400px] h-[500px] object-cover rounded-2xl opacity-60 mix-blend-overlay z-0 hidden lg:block pointer-events-none"
                        style={{ rotate: -12 }}
                        initial={{ opacity: 0, x: -100, rotate: -20 }}
                        whileInView={{ opacity: 0.6, x: 0, rotate: -12 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    />

                    {/* story.png - Right Side (Original Position) */}
                    <motion.img
                        src={image}
                        alt=""
                        className="absolute -top-24 -right-16 md:-right-40 lg:-right-56 w-[250px] md:w-[380px] lg:w-[480px] h-auto object-contain z-30 pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                        style={{ rotate: 8 }}
                        initial={{ opacity: 0, x: 80, rotate: 15 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    />

                    {/* Heading */}
                    <motion.h2
                        className="font-bebas text-6xl md:text-8xl text-[#F0EAD6] uppercase tracking-wide mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {heading}
                    </motion.h2>

                    {/* Decorative Line */}
                    <motion.div
                        className="w-24 h-1 bg-[#F0EAD6]/40 mb-8"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    {/* Body Text with Scroll Reveal */}
                    <ScrollReveal
                        containerClassName="text-[#F0EAD6]/90"
                        textClassName="text-lg md:text-xl leading-relaxed font-light max-w-2xl justify-center"
                        baseOpacity={0.15}
                        baseRotation={2}
                        blurStrength={3}
                    >
                        {body}
                    </ScrollReveal>

                    {/* CTA Button */}
                    <Link to="/menu">
                        <motion.button
                            className="mt-10 px-8 py-3 border-2 border-[#F0EAD6] text-[#F0EAD6] font-bebas text-xl tracking-widest uppercase hover:bg-[#F0EAD6] hover:text-[#8B0000] transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Menu
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Smoke Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
};

export default About;
