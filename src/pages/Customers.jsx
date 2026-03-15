import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

const Customers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [partners, setPartners] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loaded = 0;
        const checkDone = () => { loaded++; if (loaded >= 2) setLoading(false); };

        const partnersRef = ref(db, 'partners');
        const unsubPartners = onValue(partnersRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let partnersArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                partnersArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setPartners(partnersArray);
            } else {
                setPartners([]);
            }
            checkDone();
        }, (err) => { console.error(err); checkDone(); });

        const testimonialsRef = ref(db, 'testimonials');
        const unsubTestimonials = onValue(testimonialsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let testimonialsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                testimonialsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                setTestimonials(testimonialsArray);
            } else {
                setTestimonials([]);
            }
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
        <div className="w-full min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden relative bg-[#050a07]">
            <Helmet>
                <title>Our Clients & Partners | Trusted Logistics Success Stories Chennai</title>
                <meta name="description" content="Discover why hundreds of exporters and importers trust Paccha Shipping. Real client testimonials and partner stories from our 15 years in global logistics." />
                <meta name="keywords" content="logistics testimonials India, trusted shipping company Chennai, Paccha Shipping clients, export import success stories" />
                <link rel="canonical" href="https://pacchashipping.in/customers" />
            </Helmet>
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
                <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Our Clients & Partners</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Trusted by Businesses.<br />Loved by Exporters.
                </h1>
                <p className="max-w-3xl mx-auto text-gray-400 text-xl font-medium leading-relaxed">
                    From small exporters to large corporations — businesses across India trust Paccha Universal Shipping Line to handle their most critical cargo. Here's what our clients say.
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
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: Math.max(20, partners.length * 5), repeat: Infinity }}
                        className="flex whitespace-nowrap gap-16 md:gap-32 items-center px-10 w-max"
                    >
                        {/* 10 loops ensures even a single customer name will overfill any wide screen viewport before snapping */}
                        {[...Array(10)].flatMap(() => partners).map((partner, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center font-extrabold text-4xl md:text-5xl text-gray-500/80 tracking-tighter hover:text-white transition-all duration-500 cursor-default px-4 shrink-0">
                                {partner.logoUrl && partner.logoUrl.trim() !== '' ? (
                                    <div className="bg-white/10 p-3 rounded-xl border border-white/5 shadow-sm hover:scale-110 transition-transform duration-300 flex items-center justify-center h-20 md:h-24 w-auto min-w-[80px]">
                                        <img src={partner.logoUrl} alt={partner.name} className="h-full w-auto object-contain drop-shadow-md" />
                                    </div>
                                ) : (
                                    <span className="text-white hover:scale-105 transition-transform duration-300 drop-shadow-md shrink-0">{partner.name}</span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* Empty state if no partners and no testimonials */}
            {!loading && partners.length === 0 && testimonials.length === 0 && (
                <div className="max-w-[1400px] mx-auto px-6 text-center py-32 relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl text-gray-500 mx-auto mb-6">
                        <FiStar />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Our Client Stories Coming Soon</h3>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">We're proud to serve hundreds of exporters and importers. Contact us to learn about our client success stories and how we can help your business go global.</p>
                </div>
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
                        <button onClick={prevTestimonial} className="w-16 h-16 rounded-full glass-panel border border-white/5 shadow-lg text-white flex items-center justify-center pointer-events-auto hover:bg-white/10 hover:scale-110 hover:shadow-neon-brand transition-all duration-300">
                            <FiChevronLeft className="text-3xl" />
                        </button>
                        <button onClick={nextTestimonial} className="w-16 h-16 rounded-full glass-panel border border-white/5 shadow-lg text-white flex items-center justify-center pointer-events-auto hover:bg-white/10 hover:scale-110 hover:shadow-neon-brand transition-all duration-300">
                            <FiChevronRight className="text-3xl" />
                        </button>
                    </div>

                    <div className="glass-panel rounded-[2.5rem] p-6 md:p-20 text-center relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/5">
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
                                <p className="text-2xl md:text-5xl font-bold tracking-tight leading-snug mb-8 md:mb-12 text-white">
                                    "{testimonials[currentIndex]?.text}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-white text-lg md:text-xl tracking-tight">{testimonials[currentIndex]?.author}</h4>
                                    <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest mt-2 font-semibold">{testimonials[currentIndex]?.role}</p>
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
