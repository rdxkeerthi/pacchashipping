import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

// Renders gold half/full stars for a given 0-5 rating
const GoldStars = ({ rating = 5, size = 22 }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1);
        stars.push(
            <span key={i} style={{ position: 'relative', display: 'inline-block', width: size + 2, height: size + 2, flexShrink: 0 }}>
                <FiStar size={size} style={{ color: '#92400e' }} />
                <span style={{ position: 'absolute', top: 0, left: 0, width: fill === 0 ? 0 : fill >= 1 ? '100%' : '50%', overflow: 'hidden', display: 'block', height: '100%' }}>
                    <FiStar size={size} style={{ color: '#FBBF24', fill: '#FBBF24', flexShrink: 0 }} />
                </span>
            </span>
        );
    }
    return <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', lineHeight: 1 }}>{stars}</span>;
};

const Customers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance every 6 seconds
    useEffect(() => {
        if (testimonials.length <= 1 || isPaused) return;
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length, isPaused, currentIndex]);

    // Drag support
    const dragStart = useRef(null);

    useEffect(() => {
        let loaded = 0;
        const checkDone = () => { loaded++; if (loaded >= 2) setLoading(false); };

        const unsubPartners = onValue(ref(db, 'partners'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let arr = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setPartners(arr);
            } else { setPartners([]); }
            checkDone();
        }, (err) => { console.error(err); checkDone(); });

        const unsubTestimonials = onValue(ref(db, 'testimonials'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let arr = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    rating: typeof data[key].rating === 'number' ? data[key].rating : 5
                }));
                arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setTestimonials(arr);
            } else { setTestimonials([]); }
            checkDone();
        }, (err) => { console.error(err); checkDone(); });

        return () => { unsubPartners(); unsubTestimonials(); };
    }, []);

    const goNext = () => {
        if (testimonials.length > 0) {
            setDirection(1);
            setCurrentIndex(prev => (prev + 1) % testimonials.length);
        }
    };
    const goPrev = () => {
        if (testimonials.length > 0) {
            setDirection(-1);
            setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    // Mouse drag / swipe handlers
    const handlePointerDown = (e) => { dragStart.current = e.clientX; };
    const handlePointerUp = (e) => {
        if (dragStart.current === null) return;
        const delta = dragStart.current - e.clientX;
        if (Math.abs(delta) > 50) { delta > 0 ? goNext() : goPrev(); }
        dragStart.current = null;
    };

    const revealVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const slideVariants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
        center: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -100 : 100, transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] } }),
    };

    const t = testimonials[currentIndex];
    const initials = t?.author ? t.author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';

    return (
        <div className="w-full min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden relative bg-[#050a07]">
            <Helmet>
                <title>Our Clients &amp; Partners | Trusted Logistics Success Stories Chennai</title>
                <meta name="description" content="Discover why hundreds of exporters and importers trust Paccha Shipping. Real client testimonials and partner stories from our 15 years in global logistics." />
                <meta name="keywords" content="logistics testimonials India, trusted shipping company Chennai, Paccha Shipping clients, export import success stories" />
                <link rel="canonical" href="https://pacchashipping.in/customers" />
            </Helmet>

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/10 blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/10 blur-[80px] opacity-40"></div>
            </div>

            {/* Hero */}
            <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={revealVariants}
                className="max-w-[1400px] mx-auto px-6 text-center mb-20 relative z-10"
            >
                <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Our Clients &amp; Partners</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Trusted by Businesses.<br />Loved by Exporters.
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 text-xl font-medium leading-relaxed">
                    From small exporters to large corporations — businesses across India trust Paccha Universal Shipping Line to handle their most critical cargo.
                </p>
            </motion.div>

            {/* Infinite Logo Marquee — slower scroll */}
            {partners.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="w-full relative py-16 glass-panel border-y border-white/5 mb-24 overflow-hidden flex z-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            ease: 'linear',
                            // Slow: 12 seconds per partner, min 60s
                            duration: Math.max(60, partners.length * 12),
                            repeat: Infinity
                        }}
                        className="flex whitespace-nowrap gap-16 md:gap-32 items-center px-10 w-max"
                    >
                        {[...Array(10)].flatMap(() => partners).map((partner, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 px-12 shrink-0 group/item transition-all duration-500">
                                {partner.logoUrl && partner.logoUrl.trim() !== '' ? (
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm group-hover/item:scale-110 group-hover/item:border-brand-primary/30 transition-all duration-300 flex items-center justify-center h-16 md:h-20 w-auto min-w-[70px]">
                                        <img src={partner.logoUrl} alt={partner.name} className="h-full w-auto object-contain brightness-90 group-hover/item:brightness-110 transition-all" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-gray-400 group-hover/item:border-brand-primary/30 transition-all">
                                        {partner.name?.charAt(0)}
                                    </div>
                                )}
                                <span className="text-white text-lg md:text-xl font-extrabold tracking-tighter group-hover/item:text-brand-highlight transition-colors whitespace-nowrap text-center">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* Empty state */}
            {!loading && partners.length === 0 && testimonials.length === 0 && (
                <div className="max-w-[1400px] mx-auto px-6 text-center py-32 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl text-gray-500 mx-auto mb-6"><FiStar /></div>
                    <h3 className="text-2xl font-bold text-white mb-3">Our Client Stories Coming Soon</h3>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">We're proud to serve hundreds of exporters and importers. Contact us to learn about our client success stories.</p>
                </div>
            )}

            {/* Market Validation Carousel */}
            {testimonials.length > 0 && (
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                    variants={revealVariants}
                    className="max-w-4xl mx-auto px-6 relative z-10 mb-16"
                >
                    {/* Section label */}
                    <div className="text-center mb-12">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400 mb-2 block">Market Validation</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What Our Clients Say</h2>
                    </div>

                    {/* Card */}
                    <div
                        className="relative select-none cursor-grab active:cursor-grabbing"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={(e) => { if (dragStart.current !== null) handlePointerUp(e); }}
                    >
                        {/* Decorative top strip */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-amber-400/60 via-amber-300 to-amber-400/60"></div>

                        <div className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                            {/* Top amber accent */}
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

                            <div className="p-8 md:p-16">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="flex flex-col items-center text-center"
                                    >
                                        {/* Big decorative quote mark */}
                                        <div className="text-8xl font-serif text-amber-400/20 leading-none mb-2 select-none" aria-hidden>"</div>

                                        {/* Stars */}
                                        <div className="mb-6">
                                            <GoldStars rating={t?.rating ?? 5} size={26} />
                                        </div>

                                        {/* Quote text */}
                                        <p className="text-xl md:text-3xl font-semibold text-white/90 leading-relaxed mb-10 max-w-2xl">
                                            {t?.text}
                                        </p>

                                        {/* Author */}
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-black text-lg">
                                                {initials}
                                            </div>
                                            <div>
                                                <p className="font-black text-white text-base md:text-lg tracking-tight">{t?.author}</p>
                                                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">{t?.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Controls: dot indicators + nav buttons */}
                    <div className="flex items-center justify-center gap-6 mt-10">
                        {/* Prev */}
                        <button
                            onClick={goPrev}
                            className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:border-amber-400/50 hover:text-amber-400 hover:scale-110 transition-all duration-200 shadow-lg"
                        >
                            <FiChevronLeft size={22} />
                        </button>

                        {/* Dot indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                                    className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 h-2.5 bg-amber-400' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>

                        {/* Next */}
                        <button
                            onClick={goNext}
                            className="w-12 h-12 rounded-full glass-panel border border-white/10 flex items-center justify-center text-white hover:border-amber-400/50 hover:text-amber-400 hover:scale-110 transition-all duration-200 shadow-lg"
                        >
                            <FiChevronRight size={22} />
                        </button>
                    </div>

                    {/* Drag hint */}
                    <p className="text-center text-[11px] text-gray-600 mt-4 font-medium tracking-widest uppercase">
                        Drag or swipe to navigate
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Customers;
