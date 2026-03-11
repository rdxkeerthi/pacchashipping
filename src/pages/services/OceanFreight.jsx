import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const features = [
    "FCL (Full Container Load)",
    "LCL (Less than Container Load)",
    "Break Bulk & RO-RO",
    "Port-to-Port / Door-to-Door",
    "Cargo Insurance",
    "Global Customs Clearance"
];

const OceanFreight = () => {
    const waveRef1 = useRef(null);
    const waveRef2 = useRef(null);
    const shipRef = useRef(null);

    useEffect(() => {
        // Image cinematic panning
        gsap.to(shipRef.current, {
            scale: 1.15,
            x: -20,
            y: -10,
            scrollTrigger: {
                trigger: ".ocean-hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050a07] pt-32 pb-20 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none"></div>

            <section className="ocean-hero relative max-w-7xl mx-auto px-6 mb-32 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-highlight tracking-widest uppercase text-sm font-bold mb-4 block">Maritime Logistics</span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold pb-4 text-white drop-shadow-lg">
                            Global Supply <br />
                            <span className="text-gradient">Anchored.</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-lg mb-8 font-light">
                            Cost-effective, reliable, and massively scalable. Our ocean freight operations connect your business to major ports worldwide.
                        </p>
                        <Link to="/contact" className="px-8 py-4 rounded-full bg-[var(--color-brand-accent)] text-[var(--color-brand-dark)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all font-bold text-lg inline-flex items-center gap-2">
                            Request Ocean Quote <FiArrowRight />
                        </Link>
                    </motion.div>

                    <div className="relative h-[400px] md:h-[500px] w-full mt-12 lg:mt-0">
                        {/* Cinematic Image container */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl glass-panel-dark border border-[var(--color-brand-highlight)]/30 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <div
                                ref={shipRef}
                                className="w-full h-full bg-cover bg-center origin-center"
                                style={{ backgroundImage: "url('/shipping_port_containers_1772904872607.png')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-brand-highlight animate-pulse shadow-neon-brand"></div>
                                <span className="text-white font-bold text-sm tracking-widest uppercase">Live Track: Vessel Alpha-9</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 text-white">Capacity & Reliability</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Navigate global trade with confidence. We offer flexible sailing schedules, competitive rates, and comprehensive cargo management systems. Whether FCL or LCL, we optimize your supply chain for maximum efficiency across the seas.
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
                            <span className="text-5xl font-heading font-bold text-[var(--color-brand-highlight)] mb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">150+</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Major Ports</span>
                        </div>
                        <div className="glass-panel p-6 flex flex-col justify-center items-center text-center">
                            <span className="text-5xl font-heading font-bold text-[var(--color-brand-accent)] mb-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">LCL</span>
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Consolidation</span>
                        </div>
                        <div className="glass-panel-dark col-span-2 p-6 flex items-center justify-between border-l-4 border-[var(--color-brand-highlight)]">
                            <div>
                                <h4 className="text-white font-bold text-lg">Project Cargo / RO-RO</h4>
                                <p className="text-gray-500 text-sm">Specialized handling for heavy lift and vehicles.</p>
                            </div>
                            <FiArrowRight className="text-[var(--color-brand-highlight)] text-3xl" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OceanFreight;
