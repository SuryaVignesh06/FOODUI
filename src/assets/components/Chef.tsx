import { motion } from 'framer-motion';

interface Chef {
    name: string;
    title: string;
    image: string;
}

interface ChefSectionProps {
    chefs: Chef[];
}

const ChefSection = ({ chefs }: ChefSectionProps) => {
    return (
        <section className="px-6 py-20 md:px-24 md:py-32 bg-black border-t border-white/5">
            <motion.h2
                className="text-4xl md:text-5xl font-oswald mb-16 text-center tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                MEET THE <span className="text-accent">MASTERS</span>
            </motion.h2>

            {/* Horizontal Scroll Container for Mobile, Grid for Desktop */}
            <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 md:gap-10 pb-8 md:pb-0 snap-x">
                {chefs.map((chef, index) => (
                    <motion.div
                        key={index}
                        className="group relative min-w-[280px] md:min-w-0 aspect-[3/4] overflow-hidden bg-gray-900 snap-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Image */}
                        <img
                            src={chef.image}
                            alt={chef.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-oswald uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{chef.name}</h3>
                            <p className="text-accent text-sm tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{chef.title}</p>
                        </div>

                        {/* Border glow effect */}
                        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ChefSection;
