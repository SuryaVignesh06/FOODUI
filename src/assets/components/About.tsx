import { motion } from 'framer-motion';

interface AboutProps {
    heading: string;
    body: string;
    image: string; // story.png
}

const About = ({ heading, body, image }: AboutProps) => {
    return (
        <section
            id="story"
            className="relative min-h-screen py-32 overflow-hidden"
            style={{ backgroundColor: '#8B0000' }} // Dark Red
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Centered Content */}
                <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto relative">

                    {/* Overlapping Image */}
                    <motion.div
                        className="absolute -top-20 -right-10 md:-right-32 w-[200px] md:w-[300px] z-20 pointer-events-none"
                        initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                        whileInView={{ opacity: 1, rotate: 5, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src={image}
                            alt="Our Story"
                            className="w-full h-auto rounded-2xl shadow-2xl shadow-black/50 border-2 border-[#F0EAD6]/20"
                        />
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        className="font-bebas text-6xl md:text-8xl text-[#F0EAD6] uppercase tracking-wide mb-8"
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

                    {/* Body Text */}
                    <motion.p
                        className="text-[#F0EAD6]/80 text-lg md:text-xl leading-relaxed font-light max-w-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {body}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        className="mt-10 px-8 py-3 border-2 border-[#F0EAD6] text-[#F0EAD6] font-bebas text-xl tracking-widest uppercase hover:bg-[#F0EAD6] hover:text-[#8B0000] transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Explore Menu
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default About;
