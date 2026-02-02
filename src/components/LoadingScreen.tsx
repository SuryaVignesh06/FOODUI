import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Logo Animation */}
            <motion.h1
                className="font-bebas text-6xl md:text-8xl text-[#F0EAD6] tracking-wider mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                SQUZZZ
            </motion.h1>

            {/* Smoke Animation */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(139,0,0,0.15) 0%, transparent 60%)',
                }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-[#8B0000]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ ease: "easeOut" }}
                />
            </div>

            {/* Loading Text */}
            <motion.p
                className="mt-4 text-white/40 text-sm uppercase tracking-[0.3em]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Loading Experience...
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;
