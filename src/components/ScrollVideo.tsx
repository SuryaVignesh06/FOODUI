import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollVideoProps {
    videoSrc: string;
}

const ScrollVideo = ({ videoSrc }: ScrollVideoProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Track scroll progress within this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Update video currentTime based on scroll
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Make sure video is loaded
        const handleLoadedMetadata = () => {
            // Pause the video - we'll control it manually
            video.pause();
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Subscribe to scroll progress changes
        const unsubscribe = smoothProgress.on('change', (progress) => {
            if (video && video.duration) {
                // Set video time based on scroll progress
                video.currentTime = progress * video.duration;
            }
        });

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            unsubscribe();
        };
    }, [smoothProgress]);

    // Parallax text animations
    const textY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [100, 0, 0, -100]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

    // Progress indicator width
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: '300vh' }} // 3 screen heights for 3 scroll lengths
        >
            {/* Sticky video container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {/* Video */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                {/* Cinematic bars (letterbox effect) */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent" />

                {/* Scroll-animated text overlay */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ y: textY, opacity: textOpacity }}
                >
                    <div className="text-center px-6">
                        <h2 className="font-bebas text-5xl md:text-7xl lg:text-9xl text-white uppercase tracking-wider drop-shadow-2xl">
                            The Art of Flavor
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                            Every dish tells a story. Scroll to discover ours.
                        </p>
                    </div>
                </motion.div>

                {/* Progress bar at bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-96">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            style={{ width: progressWidth }}
                        />
                    </div>
                    <p className="text-center text-white/50 text-sm mt-2 font-bebas tracking-wider">
                        KEEP SCROLLING
                    </p>
                </div>

                {/* Scroll indicator at the start */}
                <motion.div
                    className="absolute bottom-24 left-1/2 -translate-x-1/2"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollVideo;
