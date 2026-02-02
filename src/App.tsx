import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import ScrollFrameVideo from './components/ScrollFrameVideo';
import BounceCards from './components/BounceCards';
import LoadingScreen from './components/LoadingScreen';
import FlowingMenu from './components/FlowingMenu';
import ScrollReveal from './components/ScrollReveal';
import MenuPage from './pages/MenuPage';
import BookingPage from './pages/BookingPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

// Hero Images
import hero1 from './assets/hero1.png';
import hero2 from './assets/hero2.png';
import hero3 from './assets/hero3.png';
import hero4 from './assets/hero4.png';

// Story Image
import storyImage from './assets/story.png';

// Dish Images for Gallery
import top1 from './assets/top1.png';
import top2 from './assets/top2.jpeg';
import top3 from './assets/top3.jpeg';
import top4 from './assets/top4.jpeg';
import top5 from './assets/top5.jpeg';

// Flowing menu items for best dishes
const flowingMenuItems = [
    { link: '/menu', text: 'Signature Shawarma', image: top1 },
    { link: '/menu', text: 'Falafel Royale', image: top2 },
    { link: '/menu', text: 'Grilled Halloumi', image: top3 },
    { link: '/menu', text: 'Lamb Kofta', image: top4 },
    { link: '/menu', text: 'Mixed Mezze', image: top5 },
];

// Best 5 Chef/Team images for Bounce Cards
const chefItems = [
    { image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop', name: 'Al-Hassan', role: 'Executive Chef' },
    { image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&h=600&fit=crop', name: 'Layla', role: 'Sous Chef' },
    { image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=500&h=600&fit=crop', name: 'Omar', role: 'Pastry Chef' },
    { image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&h=600&fit=crop', name: 'Yousef', role: 'Head Grill' },
    { image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=500&h=600&fit=crop', name: 'Samira', role: 'Kitchen Manager' }
];

// Section animation variants
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

// Home Page Component
const HomePage = () => {
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence>
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            <motion.main
                className="bg-[#050505] text-[#F0EAD6] min-h-screen overflow-x-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <Navbar
                    isOrderModalOpen={isOrderModalOpen}
                    setIsOrderModalOpen={setIsOrderModalOpen}
                />

                {/* Hero Section */}
                <Hero
                    images={{
                        hero1,
                        hero2,
                        hero3,
                        hero4
                    }}
                />

                {/* Scroll Frame Video Section */}
                <ScrollFrameVideo />

                {/* Story Section */}
                <motion.div
                    id="story"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <About
                        heading="OUR STORY"
                        body="Born from a passion for authentic Levantine cuisine, Squzzz brings the vibrant flavours of the Middle East to your table. Every dish is crafted with love, using time-honoured recipes and the freshest ingredients. We don't just serve food – we create experiences that transport you to the bustling streets of Beirut, Damascus, and beyond."
                        image={storyImage}
                    />
                </motion.div>

                {/* Smooth transition gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#F0EAD6]/20 to-transparent" />

                {/* Best Dishes Section - Flowing Menu */}
                <motion.section
                    id="menu"
                    className="py-20 bg-[#050505]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="text-center mb-10 px-6"
                        variants={sectionVariants}
                    >
                        <h2 className="font-bebas text-5xl md:text-7xl text-[#F0EAD6] uppercase tracking-wider">
                            Best Dishes
                        </h2>
                        <ScrollReveal
                            containerClassName="mt-3"
                            textClassName="text-[#F0EAD6]/70 text-lg max-w-xl mx-auto justify-center"
                            baseOpacity={0.2}
                            baseRotation={1}
                            blurStrength={2}
                        >
                            Hover over each dish to explore our favorites
                        </ScrollReveal>
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                        <FlowingMenu
                            items={flowingMenuItems}
                            speed={12}
                            textColor="#F0EAD6"
                            bgColor="#050505"
                            marqueeBgColor="#F0EAD6"
                            marqueeTextColor="#050505"
                            borderColor="#F0EAD6/30"
                        />
                    </motion.div>
                </motion.section>

                {/* Smooth transition gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#F0EAD6]/20 to-transparent" />

                {/* Chef & Kitchen Section - Bounce Cards */}
                <motion.section
                    className="relative py-24 bg-[#050505]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="text-center mb-16"
                        variants={sectionVariants}
                    >
                        <h2 className="font-bebas text-5xl md:text-7xl text-[#F0EAD6] uppercase tracking-wider">
                            Meet Our Team
                        </h2>
                        <ScrollReveal
                            containerClassName="mt-3 px-6"
                            textClassName="text-[#F0EAD6]/70 text-lg max-w-xl mx-auto justify-center"
                            baseOpacity={0.2}
                            baseRotation={1}
                            blurStrength={2}
                        >
                            The passionate masters behind your meal
                        </ScrollReveal>
                    </motion.div>

                    <motion.div
                        className="flex justify-center items-center h-[500px]"
                        variants={sectionVariants}
                    >
                        <BounceCards
                            items={chefItems}
                            containerWidth="100%"
                            containerHeight={400}
                            transformStyles={[
                                'rotate(10deg) translate(-200px)',
                                'rotate(5deg) translate(-100px)',
                                'rotate(0deg)',
                                'rotate(-5deg) translate(100px)',
                                'rotate(-10deg) translate(200px)'
                            ]}
                        />
                    </motion.div>
                </motion.section>

                {/* Smooth transition gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#F0EAD6]/20 to-transparent" />

                {/* Footer */}
                <motion.div
                    id="book"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <Footer />
                </motion.div>
            </motion.main>
        </>
    );
};


// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
};

// Import CartProvider
import { CartProvider } from './context/CartContext';

function App() {
    const location = useLocation();

    return (
        <CartProvider>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    } />
                    <Route path="/menu" element={
                        <PageTransition>
                            <MenuPage />
                        </PageTransition>
                    } />
                    <Route path="/booking" element={
                        <PageTransition>
                            <BookingPage />
                        </PageTransition>
                    } />
                    <Route path="/cart" element={
                        <PageTransition>
                            <CartPage />
                        </PageTransition>
                    } />
                    <Route path="/payment" element={
                        <PageTransition>
                            <PaymentPage />
                        </PageTransition>
                    } />
                    <Route path="/order-confirmation" element={
                        <PageTransition>
                            <OrderConfirmationPage />
                        </PageTransition>
                    } />
                </Routes>
            </AnimatePresence>
        </CartProvider>
    );
}

export default App;
