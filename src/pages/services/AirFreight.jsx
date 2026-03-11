import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "Express International Shipping",
    "Door-to-Door Delivery",
    "Real-time GPS Tracking",
    "Temperature Controlled Cargo",
    "Dangerous Goods Handling",
    "Customs Clearance Assistance"
];

const AirFreight = () => {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

    const cloudsRef = useRef(null);
    const planeRef = useRef(null);

    useEffect(() => {
        // Image cinematic panning
        gsap.to(planeRef.current, {
            scale: 1.15,
            y: 30,
            x: 10,
            scrollTrigger: {
                trigger: ".air-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            <section className="air-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Aerospace Logistics</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Speed Beyond <br />
                            <span className="text-gradient">Borders.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light">
                            When time is critical, our air freight division ensures your cargo reaches any global destination with absolute precision.
                        </p>
                        <Link to="/contact" className="px-8 py-4 rounded-full bg-[var(--color-brand-accent)] text-[var(--color-brand-dark)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all font-bold text-lg inline-flex items-center gap-2">
                            Request Air Quote <FiArrowRight />
                        </Link>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-[var(--color-brand-highlight)]/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={planeRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/airport_cargo_board_1772904791588.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight animate-pulse shadow-neon-brand"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">Live Track: Flight 402 Heavy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 text-white">Uncompromising Speed</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            We leverage strategic partnerships with major global airlines to secure premium cargo space on commercial and freighter flights. From small critical parcels to oversized industrial equipment, our aerospace logistics team monitors your shipment 24/7.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-gray-300">
                                    <FiCheckCircle className="text-[var(--color-brand-accent)] text-xl shrink-0" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center">
                            <span className="text-5xl font-heading font-bold text-[var(--color-brand-highlight)] mb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">24/7</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">AOG Support</span>
                        </div>
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center">
                            <span className="text-5xl font-heading font-bold text-[var(--color-brand-accent)] mb-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">99%</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">On-Time Delivery</span>
                        </div>
                        <div className="glass-panel-dark col-span-2 p-6 flex items-center justify-between border-l-4 border-[var(--color-brand-accent)]">
                            <div>
                                <h4 className="text-white font-bold text-lg">Next-Flight-Out (NFO)</h4>
                                <p className="text-gray-500 text-sm">Priority boarding for extreme emergencies.</p>
                            </div>
                            <FiArrowRight className="text-[var(--color-brand-accent)] text-3xl" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AirFreight;
