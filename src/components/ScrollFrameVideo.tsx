import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all frames eagerly for best performance
const frameModules = import.meta.glob('../assets/frames/frame_*.jpg', {
    eager: true,
    query: '?url',
    import: 'default'
});

// Sort frames by number and get URLs
const frameUrls = Object.entries(frameModules)
    .sort(([a], [b]) => {
        const numA = parseInt(a.match(/frame_(\d+)/)?.[1] || '0');
        const numB = parseInt(b.match(/frame_(\d+)/)?.[1] || '0');
        return numA - numB;
    })
    .map(([, url]) => url as string);

const TOTAL_FRAMES = frameUrls.length;
const SCROLLS_TO_COMPLETE = 15; // Video completes in 15 scrolls (slower, immersive)
const FRAMES_PER_SCROLL = Math.ceil(TOTAL_FRAMES / SCROLLS_TO_COMPLETE); // ~5-6 frames per scroll

const ScrollFrameVideo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Use refs for smooth animation
    const targetFrame = useRef(0);
    const currentFrame = useRef(0);
    const displayFrame = useRef(0);
    const lastDrawnFrame = useRef(-1);
    const animationRef = useRef<number | null>(null);

    // Preload all images
    useEffect(() => {
        if (frameUrls.length === 0) return;

        const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
        let loadedCount = 0;

        // Load all frames
        frameUrls.forEach((url, i) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedImages[i] = img;
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

                if (loadedCount === TOTAL_FRAMES) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                }
            };
        });
    }, []);

    // Draw frame to canvas
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || images.length === 0) return;

        const clampedIndex = Math.max(0, Math.min(Math.round(frameIndex), TOTAL_FRAMES - 1));
        if (lastDrawnFrame.current === clampedIndex) return;

        const img = images[clampedIndex];
        if (!img || !img.complete) return;

        lastDrawnFrame.current = clampedIndex;
        displayFrame.current = clampedIndex;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Cover sizing
        const imgAspect = img.width / img.height;
        const canvasAspect = rect.width / rect.height;

        let drawWidth, drawHeight, drawX, drawY;
        if (imgAspect > canvasAspect) {
            drawHeight = rect.height;
            drawWidth = drawHeight * imgAspect;
            drawX = (rect.width - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = rect.width;
            drawHeight = drawWidth / imgAspect;
            drawX = 0;
            drawY = (rect.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }, [images]);

    // Smooth animation loop - interpolates between current and target frame
    const animate = useCallback(() => {
        if (!imagesLoaded) return;

        // Smooth easing towards target frame
        const easing = 0.15; // Adjust for smoothness (lower = smoother but slower)
        const diff = targetFrame.current - currentFrame.current;

        if (Math.abs(diff) > 0.1) {
            currentFrame.current += diff * easing;
            drawFrame(Math.round(currentFrame.current));
        } else {
            currentFrame.current = targetFrame.current;
            drawFrame(targetFrame.current);
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [imagesLoaded, drawFrame]);

    // Start animation loop
    useEffect(() => {
        if (imagesLoaded) {
            animationRef.current = requestAnimationFrame(animate);
            // Draw first frame immediately
            drawFrame(0);
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [imagesLoaded, animate, drawFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (imagesLoaded) {
                lastDrawnFrame.current = -1;
                drawFrame(Math.round(currentFrame.current));
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imagesLoaded, drawFrame]);

    // Intersection observer
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                    setIsActive(true);
                } else if (!entry.isIntersecting) {
                    setIsActive(false);
                }
            },
            { threshold: [0, 0.5, 0.7, 1] }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Scroll handler - smooth and fast
    useEffect(() => {
        if (!imagesLoaded || !isActive || isComplete) return;

        const handleWheel = (e: WheelEvent) => {
            // Allow scrolling BACK UP when at frame 0 and scrolling up
            if (targetFrame.current <= 0 && e.deltaY < 0) {
                // Don't prevent default - let user scroll back to hero
                setIsActive(false);
                return;
            }

            e.preventDefault();

            // Calculate how many frames to advance based on scroll delta
            // Normalize scroll delta (different browsers/devices have different values)
            const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 150);

            // Each full scroll (~100-150 pixels) advances FRAMES_PER_SCROLL frames
            const framesToAdd = (normalizedDelta / 100) * FRAMES_PER_SCROLL;

            targetFrame.current = Math.max(0, Math.min(
                targetFrame.current + framesToAdd,
                TOTAL_FRAMES - 1
            ));

            // Check if complete
            if (targetFrame.current >= TOTAL_FRAMES - 1) {
                targetFrame.current = TOTAL_FRAMES - 1;
                setIsComplete(true);
            }
        };

        // Touch handling
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            // Scale touch delta for frames
            const framesToAdd = (deltaY / 50) * FRAMES_PER_SCROLL;

            targetFrame.current = Math.max(0, Math.min(
                targetFrame.current + framesToAdd,
                TOTAL_FRAMES - 1
            ));

            if (targetFrame.current >= TOTAL_FRAMES - 1) {
                targetFrame.current = TOTAL_FRAMES - 1;
                setIsComplete(true);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [imagesLoaded, isActive, isComplete]);

    const progress = ((displayFrame.current + 1) / TOTAL_FRAMES) * 100;

    return (
        <div
            ref={containerRef}
            className="relative bg-black h-screen"
        >
            {/* Loading overlay */}
            <AnimatePresence>
                {!imagesLoaded && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                        exit={{ opacity: 0 }}
                    >
                        <div className="text-center">
                            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                                    animate={{ width: `${loadProgress}%` }}
                                />
                            </div>
                            <p className="text-white font-bebas text-2xl tracking-wider">
                                Loading Experience
                            </p>
                            <p className="text-white/50 text-sm mt-1">{loadProgress}%</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fixed full-screen video container - covers everything when active */}
            <div className={`${isActive && !isComplete ? 'fixed' : 'absolute'} inset-0 w-full h-screen overflow-hidden z-40 bg-black`}>
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ backgroundColor: '#000' }}
                />

                {/* Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
                />

                {/* Cinematic bars */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text overlay */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    animate={{
                        opacity: displayFrame.current > 10 && displayFrame.current < TOTAL_FRAMES - 10 ? 1 : 0,
                        y: displayFrame.current > 10 && displayFrame.current < TOTAL_FRAMES - 10 ? 0 : 30
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-center px-6">
                        <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-wider drop-shadow-2xl">
                            The Art of Flavor
                        </h2>
                        <p className="text-white/80 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
                            Crafted with passion, served with love
                        </p>
                    </div>
                </motion.div>

                {/* Progress bar */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 md:w-80 z-10">
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <motion.p
                        className="text-center text-white/50 text-xs mt-2 font-bebas tracking-widest"
                        animate={{ opacity: isComplete ? 0 : 1 }}
                    >
                        SCROLL TO PLAY
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-28 left-1/2 -translate-x-1/2"
                    animate={{ opacity: displayFrame.current < 5 ? 1 : 0 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Complete indicator */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            >
                                <svg className="w-10 h-10 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.div>
                            <p className="text-white font-bebas text-lg tracking-wider mt-2">
                                SCROLL TO CONTINUE
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ScrollFrameVideo;
