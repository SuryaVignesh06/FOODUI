import { motion } from 'framer-motion';

interface FloatingAccentProps {
    size?: 'sm' | 'md' | 'lg';
    position: { top?: string; left?: string; right?: string; bottom?: string };
    delay?: number;
}

const FloatingAccent = ({ size = 'md', position, delay = 0 }: FloatingAccentProps) => {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-32 h-32',
        lg: 'w-48 h-48',
    };

    return (
        <motion.div
            className={`absolute ${sizeClasses[size]} bg-[#0B3333]/5 backdrop-blur-sm z-0 pointer-events-none`}
            style={position}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
            viewport={{ once: true }}
        />
    );
};

export default FloatingAccent;
