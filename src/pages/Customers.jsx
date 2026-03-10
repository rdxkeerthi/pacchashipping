import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Customers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loaded = 0;
        const checkDone = () => { loaded++; if (loaded >= 2) setLoading(false); };

        const unsubPartners = onSnapshot(query(collection(db, 'partners'), orderBy('createdAt', 'desc')), (snap) => {
            setPartners(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            checkDone();
        }, (err) => { console.error(err); checkDone(); });

        const unsubTestimonials = onSnapshot(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')), (snap) => {
            setTestimonials(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            checkDone();
        }, (err) => { console.error(err); checkDone(); });

        return () => { unsubPartners(); unsubTestimonials(); };
    }, []);

    const nextTestimonial = () => {
        if (testimonials.length > 0) setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };
    const prevTestimonial = () => {
        if (testimonials.length > 0) setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const revealVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="w-full min-h-screen pt-32 pb-20 overflow-hidden relative bg-background">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/10 blur-[100px] opacity-60"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-brand-secondary/10 blur-[80px] opacity-40"></div>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={revealVariants}
                className="max-w-[1400px] mx-auto px-6 text-center mb-20 relative z-10"
            >
                <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Enterprise Ecosystem</span>
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-foreground mb-6 tracking-tight leading-tight">
                    Global Scale.<br />Trusted Integrity.
                </h1>
                <p className="max-w-3xl mx-auto text-muted-foreground text-xl font-medium leading-relaxed">
                    Powering the resilient supply chains of industry titans across aerospace, energy, high-tech hardware, and global retail.
                </p>
            </motion.div>

            {/* Infinite Logo Marquee */}
            {partners.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full relative py-16 glass-panel border-y border-white/5 mb-24 overflow-hidden flex z-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                    <motion.div
                        animate={{ x: ["0%", "-33.33333333%"] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        className="flex whitespace-nowrap gap-24 items-center px-10 w-max"
                    >
                        {/* Triple array to create perfect seamless loop */}
                        {[...partners, ...partners, ...partners].map((partner, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center font-bold text-3xl md:text-4xl text-muted-foreground/40 tracking-tight hover:text-foreground transition-all duration-500 cursor-default">
                                {partner.logoUrl?.trim() ? (
                                    <img src={partner.logoUrl} alt={partner.name} className="h-10 md:h-12 object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                                ) : (
                                    partner.name
                                )}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* Testimonial Carousel */}
            {testimonials.length > 0 && (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={revealVariants}
                    className="max-w-5xl mx-auto px-6 relative z-10 mb-10"
                >
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between z-20 px-2 md:-mx-8 pointer-events-none">
                        <button onClick={prevTestimonial} className="w-16 h-16 rounded-full glass-panel border border-white/5 shadow-lg text-foreground flex items-center justify-center pointer-events-auto hover:bg-white/10 hover:scale-110 hover:shadow-neon-brand transition-all duration-300">
                            <FiChevronLeft className="text-3xl" />
                        </button>
                        <button onClick={nextTestimonial} className="w-16 h-16 rounded-full glass-panel border border-white/5 shadow-lg text-foreground flex items-center justify-center pointer-events-auto hover:bg-white/10 hover:scale-110 hover:shadow-neon-brand transition-all duration-300">
                            <FiChevronRight className="text-3xl" />
                        </button>
                    </div>

                    <div className="glass-panel rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden min-h-[500px] flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="flex gap-2 text-brand-secondary mb-10 text-2xl">
                                    {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                                </div>
                                <p className="text-3xl md:text-5xl font-bold tracking-tight leading-snug mb-12 text-foreground">
                                    "{testimonials[currentIndex]?.text}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-foreground text-lg md:text-xl tracking-tight">{testimonials[currentIndex]?.author}</h4>
                                    <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mt-2 font-semibold">{testimonials[currentIndex]?.role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Customers;
